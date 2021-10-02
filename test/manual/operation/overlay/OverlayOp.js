import expect from 'expect.js'

import Coordinate from '../../../../src/org/locationtech/jts/geom/Coordinate.js'
import GeometryFactory from '../../../../src/org/locationtech/jts/geom/GeometryFactory.js'
import OverlayOp from '../../../../src/org/locationtech/jts/operation/overlay/OverlayOp.js'
import RelateOp from '../../../../src/org/locationtech/jts/operation/relate/RelateOp.js'
import PrecisionModel from '../../../../src/org/locationtech/jts/geom/PrecisionModel.js'
import WKTReader from '../../../../src/org/locationtech/jts/io/WKTReader.js'
import WKTWriter from '../../../../src/org/locationtech/jts/io/WKTWriter.js'

describe('OverlayOp', function() {
  it('intersection between GCs', function() {
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
