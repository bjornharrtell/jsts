import CoordinateList from '../../geom/CoordinateList.js'
import Coordinate from '../../geom/Coordinate.js'
export default class RingClipper {
  constructor() {
    RingClipper.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._clipEnv = null
    this._clipEnvMinY = null
    this._clipEnvMaxY = null
    this._clipEnvMinX = null
    this._clipEnvMaxX = null
    const clipEnv = arguments[0]
    this._clipEnv = clipEnv
    this._clipEnvMinY = clipEnv.getMinY()
    this._clipEnvMaxY = clipEnv.getMaxY()
    this._clipEnvMinX = clipEnv.getMinX()
    this._clipEnvMaxX = clipEnv.getMaxX()
  }
  intersectionLineX(a, b, x) {
    const m = (b.y - a.y) / (b.x - a.x)
    const intercept = (x - a.x) * m
    return a.y + intercept
  }
  clipToBoxEdge(pts, edgeIndex, closeRing) {
    const ptsClip = new CoordinateList()
    let p0 = pts[pts.length - 1]
    for (let i = 0; i < pts.length; i++) {
      const p1 = pts[i]
      if (this.isInsideEdge(p1, edgeIndex)) {
        if (!this.isInsideEdge(p0, edgeIndex)) {
          const intPt = this.intersection(p0, p1, edgeIndex)
          ptsClip.add(intPt, false)
        }
        ptsClip.add(p1.copy(), false)
      } else if (this.isInsideEdge(p0, edgeIndex)) {
        const intPt = this.intersection(p0, p1, edgeIndex)
        ptsClip.add(intPt, false)
      }
      p0 = p1
    }
    if (closeRing && ptsClip.size() > 0) {
      const start = ptsClip.get(0)
      if (!start.equals2D(ptsClip.get(ptsClip.size() - 1))) 
        ptsClip.add(start.copy())
      
    }
    return ptsClip.toCoordinateArray()
  }
  intersection(a, b, edgeIndex) {
    let intPt = null
    switch (edgeIndex) {
    case RingClipper.BOX_BOTTOM:
      intPt = new Coordinate(this.intersectionLineY(a, b, this._clipEnvMinY), this._clipEnvMinY)
      break
    case RingClipper.BOX_RIGHT:
      intPt = new Coordinate(this._clipEnvMaxX, this.intersectionLineX(a, b, this._clipEnvMaxX))
      break
    case RingClipper.BOX_TOP:
      intPt = new Coordinate(this.intersectionLineY(a, b, this._clipEnvMaxY), this._clipEnvMaxY)
      break
    case RingClipper.BOX_LEFT:
    default:
      intPt = new Coordinate(this._clipEnvMinX, this.intersectionLineX(a, b, this._clipEnvMinX))
    }
    return intPt
  }
  intersectionLineY(a, b, y) {
    const m = (b.x - a.x) / (b.y - a.y)
    const intercept = (y - a.y) * m
    return a.x + intercept
  }
  isInsideEdge(p, edgeIndex) {
    let isInside = false
    switch (edgeIndex) {
    case RingClipper.BOX_BOTTOM:
      isInside = p.y > this._clipEnvMinY
      break
    case RingClipper.BOX_RIGHT:
      isInside = p.x < this._clipEnvMaxX
      break
    case RingClipper.BOX_TOP:
      isInside = p.y < this._clipEnvMaxY
      break
    case RingClipper.BOX_LEFT:
    default:
      isInside = p.x > this._clipEnvMinX
    }
    return isInside
  }
  clip(pts) {
    for (let edgeIndex = 0; edgeIndex < 4; edgeIndex++) {
      const closeRing = edgeIndex === 3
      pts = this.clipToBoxEdge(pts, edgeIndex, closeRing)
      if (pts.length === 0) return pts
    }
    return pts
  }
}
RingClipper.BOX_LEFT = 3
RingClipper.BOX_TOP = 2
RingClipper.BOX_RIGHT = 1
RingClipper.BOX_BOTTOM = 0
