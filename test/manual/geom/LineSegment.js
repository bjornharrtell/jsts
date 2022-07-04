import LineSegment from '../../../src/org/locationtech/jts/geom/LineSegment.js'
import Coordinate from '../../../src/org/locationtech/jts/geom/Coordinate.js'

describe('LineSegment', () => {
  it('should find a point on a segment', function() {
    const segment = new LineSegment(new Coordinate(1, 1), new Coordinate(1, 1))
    segment.pointAlongOffset(0.5, 42)
  })
})
