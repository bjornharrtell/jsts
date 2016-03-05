import expect from 'expect.js'

import Envelope from 'org/locationtech/jts/geom/Envelope'
import STRtree from 'org/locationtech/jts/index/strtree/STRtree'

describe('STRtree', function () {
  it('should be able to contain a single envelope and find it with a valid query', function () {
    const tree = new STRtree()
    tree.insert(new Envelope(0, 10, 0, 10), 1)
    const hits = tree.query(new Envelope(1, 2, 1, 2))
    expect(hits.size()).to.be(1)
  })
})
