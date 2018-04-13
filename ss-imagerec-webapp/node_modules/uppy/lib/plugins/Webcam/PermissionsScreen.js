var _require = require('preact'),
    h = _require.h;

module.exports = function (props) {
  return h(
    "div",
    { "class": "uppy-Webcam-permissons" },
    h(
      "h1",
      { "class": "uppy-Webcam-Title" },
      "Please allow access to your camera"
    ),
    h(
      "p",
      null,
      "You have been prompted to allow camera access from this site.",
      h("br", null),
      "In order to take pictures with your camera you must approve this request."
    )
  );
};
//# sourceMappingURL=PermissionsScreen.js.map