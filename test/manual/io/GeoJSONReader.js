import expect from 'expect.js'

import GeoJSONReader from 'org/locationtech/jts/io/GeoJSONReader'

const reader = new GeoJSONReader()

describe('GeoJSONReader', function () {
  it('should be able to read a Point geometry', function () {
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
    const geometry = reader.read(feature)
  })

  it('should be able to read a LineString', function () {
    const lineString = {
      'type': 'LineString',
      'coordinates': [
        [102.0, 0.0], [103.0, 1.0], [104.0, 0.0], [105.0, 1.0]
      ]
    }
    const geometry = reader.read(lineString)
  })

  it('should be able to read a Polygon', function () {
    const polygon = {
      'type': 'Polygon',
      'coordinates': [
        [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0],
          [100.0, 1.0], [100.0, 0.0] ]
        ]
    }
    const geometry = reader.read(polygon)
  })
})
