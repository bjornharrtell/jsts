import Location from '../geom/Location'
import hasInterface from '../../../../hasInterface'
import Coordinate from '../geom/Coordinate'
import CoordinateSequence from '../geom/CoordinateSequence'
import RobustLineIntersector from './RobustLineIntersector'
import RayCrossingCounter from './RayCrossingCounter'
export default class PointLocation {
  static isOnLine() {
    if (arguments[0] instanceof Coordinate && hasInterface(arguments[1], CoordinateSequence)) {
      const p = arguments[0], line = arguments[1]
      const lineIntersector = new RobustLineIntersector()
      const p0 = new Coordinate()
      const p1 = new Coordinate()
      const n = line.size()
      for (let i = 1; i < n; i++) {
        line.getCoordinate(i - 1, p0)
        line.getCoordinate(i, p1)
        lineIntersector.computeIntersection(p, p0, p1)
        if (lineIntersector.hasIntersection()) 
          return true
        
      }
      return false
    } else if (arguments[0] instanceof Coordinate && arguments[1] instanceof Array) {
      const p = arguments[0], line = arguments[1]
      const lineIntersector = new RobustLineIntersector()
      for (let i = 1; i < line.length; i++) {
        const p0 = line[i - 1]
        const p1 = line[i]
        lineIntersector.computeIntersection(p, p0, p1)
        if (lineIntersector.hasIntersection()) 
          return true
        
      }
      return false
    }
  }
  static locateInRing(p, ring) {
    return RayCrossingCounter.locatePointInRing(p, ring)
  }
  static isInRing(p, ring) {
    return PointLocation.locateInRing(p, ring) !== Location.EXTERIOR
  }
}
