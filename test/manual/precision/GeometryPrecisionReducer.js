const expect = require('expect.js')

const {
  Coordinate, // 'org/locationtech/jts/geom/Coordinate'
  GeometryFactory, // 'org/locationtech/jts/geom/GeometryFactory'
  PrecisionModel, // 'org/locationtech/jts/geom/PrecisionModel'
  GeometryPrecisionReducer, // 'org/locationtech/jts/precision/GeometryPrecisionReducer'
} = require('../../../')

// import 'org/locationtech/jts/monkey'

describe('GeometryPrecisionReducer', function () {
  it('should be able to reduce a Point', function () {
    const factory = new GeometryFactory()
    const point = factory.createPoint(new Coordinate(1.01, 1.02))
    const pm = new PrecisionModel(1.0)
    const reducer = new GeometryPrecisionReducer(pm)
    const reduced = reducer.reduce(point)
    const expected = factory.createPoint(new Coordinate(1, 1))
    expect(reduced.equalsExact(expected)).to.be(true)
  })
})
