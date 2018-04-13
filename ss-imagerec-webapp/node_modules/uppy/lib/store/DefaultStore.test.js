var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var DefaultStore = require('./DefaultStore');

describe('DefaultStore', function () {
  it('can be created with or without new', function () {
    var store = DefaultStore();
    expect(typeof store === 'undefined' ? 'undefined' : _typeof(store)).toBe('object');
    store = new DefaultStore();
    expect(typeof store === 'undefined' ? 'undefined' : _typeof(store)).toBe('object');
  });

  it('merges in state using `setState`', function () {
    var store = DefaultStore();
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

    var store = DefaultStore();
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
});
//# sourceMappingURL=DefaultStore.test.js.map