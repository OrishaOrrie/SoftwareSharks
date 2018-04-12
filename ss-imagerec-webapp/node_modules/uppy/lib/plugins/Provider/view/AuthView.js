function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoaderView = require('./Loader');

var _require = require('preact'),
    h = _require.h,
    Component = _require.Component;

var AuthView = function (_Component) {
  _inherits(AuthView, _Component);

  function AuthView() {
    _classCallCheck(this, AuthView);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  AuthView.prototype.componentDidMount = function componentDidMount() {
    this.props.checkAuth();
  };

  AuthView.prototype.render = function render() {
    var _this2 = this;

    var AuthBlock = function AuthBlock() {
      return h(
        'div',
        { 'class': 'uppy-Provider-auth' },
        h(
          'h1',
          { 'class': 'uppy-Provider-authTitle' },
          'Please authenticate with ',
          h(
            'span',
            { 'class': 'uppy-Provider-authTitleName' },
            _this2.props.pluginName
          ),
          h('br', null),
          ' to select files'
        ),
        h(
          'button',
          { type: 'button', 'class': 'uppy-Provider-authBtn', onclick: _this2.props.handleAuth },
          'Connect to ',
          _this2.props.pluginName
        ),
        _this2.props.demo && h(
          'button',
          { 'class': 'uppy-Provider-authBtnDemo', onclick: _this2.props.handleDemoAuth },
          'Proceed with Demo Account'
        )
      );
    };

    return h(
      'div',
      { style: 'height: 100%;' },
      this.props.checkAuthInProgress ? LoaderView() : AuthBlock()
    );
  };

  return AuthView;
}(Component);

module.exports = AuthView;
//# sourceMappingURL=AuthView.js.map