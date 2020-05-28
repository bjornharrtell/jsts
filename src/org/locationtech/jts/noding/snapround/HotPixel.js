import Coordinate from '../../geom/Coordinate'
import IllegalArgumentException from '../../../../../java/lang/IllegalArgumentException'
import Envelope from '../../geom/Envelope'
import Assert from '../../util/Assert'
export default class HotPixel {
  constructor() {
    HotPixel.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._li = null
    this._pt = null
    this._originalPt = null
    this._ptScaled = null
    this._p0Scaled = null
    this._p1Scaled = null
    this._scaleFactor = null
    this._minx = null
    this._maxx = null
    this._miny = null
    this._maxy = null
    this._corner = new Array(4).fill(null)
    this._safeEnv = null
    const pt = arguments[0], scaleFactor = arguments[1], li = arguments[2]
    this._originalPt = pt
    this._pt = pt
    this._scaleFactor = scaleFactor
    this._li = li
    if (scaleFactor <= 0) throw new IllegalArgumentException('Scale factor must be non-zero')
    if (scaleFactor !== 1.0) {
      this._pt = new Coordinate(this.scale(pt.x), this.scale(pt.y))
      this._p0Scaled = new Coordinate()
      this._p1Scaled = new Coordinate()
    }
    this.initCorners(this._pt)
  }
  intersectsScaled(p0, p1) {
    const segMinx = Math.min(p0.x, p1.x)
    const segMaxx = Math.max(p0.x, p1.x)
    const segMiny = Math.min(p0.y, p1.y)
    const segMaxy = Math.max(p0.y, p1.y)
    const isOutsidePixelEnv = this._maxx < segMinx || this._minx > segMaxx || this._maxy < segMiny || this._miny > segMaxy
    if (isOutsidePixelEnv) return false
    const intersects = this.intersectsToleranceSquare(p0, p1)
    Assert.isTrue(!(isOutsidePixelEnv && intersects), 'Found bad envelope test')
    return intersects
  }
  initCorners(pt) {
    const tolerance = 0.5
    this._minx = pt.x - tolerance
    this._maxx = pt.x + tolerance
    this._miny = pt.y - tolerance
    this._maxy = pt.y + tolerance
    this._corner[0] = new Coordinate(this._maxx, this._maxy)
    this._corner[1] = new Coordinate(this._minx, this._maxy)
    this._corner[2] = new Coordinate(this._minx, this._miny)
    this._corner[3] = new Coordinate(this._maxx, this._miny)
  }
  intersects(p0, p1) {
    if (this._scaleFactor === 1.0) return this.intersectsScaled(p0, p1)
    this.copyScaled(p0, this._p0Scaled)
    this.copyScaled(p1, this._p1Scaled)
    return this.intersectsScaled(this._p0Scaled, this._p1Scaled)
  }
  scale(val) {
    return Math.round(val * this._scaleFactor)
  }
  getCoordinate() {
    return this._originalPt
  }
  copyScaled(p, pScaled) {
    pScaled.x = this.scale(p.x)
    pScaled.y = this.scale(p.y)
  }
  getSafeEnvelope() {
    if (this._safeEnv === null) {
      const safeTolerance = HotPixel.SAFE_ENV_EXPANSION_FACTOR / this._scaleFactor
      this._safeEnv = new Envelope(this._originalPt.x - safeTolerance, this._originalPt.x + safeTolerance, this._originalPt.y - safeTolerance, this._originalPt.y + safeTolerance)
    }
    return this._safeEnv
  }
  intersectsPixelClosure(p0, p1) {
    this._li.computeIntersection(p0, p1, this._corner[0], this._corner[1])
    if (this._li.hasIntersection()) return true
    this._li.computeIntersection(p0, p1, this._corner[1], this._corner[2])
    if (this._li.hasIntersection()) return true
    this._li.computeIntersection(p0, p1, this._corner[2], this._corner[3])
    if (this._li.hasIntersection()) return true
    this._li.computeIntersection(p0, p1, this._corner[3], this._corner[0])
    if (this._li.hasIntersection()) return true
    return false
  }
  intersectsToleranceSquare(p0, p1) {
    let intersectsLeft = false
    let intersectsBottom = false
    this._li.computeIntersection(p0, p1, this._corner[0], this._corner[1])
    if (this._li.isProper()) return true
    this._li.computeIntersection(p0, p1, this._corner[1], this._corner[2])
    if (this._li.isProper()) return true
    if (this._li.hasIntersection()) intersectsLeft = true
    this._li.computeIntersection(p0, p1, this._corner[2], this._corner[3])
    if (this._li.isProper()) return true
    if (this._li.hasIntersection()) intersectsBottom = true
    this._li.computeIntersection(p0, p1, this._corner[3], this._corner[0])
    if (this._li.isProper()) return true
    if (intersectsLeft && intersectsBottom) return true
    if (p0.equals(this._pt)) return true
    if (p1.equals(this._pt)) return true
    return false
  }
  addSnappedNode(segStr, segIndex) {
    const p0 = segStr.getCoordinate(segIndex)
    const p1 = segStr.getCoordinate(segIndex + 1)
    if (this.intersects(p0, p1)) {
      segStr.addIntersection(this.getCoordinate(), segIndex)
      return true
    }
    return false
  }
}
HotPixel.SAFE_ENV_EXPANSION_FACTOR = 0.75
