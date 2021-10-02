import expect from 'expect.js'

import Coordinate from '../../../src/org/locationtech/jts/geom/Coordinate.js'
import GeometryFactory from '../../../src/org/locationtech/jts/geom/GeometryFactory.js'
import WKTWriter from '../../../src/org/locationtech/jts/io/WKTWriter.js'

describe('WKTWriter', function() {
  it('should be able to create a LINESTRING from two points', function() {
    const p0 = { x: 10.0, y: 20.0 }
    const p1 = { x: 30.0, y: 40.0 }
    const p2 = { x: 10.123, y: 20.234 }
    const p3 = { x: 30.524, y: 40.944 }
    let lineString = WKTWriter.toLineString(p0, p1)
    expect(lineString).to.eql('LINESTRING ( 10 20, 30 40 )')

    lineString = WKTWriter.toLineString(p2, p3)
    expect(lineString).to.eql('LINESTRING ( 10.123 20.234, 30.524 40.944 )')
  })

  it('should be able to create a LINESTRING from two points with Z', function() {
    const factory = new GeometryFactory()
    const cs = [
      new Coordinate(1, 2, 3),
      new Coordinate(2, 3, 4)
    ]
    const ls = factory.createLineString(cs)
    const wkt = new WKTWriter().write(ls)
    expect(wkt).to.eql('LINESTRING Z (1 2 3, 2 3 4)')
  })

  it('should be able to create a LINESTRING from two points with zero Z', function() {
    const factory = new GeometryFactory()
    const cs = [
      new Coordinate(1, 2, 0),
      new Coordinate(2, 3, 0)
    ]
    const ls = factory.createLineString(cs)
    const wkt = new WKTWriter().write(ls)
    expect(wkt).to.eql('LINESTRING Z (1 2 0, 2 3 0)')
  })

  it('should be able to create a POINT with Z', function() {
    const factory = new GeometryFactory()
    const p = factory.createPoint(new Coordinate(1, 1, 1))
    const wkt = new WKTWriter().write(p)
    expect(wkt).to.eql('POINT Z (1 1 1)')
  })

  it('should be able to create a POINT with zero Z', function() {
    const factory = new GeometryFactory()
    const p = factory.createPoint(new Coordinate(1, 1, 0))
    const wkt = new WKTWriter().write(p)
    expect(wkt).to.eql('POINT Z (1 1 0)')
  })
})
