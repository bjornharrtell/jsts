import expect from 'expect.js'

import GeoJSONReader from 'org/locationtech/jts/io/GeoJSONReader'

describe('GeoJSONReader', function () {
  it('should be able to read a Point geometry', function () {
    const reader = new GeoJSONReader()
    reader.read({ type: 'Point', coordinates: [ 1.01, 1.02 ] })
  })

  it('should be able to read a Feature', function () {
    const feature = {
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [125.6, 10.1]
      },
      'properties': {
        'name': 'Dinagat Islands'
      }
    }

    const reader = new GeoJSONReader()
    const geometry = reader.read(feature)
  })
})
