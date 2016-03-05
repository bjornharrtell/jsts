import expect from 'expect.js'

import Coordinate from 'org/locationtech/jts/geom/Coordinate'
import GeometryFactory from 'org/locationtech/jts/geom/GeometryFactory'
import DistanceOp from 'org/locationtech/jts/operation/distance/DistanceOp'

describe('DistanceOp', function () {
  it('should be able calculate the distance between two points', function () {
    const factory = new GeometryFactory()
    const p1 = factory.createPoint(new Coordinate(1, 1))
    const p2 = factory.createPoint(new Coordinate(2, 2))
    const distance = DistanceOp.distance(p1, p2)
    expect(distance).to.be(1.4142135623730951)
  })
})
