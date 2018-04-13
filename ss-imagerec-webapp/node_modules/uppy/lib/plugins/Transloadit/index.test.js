var _Promise = typeof Promise === 'undefined' ? require('es6-promise').Promise : Promise;

var Core = require('../../core');
var Transloadit = require('./');

describe('Transloadit', function () {
  it('Throws errors if options are missing', function () {
    var uppy = new Core();

    expect(function () {
      uppy.use(Transloadit, { params: {} });
    }).toThrowError(/The `params\.auth\.key` option is required/);
  });

  it('Accepts a JSON string as `params` for signature authentication', function () {
    var uppy = new Core();

    expect(function () {
      uppy.use(Transloadit, {
        params: 'not json'
      });
    }).toThrowError(/The `params` option is a malformed JSON string/);

    expect(function () {
      uppy.use(Transloadit, {
        params: '{"template_id":"some template id string"}'
      });
    }).toThrowError(/The `params\.auth\.key` option is required/);
    expect(function () {
      uppy.use(Transloadit, {
        params: '{"auth":{"key":"some auth key string"},"template_id":"some template id string"}'
      });
    }).not.toThrowError(/The `params\.auth\.key` option is required/);
  });

  it('Validates response from getAssemblyOptions()', function () {
    var uppy = new Core({ autoProceed: false });

    uppy.use(Transloadit, {
      getAssemblyOptions: function getAssemblyOptions(file) {
        expect(file.name).toBe('testfile');
        return {
          params: '{"some":"json"}'
        };
      }
    });

    var data = Buffer.alloc(4000);
    data.size = data.byteLength;
    return uppy.addFile({
      name: 'testfile',
      data: data
    }).then(function () {
      return uppy.upload().then(function () {
        throw new Error('should have rejected');
      }, function (err) {
        expect(err.message).toMatch(/The `params\.auth\.key` option is required/);
      });
    });
  });

  it('Uses different assemblies for different params', function () {
    var uppy = new Core({ autoProceed: false });

    uppy.use(Transloadit, {
      getAssemblyOptions: function getAssemblyOptions(file) {
        return {
          params: {
            auth: { key: 'fake key' },
            steps: {
              fake_step: { data: file.name }
            }
          }
        };
      }
    });

    var tl = uppy.getPlugin('Transloadit');
    var files = ['a.png', 'b.png', 'c.png', 'd.png'];
    var i = 0;
    tl.client.createAssembly = function (opts) {
      expect(opts.params.steps.fake_step.data).toEqual(files[i]);
      i++;
      // Short-circuit upload
      return _Promise.reject('short-circuit'); // eslint-disable-line prefer-promise-reject-errors
    };

    var data = Buffer.alloc(10);
    data.size = data.byteLength;

    return _Promise.all([uppy.addFile({ name: 'a.png', data: data }), uppy.addFile({ name: 'b.png', data: data }), uppy.addFile({ name: 'c.png', data: data }), uppy.addFile({ name: 'd.png', data: data })]).then(function () {
      return uppy.upload().then(function () {
        throw new Error('upload should have been rejected');
      }, function () {
        expect(i).toBe(4);
      });
    });
  });

  it('Should merge files with same parameters into one Assembly', function () {
    var uppy = new Core({ autoProceed: false });

    uppy.use(Transloadit, {
      getAssemblyOptions: function getAssemblyOptions(file) {
        return {
          params: {
            auth: { key: 'fake key' },
            steps: {
              fake_step: { data: file.size }
            }
          }
        };
      }
    });

    var tl = uppy.getPlugin('Transloadit');
    var assemblies = [{ data: 10, files: ['a.png', 'b.png', 'c.png'] }, { data: 20, files: ['d.png'] }];
    var i = 0;
    tl.client.createAssembly = function (opts) {
      var assembly = assemblies[i];
      expect(opts.params.steps.fake_step.data).toBe(assembly.data);
      i++;
      // Short-circuit upload
      return _Promise.reject('short-circuit'); // eslint-disable-line prefer-promise-reject-errors
    };

    var data = Buffer.alloc(10);
    data.size = data.byteLength;
    var data2 = Buffer.alloc(20);
    data2.size = data2.byteLength;

    return _Promise.all([uppy.addFile({ name: 'a.png', data: data }), uppy.addFile({ name: 'b.png', data: data }), uppy.addFile({ name: 'c.png', data: data }), uppy.addFile({ name: 'd.png', data: data2 })]).then(function () {
      return uppy.upload().then(function () {
        throw new Error('Upload should have been rejected');
      }, function () {
        expect(i).toBe(2);
      });
    });
  });

  it('Does not create an Assembly if no files are being uploaded', function () {
    var uppy = new Core();
    uppy.use(Transloadit, {
      getAssemblyOptions: function getAssemblyOptions() {
        throw new Error('should not create Assembly');
      }
    });
    uppy.run();

    return uppy.upload();
  });

  it('Creates an Assembly if no files are being uploaded but `alwaysRunAssembly` is enabled', function () {
    var uppy = new Core();
    uppy.use(Transloadit, {
      alwaysRunAssembly: true,
      getAssemblyOptions: function getAssemblyOptions(file) {
        // should call getAssemblyOptions with `null`
        expect(file).toBe(null);
        return _Promise.reject('short-circuited'); // eslint-disable-line prefer-promise-reject-errors
      }
    });

    return expect(uppy.upload()).rejects.toEqual(new Error('short-circuited'));
  });
});
//# sourceMappingURL=index.test.js.map