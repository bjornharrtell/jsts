import expect from 'expect.js'

import WKTReader from 'org/locationtech/jts/io/WKTReader'
import InteriorPointArea from 'org/locationtech/jts/algorithm/InteriorPointArea'

describe('InteriorPointArea', function () {
  var reader = new WKTReader()

  it('Verify interior point', function () {
    const p = reader.read('POLYGON((10 10, 100 10, 100 100, 10 100, 10 10))')
    const intPt = new InteriorPointArea(p)
    const coord = intPt.getInteriorPoint()
    expect(coord.x).to.equal(55)
    expect(coord.y).to.equal(55)
  })
})
