import expect from 'expect.js'

import WKTReader from '../../../src/org/locationtech/jts/io/WKTReader.js'
import MaximumInscribedCircle from '../../../src/org/locationtech/jts/algorithm/construct/MaximumInscribedCircle.js'

describe('Test (#516)', function() {
  it('MaximumInscribedCircle basic test', function() {
    const reader = new WKTReader()
    const input = 'POLYGON((10 10, 100 10, 100 100, 10 100, 10 10))'
    const p = reader.read(input)
    const result = MaximumInscribedCircle.getCenter(p, 1)
    expect(result).to.equal(false)
  })
})
