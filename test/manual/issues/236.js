const expect = require('expect.js')

const {
  WKTReader // 'org/locationtech/jts/io/WKTReader'
} = require('../../../')

// import 'org/locationtech/jts/monkey'

describe('IsValid throws exception in some cases (#236)', function () {
  var reader = new WKTReader()

  it('isValid should not throw an exception for this Polygon', function () {
    const p = reader.read('POLYGON((460901 -33906,3961797 -2530706,2293179 -4841460,599984 -3210077,460901 -33906))')
    const valid = p.isValid()
    expect(valid).to.be(true)
  })
})
