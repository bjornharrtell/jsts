import Coordinate from '../geom/Coordinate'
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException'
export default class Quadrant {
  static isNorthern(quad) {
    return quad === Quadrant.NE || quad === Quadrant.NW
  }
  static isOpposite(quad1, quad2) {
    if (quad1 === quad2) return false
    const diff = (quad1 - quad2 + 4) % 4
    if (diff === 2) return true
    return false
  }
  static commonHalfPlane(quad1, quad2) {
    if (quad1 === quad2) return quad1
    const diff = (quad1 - quad2 + 4) % 4
    if (diff === 2) return -1
    const min = quad1 < quad2 ? quad1 : quad2
    const max = quad1 > quad2 ? quad1 : quad2
    if (min === 0 && max === 3) return 3
    return min
  }
  static isInHalfPlane(quad, halfPlane) {
    if (halfPlane === Quadrant.SE) 
      return quad === Quadrant.SE || quad === Quadrant.SW
    
    return quad === halfPlane || quad === halfPlane + 1
  }
  static quadrant() {
    if (typeof arguments[0] === 'number' && typeof arguments[1] === 'number') {
      const dx = arguments[0], dy = arguments[1]
      if (dx === 0.0 && dy === 0.0) throw new IllegalArgumentException('Cannot compute the quadrant for point ( ' + dx + ', ' + dy + ' )')
      if (dx >= 0.0) 
        if (dy >= 0.0) return Quadrant.NE; else return Quadrant.SE
      else 
      if (dy >= 0.0) return Quadrant.NW; else return Quadrant.SW
      
    } else if (arguments[0] instanceof Coordinate && arguments[1] instanceof Coordinate) {
      const p0 = arguments[0], p1 = arguments[1]
      if (p1.x === p0.x && p1.y === p0.y) throw new IllegalArgumentException('Cannot compute the quadrant for two identical points ' + p0)
      if (p1.x >= p0.x) 
        if (p1.y >= p0.y) return Quadrant.NE; else return Quadrant.SE
      else 
      if (p1.y >= p0.y) return Quadrant.NW; else return Quadrant.SW
      
    }
  }
}
Quadrant.NE = 0
Quadrant.NW = 1
Quadrant.SW = 2
Quadrant.SE = 3
