import expect from 'expect.js'

import WKTReader from 'org/locationtech/jts/io/WKTReader'
import ConvexHull from 'org/locationtech/jts/algorithm/ConvexHull'

describe('ConvexHull', function () {
  var reader = new WKTReader()

  it('Verify ConvexHull', function () {
    const p = reader.read('POLYGON((10 10, 100 10, 100 100, 10 100, 10 10))')
    const convexHull = new ConvexHull(p)
    const result = convexHull.getConvexHull()
    expect(result).to.be.ok()
  })
})
