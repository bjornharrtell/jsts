import Orientation from './Orientation.js'
import Coordinate from '../geom/Coordinate.js'
export default class Angle {
  static toDegrees(radians) {
    return radians * 180 / Math.PI
  }
  static normalize(angle) {
    while (angle > Math.PI) angle -= Angle.PI_TIMES_2
    while (angle <= -Math.PI) angle += Angle.PI_TIMES_2
    return angle
  }
  static angle() {
    if (arguments.length === 1) {
      const p = arguments[0]
      return Math.atan2(p.y, p.x)
    } else if (arguments.length === 2) {
      const p0 = arguments[0], p1 = arguments[1]
      const dx = p1.x - p0.x
      const dy = p1.y - p0.y
      return Math.atan2(dy, dx)
    } else {
      throw 'angle.angle argument type unknown'
    }
  }
  static isAcute(p0, p1, p2) {
    const dx0 = p0.x - p1.x
    const dy0 = p0.y - p1.y
    const dx1 = p2.x - p1.x
    const dy1 = p2.y - p1.y
    const dotprod = dx0 * dx1 + dy0 * dy1
    return dotprod > 0
  }
  static isObtuse(p0, p1, p2) {
    const dx0 = p0.x - p1.x
    const dy0 = p0.y - p1.y
    const dx1 = p2.x - p1.x
    const dy1 = p2.y - p1.y
    const dotprod = dx0 * dx1 + dy0 * dy1
    return dotprod < 0
  }
  static interiorAngle(p0, p1, p2) {
    const anglePrev = Angle.angle(p1, p0)
    const angleNext = Angle.angle(p1, p2)
    return Math.abs(angleNext - anglePrev)
  }
  static normalizePositive(angle) {
    if (angle < 0.0) {
      while (angle < 0.0) angle += Angle.PI_TIMES_2
      if (angle >= Angle.PI_TIMES_2) angle = 0.0
    } else {
      while (angle >= Angle.PI_TIMES_2) angle -= Angle.PI_TIMES_2
      if (angle < 0.0) angle = 0.0
    }
    return angle
  }
  static angleBetween(tip1, tail, tip2) {
    const a1 = Angle.angle(tail, tip1)
    const a2 = Angle.angle(tail, tip2)
    return Angle.diff(a1, a2)
  }
  static diff(ang1, ang2) {
    let delAngle = null
    if (ang1 < ang2) 
      delAngle = ang2 - ang1
    else 
      delAngle = ang1 - ang2
    
    if (delAngle > Math.PI) 
      delAngle = 2 * Math.PI - delAngle
    
    return delAngle
  }
  static toRadians(angleDegrees) {
    return angleDegrees * Math.PI / 180.0
  }
  static getTurn(ang1, ang2) {
    const crossproduct = Math.sin(ang2 - ang1)
    if (crossproduct > 0) 
      return Angle.COUNTERCLOCKWISE
    
    if (crossproduct < 0) 
      return Angle.CLOCKWISE
    
    return Angle.NONE
  }
  static angleBetweenOriented(tip1, tail, tip2) {
    const a1 = Angle.angle(tail, tip1)
    const a2 = Angle.angle(tail, tip2)
    const angDel = a2 - a1
    if (angDel <= -Math.PI) return angDel + Angle.PI_TIMES_2
    if (angDel > Math.PI) return angDel - Angle.PI_TIMES_2
    return angDel
  }

  /**
     * Computes the angle of the unoriented bisector 
     * of the smallest angle between two vectors.
     * The computed angle will be in the range (-Pi, Pi].
     * 
     * @param tip1 the tip of v1
     * @param tail the tail of each vector
     * @param tip2 the tip of v2
     * @return the angle of the bisector between v1 and v2
     */
  static bisector(tip1, tail,
   tip2)
  {
  const angDel = this.angleBetweenOriented(tip1, tail, tip2);
  const angBi = this.angle(tail, tip1) + angDel / 2;
  return this.normalize(angBi);
  }

  /**
   * Projects a point by a given angle and distance.
   * 
   * @param p the point to project
   * @param angle the angle at which to project
   * @param dist the distance to project
   * @return the projected point
   */
  static project(p, angle, dist) {
    const x = p.getX() + dist * Math.cos(angle);
    const y = p.getY() + dist * Math.sin(angle);
    return new Coordinate(x, y);
  }
}
Angle.PI_TIMES_2 = 2.0 * Math.PI
Angle.PI_OVER_2 = Math.PI / 2.0
Angle.PI_OVER_4 = Math.PI / 4.0
Angle.COUNTERCLOCKWISE = Orientation.COUNTERCLOCKWISE
Angle.CLOCKWISE = Orientation.CLOCKWISE
Angle.NONE = Orientation.COLLINEAR
