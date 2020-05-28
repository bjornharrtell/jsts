import hasInterface from '../../../../hasInterface'
import Coordinate from '../geom/Coordinate'
import CoordinateSequence from '../geom/CoordinateSequence'
export default class Area {
  static ofRing() {
    if (arguments[0] instanceof Array) {
      const ring = arguments[0]
      return Math.abs(Area.ofRingSigned(ring))
    } else if (hasInterface(arguments[0], CoordinateSequence)) {
      const ring = arguments[0]
      return Math.abs(Area.ofRingSigned(ring))
    }
  }
  static ofRingSigned() {
    if (arguments[0] instanceof Array) {
      const ring = arguments[0]
      if (ring.length < 3) return 0.0
      let sum = 0.0
      const x0 = ring[0].x
      for (let i = 1; i < ring.length - 1; i++) {
        const x = ring[i].x - x0
        const y1 = ring[i + 1].y
        const y2 = ring[i - 1].y
        sum += x * (y2 - y1)
      }
      return sum / 2.0
    } else if (hasInterface(arguments[0], CoordinateSequence)) {
      const ring = arguments[0]
      const n = ring.size()
      if (n < 3) return 0.0
      const p0 = new Coordinate()
      const p1 = new Coordinate()
      const p2 = new Coordinate()
      ring.getCoordinate(0, p1)
      ring.getCoordinate(1, p2)
      const x0 = p1.x
      p2.x -= x0
      let sum = 0.0
      for (let i = 1; i < n - 1; i++) {
        p0.y = p1.y
        p1.x = p2.x
        p1.y = p2.y
        ring.getCoordinate(i + 1, p2)
        p2.x -= x0
        sum += p1.x * (p0.y - p2.y)
      }
      return sum / 2.0
    }
  }
}
