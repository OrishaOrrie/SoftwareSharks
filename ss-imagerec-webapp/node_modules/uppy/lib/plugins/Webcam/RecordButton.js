var RecordStartIcon = require('./RecordStartIcon');
var RecordStopIcon = require('./RecordStopIcon');

var _require = require('preact'),
    h = _require.h;

module.exports = function RecordButton(_ref) {
  var recording = _ref.recording,
      onStartRecording = _ref.onStartRecording,
      onStopRecording = _ref.onStopRecording;

  if (recording) {
    return h(
      'button',
      { 'class': 'UppyButton--circular UppyButton--red UppyButton--sizeM uppy-Webcam-recordButton',
        type: 'button',
        title: 'Stop Recording',
        'aria-label': 'Stop Recording',
        onclick: onStopRecording },
      RecordStopIcon()
    );
  }

  return h(
    'button',
    { 'class': 'UppyButton--circular UppyButton--red UppyButton--sizeM uppy-Webcam-recordButton',
      type: 'button',
      title: 'Begin Recording',
      'aria-label': 'Begin Recording',
      onclick: onStartRecording },
    RecordStartIcon()
  );
};
//# sourceMappingURL=RecordButton.js.map