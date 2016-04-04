import expect from 'expect.js'

import GeoJSONReader from 'org/locationtech/jts/io/GeoJSONReader'

describe('GeoJSONReader', function () {
  it('should be able to read a Point geometry', function () {
    const reader = new GeoJSONReader()
    reader.read({ type: 'Point', coordinates: [ 1.01, 1.02 ] })
  })
})
