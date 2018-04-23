function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('preact'),
    h = _require.h,
    Component = _require.Component;

var ActionBrowseTagline = function (_Component) {
  _inherits(ActionBrowseTagline, _Component);

  function ActionBrowseTagline(props) {
    _classCallCheck(this, ActionBrowseTagline);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  ActionBrowseTagline.prototype.handleClick = function handleClick(ev) {
    this.input.click();
  };

  ActionBrowseTagline.prototype.render = function render() {
    var _this2 = this;

    // empty value=""  on file input, so we can select same file
    // after removing it from Uppy — otherwise OS thinks it’s selected
    return h(
      'span',
      null,
      this.props.acquirers.length === 0 ? this.props.i18n('dropPaste') : this.props.i18n('dropPasteImport'),
      ' ',
      h(
        'button',
        { type: 'button', 'class': 'uppy-Dashboard-browse', onclick: this.handleClick },
        this.props.i18n('browse')
      ),
      h('input', { 'class': 'uppy-Dashboard-input',
        hidden: 'true',
        'aria-hidden': 'true',
        tabindex: '-1',
        type: 'file',
        name: 'files[]',
        multiple: 'true',
        onchange: this.props.handleInputChange,
        value: '',
        ref: function ref(input) {
          _this2.input = input;
        } })
    );
  };

  return ActionBrowseTagline;
}(Component);

module.exports = ActionBrowseTagline;
//# sourceMappingURL=ActionBrowseTagline.js.map