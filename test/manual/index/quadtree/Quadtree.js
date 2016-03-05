import expect from 'expect.js'

import Coordinate from 'org/locationtech/jts/geom/Coordinate'
import GeometryFactory from 'org/locationtech/jts/geom/GeometryFactory'
import Quadtree from 'org/locationtech/jts/index/quadtree/Quadtree'

describe('Quadtree', function () {
  it('should be able to handle a simple insert/query/delete/query test', function () {
    const tree = new Quadtree()
    const factory = new GeometryFactory()
    const p1 = factory.createPoint(new Coordinate(1, 1))
    const e1 = p1.getEnvelopeInternal()
    tree.insert(e1, p1)
    const hits1 = tree.query(e1)
    expect(hits1.size()).to.be(1)
    tree.remove(e1, p1)
    const hits2 = tree.query(e1)
    expect(hits2.size()).to.be(0)
  })
})
