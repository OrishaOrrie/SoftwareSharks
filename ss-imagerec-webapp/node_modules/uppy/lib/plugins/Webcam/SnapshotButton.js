var _require = require('preact'),
    h = _require.h;

var CameraIcon = require('./CameraIcon');

module.exports = function (_ref) {
  var onSnapshot = _ref.onSnapshot;

  return h(
    'button',
    { 'class': 'UppyButton--circular UppyButton--red UppyButton--sizeM uppy-Webcam-recordButton',
      type: 'button',
      title: 'Take a snapshot',
      'aria-label': 'Take a snapshot',
      onclick: onSnapshot },
    CameraIcon()
  );
};
//# sourceMappingURL=SnapshotButton.js.map