import expect from 'expect.js'

import WKTReader from '../../../src/org/locationtech/jts/io/WKTReader.js'
import GeoJSONWriter from '../../../src/org/locationtech/jts/io/GeoJSONWriter.js'
import OLParser from '../../../src/org/locationtech/jts/io/OLParser.js'
import Coordinate from '../../../src/org/locationtech/jts/geom/Coordinate.js'
import GeometryFactory from '../../../src/org/locationtech/jts/geom/GeometryFactory.js'

describe('OLParser', function() {
  it('should be able to convert a Point geometry', function() {
    const factory = new GeometryFactory()
    const point = factory.createPoint(new Coordinate(1.01, 1.02))
    const parser = new OLParser()
    const olPoint = parser.write(point)
    const jstsPoint = parser.read(olPoint)
    const writer = new GeoJSONWriter()
    const geojson = writer.write(jstsPoint)
    expect(geojson).to.eql({ type: 'Point', coordinates: [ 1.01, 1.02 ] })
  })

  it('should be able to convert a 3D Point geometry', function() {
    const factory = new GeometryFactory()
    const point = factory.createPoint(new Coordinate(1.01, 1.02, 1.03))
    const parser = new OLParser(factory, 'XYZ')
    const olPoint = parser.write(point)
    const jstsPoint = parser.read(olPoint)
    const writer = new GeoJSONWriter()
    const geojson = writer.write(jstsPoint)
    expect(geojson).to.eql({ type: 'Point', coordinates: [ 1.01, 1.02, 1.03 ] })
  })

  it('should be able to convert a 3D LineString geometry', function() {
    const factory = new GeometryFactory()
    const point = factory.createLineString([new Coordinate(1.01, 1.02, 1.03), new Coordinate(2.01, 2.02, 2.03)])
    const parser = new OLParser(factory, 'XYZ')
    const olPoint = parser.write(point)
    const jstsPoint = parser.read(olPoint)
    const writer = new GeoJSONWriter()
    const geojson = writer.write(jstsPoint)
    expect(geojson).to.eql({ type: 'LineString', coordinates: [[1.01, 1.02, 1.03], [2.01, 2.02, 2.03]] })
  })

  it('should be able to convert a Polygon geometry', function() {
    const reader = new WKTReader()
    const polygon = reader.read('POLYGON ((10 10, 100 10, 100 100, 10 100, 10 10))')
    const parser = new OLParser()
    const olPolygon = parser.write(polygon)
    const jstsPolygon = parser.read(olPolygon)
    const writer = new GeoJSONWriter()
    const geojson = writer.write(jstsPolygon)
    expect(geojson).to.eql({ type: 'Polygon', coordinates: [[[10, 10], [100, 10], [100, 100], [10, 100], [10, 10]]] })
  })

  it('should be able to convert a GeometryCollection geometry', function() {
    const reader = new WKTReader()
    const gc = reader.read('GEOMETRYCOLLECTION(POINT(4 6),LINESTRING(4 6,7 10))')
    const parser = new OLParser()
    const olGc = parser.write(gc)
    const jstsGc = parser.read(olGc)
    const writer = new GeoJSONWriter()
    const geojson = writer.write(jstsGc)
    expect(geojson).to.eql({ type: 'GeometryCollection',
      geometries: [ {
        type: 'Point', coordinates: [4, 6]
      }, {
        type: 'LineString', coordinates: [[4, 6], [7, 10]]
      } ] })
  })
})
