import expect from 'expect.js'

import WKTReader from 'org/locationtech/jts/io/WKTReader'

describe('ConvexHull much slower (#234)', function () {
  var reader = new WKTReader()

  it('isValid should not fail', function () {
    const p = reader.read('POLYGON((460901.19200082554 -33906.696118606975,3961797.469018929 -2530706.105361609,2293179.400371934 -4841460.21827416,599984.6734172448 -3210077.352238564,460901.19200082554 -33906.696118606975))')
    const valid = p.isValid()
    expect(valid).to.be(true)
  })
})
