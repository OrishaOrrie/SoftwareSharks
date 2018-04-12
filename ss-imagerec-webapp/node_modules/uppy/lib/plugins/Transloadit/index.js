var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Promise = typeof Promise === 'undefined' ? require('es6-promise').Promise : Promise;

var Translator = require('../../core/Translator');
var Plugin = require('../../core/Plugin');
var Tus = require('../Tus');
var Client = require('./Client');
var StatusSocket = require('./Socket');

function defaultGetAssemblyOptions(file, options) {
  return {
    params: options.params,
    signature: options.signature,
    fields: options.fields
  };
}

/**
 * Upload files to Transloadit using Tus.
 */
module.exports = function (_Plugin) {
  _inherits(Transloadit, _Plugin);

  function Transloadit(uppy, opts) {
    _classCallCheck(this, Transloadit);

    var _this = _possibleConstructorReturn(this, _Plugin.call(this, uppy, opts));

    _this.type = 'uploader';
    _this.id = 'Transloadit';
    _this.title = 'Transloadit';

    var defaultLocale = {
      strings: {
        creatingAssembly: 'Preparing upload...',
        creatingAssemblyFailed: 'Transloadit: Could not create Assembly',
        encoding: 'Encoding...'
      }
    };

    var defaultOptions = {
      service: 'https://api2.transloadit.com',
      waitForEncoding: false,
      waitForMetadata: false,
      alwaysRunAssembly: false,
      importFromUploadURLs: false,
      signature: null,
      params: null,
      fields: {},
      getAssemblyOptions: defaultGetAssemblyOptions,
      locale: defaultLocale
    };

    _this.opts = _extends({}, defaultOptions, opts);

    _this.locale = _extends({}, defaultLocale, _this.opts.locale);
    _this.locale.strings = _extends({}, defaultLocale.strings, _this.opts.locale.strings);

    _this.translator = new Translator({ locale: _this.locale });
    _this.i18n = _this.translator.translate.bind(_this.translator);

    _this.prepareUpload = _this.prepareUpload.bind(_this);
    _this.afterUpload = _this.afterUpload.bind(_this);
    _this.onFileUploadURLAvailable = _this.onFileUploadURLAvailable.bind(_this);
    _this.onRestored = _this.onRestored.bind(_this);
    _this.getPersistentData = _this.getPersistentData.bind(_this);

    if (_this.opts.params) {
      _this.validateParams(_this.opts.params);
    }

    _this.client = new Client({
      service: _this.opts.service
    });
    _this.sockets = {};
    return _this;
  }

  Transloadit.prototype.validateParams = function validateParams(params) {
    if (!params) {
      throw new Error('Transloadit: The `params` option is required.');
    }

    if (typeof params === 'string') {
      try {
        params = JSON.parse(params);
      } catch (err) {
        // Tell the user that this is not an Uppy bug!
        err.message = 'Transloadit: The `params` option is a malformed JSON string: ' + err.message;
        throw err;
      }
    }

    if (!params.auth || !params.auth.key) {
      throw new Error('Transloadit: The `params.auth.key` option is required. ' + 'You can find your Transloadit API key at https://transloadit.com/accounts/credentials.');
    }
  };

  Transloadit.prototype.getAssemblyOptions = function getAssemblyOptions(fileIDs) {
    var _this2 = this;

    var options = this.opts;

    var normalizeAssemblyOptions = function normalizeAssemblyOptions(file, assemblyOptions) {
      if (Array.isArray(assemblyOptions.fields)) {
        var fieldNames = assemblyOptions.fields;
        assemblyOptions.fields = {};
        fieldNames.forEach(function (fieldName) {
          assemblyOptions.fields[fieldName] = file.meta[fieldName];
        });
      }
      if (!assemblyOptions.fields) {
        assemblyOptions.fields = {};
      }
      return assemblyOptions;
    };

    return _Promise.all(fileIDs.map(function (fileID) {
      var file = _this2.uppy.getFile(fileID);
      var promise = _Promise.resolve().then(function () {
        return options.getAssemblyOptions(file, options);
      }).then(function (assemblyOptions) {
        return normalizeAssemblyOptions(file, assemblyOptions);
      });
      return promise.then(function (assemblyOptions) {
        _this2.validateParams(assemblyOptions.params);

        return {
          fileIDs: [fileID],
          options: assemblyOptions
        };
      });
    }));
  };

  Transloadit.prototype.dedupeAssemblyOptions = function dedupeAssemblyOptions(list) {
    var dedupeMap = Object.create(null);
    list.forEach(function (_ref) {
      var fileIDs = _ref.fileIDs,
          options = _ref.options;

      var id = JSON.stringify(options);
      if (dedupeMap[id]) {
        var _dedupeMap$id$fileIDs;

        (_dedupeMap$id$fileIDs = dedupeMap[id].fileIDs).push.apply(_dedupeMap$id$fileIDs, fileIDs);
      } else {
        dedupeMap[id] = {
          options: options,
          fileIDs: [].concat(fileIDs)
        };
      }
    });

    return Object.keys(dedupeMap).map(function (id) {
      return dedupeMap[id];
    });
  };

  Transloadit.prototype.createAssembly = function createAssembly(fileIDs, uploadID, options) {
    var _this3 = this;

    var pluginOptions = this.opts;

    this.uppy.log('[Transloadit] create Assembly');

    return this.client.createAssembly({
      params: options.params,
      fields: options.fields,
      expectedFiles: fileIDs.length,
      signature: options.signature
    }).then(function (assembly) {
      var _extends2, _extends3;

      // Store the list of assemblies related to this upload.
      var state = _this3.getPluginState();
      var assemblyList = state.uploadsAssemblies[uploadID];
      var uploadsAssemblies = _extends({}, state.uploadsAssemblies, (_extends2 = {}, _extends2[uploadID] = assemblyList.concat([assembly.assembly_id]), _extends2));

      _this3.setPluginState({
        assemblies: _extends(state.assemblies, (_extends3 = {}, _extends3[assembly.assembly_id] = assembly, _extends3)),
        uploadsAssemblies: uploadsAssemblies
      });

      function attachAssemblyMetadata(file, assembly) {
        // Attach meta parameters for the Tus plugin. See:
        // https://github.com/tus/tusd/wiki/Uploading-to-Transloadit-using-tus#uploading-using-tus
        var tlMeta = {
          assembly_url: assembly.assembly_url,
          filename: file.name,
          fieldname: 'file'
        };
        var meta = _extends({}, file.meta, tlMeta);
        // Add assembly-specific Tus endpoint.
        var tus = _extends({}, file.tus, {
          endpoint: assembly.tus_url
        });

        // Set uppy server location.
        // we only add this, if 'file' has the attribute remote, because
        // this is the criteria to identify remote files. If we add it without
        // the check, then the file automatically becomes a remote file.
        // @TODO: this is quite hacky. Please fix this later
        var remote = void 0;
        if (file.remote) {
          var newHost = assembly.uppyserver_url;
          // remove tailing slash
          if (newHost.endsWith('/')) {
            newHost = newHost.slice(0, -1);
          }
          var path = file.remote.url.replace(file.remote.host, '');
          // remove leading slash
          if (path.startsWith('/')) {
            path = path.slice(1);
          }
          remote = _extends({}, file.remote, {
            host: newHost,
            url: newHost + '/' + path
          });
        }

        var transloadit = {
          assembly: assembly.assembly_id
        };

        var newFile = _extends({}, file, { transloadit: transloadit });
        // Only configure the Tus plugin if we are uploading straight to Transloadit (the default).
        if (!pluginOptions.importFromUploadURLs) {
          _extends(newFile, { meta: meta, tus: tus, remote: remote });
        }
        return newFile;
      }

      var files = _extends({}, _this3.uppy.state.files);
      fileIDs.forEach(function (id) {
        files[id] = attachAssemblyMetadata(files[id], assembly);
      });

      _this3.uppy.setState({ files: files });

      _this3.uppy.emit('transloadit:assembly-created', assembly, fileIDs);

      return _this3.connectSocket(assembly).then(function () {
        return assembly;
      });
    }).then(function (assembly) {
      _this3.uppy.log('[Transloadit] Created Assembly');
      return assembly;
    }).catch(function (err) {
      _this3.uppy.info(_this3.i18n('creatingAssemblyFailed'), 'error', 0);

      // Reject the promise.
      throw err;
    });
  };

  Transloadit.prototype.shouldWait = function shouldWait() {
    return this.opts.waitForEncoding || this.opts.waitForMetadata;
  };

  /**
   * Used when `importFromUploadURLs` is enabled: reserves all files in
   * the assembly.
   */


  Transloadit.prototype.reserveFiles = function reserveFiles(assembly, fileIDs) {
    var _this4 = this;

    return _Promise.all(fileIDs.map(function (fileID) {
      var file = _this4.uppy.getFile(fileID);
      return _this4.client.reserveFile(assembly, file);
    }));
  };

  /**
   * Used when `importFromUploadURLs` is enabled: adds files to the assembly
   * once they have been fully uploaded.
   */


  Transloadit.prototype.onFileUploadURLAvailable = function onFileUploadURLAvailable(file) {
    var _this5 = this;

    if (!file || !file.transloadit || !file.transloadit.assembly) {
      return;
    }

    var state = this.getPluginState();
    var assembly = state.assemblies[file.transloadit.assembly];

    this.client.addFile(assembly, file).catch(function (err) {
      _this5.uppy.log(err);
      _this5.uppy.emit('transloadit:import-error', assembly, file.id, err);
    });
  };

  Transloadit.prototype.findFile = function findFile(uploadedFile) {
    var files = this.uppy.state.files;
    for (var id in files) {
      if (!files.hasOwnProperty(id)) {
        continue;
      }
      // Completed file upload.
      if (files[id].uploadURL === uploadedFile.tus_upload_url) {
        return files[id];
      }
      // In-progress file upload.
      if (files[id].tus && files[id].tus.uploadUrl === uploadedFile.tus_upload_url) {
        return files[id];
      }
      if (!uploadedFile.is_tus_file) {
        // Fingers-crossed check for non-tus uploads, eg imported from S3.
        if (files[id].name === uploadedFile.name && files[id].size === uploadedFile.size) {
          return files[id];
        }
      }
    }
  };

  Transloadit.prototype.onFileUploadComplete = function onFileUploadComplete(assemblyId, uploadedFile) {
    var _extends4;

    var state = this.getPluginState();
    var file = this.findFile(uploadedFile);
    if (!file) {
      this.uppy.log('[Transloadit] Couldn’t file the file, it was likely removed in the process');
      return;
    }
    this.setPluginState({
      files: _extends({}, state.files, (_extends4 = {}, _extends4[uploadedFile.id] = {
        assembly: assemblyId,
        id: file.id,
        uploadedFile: uploadedFile
      }, _extends4))
    });
    this.uppy.emit('transloadit:upload', uploadedFile, this.getAssembly(assemblyId));
  };

  Transloadit.prototype.onResult = function onResult(assemblyId, stepName, result) {
    var state = this.getPluginState();
    var file = state.files[result.original_id];
    // The `file` may not exist if an import robot was used instead of a file upload.
    result.localId = file ? file.id : null;

    var entry = {
      result: result,
      stepName: stepName,
      id: result.id,
      assembly: assemblyId
    };

    this.setPluginState({
      results: [].concat(state.results, [entry])
    });
    this.uppy.emit('transloadit:result', stepName, result, this.getAssembly(assemblyId));
  };

  Transloadit.prototype.onAssemblyFinished = function onAssemblyFinished(url) {
    var _this6 = this;

    this.client.getAssemblyStatus(url).then(function (assembly) {
      var _extends5;

      var state = _this6.getPluginState();
      _this6.setPluginState({
        assemblies: _extends({}, state.assemblies, (_extends5 = {}, _extends5[assembly.assembly_id] = assembly, _extends5))
      });
      _this6.uppy.emit('transloadit:complete', assembly);
    });
  };

  Transloadit.prototype.getPersistentData = function getPersistentData(setData) {
    var _setData;

    var state = this.getPluginState();
    var assemblies = state.assemblies;
    var uploadsAssemblies = state.uploadsAssemblies;
    var uploads = Object.keys(state.files);
    var results = state.results.map(function (result) {
      return result.id;
    });

    setData((_setData = {}, _setData[this.id] = {
      assemblies: assemblies,
      uploadsAssemblies: uploadsAssemblies,
      uploads: uploads,
      results: results
    }, _setData));
  };

  /**
   * Emit the necessary events that must have occured to get from the `prevState`,
   * to the current state.
   * For completed uploads, `transloadit:upload` is emitted.
   * For new results, `transloadit:result` is emitted.
   * For completed or errored assemblies, `transloadit:complete` or `transloadit:assembly-error` is emitted.
   */


  Transloadit.prototype.emitEventsDiff = function emitEventsDiff(prevState) {
    var _this7 = this;

    var opts = this.opts;
    var state = this.getPluginState();

    var emitMissedEvents = function emitMissedEvents() {
      // Emit events for completed uploads and completed results
      // that we've missed while we were away.
      var newUploads = Object.keys(state.files).filter(function (fileID) {
        return !prevState.files.hasOwnProperty(fileID);
      }).map(function (fileID) {
        return state.files[fileID];
      });
      var newResults = state.results.filter(function (result) {
        return !prevState.results.some(function (prev) {
          return prev.id === result.id;
        });
      });

      _this7.uppy.log('[Transloadit] New fully uploaded files since restore:');
      _this7.uppy.log(newUploads);
      newUploads.forEach(function (_ref2) {
        var assembly = _ref2.assembly,
            uploadedFile = _ref2.uploadedFile;

        _this7.uppy.log('[Transloadit]  emitting transloadit:upload ' + uploadedFile.id);
        _this7.uppy.emit('transloadit:upload', uploadedFile, _this7.getAssembly(assembly));
      });
      _this7.uppy.log('[Transloadit] New results since restore:');
      _this7.uppy.log(newResults);
      newResults.forEach(function (_ref3) {
        var assembly = _ref3.assembly,
            stepName = _ref3.stepName,
            result = _ref3.result,
            id = _ref3.id;

        _this7.uppy.log('[Transloadit]  emitting transloadit:result ' + stepName + ', ' + id);
        _this7.uppy.emit('transloadit:result', stepName, result, _this7.getAssembly(assembly));
      });

      var newAssemblies = state.assemblies;
      var previousAssemblies = prevState.assemblies;
      _this7.uppy.log('[Transloadit] Current Assembly status after restore');
      _this7.uppy.log(newAssemblies);
      _this7.uppy.log('[Transloadit] Assembly status before restore');
      _this7.uppy.log(previousAssemblies);
      Object.keys(newAssemblies).forEach(function (assemblyId) {
        var oldAssembly = previousAssemblies[assemblyId];
        diffAssemblyStatus(oldAssembly, newAssemblies[assemblyId]);
      });
    };

    // Emit events for assemblies that have completed or errored while we were away.
    var diffAssemblyStatus = function diffAssemblyStatus(prev, next) {
      _this7.uppy.log('[Transloadit] Diff assemblies');
      _this7.uppy.log(prev);
      _this7.uppy.log(next);

      if (opts.waitForEncoding && next.ok === 'ASSEMBLY_COMPLETED' && prev.ok !== 'ASSEMBLY_COMPLETED') {
        _this7.uppy.log('[Transloadit]  Emitting transloadit:complete for ' + next.assembly_id);
        _this7.uppy.log(next);
        _this7.uppy.emit('transloadit:complete', next);
      } else if (opts.waitForMetadata && next.upload_meta_data_extracted && !prev.upload_meta_data_extracted) {
        _this7.uppy.log('[Transloadit]  Emitting transloadit:complete after metadata extraction for ' + next.assembly_id);
        _this7.uppy.log(next);
        _this7.uppy.emit('transloadit:complete', next);
      }

      if (next.error && !prev.error) {
        _this7.uppy.log('[Transloadit]  !!! Emitting transloadit:assembly-error for ' + next.assembly_id);
        _this7.uppy.log(next);
        _this7.uppy.emit('transloadit:assembly-error', next, new Error(next.message));
      }
    };

    emitMissedEvents();
  };

  Transloadit.prototype.onRestored = function onRestored(pluginData) {
    var _this8 = this;

    var savedState = pluginData && pluginData[this.id] ? pluginData[this.id] : {};
    var knownUploads = savedState.files || [];
    var knownResults = savedState.results || [];
    var previousAssemblies = savedState.assemblies || {};
    var uploadsAssemblies = savedState.uploadsAssemblies || {};

    if (Object.keys(uploadsAssemblies).length === 0) {
      // Nothing to restore.
      return;
    }

    // Fetch up-to-date assembly statuses.
    var loadAssemblies = function loadAssemblies() {
      var assemblyIDs = [];
      Object.keys(uploadsAssemblies).forEach(function (uploadID) {
        assemblyIDs.push.apply(assemblyIDs, uploadsAssemblies[uploadID]);
      });

      return _Promise.all(assemblyIDs.map(function (assemblyID) {
        var url = 'https://api2.transloadit.com/assemblies/' + assemblyID;
        return _this8.client.getAssemblyStatus(url);
      }));
    };

    var reconnectSockets = function reconnectSockets(assemblies) {
      return _Promise.all(assemblies.map(function (assembly) {
        // No need to connect to the socket if the assembly has completed by now.
        if (assembly.ok === 'ASSEMBLY_COMPLETE') {
          return null;
        }
        return _this8.connectSocket(assembly);
      }));
    };

    // Convert loaded assembly statuses to a Transloadit plugin state object.
    var restoreState = function restoreState(assemblies) {
      var assembliesById = {};
      var files = {};
      var results = [];
      assemblies.forEach(function (assembly) {
        assembliesById[assembly.assembly_id] = assembly;

        assembly.uploads.forEach(function (uploadedFile) {
          var file = _this8.findFile(uploadedFile);
          files[uploadedFile.id] = {
            id: file.id,
            assembly: assembly.assembly_id,
            uploadedFile: uploadedFile
          };
        });

        var state = _this8.getPluginState();
        Object.keys(assembly.results).forEach(function (stepName) {
          assembly.results[stepName].forEach(function (result) {
            var file = state.files[result.original_id];
            result.localId = file ? file.id : null;
            results.push({
              id: result.id,
              result: result,
              stepName: stepName,
              assembly: assembly.assembly_id
            });
          });
        });
      });

      _this8.setPluginState({
        assemblies: assembliesById,
        files: files,
        results: results,
        uploadsAssemblies: uploadsAssemblies
      });
    };

    // Restore all assembly state.
    this.restored = _Promise.resolve().then(loadAssemblies).then(function (assemblies) {
      restoreState(assemblies);
      return reconnectSockets(assemblies);
    }).then(function () {
      // Return a callback that will be called by `afterUpload`
      // once it has attached event listeners etc.
      var newState = _this8.getPluginState();
      var previousFiles = {};
      knownUploads.forEach(function (id) {
        previousFiles[id] = newState.files[id];
      });
      return function () {
        return _this8.emitEventsDiff({
          assemblies: previousAssemblies,
          files: previousFiles,
          results: newState.results.filter(function (_ref4) {
            var id = _ref4.id;
            return knownResults.indexOf(id) !== -1;
          }),
          uploadsAssemblies: uploadsAssemblies
        });
      };
    });

    this.restored.then(function () {
      _this8.restored = null;
    });
  };

  Transloadit.prototype.connectSocket = function connectSocket(assembly) {
    var _this9 = this;

    var socket = new StatusSocket(assembly.websocket_url, assembly);
    this.sockets[assembly.assembly_id] = socket;

    socket.on('upload', this.onFileUploadComplete.bind(this, assembly.assembly_id));
    socket.on('error', function (error) {
      _this9.uppy.emit('transloadit:assembly-error', assembly, error);
    });

    socket.on('executing', function () {
      _this9.uppy.emit('transloadit:assembly-executing', assembly);
    });

    if (this.opts.waitForEncoding) {
      socket.on('result', this.onResult.bind(this, assembly.assembly_id));
    }

    if (this.opts.waitForEncoding) {
      socket.on('finished', function () {
        _this9.onAssemblyFinished(assembly.assembly_ssl_url);
      });
    } else if (this.opts.waitForMetadata) {
      socket.on('metadata', function () {
        _this9.onAssemblyFinished(assembly.assembly_ssl_url);
      });
    }

    return new _Promise(function (resolve, reject) {
      socket.on('connect', resolve);
      socket.on('error', reject);
    }).then(function () {
      _this9.uppy.log('[Transloadit] Socket is ready');
    });
  };

  Transloadit.prototype.prepareUpload = function prepareUpload(fileIDs, uploadID) {
    var _this10 = this,
        _extends6;

    // Only use files without errors
    fileIDs = fileIDs.filter(function (file) {
      return !file.error;
    });

    fileIDs.forEach(function (fileID) {
      var file = _this10.uppy.getFile(fileID);
      _this10.uppy.emit('preprocess-progress', file, {
        mode: 'indeterminate',
        message: _this10.i18n('creatingAssembly')
      });
    });

    var createAssembly = function createAssembly(_ref5) {
      var fileIDs = _ref5.fileIDs,
          options = _ref5.options;

      return _this10.createAssembly(fileIDs, uploadID, options).then(function (assembly) {
        if (_this10.opts.importFromUploadURLs) {
          return _this10.reserveFiles(assembly, fileIDs);
        }
      }).then(function () {
        fileIDs.forEach(function (fileID) {
          var file = _this10.uppy.getFile(fileID);
          _this10.uppy.emit('preprocess-complete', file);
        });
      }).catch(function (err) {
        // Clear preprocessing state when the assembly could not be created,
        // otherwise the UI gets confused about the lingering progress keys
        fileIDs.forEach(function (fileID) {
          var file = _this10.uppy.getFile(fileID);
          _this10.uppy.emit('preprocess-complete', file);
          _this10.uppy.emit('upload-error', file, err);
        });
        throw err;
      });
    };

    var state = this.getPluginState();
    var uploadsAssemblies = _extends({}, state.uploadsAssemblies, (_extends6 = {}, _extends6[uploadID] = [], _extends6));
    this.setPluginState({ uploadsAssemblies: uploadsAssemblies });

    var optionsPromise = void 0;
    if (fileIDs.length > 0) {
      optionsPromise = this.getAssemblyOptions(fileIDs).then(function (allOptions) {
        return _this10.dedupeAssemblyOptions(allOptions);
      });
    } else if (this.opts.alwaysRunAssembly) {
      optionsPromise = _Promise.resolve(this.opts.getAssemblyOptions(null, this.opts)).then(function (options) {
        _this10.validateParams(options.params);
        return [{ fileIDs: fileIDs, options: options }];
      });
    } else {
      // If there are no files and we do not `alwaysRunAssembly`,
      // don't do anything.
      return _Promise.resolve();
    }

    return optionsPromise.then(function (assemblies) {
      return _Promise.all(assemblies.map(createAssembly));
    });
  };

  Transloadit.prototype.afterUpload = function afterUpload(fileIDs, uploadID) {
    var _this11 = this;

    // Only use files without errors
    fileIDs = fileIDs.filter(function (file) {
      return !file.error;
    });

    var state = this.getPluginState();

    // If we're still restoring state, wait for that to be done.
    if (this.restored) {
      return this.restored.then(function (emitMissedEvents) {
        var promise = _this11.afterUpload(fileIDs, uploadID);
        emitMissedEvents();
        return promise;
      });
    }

    var assemblyIDs = state.uploadsAssemblies[uploadID];

    // If we don't have to wait for encoding metadata or results, we can close
    // the socket immediately and finish the upload.
    if (!this.shouldWait()) {
      assemblyIDs.forEach(function (assemblyID) {
        var socket = _this11.sockets[assemblyID];
        socket.close();
      });
      var assemblies = assemblyIDs.map(function (id) {
        return _this11.getAssembly(id);
      });
      this.uppy.addResultData(uploadID, { transloadit: assemblies });
      return _Promise.resolve();
    }

    // If no assemblies were created for this upload, we also do not have to wait.
    // There's also no sockets or anything to close, so just return immediately.
    if (assemblyIDs.length === 0) {
      this.uppy.addResultData(uploadID, { transloadit: [] });
      return _Promise.resolve();
    }

    var finishedAssemblies = 0;

    return new _Promise(function (resolve, reject) {
      fileIDs.forEach(function (fileID) {
        var file = _this11.uppy.getFile(fileID);
        _this11.uppy.emit('postprocess-progress', file, {
          mode: 'indeterminate',
          message: _this11.i18n('encoding')
        });
      });

      var onAssemblyFinished = function onAssemblyFinished(assembly) {
        // An assembly for a different upload just finished. We can ignore it.
        if (assemblyIDs.indexOf(assembly.assembly_id) === -1) {
          _this11.uppy.log('[Transloadit] afterUpload(): Ignoring finished Assembly ' + assembly.assembly_id);
          return;
        }
        _this11.uppy.log('[Transloadit] afterUpload(): Got Assembly finish ' + assembly.assembly_id);

        // TODO set the `file.uploadURL` to a result?
        // We will probably need an option here so the plugin user can tell us
        // which result to pick…?

        var files = _this11.getAssemblyFiles(assembly.assembly_id);
        files.forEach(function (file) {
          _this11.uppy.emit('postprocess-complete', file);
        });

        checkAllComplete();
      };

      var onAssemblyError = function onAssemblyError(assembly, error) {
        // An assembly for a different upload just errored. We can ignore it.
        if (assemblyIDs.indexOf(assembly.assembly_id) === -1) {
          _this11.uppy.log('[Transloadit] afterUpload(): Ignoring errored Assembly ' + assembly.assembly_id);
          return;
        }
        _this11.uppy.log('[Transloadit] afterUpload(): Got Assembly error ' + assembly.assembly_id);
        _this11.uppy.log(error);

        // Clear postprocessing state for all our files.
        var files = _this11.getAssemblyFiles(assembly.assembly_id);
        files.forEach(function (file) {
          // TODO Maybe make a postprocess-error event here?
          _this11.uppy.emit('upload-error', file, error);

          _this11.uppy.emit('postprocess-complete', file);
        });

        checkAllComplete();
      };

      var onImportError = function onImportError(assembly, fileID, error) {
        if (assemblyIDs.indexOf(assembly.assembly_id) === -1) {
          return;
        }

        // Not sure if we should be doing something when it's just one file failing.
        // ATM, the only options are 1) ignoring or 2) failing the entire upload.
        // I think failing the upload is better than silently ignoring.
        // In the future we should maybe have a way to resolve uploads with some failures,
        // like returning an object with `{ successful, failed }` uploads.
        onAssemblyError(assembly, error);
      };

      var checkAllComplete = function checkAllComplete() {
        finishedAssemblies += 1;
        if (finishedAssemblies === assemblyIDs.length) {
          // We're done, these listeners can be removed
          removeListeners();
          var _assemblies = assemblyIDs.map(function (id) {
            return _this11.getAssembly(id);
          });
          _this11.uppy.addResultData(uploadID, { transloadit: _assemblies });
          resolve();
        }
      };

      var removeListeners = function removeListeners() {
        _this11.uppy.off('transloadit:complete', onAssemblyFinished);
        _this11.uppy.off('transloadit:assembly-error', onAssemblyError);
        _this11.uppy.off('transloadit:import-error', onImportError);
      };

      _this11.uppy.on('transloadit:complete', onAssemblyFinished);
      _this11.uppy.on('transloadit:assembly-error', onAssemblyError);
      _this11.uppy.on('transloadit:import-error', onImportError);
    }).then(function (result) {
      // Clean up uploadID → assemblyIDs, they're no longer going to be used anywhere.
      var state = _this11.getPluginState();
      var uploadsAssemblies = _extends({}, state.uploadsAssemblies);
      delete uploadsAssemblies[uploadID];
      _this11.setPluginState({ uploadsAssemblies: uploadsAssemblies });

      return result;
    });
  };

  Transloadit.prototype.install = function install() {
    this.uppy.addPreProcessor(this.prepareUpload);
    this.uppy.addPostProcessor(this.afterUpload);

    if (this.opts.importFromUploadURLs) {
      // No uploader needed when importing; instead we take the upload URL from an existing uploader.
      this.uppy.on('upload-success', this.onFileUploadURLAvailable);
    } else {
      this.uppy.use(Tus, {
        // Disable tus-js-client fingerprinting, otherwise uploading the same file at different times
        // will upload to the same assembly.
        resume: false,
        // Only send assembly metadata to the tus endpoint.
        metaFields: ['assembly_url', 'filename', 'fieldname']
      });
    }

    this.uppy.on('restore:get-data', this.getPersistentData);
    this.uppy.on('restored', this.onRestored);

    this.setPluginState({
      // Contains assembly status objects, indexed by their ID.
      assemblies: {},
      // Contains arrays of assembly IDs, indexed by the upload ID that they belong to.
      uploadsAssemblies: {},
      // Contains file data from Transloadit, indexed by their Transloadit-assigned ID.
      files: {},
      // Contains result data from Transloadit.
      results: []
    });
  };

  Transloadit.prototype.uninstall = function uninstall() {
    this.uppy.removePreProcessor(this.prepareUpload);
    this.uppy.removePostProcessor(this.afterUpload);

    if (this.opts.importFromUploadURLs) {
      this.uppy.off('upload-success', this.onFileUploadURLAvailable);
    }
  };

  Transloadit.prototype.getAssembly = function getAssembly(id) {
    var state = this.getPluginState();
    return state.assemblies[id];
  };

  Transloadit.prototype.getAssemblyFiles = function getAssemblyFiles(assemblyID) {
    var _this12 = this;

    var fileIDs = Object.keys(this.uppy.state.files);
    return fileIDs.map(function (fileID) {
      return _this12.uppy.getFile(fileID);
    }).filter(function (file) {
      return file && file.transloadit && file.transloadit.assembly === assemblyID;
    });
  };

  return Transloadit;
}(Plugin);
//# sourceMappingURL=index.js.map