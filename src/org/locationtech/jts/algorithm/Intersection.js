import Coordinate from '../geom/Coordinate'
import Double from '../../../../java/lang/Double'
export default class Intersection {
  static intersection(p1, p2, q1, q2) {
    const minX0 = p1.x < p2.x ? p1.x : p2.x
    const minY0 = p1.y < p2.y ? p1.y : p2.y
    const maxX0 = p1.x > p2.x ? p1.x : p2.x
    const maxY0 = p1.y > p2.y ? p1.y : p2.y
    const minX1 = q1.x < q2.x ? q1.x : q2.x
    const minY1 = q1.y < q2.y ? q1.y : q2.y
    const maxX1 = q1.x > q2.x ? q1.x : q2.x
    const maxY1 = q1.y > q2.y ? q1.y : q2.y
    const intMinX = minX0 > minX1 ? minX0 : minX1
    const intMaxX = maxX0 < maxX1 ? maxX0 : maxX1
    const intMinY = minY0 > minY1 ? minY0 : minY1
    const intMaxY = maxY0 < maxY1 ? maxY0 : maxY1
    const midx = (intMinX + intMaxX) / 2.0
    const midy = (intMinY + intMaxY) / 2.0
    const p1x = p1.x - midx
    const p1y = p1.y - midy
    const p2x = p2.x - midx
    const p2y = p2.y - midy
    const q1x = q1.x - midx
    const q1y = q1.y - midy
    const q2x = q2.x - midx
    const q2y = q2.y - midy
    const px = p1y - p2y
    const py = p2x - p1x
    const pw = p1x * p2y - p2x * p1y
    const qx = q1y - q2y
    const qy = q2x - q1x
    const qw = q1x * q2y - q2x * q1y
    const x = py * qw - qy * pw
    const y = qx * pw - px * qw
    const w = px * qy - qx * py
    const xInt = x / w
    const yInt = y / w
    if (Double.isNaN(xInt) || (Double.isInfinite(xInt) || Double.isNaN(yInt)) || Double.isInfinite(yInt)) 
      return null
    
    return new Coordinate(xInt + midx, yInt + midy)
  }
}
