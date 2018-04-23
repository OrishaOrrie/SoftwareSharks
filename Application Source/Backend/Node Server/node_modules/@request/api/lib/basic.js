
var dcopy = require('deep-copy')


module.exports = (config, define) => {
  var request = define.request

  function init (url, options, callback) {

    var opts = {}
    if (typeof options === 'object') {
      opts = dcopy(options)
    }
    else if (typeof url === 'object') {
      opts = dcopy(url)
    }

    var cb
    if (typeof callback === 'function') {
      cb = callback
    }
    else if (typeof options === 'function') {
      cb = options
    }

    opts.url = (typeof url === 'string') ? url : (opts.url || opts.uri)
    if (cb || opts.callback) {
      opts.callback = cb || opts.callback
    }

    return opts
  }

  function api (url, options, callback) {
    var opts = init(url, options, callback)
    return request(opts)
  }

  for (var key in config.method) {
    api[key] = ((key) => (url, options, callback) => {
      var opts = init(url, options, callback)
      opts.method = key.toUpperCase()
      return request(opts)
    })(key)
  }

  return api
}
