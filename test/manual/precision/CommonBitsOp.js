import expect from 'expect.js'

import WKTReader from '../../../src/org/locationtech/jts/io/WKTReader.js'
import CommonBitsOp from '../../../src/org/locationtech/jts/precision/CommonBitsOp.js'
import GeometryFactory from '../../../src/org/locationtech/jts/geom/GeometryFactory.js'
import PrecisionModel from '../../../src/org/locationtech/jts/geom/PrecisionModel.js'
import OverlayOp from '../../../src/org/locationtech/jts/operation/overlay/OverlayOp.js'

describe('CommonBitsOp', function() {
  var pm = new PrecisionModel( 1e20 )
  var gf = new GeometryFactory( pm )
  var wkt1 = 'POLYGON ((210 210, 210 220, 220 220, 220 210, 210 210))'
  var wkt2 = 'POLYGON ((225 225, 225 215, 215 215, 215 225, 225 225))'

  var readerF = new WKTReader(gf)
  var reader = new WKTReader()
  var g1 = readerF.read(wkt1)
  var g2 = reader.read(wkt2)
    
  var cbo = new CommonBitsOp(true)

  it('Tests an issue where CommonBitsRemover was not persisting changes to some kinds of CoordinateSequences', function() {
    var res = cbo.intersection(g1, g2)
    var expected = OverlayOp.intersection(g1, g2)
    //expected = read("POLYGON ((220 215, 215 215, 215 220, 220 220, 220 215))");
    var result = res.norm().equalsExact(expected.norm())
    expect(result).to.be.true
  })
})
