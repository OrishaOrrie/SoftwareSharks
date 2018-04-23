
var extend = require('extend')
var interface = require('@request/interface')
var config = require('./config/methods')
var basic = require('./lib/basic')
var chain = require('./lib/chain')


module.exports = (options) => {

  var common = interface.common.reduce((obj, key) => {
    obj[key] = []
    return obj
  }, {})

  var methods = {}
  extend(true, methods, config, {option: common}, options.config)

  if (options.type === 'basic') {
    return basic(methods, options.define)
  }
  else if (options.type === 'chain') {
    return chain(methods, options.define)
  }
}
