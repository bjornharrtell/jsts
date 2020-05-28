import Coordinate from '../geom/Coordinate'
export default class SplitSegment {
  constructor() {
    SplitSegment.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._seg = null
    this._segLen = null
    this._splitPt = null
    this._minimumLen = 0.0
    const seg = arguments[0]
    this._seg = seg
    this._segLen = seg.getLength()
  }
  static pointAlongReverse(seg, segmentLengthFraction) {
    const coord = new Coordinate()
    coord.x = seg.p1.x - segmentLengthFraction * (seg.p1.x - seg.p0.x)
    coord.y = seg.p1.y - segmentLengthFraction * (seg.p1.y - seg.p0.y)
    return coord
  }
  splitAt() {
    if (arguments.length === 1) {
      const pt = arguments[0]
      const minFrac = this._minimumLen / this._segLen
      if (pt.distance(this._seg.p0) < this._minimumLen) {
        this._splitPt = this._seg.pointAlong(minFrac)
        return null
      }
      if (pt.distance(this._seg.p1) < this._minimumLen) {
        this._splitPt = SplitSegment.pointAlongReverse(this._seg, minFrac)
        return null
      }
      this._splitPt = pt
    } else if (arguments.length === 2) {
      const length = arguments[0], endPt = arguments[1]
      const actualLen = this.getConstrainedLength(length)
      const frac = actualLen / this._segLen
      if (endPt.equals2D(this._seg.p0)) this._splitPt = this._seg.pointAlong(frac); else this._splitPt = SplitSegment.pointAlongReverse(this._seg, frac)
    }
  }
  setMinimumLength(minLen) {
    this._minimumLen = minLen
  }
  getConstrainedLength(len) {
    if (len < this._minimumLen) return this._minimumLen
    return len
  }
  getSplitPoint() {
    return this._splitPt
  }
}
