import expect from 'expect.js'

import WKTReader from 'org/locationtech/jts/io/WKTReader'
import GeoJSONWriter from 'org/locationtech/jts/io/GeoJSONWriter'
import Coordinate from 'org/locationtech/jts/geom/Coordinate'
import GeometryFactory from 'org/locationtech/jts/geom/GeometryFactory'

describe('GeoJSONWriter', function () {
  it('should be able to convert a Point geometry', function () {
    const factory = new GeometryFactory()
    const point = factory.createPoint(new Coordinate(1.01, 1.02))
    const writer = new GeoJSONWriter()
    const geojson = writer.write(point)
    expect(geojson).to.eql({ type: 'Point', coordinates: [ 1.01, 1.02 ] })
  })

  it('should be able to convert a Polygon geometry', function () {
    const reader = new WKTReader()
    const polygon = reader.read('POLYGON((10 10, 100 10, 100 100, 10 100, 10 10))')
    const writer = new GeoJSONWriter()
    const geojson = writer.write(polygon)
    expect(geojson).to.eql({ type: 'Polygon', coordinates: [[[10, 10], [100, 10], [100, 100], [10, 100], [10, 10]]] })
  })

  it('should be able to convert a GeometryCollection geometry', function () {
    const reader = new WKTReader()
    const gc = reader.read('GEOMETRYCOLLECTION(POINT(4 6),LINESTRING(4 6,7 10))')
    const writer = new GeoJSONWriter()
    const geojson = writer.write(gc)
    expect(geojson).to.eql({ type: 'GeometryCollection', geometries: [ {
      type: 'Point', coordinates: [4, 6]
    }, {
      type: 'LineString', coordinates: [[4, 6], [7, 10]] }
    ] })
  })
})
