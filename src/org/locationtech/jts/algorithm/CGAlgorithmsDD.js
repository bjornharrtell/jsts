import Coordinate from '../geom/Coordinate'
import DD from '../math/DD'
export default class CGAlgorithmsDD {
  constructor () {
    CGAlgorithmsDD.constructor_.apply(this, arguments)
  }

  static orientationIndex (p1, p2, q) {
    const index = CGAlgorithmsDD.orientationIndexFilter(p1, p2, q)
    if (index <= 1) return index
    const dx1 = DD.valueOf(p2.x).selfAdd(-p1.x)
    const dy1 = DD.valueOf(p2.y).selfAdd(-p1.y)
    const dx2 = DD.valueOf(q.x).selfAdd(-p2.x)
    const dy2 = DD.valueOf(q.y).selfAdd(-p2.y)
    return dx1.selfMultiply(dy2).selfSubtract(dy1.selfMultiply(dx2)).signum()
  }

  static signOfDet2x2 () {
    if (arguments[3] instanceof DD && (arguments[2] instanceof DD && (arguments[0] instanceof DD && arguments[1] instanceof DD))) {
      const x1 = arguments[0]; const y1 = arguments[1]; const x2 = arguments[2]; const y2 = arguments[3]
      const det = x1.multiply(y2).selfSubtract(y1.multiply(x2))
      return det.signum()
    } else if (typeof arguments[3] === 'number' && (typeof arguments[2] === 'number' && (typeof arguments[0] === 'number' && typeof arguments[1] === 'number'))) {
      const dx1 = arguments[0]; const dy1 = arguments[1]; const dx2 = arguments[2]; const dy2 = arguments[3]
      const x1 = DD.valueOf(dx1)
      const y1 = DD.valueOf(dy1)
      const x2 = DD.valueOf(dx2)
      const y2 = DD.valueOf(dy2)
      const det = x1.multiply(y2).selfSubtract(y1.multiply(x2))
      return det.signum()
    }
  }

  static intersection (p1, p2, q1, q2) {
    const denom1 = DD.valueOf(q2.y).selfSubtract(q1.y).selfMultiply(DD.valueOf(p2.x).selfSubtract(p1.x))
    const denom2 = DD.valueOf(q2.x).selfSubtract(q1.x).selfMultiply(DD.valueOf(p2.y).selfSubtract(p1.y))
    const denom = denom1.subtract(denom2)
    const numx1 = DD.valueOf(q2.x).selfSubtract(q1.x).selfMultiply(DD.valueOf(p1.y).selfSubtract(q1.y))
    const numx2 = DD.valueOf(q2.y).selfSubtract(q1.y).selfMultiply(DD.valueOf(p1.x).selfSubtract(q1.x))
    const numx = numx1.subtract(numx2)
    const fracP = numx.selfDivide(denom).doubleValue()
    const x = DD.valueOf(p1.x).selfAdd(DD.valueOf(p2.x).selfSubtract(p1.x).selfMultiply(fracP)).doubleValue()
    const numy1 = DD.valueOf(p2.x).selfSubtract(p1.x).selfMultiply(DD.valueOf(p1.y).selfSubtract(q1.y))
    const numy2 = DD.valueOf(p2.y).selfSubtract(p1.y).selfMultiply(DD.valueOf(p1.x).selfSubtract(q1.x))
    const numy = numy1.subtract(numy2)
    const fracQ = numy.selfDivide(denom).doubleValue()
    const y = DD.valueOf(q1.y).selfAdd(DD.valueOf(q2.y).selfSubtract(q1.y).selfMultiply(fracQ)).doubleValue()
    return new Coordinate(x, y)
  }

  static orientationIndexFilter (pa, pb, pc) {
    let detsum = null
    const detleft = (pa.x - pc.x) * (pb.y - pc.y)
    const detright = (pa.y - pc.y) * (pb.x - pc.x)
    const det = detleft - detright
    if (detleft > 0.0) {
      if (detright <= 0.0) {
        return CGAlgorithmsDD.signum(det)
      } else {
        detsum = detleft + detright
      }
    } else if (detleft < 0.0) {
      if (detright >= 0.0) {
        return CGAlgorithmsDD.signum(det)
      } else {
        detsum = -detleft - detright
      }
    } else {
      return CGAlgorithmsDD.signum(det)
    }
    const errbound = CGAlgorithmsDD.DP_SAFE_EPSILON * detsum
    if (det >= errbound || -det >= errbound) {
      return CGAlgorithmsDD.signum(det)
    }
    return 2
  }

  static signum (x) {
    if (x > 0) return 1
    if (x < 0) return -1
    return 0
  }

  getClass () {
    return CGAlgorithmsDD
  }

  get interfaces_ () {
    return []
  }
}
CGAlgorithmsDD.constructor_ = function () {}
CGAlgorithmsDD.DP_SAFE_EPSILON = 1e-15
