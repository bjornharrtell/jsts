import TaggedLineSegment from './TaggedLineSegment'
import ArrayList from '../../../../java/util/ArrayList'
export default class TaggedLineString {
  constructor() {
    TaggedLineString.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._parentLine = null
    this._segs = null
    this._resultSegs = new ArrayList()
    this._minimumSize = null
    if (arguments.length === 1) {
      const parentLine = arguments[0]
      TaggedLineString.constructor_.call(this, parentLine, 2)
    } else if (arguments.length === 2) {
      const parentLine = arguments[0], minimumSize = arguments[1]
      this._parentLine = parentLine
      this._minimumSize = minimumSize
      this.init()
    }
  }
  static extractCoordinates(segs) {
    const pts = new Array(segs.size() + 1).fill(null)
    let seg = null
    for (let i = 0; i < segs.size(); i++) {
      seg = segs.get(i)
      pts[i] = seg.p0
    }
    pts[pts.length - 1] = seg.p1
    return pts
  }
  addToResult(seg) {
    this._resultSegs.add(seg)
  }
  asLineString() {
    return this._parentLine.getFactory().createLineString(TaggedLineString.extractCoordinates(this._resultSegs))
  }
  getResultSize() {
    const resultSegsSize = this._resultSegs.size()
    return resultSegsSize === 0 ? 0 : resultSegsSize + 1
  }
  getParent() {
    return this._parentLine
  }
  getSegment(i) {
    return this._segs[i]
  }
  getParentCoordinates() {
    return this._parentLine.getCoordinates()
  }
  getMinimumSize() {
    return this._minimumSize
  }
  asLinearRing() {
    return this._parentLine.getFactory().createLinearRing(TaggedLineString.extractCoordinates(this._resultSegs))
  }
  getSegments() {
    return this._segs
  }
  init() {
    const pts = this._parentLine.getCoordinates()
    this._segs = new Array(pts.length - 1).fill(null)
    for (let i = 0; i < pts.length - 1; i++) {
      const seg = new TaggedLineSegment(pts[i], pts[i + 1], this._parentLine, i)
      this._segs[i] = seg
    }
  }
  getResultCoordinates() {
    return TaggedLineString.extractCoordinates(this._resultSegs)
  }
}
