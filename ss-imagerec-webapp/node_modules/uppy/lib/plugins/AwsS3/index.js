var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Promise = typeof Promise === 'undefined' ? require('es6-promise').Promise : Promise;

var Plugin = require('../../core/Plugin');
var Translator = require('../../core/Translator');

var _require = require('../../core/Utils'),
    limitPromises = _require.limitPromises;

var XHRUpload = require('../XHRUpload');

function isXml(xhr) {
  var contentType = xhr.headers ? xhr.headers['content-type'] : xhr.getResponseHeader('Content-Type');
  return typeof contentType === 'string' && contentType.toLowerCase() === 'application/xml';
}

module.exports = function (_Plugin) {
  _inherits(AwsS3, _Plugin);

  function AwsS3(uppy, opts) {
    _classCallCheck(this, AwsS3);

    var _this = _possibleConstructorReturn(this, _Plugin.call(this, uppy, opts));

    _this.type = 'uploader';
    _this.id = 'AwsS3';
    _this.title = 'AWS S3';

    var defaultLocale = {
      strings: {
        preparingUpload: 'Preparing upload...'
      }
    };

    var defaultOptions = {
      timeout: 30 * 1000,
      limit: 0,
      getUploadParameters: _this.getUploadParameters.bind(_this),
      locale: defaultLocale
    };

    _this.opts = _extends({}, defaultOptions, opts);
    _this.locale = _extends({}, defaultLocale, _this.opts.locale);
    _this.locale.strings = _extends({}, defaultLocale.strings, _this.opts.locale.strings);

    _this.translator = new Translator({ locale: _this.locale });
    _this.i18n = _this.translator.translate.bind(_this.translator);

    _this.prepareUpload = _this.prepareUpload.bind(_this);

    if (typeof _this.opts.limit === 'number' && _this.opts.limit !== 0) {
      _this.limitRequests = limitPromises(_this.opts.limit);
    } else {
      _this.limitRequests = function (fn) {
        return fn;
      };
    }
    return _this;
  }

  AwsS3.prototype.getUploadParameters = function getUploadParameters(file) {
    if (!this.opts.host) {
      throw new Error('Expected a `host` option containing an uppy-server address.');
    }

    var filename = encodeURIComponent(file.name);
    var type = encodeURIComponent(file.type);
    return fetch(this.opts.host + '/s3/params?filename=' + filename + '&type=' + type, {
      method: 'get',
      headers: { accept: 'application/json' }
    }).then(function (response) {
      return response.json();
    });
  };

  AwsS3.prototype.validateParameters = function validateParameters(file, params) {
    var valid = (typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object' && params && typeof params.url === 'string' && (_typeof(params.fields) === 'object' || params.fields == null) && (params.method == null || /^(put|post)$/i.test(params.method));

    if (!valid) {
      var err = new TypeError('AwsS3: got incorrect result from \'getUploadParameters()\' for file \'' + file.name + '\', expected an object \'{ url, method, fields }\'.\nSee https://uppy.io/docs/aws-s3/#getUploadParameters-file for more on the expected format.');
      console.error(err);
      throw err;
    }

    return params;
  };

  AwsS3.prototype.prepareUpload = function prepareUpload(fileIDs) {
    var _this2 = this;

    fileIDs.forEach(function (id) {
      var file = _this2.uppy.getFile(id);
      _this2.uppy.emit('preprocess-progress', file, {
        mode: 'determinate',
        message: _this2.i18n('preparingUpload'),
        value: 0
      });
    });

    var getUploadParameters = this.limitRequests(this.opts.getUploadParameters);

    return _Promise.all(fileIDs.map(function (id) {
      var file = _this2.uppy.getFile(id);
      var paramsPromise = _Promise.resolve().then(function () {
        return getUploadParameters(file);
      });
      return paramsPromise.then(function (params) {
        return _this2.validateParameters(file, params);
      }).then(function (params) {
        _this2.uppy.emit('preprocess-progress', file, {
          mode: 'determinate',
          message: _this2.i18n('preparingUpload'),
          value: 1
        });
        return params;
      }).catch(function (error) {
        _this2.uppy.emit('upload-error', file, error);
      });
    })).then(function (responses) {
      var updatedFiles = {};
      fileIDs.forEach(function (id, index) {
        var file = _this2.uppy.getFile(id);
        if (file.error) {
          return;
        }

        var _responses$index = responses[index],
            _responses$index$meth = _responses$index.method,
            method = _responses$index$meth === undefined ? 'post' : _responses$index$meth,
            url = _responses$index.url,
            fields = _responses$index.fields,
            headers = _responses$index.headers;

        var xhrOpts = {
          method: method,
          formData: method.toLowerCase() === 'post',
          endpoint: url,
          metaFields: Object.keys(fields)
        };

        if (headers) {
          xhrOpts.headers = headers;
        }

        var updatedFile = _extends({}, file, {
          meta: _extends({}, file.meta, fields),
          xhrUpload: xhrOpts
        });

        updatedFiles[id] = updatedFile;
      });

      _this2.uppy.setState({
        files: _extends({}, _this2.uppy.getState().files, updatedFiles)
      });

      fileIDs.forEach(function (id) {
        var file = _this2.uppy.getFile(id);
        _this2.uppy.emit('preprocess-complete', file);
      });
    });
  };

  AwsS3.prototype.install = function install() {
    this.uppy.addPreProcessor(this.prepareUpload);

    this.uppy.use(XHRUpload, {
      fieldName: 'file',
      responseUrlFieldName: 'location',
      timeout: this.opts.timeout,
      limit: this.opts.limit,
      getResponseData: function getResponseData(content, xhr) {
        // If no response, we've hopefully done a PUT request to the file
        // in the bucket on its full URL.
        if (!isXml(xhr)) {
          return { location: xhr.responseURL };
        }

        var getValue = function getValue() {
          return '';
        };
        if (xhr.responseXML) {
          getValue = function getValue(key) {
            var el = xhr.responseXML.querySelector(key);
            return el ? el.textContent : '';
          };
        }

        if (xhr.responseText) {
          getValue = function getValue(key) {
            var start = xhr.responseText.indexOf('<' + key + '>');
            var end = xhr.responseText.indexOf('</' + key + '>');
            return start !== -1 && end !== -1 ? xhr.responseText.slice(start + key.length + 2, end) : '';
          };
        }

        return {
          location: getValue('Location'),
          bucket: getValue('Bucket'),
          key: getValue('Key'),
          etag: getValue('ETag')
        };
      },
      getResponseError: function getResponseError(content, xhr) {
        // If no response, we don't have a specific error message, use the default.
        if (!isXml(xhr)) {
          return;
        }
        var error = xhr.responseXML.querySelector('Error > Message');
        return new Error(error.textContent);
      }
    });
  };

  AwsS3.prototype.uninstall = function uninstall() {
    var uploader = this.uppy.getPlugin('XHRUpload');
    this.uppy.removePlugin(uploader);

    this.uppy.removePreProcessor(this.prepareUpload);
  };

  return AwsS3;
}(Plugin);
//# sourceMappingURL=index.js.map