export default class SweepLineSegment {
  constructor() {
    SweepLineSegment.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this.edge = null
    this.pts = null
    this.ptIndex = null
    const edge = arguments[0], ptIndex = arguments[1]
    this.edge = edge
    this.ptIndex = ptIndex
    this.pts = edge.getCoordinates()
  }
  getMaxX() {
    const x1 = this.pts[this.ptIndex].x
    const x2 = this.pts[this.ptIndex + 1].x
    return x1 > x2 ? x1 : x2
  }
  getMinX() {
    const x1 = this.pts[this.ptIndex].x
    const x2 = this.pts[this.ptIndex + 1].x
    return x1 < x2 ? x1 : x2
  }
  computeIntersections(ss, si) {
    si.addIntersections(this.edge, this.ptIndex, ss.edge, ss.ptIndex)
  }
}
