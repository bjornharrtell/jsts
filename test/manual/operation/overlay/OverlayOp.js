import expect from 'expect.js'

import Coordinate from 'org/locationtech/jts/geom/Coordinate'
import GeometryFactory from 'org/locationtech/jts/geom/GeometryFactory'
import OverlayOp from 'org/locationtech/jts/operation/overlay/OverlayOp'

describe('OverlayOp', function () {
  it('intersection between GCs', function () {
    const factory = new GeometryFactory()
    const p1 = factory.createPoint(new Coordinate(1, 1))
    const gc1 = factory.createGeometryCollection([p1])
    const p2 = factory.createPoint(new Coordinate(1, 1))
    const gc2 = factory.createGeometryCollection([p2])
    const intersection = OverlayOp.intersection(gc1, gc2)
    expect(intersection.equals(p1)).to.be(true)
  })
})
