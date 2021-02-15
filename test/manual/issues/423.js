import expect from 'expect.js'

import Coordinate from 'org/locationtech/jts/geom/Coordinate'
import GeometryFactory from 'org/locationtech/jts/geom/GeometryFactory'
import DistanceOp from 'org/locationtech/jts/operation/distance/DistanceOp'

describe('Test (#423)', function() {
  it('verify that nearestPoints works', function() {
    const factory = new GeometryFactory()
    const point = factory.createPoint(new Coordinate(0, 1))
    const line = factory.createLineString([new Coordinate(0, 0), new Coordinate(10, 10)])
    const result = DistanceOp.nearestPoints(line, point)
    expect(0.5).to.eql(result[0].x)
    expect(0.5).to.eql(result[0].y)
    expect(0).to.eql(result[1].x)
    expect(1).to.eql(result[1].y)
  })
})
