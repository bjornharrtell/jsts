const expect = require('expect.js')

const {
  Envelope, // 'org/locationtech/jts/geom/Envelope'
  WKTReader, // 'org/locationtech/jts/io/WKTReader'
} = require('../../../')

// import 'org/locationtech/jts/monkey'

describe('MultiPoint does not support getEnvelopeInternal (#232)', function () {
  var reader = new WKTReader()

  it('getEnvelopeInternal should work', function () {
    const mp = reader.read('MULTIPOINT ((10 10), (10 20), (20 20))')
    const result = mp.getEnvelopeInternal()
    const expected = new Envelope(10, 20, 10, 20)
    expect(result.equals(expected)).to.be(true)
  })

  it('test for covering Polygon should work', function () {
    const p = reader.read('POLYGON((10 10, 100 10, 100 100, 10 100, 10 10))')
    const mp = reader.read('MULTIPOINT ((10 10), (10 20), (20 20))')
    expect(p.covers(mp)).to.be(true)
  })
})
