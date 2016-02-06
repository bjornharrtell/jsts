import expect from 'expect.js'

import Envelope from 'org/locationtech/jts/geom/Envelope'
import STRtree from 'org/locationtech/jts/index/strtree/STRtree'

describe('STRtree', function () {
  it('single envelope test should return 1', function () {
    const tree = new STRtree()
    tree.insert(new Envelope(0, 10, 0, 10), 1)
    const hits = tree.query(new Envelope(1, 2, 1, 2))
    expect(hits.size()).to.be(1)
  })
})
