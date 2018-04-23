var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cuid = require('cuid');

// Redux action name.
var STATE_UPDATE = 'uppy/STATE_UPDATE';

// Pluck Uppy state from the Redux store in the default location.
var defaultSelector = function defaultSelector(id) {
  return function (state) {
    return state.uppy[id];
  };
};

/**
 * Redux store.
 *
 * @param {object} opts.store - The Redux store to use.
 * @param {string} opts.id - This store instance's ID. Defaults to a random string.
 *    If you need to access Uppy state through Redux, eg. to render custom UI, set this to something constant.
 * @param {function} opts.selector - Function, `(state) => uppyState`, to pluck state from the Redux store.
 *    Defaults to retrieving `state.uppy[opts.id]`. Override if you placed Uppy state elsewhere in the Redux store.
 */

var ReduxStore = function () {
  function ReduxStore(opts) {
    _classCallCheck(this, ReduxStore);

    this._store = opts.store;
    this._id = opts.id || cuid();
    this._selector = opts.selector || defaultSelector(this._id);

    // Initialise the `uppy[id]` state key.
    this.setState({});
  }

  ReduxStore.prototype.setState = function setState(patch) {
    this._store.dispatch({
      type: STATE_UPDATE,
      id: this._id,
      payload: patch
    });
  };

  ReduxStore.prototype.getState = function getState() {
    return this._selector(this._store.getState());
  };

  ReduxStore.prototype.subscribe = function subscribe(cb) {
    var _this = this;

    var prevState = this.getState();
    return this._store.subscribe(function () {
      var nextState = _this.getState();
      if (prevState !== nextState) {
        var patch = getPatch(prevState, nextState);
        cb(prevState, nextState, patch);
        prevState = nextState;
      }
    });
  };

  return ReduxStore;
}();

function getPatch(prev, next) {
  var nextKeys = Object.keys(next);
  var patch = {};
  nextKeys.forEach(function (k) {
    if (prev[k] !== next[k]) patch[k] = next[k];
  });
  return patch;
}

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  if (action.type === STATE_UPDATE) {
    var _extends2;

    var newState = _extends({}, state[action.id], action.payload);
    return _extends({}, state, (_extends2 = {}, _extends2[action.id] = newState, _extends2));
  }
  return state;
}

function middleware() {
  // Do nothing, at the moment.
  return function () {
    return function (next) {
      return function (action) {
        next(action);
      };
    };
  };
}

module.exports = function createReduxStore(opts) {
  return new ReduxStore(opts);
};

module.exports.STATE_UPDATE = STATE_UPDATE;
module.exports.reducer = reducer;
module.exports.middleware = middleware;
//# sourceMappingURL=ReduxStore.js.map