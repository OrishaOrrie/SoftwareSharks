/**
 * The test-setu.spec.js file defines the environment to enable 
 * unit tests
 * 
 * @author Software Sharks
 * @version 1.0
 * @since 2018-04-23
 */

const sinon = require('sinon')
const chai = require('chai')

beforeEach(function () {
  this.sandbox = sinon.sandbox.create()
})

afterEach(function () {
  this.sandbox.restore()
})