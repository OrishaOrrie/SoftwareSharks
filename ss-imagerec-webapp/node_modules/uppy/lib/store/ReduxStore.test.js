var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var ReduxStore = require('./ReduxStore');
var Redux = require('redux');

describe('ReduxStore', function () {
  function createStore() {
    var reducers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var reducer = Redux.combineReducers(_extends({}, reducers, {
      uppy: ReduxStore.reducer
    }));
    return Redux.createStore(reducer);
  }

  it('can be created with or without new', function () {
    var r = createStore();
    var store = ReduxStore({ store: r });
    expect(typeof store === 'undefined' ? 'undefined' : _typeof(store)).toBe('object');
    store = new ReduxStore({ store: r });
    expect(typeof store === 'undefined' ? 'undefined' : _typeof(store)).toBe('object');
  });

  it('merges in state using `setState`', function () {
    var r = createStore();
    var store = ReduxStore({ store: r });
    expect(store.getState()).toEqual({});

    store.setState({
      a: 1,
      b: 2
    });
    expect(store.getState()).toEqual({ a: 1, b: 2 });

    store.setState({ b: 3 });
    expect(store.getState()).toEqual({ a: 1, b: 3 });
  });

  it('notifies subscriptions when state changes', function () {
    var expected = [];
    var calls = 0;
    function listener(prevState, nextState, patch) {
      calls++;
      expect([prevState, nextState, patch]).toEqual(expected);
    }

    var r = createStore();
    var store = ReduxStore({ store: r });
    store.subscribe(listener);

    expected = [{}, { a: 1, b: 2 }, { a: 1, b: 2 }];
    store.setState({
      a: 1,
      b: 2
    });

    expected = [{ a: 1, b: 2 }, { a: 1, b: 3 }, { b: 3 }];
    store.setState({ b: 3 });

    expect(calls).toBe(2);
  });

  it('fires `subscribe` if state is modified externally (eg redux devtools)', function () {
    var _uppy;

    var reducer = Redux.combineReducers({ uppy: ReduxStore.reducer });
    var r = Redux.createStore(function (state, action) {
      // Add a `SET` action that can change Uppy state without going through the Uppy reducer or action creator.
      // Emulates Redux Devtools.
      if (action.type === 'SET') return action.payload;
      return reducer(state, action);
    });

    var expected = [];
    var calls = 0;
    function listener(prevState, nextState, patch) {
      calls++;
      expect([prevState, nextState, patch]).toEqual(expected);
    }

    var store = ReduxStore({ store: r });
    store.subscribe(listener);

    expected = [{}, { a: 1 }, { a: 1 }];
    store.setState({ a: 1 });

    expected = [{ a: 1 }, { b: 2 }, { b: 2 }];
    // redux-devtools's `JUMP_TO_STATE` is similar to this.
    r.dispatch({
      type: 'SET',
      payload: {
        uppy: (_uppy = {}, _uppy[store._id] = { b: 2 }, _uppy)
      }
    });

    expect(calls).toBe(2);
  });

  it('can mount in a custom state key', function () {
    var reducer = Redux.combineReducers({
      hello: ReduxStore.reducer
    });
    var r = Redux.createStore(reducer);
    var store = ReduxStore({
      store: r,
      id: 'world',
      selector: function selector(state) {
        return state.hello.world;
      }
    });
    store.setState({ a: 1 });

    expect(r.getState()).toEqual({
      hello: {
        world: {
          a: 1
        }
      }
    });
  });
});
//# sourceMappingURL=ReduxStore.test.js.map