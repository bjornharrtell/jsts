import Orientation from './Orientation.js'
import Quadrant from '../geom/Quadrant.js'
export default class PolygonNodeTopology {
  static isBetween(origin, p, e0, e1) {
    const isGreater0 = PolygonNodeTopology.isAngleGreater(origin, p, e0)
    if (!isGreater0) return false
    const isGreater1 = PolygonNodeTopology.isAngleGreater(origin, p, e1)
    return !isGreater1
  }
  static isInteriorSegment(nodePt, a0, a1, b) {
    let aLo = a0
    let aHi = a1
    let isInteriorBetween = true
    if (PolygonNodeTopology.isAngleGreater(nodePt, aLo, aHi)) {
      aLo = a1
      aHi = a0
      isInteriorBetween = false
    }
    const isBetween = PolygonNodeTopology.isBetween(nodePt, b, aLo, aHi)
    const isInterior = isBetween && isInteriorBetween || !isBetween && !isInteriorBetween
    return isInterior
  }
  static isCrossing(nodePt, a0, a1, b0, b1) {
    let aLo = a0
    let aHi = a1
    if (PolygonNodeTopology.isAngleGreater(nodePt, aLo, aHi)) {
      aLo = a1
      aHi = a0
    }
    const isBetween0 = PolygonNodeTopology.isBetween(nodePt, b0, aLo, aHi)
    const isBetween1 = PolygonNodeTopology.isBetween(nodePt, b1, aLo, aHi)
    return isBetween0 !== isBetween1
  }
  static isAngleGreater(origin, p, q) {
    const quadrantP = PolygonNodeTopology.quadrant(origin, p)
    const quadrantQ = PolygonNodeTopology.quadrant(origin, q)
    if (quadrantP > quadrantQ) return true
    if (quadrantP < quadrantQ) return false
    const orient = Orientation.index(origin, q, p)
    return orient === Orientation.COUNTERCLOCKWISE
  }
  static quadrant(origin, p) {
    const dx = p.getX() - origin.getX()
    const dy = p.getY() - origin.getY()
    return Quadrant.quadrant(dx, dy)
  }
}
