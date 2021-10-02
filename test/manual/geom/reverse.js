// import expect from 'expect.js'

import WKTReader from '../../../src/org/locationtech/jts/io/WKTReader.js'

const reader = new WKTReader()

describe('Geometry', function() {
  describe('reverse', function() {
    it('should be able to reverse a LineString', function() {
      const linestring = reader.read('LINESTRING(1 1,2 2)')
      linestring.reverse()
    })
  })
})
