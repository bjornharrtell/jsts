import expect from 'expect.js'

import WKTReader from '../../../src/org/locationtech/jts/io/WKTReader.js'
import Coordinate from '../../../src/org/locationtech/jts/geom/Coordinate.js'
import GeometryFactory from '../../../src/org/locationtech/jts/geom/GeometryFactory.js'
import PrecisionModel from '../../../src/org/locationtech/jts/geom/PrecisionModel.js'
import GeometryPrecisionReducer from '../../../src/org/locationtech/jts/precision/GeometryPrecisionReducer.js'


describe('GeometryPrecisionReducer', function() {
  const pm0 = new PrecisionModel()
  const pm1 = new PrecisionModel(1.0)
  const reducer = new GeometryPrecisionReducer(pm1)
  const reducerKeepCollapse = new GeometryPrecisionReducer(pm1)
  const factory0 = new GeometryFactory(pm0, 0)
  const factory1 = new GeometryFactory()
  const reader = new WKTReader(factory0)
  reducerKeepCollapse.setRemoveCollapsedComponents(false)

  it('should be able to reduce a Point', function() {
    const point = factory1.createPoint(new Coordinate(1.01, 1.02))
    const reduced = reducer.reduce(point)
    const expected = factory1.createPoint(new Coordinate(1, 1))
    expect(reduced.equalsExact(expected)).to.be(true)
  })

  it('should be able to reduce a Point (v2)', function() {
    checkReduce('POINT ( 1.1 4.9 )',
      'POINT (1 5)')
  })

  it('should be able to reduce a Line', function() {
    checkReduce('LINESTRING ( 0 0, 0 1.4 )',
      'LINESTRING (0 0, 0 1)')
  })

  it('should be able to reduce a Line not noded', function() {
    checkReduce('LINESTRING(1 1, 3 3, 9 9, 5.1 5, 2.1 2)',
      'LINESTRING(1 1, 3 3, 9 9, 5 5, 2 2)')
  })

  it('should be able to reduce a Line to collapse', function() {
    checkReduce('LINESTRING ( 0 0, 0 .4 )',
      'LINESTRING EMPTY')
  })

  it('should be able to reduce a Line keep to collapse', function() {
    checkReduce('LINESTRING ( 0 0, 0 .4 )',
      'LINESTRING ( 0 0, 0 0 )',
      reducerKeepCollapse)
  })

  it('should be able to reduce a Square', function() {
    checkReduce('POLYGON (( 0 0, 0 1.4, 1.4 1.4, 1.4 0, 0 0 ))',
      'POLYGON (( 0 0, 0 1, 1 1, 1 0, 0 0 ))')
  })

  it('should be able to reduce a Square tiny to collapse', function() {
    checkReduce('POLYGON (( 0 0, 0 .4, .4 .4, .4 0, 0 0 ))',
      'POLYGON EMPTY')
  })

  it('should be able to reduce a Square to collapse', function() {
    checkReduce('POLYGON (( 0 0, 0 1.4, .4 .4, .4 0, 0 0 ))',
      'POLYGON EMPTY')
  })

  it('should be able to reduce a Square keep to collapse', function() {
    checkReduce('POLYGON (( 0 0, 0 1.4, .4 .4, .4 0, 0 0 ))',
      'POLYGON EMPTY')
  })

  it('should be able to reduce a MultiPoint', function() {
    checkReduce('MULTIPOINT( (1.1 4.9),(1.2 4.8), (3.3 6.6))',
      'MULTIPOINT((1 5), (1 5), (3 7))')
  })

  it('should be able to reduce a Polygon to collapse line', function() {
    checkReduce('POLYGON ((10 10, 100 100, 200 10.1, 300 10, 10 10))',
      'POLYGON ((10 10, 100 100, 200 10, 10 10))')
  })

  it('should be able to reduce a GeometryCollection', function() {
    checkReduce('GEOMETRYCOLLECTION (POINT (1.1 2.2), MULTIPOINT ((1.1 2), (3.1 3.9)), LINESTRING (1 2.1, 3 3.9), MULTILINESTRING ((1 2, 3 4), (5 6, 7 8)), POLYGON ((2 2, -2 2, -2 -2, 2 -2, 2 2), (1 1, 1 -1, -1 -1, -1 1, 1 1)), MULTIPOLYGON (((2 2, -2 2, -2 -2, 2 -2, 2 2), (1 1, 1 -1, -1 -1, -1 1, 1 1)), ((7 2, 3 2, 3 -2, 7 -2, 7 2))))',
      'GEOMETRYCOLLECTION (POINT (1 2),     MULTIPOINT ((1 2), (3 4)),       LINESTRING (1 2, 3 4),     MULTILINESTRING ((1 2, 3 4), (5 6, 7 8)), POLYGON ((2 2, -2 2, -2 -2, 2 -2, 2 2), (1 1, 1 -1, -1 -1, -1 1, 1 1)), MULTIPOLYGON (((2 2, -2 2, -2 -2, 2 -2, 2 2), (1 1, 1 -1, -1 -1, -1 1, 1 1)), ((7 2, 3 2, 3 -2, 7 -2, 7 2))))')
  })

  function checkReduce(wkt, wktExpected, _reducer) {
    _reducer = _reducer || reducer
    const g = reader.read(wkt)
    const expected = reader.read(wktExpected)
    const actual = _reducer.reduce(g)
    const eqGeom = actual.norm().equalsExact(expected.norm())
    const eqFactory = expected.getFactory() == expected.getFactory()
    expect(eqGeom && eqFactory).to.be(true)
  }
})
