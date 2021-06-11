import expect from 'expect.js'

import Coordinate from 'jsts/org/locationtech/jts/geom/Coordinate'
import GeometryFactory from 'jsts/org/locationtech/jts/geom/GeometryFactory'
import OverlayOp from 'jsts/org/locationtech/jts/operation/overlay/OverlayOp'
import RelateOp from 'jsts/org/locationtech/jts/operation/relate/RelateOp'
import PrecisionModel from 'jsts/org/locationtech/jts/geom/PrecisionModel'
import WKTReader from 'jsts/org/locationtech/jts/io/WKTReader'
import WKTWriter from 'jsts/org/locationtech/jts/io/WKTWriter'

describe('OverlayOp', function () {
  it('intersection between GCs', function () {
    const factory = new GeometryFactory()
    const p1 = factory.createPoint(new Coordinate(1, 1))
    const gc1 = factory.createGeometryCollection([p1])
    const p2 = factory.createPoint(new Coordinate(1, 1))
    const gc2 = factory.createGeometryCollection([p2])
    const intersection = OverlayOp.intersection(gc1, gc2)

    expect(RelateOp.equalsTopo(intersection, p1)).to.be(true)
  })

  it('specific case', function() {
    const factory = new GeometryFactory(new PrecisionModel(1))
    const reader = new WKTReader(factory)
    const writer = new WKTWriter(factory)
    const a = reader.read('LINESTRING (240 190, 120 120)')
    const b = reader.read('POLYGON ((110 240, 50 80, 240 70, 110 240))')
    const r = OverlayOp.intersection(a, b)
    const rt = writer.write(r)
    expect('LINESTRING (177 153, 120 120)').to.equal(rt)
  })
})
