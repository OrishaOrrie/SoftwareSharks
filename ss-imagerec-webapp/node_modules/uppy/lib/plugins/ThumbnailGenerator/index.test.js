var _Promise = typeof Promise === 'undefined' ? require('es6-promise').Promise : Promise;

var ThumbnailGeneratorPlugin = require('./index');
var Plugin = require('../../core/Plugin');

var delay = function delay(duration) {
  return new _Promise(function (resolve) {
    return setTimeout(resolve, duration);
  });
};

describe('uploader/ThumbnailGeneratorPlugin', function () {
  it('should initialise successfully', function () {
    var plugin = new ThumbnailGeneratorPlugin(null, {});
    expect(plugin instanceof Plugin).toEqual(true);
  });

  it('should accept the thumbnailWidth option and override the default', function () {
    var plugin1 = new ThumbnailGeneratorPlugin(null); // eslint-disable-line no-new
    expect(plugin1.opts.thumbnailWidth).toEqual(200);

    var plugin2 = new ThumbnailGeneratorPlugin(null, { thumbnailWidth: 100 }); // eslint-disable-line no-new
    expect(plugin2.opts.thumbnailWidth).toEqual(100);
  });

  describe('install', function () {
    it('should subscribe to uppy file-added event', function () {
      var core = {
        on: jest.fn()
      };

      var plugin = new ThumbnailGeneratorPlugin(core);
      plugin.addToQueue = jest.fn();
      plugin.install();

      expect(core.on).toHaveBeenCalledTimes(1);
      expect(core.on).toHaveBeenCalledWith('file-added', plugin.addToQueue);
    });
  });

  describe('uninstall', function () {
    it('should unsubscribe from uppy file-added event', function () {
      var core = {
        on: jest.fn(),
        off: jest.fn()
      };

      var plugin = new ThumbnailGeneratorPlugin(core);
      plugin.addToQueue = jest.fn();
      plugin.install();

      expect(core.on).toHaveBeenCalledTimes(1);

      plugin.uninstall();

      expect(core.off).toHaveBeenCalledTimes(1);
      expect(core.off).toHaveBeenCalledWith('file-added', plugin.addToQueue);
    });
  });

  describe('queue', function () {
    it('should add a new file to the queue and start processing the queue when queueProcessing is false', function () {
      var core = {};
      var plugin = new ThumbnailGeneratorPlugin(core);
      plugin.processQueue = jest.fn();

      var file = { foo: 'bar' };
      plugin.queueProcessing = false;
      plugin.addToQueue(file);
      expect(plugin.queue).toEqual([{ foo: 'bar' }]);
      expect(plugin.processQueue).toHaveBeenCalledTimes(1);

      var file2 = { foo: 'bar2' };
      plugin.queueProcessing = true;
      plugin.addToQueue(file2);
      expect(plugin.queue).toEqual([{ foo: 'bar' }, { foo: 'bar2' }]);
      expect(plugin.processQueue).toHaveBeenCalledTimes(1);
    });

    it('should process items in the queue one by one', function () {
      var core = {};
      var plugin = new ThumbnailGeneratorPlugin(core);

      plugin.requestThumbnail = jest.fn(function () {
        return delay(100);
      });

      var file1 = { foo: 'bar' };
      var file2 = { foo: 'bar2' };
      var file3 = { foo: 'bar3' };
      plugin.addToQueue(file1);
      plugin.addToQueue(file2);
      plugin.addToQueue(file3);

      expect(plugin.requestThumbnail).toHaveBeenCalledTimes(1);
      expect(plugin.requestThumbnail).toHaveBeenCalledWith(file1);

      return delay(110).then(function () {
        expect(plugin.requestThumbnail).toHaveBeenCalledTimes(2);
        expect(plugin.requestThumbnail).toHaveBeenCalledWith(file2);
        return delay(110);
      }).then(function () {
        expect(plugin.requestThumbnail).toHaveBeenCalledTimes(3);
        expect(plugin.requestThumbnail).toHaveBeenCalledWith(file3);
        return delay(110);
      }).then(function () {
        expect(plugin.queue).toEqual([]);
        expect(plugin.queueProcessing).toEqual(false);
      });
    });
  });

  describe('requestThumbnail', function () {
    it('should call createThumbnail if it is a supported filetype', function () {
      var core = {};
      var plugin = new ThumbnailGeneratorPlugin(core);

      plugin.createThumbnail = jest.fn().mockReturnValue(_Promise.resolve('preview'));
      plugin.setPreviewURL = jest.fn();

      var file = { id: 'file1', type: 'image/png', isRemote: false };
      return plugin.requestThumbnail(file).then(function () {
        expect(plugin.createThumbnail).toHaveBeenCalledTimes(1);
        expect(plugin.createThumbnail).toHaveBeenCalledWith(file, plugin.opts.thumbnailWidth);
      });
    });

    it('should not call createThumbnail if it is not a supported filetype', function () {
      var core = {};
      var plugin = new ThumbnailGeneratorPlugin(core);

      plugin.createThumbnail = jest.fn().mockReturnValue(_Promise.resolve('preview'));
      plugin.setPreviewURL = jest.fn();

      var file = { id: 'file1', type: 'text/html', isRemote: false };
      return plugin.requestThumbnail(file).then(function () {
        expect(plugin.createThumbnail).toHaveBeenCalledTimes(0);
      });
    });

    it('should not call createThumbnail if the file is remote', function () {
      var core = {};
      var plugin = new ThumbnailGeneratorPlugin(core);

      plugin.createThumbnail = jest.fn().mockReturnValue(_Promise.resolve('preview'));
      plugin.setPreviewURL = jest.fn();

      var file = { id: 'file1', type: 'image/png', isRemote: true };
      return plugin.requestThumbnail(file).then(function () {
        expect(plugin.createThumbnail).toHaveBeenCalledTimes(0);
      });
    });

    it('should call setPreviewURL with the thumbnail image', function () {
      var core = {};
      var plugin = new ThumbnailGeneratorPlugin(core);

      plugin.createThumbnail = jest.fn().mockReturnValue(_Promise.resolve('preview'));
      plugin.setPreviewURL = jest.fn();

      var file = { id: 'file1', type: 'image/png', isRemote: false };
      return plugin.requestThumbnail(file).then(function () {
        expect(plugin.setPreviewURL).toHaveBeenCalledTimes(1);
        expect(plugin.setPreviewURL).toHaveBeenCalledWith('file1', 'preview');
      });
    });
  });

  describe('setPreviewURL', function () {
    it('should update the preview url for the specified image', function () {
      var core = {
        state: {
          files: {
            file1: {
              preview: 'foo'
            },
            file2: {
              preview: 'boo'
            }
          }
        },
        setState: jest.fn()
      };
      var plugin = new ThumbnailGeneratorPlugin(core);
      plugin.setPreviewURL('file1', 'moo');
      expect(core.setState).toHaveBeenCalledTimes(1);
      expect(core.setState).toHaveBeenCalledWith({
        files: { file1: { preview: 'moo' }, file2: { preview: 'boo' } }
      });
    });
  });

  describe('getProportionalHeight', function () {
    it('should calculate the resized height based on the specified width of the image whilst keeping aspect ratio', function () {
      var core = {};
      var plugin = new ThumbnailGeneratorPlugin(core);
      expect(plugin.getProportionalHeight({ width: 200, height: 100 }, 50)).toEqual(25);
      expect(plugin.getProportionalHeight({ width: 66, height: 66 }, 33)).toEqual(33);
      expect(plugin.getProportionalHeight({ width: 201.2, height: 198.2 }, 47)).toEqual(46);
    });
  });

  describe('canvasToBlob', function () {
    it('should use canvas.toBlob if available', function () {
      var core = {};
      var plugin = new ThumbnailGeneratorPlugin(core);
      var canvas = {
        toBlob: jest.fn()
      };
      plugin.canvasToBlob(canvas, 'type', 90);
      expect(canvas.toBlob).toHaveBeenCalledTimes(1);
      expect(canvas.toBlob.mock.calls[0][1]).toEqual('type');
      expect(canvas.toBlob.mock.calls[0][2]).toEqual(90);
    });
  });

  describe('downScaleInSteps', function () {
    var originalDocumentCreateElement = void 0;
    var originalURLCreateObjectURL = void 0;

    beforeEach(function () {
      originalDocumentCreateElement = document.createElement;
      originalURLCreateObjectURL = URL.createObjectURL;
    });

    afterEach(function () {
      document.createElement = originalDocumentCreateElement;
      URL.createObjectURL = originalURLCreateObjectURL;
    });

    xit('should scale down the image by the specified number of steps', function () {
      var core = {};
      var plugin = new ThumbnailGeneratorPlugin(core);
      var image = {
        width: 1000,
        height: 800
      };
      var context = {
        drawImage: jest.fn()
      };
      var canvas = {
        width: 0,
        height: 0,
        getContext: jest.fn().mockReturnValue(context)
      };
      document.createElement = jest.fn().mockReturnValue(canvas);
      var result = plugin.downScaleInSteps(image, 3);
      var newImage = {
        getContext: canvas.getContext,
        height: 100,
        width: 125
      };
      expect(result).toEqual({
        image: newImage,
        sourceWidth: 125,
        sourceHeight: 100
      });
      expect(context.drawImage).toHaveBeenCalledTimes(3);
      expect(context.drawImage.mock.calls).toEqual([[{ width: 1000, height: 800 }, 0, 0, 1000, 800, 0, 0, 500, 400], [{ width: 125, height: 100, getContext: canvas.getContext }, 0, 0, 500, 400, 0, 0, 250, 200], [{ width: 125, height: 100, getContext: canvas.getContext }, 0, 0, 250, 200, 0, 0, 125, 100]]);
    });
  });

  describe('resizeImage', function () {
    it('should return a canvas with the resized image on it', function () {
      var core = {};
      var plugin = new ThumbnailGeneratorPlugin(core);
      var image = {
        width: 1000,
        height: 800
      };
      var context = {
        drawImage: jest.fn()
      };
      var canvas = {
        width: 0,
        height: 0,
        getContext: jest.fn().mockReturnValue(context)
      };
      document.createElement = jest.fn().mockReturnValue(canvas);

      var result = plugin.resizeImage(image, 200, 160);
      expect(result).toEqual({
        width: 200,
        height: 160,
        getContext: canvas.getContext
      });
    });

    it('should upsize if original image is smaller than target size', function () {
      var core = {};
      var plugin = new ThumbnailGeneratorPlugin(core);
      var image = {
        width: 100,
        height: 80
      };
      var context = {
        drawImage: jest.fn()
      };
      var canvas = {
        width: 0,
        height: 0,
        getContext: jest.fn().mockReturnValue(context)
      };
      document.createElement = jest.fn().mockReturnValue(canvas);

      var result = plugin.resizeImage(image, 200, 160);
      expect(result).toEqual({
        width: 200,
        height: 160,
        getContext: canvas.getContext
      });
    });
  });
});
//# sourceMappingURL=index.test.js.map