import expect from 'expect.js'

import Coordinate from 'jsts/org/locationtech/jts/geom/Coordinate'
import GeometryFactory from 'jsts/org/locationtech/jts/geom/GeometryFactory'
//import OverlayNG from 'jsts/org/locationtech/jts/operation/overlayng/OverlayNG'
import RelateOp from 'jsts/org/locationtech/jts/operation/relate/RelateOp'

import WKTWriter from 'jsts/org/locationtech/jts/io/WKTWriter'

/*
describe('OverlayNG', function () {
  it('intersection between points', function () {
    const factory = new GeometryFactory()
    const p1 = factory.createPoint(new Coordinate(1, 1))
    const p2 = factory.createPoint(new Coordinate(1, 1))
    const intersection = OverlayNG.overlay(p1, p2, OverlayNG.INTERSECTION)

    console.log(new WKTWriter().write(p1))
    console.log(new WKTWriter().write(intersection))

    expect(RelateOp.equalsTopo(intersection, p1)).to.be(true)
  })

  it('intersection between GCs', function () {
    const factory = new GeometryFactory()
    const p1 = factory.createPoint(new Coordinate(1, 1))
    const gc1 = factory.createGeometryCollection([p1])
    const p2 = factory.createPoint(new Coordinate(1, 1))
    const gc2 = factory.createGeometryCollection([p2])
    const intersection = OverlayNG.overlay(gc1, gc2, OverlayNG.INTERSECTION)

    console.log(new WKTWriter().write(p1))
    console.log(new WKTWriter().write(intersection))
    //const intersection = OverlayOp.intersection(gc1, gc2)

    expect(RelateOp.equalsTopo(intersection, p1)).to.be(true)
  })
})
*/