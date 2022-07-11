import expect from 'expect.js'

import LineSegment from '../../../src/org/locationtech/jts/geom/LineSegment.js'
import Coordinate from '../../../src/org/locationtech/jts/geom/Coordinate.js'

describe('LineSegment', () => {
  it('should throw on zero length segment', function() {
    const segment = new LineSegment(new Coordinate(1, 1), new Coordinate(1, 1))
    expect(() => segment.pointAlongOffset(0.5, 42)).to.throwError('Cannot compute offset from zero-length line segment')
  })
  it('should find a point on a segment', function() {
    const segment = new LineSegment(new Coordinate(1, 1), new Coordinate(2, 2))
    segment.pointAlongOffset(0.5, 42)
  })
})