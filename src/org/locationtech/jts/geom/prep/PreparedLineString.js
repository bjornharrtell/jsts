import FastSegmentSetIntersectionFinder from '../../noding/FastSegmentSetIntersectionFinder.js'
import SegmentStringUtil from '../../noding/SegmentStringUtil.js'
import PreparedLineStringIntersects from './PreparedLineStringIntersects.js'
import BasicPreparedGeometry from './BasicPreparedGeometry.js'
export default class PreparedLineString extends BasicPreparedGeometry {
  constructor() {
    super()
    PreparedLineString.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._segIntFinder = null
    const line = arguments[0]
    BasicPreparedGeometry.constructor_.call(this, line)
  }
  getIntersectionFinder() {
    if (this._segIntFinder === null) this._segIntFinder = new FastSegmentSetIntersectionFinder(SegmentStringUtil.extractSegmentStrings(this.getGeometry()))
    return this._segIntFinder
  }
  intersects(g) {
    if (!this.envelopesIntersect(g)) return false
    return PreparedLineStringIntersects.intersects(this, g)
  }
}
