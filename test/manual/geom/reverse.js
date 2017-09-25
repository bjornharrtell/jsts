// import expect from 'expect.js'

const {
  WKTReader // 'org/locationtech/jts/io/WKTReader'
} = require('../../../')

const reader = new WKTReader()

describe('Geometry', function () {
  describe('reverse', function () {
    it('should be able to reverse a LineString', function () {
      const linestring = reader.read('LINESTRING(1 1,2 2)')
      linestring.reverse()
    })
  })
})
