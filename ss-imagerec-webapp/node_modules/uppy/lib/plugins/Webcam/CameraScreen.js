function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('preact'),
    h = _require.h,
    Component = _require.Component;

var SnapshotButton = require('./SnapshotButton');
var RecordButton = require('./RecordButton');

function isModeAvailable(modes, mode) {
  return modes.indexOf(mode) !== -1;
}

var CameraScreen = function (_Component) {
  _inherits(CameraScreen, _Component);

  function CameraScreen() {
    _classCallCheck(this, CameraScreen);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  CameraScreen.prototype.componentDidMount = function componentDidMount() {
    this.props.onFocus();
    this.btnContainer.firstChild.focus();
  };

  CameraScreen.prototype.componentWillUnmount = function componentWillUnmount() {
    this.props.onStop();
  };

  CameraScreen.prototype.render = function render() {
    var _this2 = this;

    var shouldShowRecordButton = this.props.supportsRecording && (isModeAvailable(this.props.modes, 'video-only') || isModeAvailable(this.props.modes, 'audio-only') || isModeAvailable(this.props.modes, 'video-audio'));
    var shouldShowSnapshotButton = isModeAvailable(this.props.modes, 'picture');

    return h(
      'div',
      { 'class': 'uppy uppy-Webcam-container' },
      h(
        'div',
        { 'class': 'uppy-Webcam-videoContainer' },
        h('video', { 'class': 'uppy-Webcam-video  ' + (this.props.mirror ? 'uppy-Webcam-video--mirrored' : ''), autoplay: true, muted: true, playsinline: true, srcObject: this.props.src || '' })
      ),
      h(
        'div',
        { 'class': 'uppy-Webcam-buttonContainer', ref: function ref(el) {
            _this2.btnContainer = el;
          } },
        shouldShowSnapshotButton ? SnapshotButton(this.props) : null,
        ' ',
        shouldShowRecordButton ? RecordButton(this.props) : null
      )
    );
  };

  return CameraScreen;
}(Component);

module.exports = CameraScreen;
//# sourceMappingURL=CameraScreen.js.map