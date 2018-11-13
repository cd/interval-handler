/* global it, describe */

const intervalHandler = require('../interval-handler')
const assert = require('assert')

describe('Interval Handler Object', function () {
  it('should be an object', function () {
    assert.strictEqual(typeof intervalHandler(), 'object')
  })
})
