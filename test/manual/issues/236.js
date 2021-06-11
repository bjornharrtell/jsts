import expect from 'expect.js'

import WKTReader from 'jsts/org/locationtech/jts/io/WKTReader'
import IsValidOp from 'jsts/org/locationtech/jts/operation/valid/IsValidOp'



describe('IsValid throws exception in some cases (#236)', function () {
  var reader = new WKTReader()

  it('isValid should not throw an exception for this Polygon', function () {
    const p = reader.read('POLYGON((460901 -33906,3961797 -2530706,2293179 -4841460,599984 -3210077,460901 -33906))')
    const valid = IsValidOp.isValid(p)
    expect(valid).to.be(true)
  })
})
