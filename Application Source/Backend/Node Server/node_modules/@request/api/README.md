
# @request/api

[![npm-version]][npm] [![travis-ci]][travis] [![coveralls-status]][coveralls]


## Table of Contents

- [Options](#options)
- [Basic API](#basic-api)
- [Chain API](#chain-api)
- [Chain API Config](#chain-api-config)
- [Promises](#promises)


## Options

```js
var api = require('@request/api')
var request = api({
  // required
  type: 'basic', // or 'chain'
  // required
  define: {
    // HTTP request function
    // that accepts @request/interface options object
    request: require('@request/client')
  },
  // optional
  config: {
    // define your own methods and method aliases
  }
})
```


## Basic API

```js
request('url')
request({options})
request('url', function callback (err, res, body) {})
request({options}, function callback (err, res, body) {})
request('url', {options}, function callback (err, res, body) {})

request.[HTTP_VERB]('url')
request.[HTTP_VERB]({options})
request.[HTTP_VERB]('url', function callback (err, res, body) {})
request.[HTTP_VERB]({options}, function callback (err, res, body) {})
request.[HTTP_VERB]('url', {options}, function callback (err, res, body) {})
```

```js
var api = require('@request/api')
var client = require('@request/client')

var request = api({
  type: 'basic',
  define: {
    request: client
  }
})

// GET http://localhost:6767?a=1
request.get('http://localhost:6767', {qs: {a: 1}}, (err, res, body) => {
  // request callback
})
```


## Chain API

```js
var api = require('@request/api')
var client = require('@request/client')

var request = api({
  type: 'chain',
  define: {
    request: client
  }
})

// GET http://localhost:6767?a=1
request
  .get('http://localhost:6767')
  .qs({a: 1})
  .callback((err, res, body) => {
    // request callback
  })
  .request()
```


## Chain API Config

```js
var api = require('@request/api')
var client = require('@request/client')

var request = api({
  type: 'chain',
  // API methods configuration
  config: {
    // HTTP methods
    method: {
      get: ['select'], // list of aliases
      // ...
    },
    // @request/interface option methods
    option: {
      qs: ['where'], // list of aliases
      // ...
    },
    // custom methods
    custom: {
      request: ['fetch', 'snatch', 'submit'], // list of aliases
      // ...
    }
  },
  // custom methods implementation
  define: {
    // `options` is always prepended as first argument
    // any other custom arguments follows after that
    request: (options, callback) => {
      if (callback) {
        // `options` contains the generated options object
        options.callback = callback
      }
      // omit the return value if you want to chain further
      return client(options)
    }
  }
})

// GET http://localhost:6767?a=1
request
  .select('http://localhost:6767')
  .where({a: 1})
  .fetch((err, res, body) => {
    // request callback
  })
```


## Promises

```js
var api = require('@request/api')
var client = require('@request/client')

function wrap (options) {
  var promise = new Promise((resolve, reject) => {
    options.callback = (err, res, body) => {
      ;(err) ? reject(err) : resolve([res, body])
    }
  })
  client(options)
  return promise
}
```

```js
var request = api({
  type: 'basic',
  define: {
    request: wrap
  }
})
// GET http://localhost:6767?a=1
request.get('http://localhost:6767', {qs: 1})
  .catch((err) => {})
  .then((result) => {})
```

```js
var request = api({
  type: 'chain',
  define: {
    request: wrap
  }
})
// GET http://localhost:6767?a=1
request
  .get('http://localhost:6767')
  .qs({a: 1})
  .request()
  .catch((err) => ())
  .then((result) => ())
```


  [npm-version]: http://img.shields.io/npm/v/@request/api.svg?style=flat-square (NPM Version)
  [travis-ci]: https://img.shields.io/travis/request/api/master.svg?style=flat-square (Build Status)
  [coveralls-status]: https://img.shields.io/coveralls/request/api.svg?style=flat-square (Test Coverage)

  [npm]: https://www.npmjs.org/package/@request/api
  [travis]: https://travis-ci.org/request/api
  [coveralls]: https://coveralls.io/r/request/api?branch=master
