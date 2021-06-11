import expect from 'expect.js'

import GeoJSONReader from 'jsts/org/locationtech/jts/io/GeoJSONReader'
import WKTWriter from 'jsts/org/locationtech/jts/io/WKTWriter'

const reader = new GeoJSONReader()
const writer = new WKTWriter()

describe('GeoJSONReader', function() {
  it('should be able to read a Point geometry', function() {
    reader.read({ type: 'Point', coordinates: [ 1.01, 1.02 ] })
  })

  it('should be able to read a Feature', function() {
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
    reader.read(feature)
  })

  it('should be able to read a LineString', function() {
    const lineString = {
      'type': 'LineString',
      'coordinates': [
        [102.0, 0.0], [103.0, 1.0], [104.0, 0.0], [105.0, 1.0]
      ]
    }
    reader.read(lineString)
  })

  it('should be able to read a Polygon', function() {
    const polygon = {
      'type': 'Polygon',
      'coordinates': [
        [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0],
          [100.0, 1.0], [100.0, 0.0] ]
      ]
    }
    const g = reader.read(polygon)
    const wkt = writer.write(g)
    expect(wkt).to.equal('POLYGON ((100 0, 101 0, 101 1, 100 1, 100 0))')
  })

  it('should be able to read a 3D Polygon', function() {
    const polygon = {
      'type': 'Polygon',
      'coordinates': [
        [ [100.0, 0.0, 1.1], [101.0, 0.0, 1.1], [101.0, 1.0, 1.1],
          [100.0, 1.0, 1.1], [100.0, 0.0, 1.1] ]
      ]
    }
    const g = reader.read(polygon)
    const wkt = writer.write(g)
    expect(wkt).to.equal('POLYGON Z ((100 0 1.1, 101 0 1.1, 101 1 1.1, 100 1 1.1, 100 0 1.1))')
  })

  it('should be able to read a 3D Point', function() {
    const point = {
      'type': 'Point',
      'coordinates': [1, 1, 1]
    }
    const g = reader.read(point)
    const wkt = writer.write(g)
    expect(wkt).to.equal('POINT Z (1 1 1)')
  })
})
