import expect from 'expect.js'

import WKTReader from '../../../src/org/locationtech/jts/io/WKTReader.js'
import ConvexHull from '../../../src/org/locationtech/jts/algorithm/ConvexHull.js'

describe('ConvexHull', function() {
  var reader = new WKTReader()

  it('Verify ConvexHull', function() {
    const p = reader.read('POLYGON((10 10, 100 10, 100 100, 10 100, 10 10))')
    const convexHull = new ConvexHull(p)
    const result = convexHull.getConvexHull()
    expect(result).to.be.ok()
  })
})
