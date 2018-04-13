var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var Core = require('./index');

describe('core/index', function () {
  it('should expose the uppy core as the default export', function () {
    expect(typeof Core === 'undefined' ? 'undefined' : _typeof(Core)).toEqual('function');
    var core = new Core({});
    expect(typeof core === 'undefined' ? 'undefined' : _typeof(core)).toEqual('object');
    expect(core.constructor.name).toEqual('Uppy');
  });
});
//# sourceMappingURL=index.test.js.map