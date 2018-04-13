var _require = require('preact'),
    h = _require.h;

module.exports = function (props) {
  return h(
    "li",
    null,
    h(
      "button",
      { type: "button", onclick: props.getFolder },
      props.title
    )
  );
};
//# sourceMappingURL=Breadcrumb.js.map