function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ActionBrowseTagline = require('./ActionBrowseTagline');

var _require = require('./icons'),
    localIcon = _require.localIcon;

var _require2 = require('preact'),
    h = _require2.h,
    Component = _require2.Component;

var Tabs = function (_Component) {
  _inherits(Tabs, _Component);

  function Tabs(props) {
    _classCallCheck(this, Tabs);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  Tabs.prototype.handleClick = function handleClick(ev) {
    this.input.click();
  };

  Tabs.prototype.render = function render() {
    var _this2 = this;

    var isHidden = Object.keys(this.props.files).length === 0;
    var hasAcquirers = this.props.acquirers.length !== 0;

    if (!hasAcquirers) {
      return h(
        'div',
        { 'class': 'uppy-DashboardTabs', 'aria-hidden': isHidden },
        h(
          'div',
          { 'class': 'uppy-DashboardTabs-title' },
          h(ActionBrowseTagline, {
            acquirers: this.props.acquirers,
            handleInputChange: this.props.handleInputChange,
            i18n: this.props.i18n })
        )
      );
    }

    // empty value=""  on file input, so we can select same file
    // after removing it from Uppy — otherwise OS thinks it’s selected

    return h(
      'div',
      { 'class': 'uppy-DashboardTabs' },
      h(
        'ul',
        { 'class': 'uppy-DashboardTabs-list', role: 'tablist' },
        h(
          'li',
          { 'class': 'uppy-DashboardTab', role: 'presentation' },
          h(
            'button',
            { type: 'button',
              'class': 'uppy-DashboardTab-btn',
              role: 'tab',
              tabindex: '0',
              onclick: this.handleClick },
            localIcon(),
            h(
              'div',
              { 'class': 'uppy-DashboardTab-name' },
              this.props.i18n('myDevice')
            )
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
        ),
        this.props.acquirers.map(function (target) {
          return h(
            'li',
            { 'class': 'uppy-DashboardTab', role: 'presentation' },
            h(
              'button',
              { 'class': 'uppy-DashboardTab-btn',
                type: 'button',
                role: 'tab',
                tabindex: '0',
                'aria-controls': 'uppy-DashboardContent-panel--' + target.id,
                'aria-selected': _this2.props.activePanel.id === target.id,
                onclick: function onclick() {
                  return _this2.props.showPanel(target.id);
                } },
              target.icon(),
              h(
                'h5',
                { 'class': 'uppy-DashboardTab-name' },
                target.name
              )
            )
          );
        })
      )
    );
  };

  return Tabs;
}(Component);

module.exports = Tabs;
//# sourceMappingURL=Tabs.js.map