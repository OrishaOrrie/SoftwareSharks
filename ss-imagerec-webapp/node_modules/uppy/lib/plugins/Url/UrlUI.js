function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('preact'),
    h = _require.h,
    Component = _require.Component;

var UrlUI = function (_Component) {
  _inherits(UrlUI, _Component);

  function UrlUI(props) {
    _classCallCheck(this, UrlUI);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  UrlUI.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    // My guess about why browser scrolls to top on focus:
    // Component is mounted right away, but the tab panel might be animating
    // still, so input element is positioned outside viewport. This fixes it.
    setTimeout(function () {
      _this2.input.focus({ preventScroll: true });
    }, 150);
  };

  UrlUI.prototype.handleClick = function handleClick() {
    this.props.addFile(this.input.value);
  };

  UrlUI.prototype.render = function render() {
    var _this3 = this;

    return h(
      "div",
      { "class": "uppy-Url" },
      h("input", {
        "class": "uppy-Url-input",
        type: "text",
        placeholder: this.props.i18n('enterUrlToImport'),
        ref: function ref(input) {
          _this3.input = input;
        } }),
      h(
        "button",
        {
          "class": "uppy-Url-importButton",
          type: "button",
          "aria-label": this.props.i18n('addUrl'),
          onclick: this.handleClick },
        this.props.i18n('import')
      )
    );
  };

  return UrlUI;
}(Component);

module.exports = UrlUI;
//# sourceMappingURL=UrlUI.js.map