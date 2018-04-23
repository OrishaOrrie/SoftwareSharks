var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Promise = typeof Promise === 'undefined' ? require('es6-promise').Promise : Promise;

var Plugin = require('../../core/Plugin');
var Utils = require('../../core/Utils');
/**
 * The Thumbnail Generator plugin
 *
 */

module.exports = function (_Plugin) {
  _inherits(ThumbnailGenerator, _Plugin);

  function ThumbnailGenerator(uppy, opts) {
    _classCallCheck(this, ThumbnailGenerator);

    var _this = _possibleConstructorReturn(this, _Plugin.call(this, uppy, opts));

    _this.type = 'thumbnail';
    _this.id = 'ThumbnailGenerator';
    _this.title = 'Thumbnail Generator';
    _this.queue = [];
    _this.queueProcessing = false;

    var defaultOptions = {
      thumbnailWidth: 200
    };

    _this.opts = _extends({}, defaultOptions, opts);

    _this.addToQueue = _this.addToQueue.bind(_this);
    return _this;
  }

  /**
   * Create a thumbnail for the given Uppy file object.
   *
   * @param {{data: Blob}} file
   * @param {number} width
   * @return {Promise}
   */


  ThumbnailGenerator.prototype.createThumbnail = function createThumbnail(file, targetWidth) {
    var _this2 = this;

    var originalUrl = URL.createObjectURL(file.data);
    var onload = new _Promise(function (resolve, reject) {
      var image = new Image();
      image.src = originalUrl;
      image.onload = function () {
        URL.revokeObjectURL(originalUrl);
        resolve(image);
      };
      image.onerror = function () {
        // The onerror event is totally useless unfortunately, as far as I know
        URL.revokeObjectURL(originalUrl);
        reject(new Error('Could not create thumbnail'));
      };
    });

    return onload.then(function (image) {
      var targetHeight = _this2.getProportionalHeight(image, targetWidth);
      var canvas = _this2.resizeImage(image, targetWidth, targetHeight);
      return _this2.canvasToBlob(canvas, 'image/png');
    }).then(function (blob) {
      return URL.createObjectURL(blob);
    });
  };

  /**
   * Make sure the image doesn’t exceed browser/device canvas limits.
   * For ios with 256 RAM and ie
   */


  ThumbnailGenerator.prototype.protect = function protect(image) {
    // https://stackoverflow.com/questions/6081483/maximum-size-of-a-canvas-element

    var ratio = image.width / image.height;

    var maxSquare = 5000000; // ios max canvas square
    var maxSize = 4096; // ie max canvas dimensions

    var maxW = Math.floor(Math.sqrt(maxSquare * ratio));
    var maxH = Math.floor(maxSquare / Math.sqrt(maxSquare * ratio));
    if (maxW > maxSize) {
      maxW = maxSize;
      maxH = Math.round(maxW / ratio);
    }
    if (maxH > maxSize) {
      maxH = maxSize;
      maxW = Math.round(ratio * maxH);
    }
    if (image.width > maxW) {
      var canvas = document.createElement('canvas');
      canvas.width = maxW;
      canvas.height = maxH;
      canvas.getContext('2d').drawImage(image, 0, 0, maxW, maxH);
      image.src = 'about:blank';
      image.width = 1;
      image.height = 1;
      image = canvas;
    }

    return image;
  };

  /**
   * Resize an image to the target `width` and `height`.
   *
   * Returns a Canvas with the resized image on it.
   */


  ThumbnailGenerator.prototype.resizeImage = function resizeImage(image, targetWidth, targetHeight) {
    // Resizing in steps refactored to use a solution from
    // https://blog.uploadcare.com/image-resize-in-browsers-is-broken-e38eed08df01

    image = this.protect(image);

    var steps = Math.ceil(Math.log2(image.width / targetWidth));
    if (steps < 1) {
      steps = 1;
    }
    var sW = targetWidth * Math.pow(2, steps - 1);
    var sH = targetHeight * Math.pow(2, steps - 1);
    var x = 2;

    while (steps--) {
      var canvas = document.createElement('canvas');
      canvas.width = sW;
      canvas.height = sH;
      canvas.getContext('2d').drawImage(image, 0, 0, sW, sH);
      image = canvas;

      sW = Math.round(sW / x);
      sH = Math.round(sH / x);
    }

    return image;
  };

  /**
   * Save a <canvas> element's content to a Blob object.
   *
   * @param {HTMLCanvasElement} canvas
   * @return {Promise}
   */


  ThumbnailGenerator.prototype.canvasToBlob = function canvasToBlob(canvas, type, quality) {
    if (canvas.toBlob) {
      return new _Promise(function (resolve) {
        canvas.toBlob(resolve, type, quality);
      });
    }
    return _Promise.resolve().then(function () {
      return Utils.dataURItoBlob(canvas.toDataURL(type, quality), {});
    });
  };

  ThumbnailGenerator.prototype.getProportionalHeight = function getProportionalHeight(img, width) {
    var aspect = img.width / img.height;
    return Math.round(width / aspect);
  };

  /**
   * Set the preview URL for a file.
   */


  ThumbnailGenerator.prototype.setPreviewURL = function setPreviewURL(fileID, preview) {
    var _extends2;

    var files = this.uppy.state.files;

    this.uppy.setState({
      files: _extends({}, files, (_extends2 = {}, _extends2[fileID] = _extends({}, files[fileID], {
        preview: preview
      }), _extends2))
    });
  };

  ThumbnailGenerator.prototype.addToQueue = function addToQueue(item) {
    this.queue.push(item);
    if (this.queueProcessing === false) {
      this.processQueue();
    }
  };

  ThumbnailGenerator.prototype.processQueue = function processQueue() {
    var _this3 = this;

    this.queueProcessing = true;
    if (this.queue.length > 0) {
      var current = this.queue.shift();
      return this.requestThumbnail(current).catch(function (err) {}) // eslint-disable-line handle-callback-err
      .then(function () {
        return _this3.processQueue();
      });
    } else {
      this.queueProcessing = false;
    }
  };

  ThumbnailGenerator.prototype.requestThumbnail = function requestThumbnail(file) {
    var _this4 = this;

    if (Utils.isPreviewSupported(file.type) && !file.isRemote) {
      return this.createThumbnail(file, this.opts.thumbnailWidth).then(function (preview) {
        _this4.setPreviewURL(file.id, preview);
      }).catch(function (err) {
        console.warn(err.stack || err.message);
      });
    }
    return _Promise.resolve();
  };

  ThumbnailGenerator.prototype.install = function install() {
    this.uppy.on('file-added', this.addToQueue);
  };

  ThumbnailGenerator.prototype.uninstall = function uninstall() {
    this.uppy.off('file-added', this.addToQueue);
  };

  return ThumbnailGenerator;
}(Plugin);
//# sourceMappingURL=index.js.map