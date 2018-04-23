
module.exports = (config, define) => {

  var wrap = {
    method: function (key) {
      return (value) => {
        var self
        if (!this._options) {
          var api = init()
          api._options = {}
          self = api
        }
        else {
          self = this
        }
        self._options.method = key.toUpperCase()
        self._options.url = value || ''
        return self
      }
    },
    option: function (key) {
      return (value) => {
        var self
        if (!this._options) {
          var api = init()
          api._options = {}
          self = api
        }
        else {
          self = this
        }
        self._options[key] = value
        return self
      }
    },
    custom: function (key) {
      return function () {
        var self
        if (!this._options) {
          var api = init()
          api._options = {}
          self = api
        }
        else {
          self = this
        }

        var args = Array.prototype.slice.call(arguments)
        args.splice(0, 0, self._options)

        var result = define[key].apply(null, args)
        return result || self
      }
    }
  }

  function init () {
    var api = {}

    for (var type in config) {
      for (var method in config[type]) {
        api[method] = wrap[type].call(api, method)

        config[type][method].forEach((alias) => {
          api[alias] = wrap[type].call(api, method)
        })
      }
    }

    return api
  }

  return init()
}
