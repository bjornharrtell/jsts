import expect from 'expect.js'

import Coordinate from 'org/locationtech/jts/geom/Coordinate'
import GeometryFactory from 'org/locationtech/jts/geom/GeometryFactory'
import WKTReader from 'org/locationtech/jts/io/WKTReader'
import LineMerger from 'org/locationtech/jts/operation/linemerge/LineMerger'

describe('LineMerger', function () {
  it('#373', function () {
    const reader = new WKTReader()
    const ls1 = reader.read('LINESTRING(0 0, 1 1)')
    const ls2 = reader.read('LINESTRING(1 1, 2 2)')
    const lineMerger = new LineMerger()
    lineMerger.add(ls1)
    lineMerger.add(ls2)
    lineMerger.merge()
    //const intersection = OverlayOp.intersection(gc1, gc2)
    //expect(intersection.equals(p1)).to.be(true)
  })
})
