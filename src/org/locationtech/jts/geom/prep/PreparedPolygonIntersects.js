import SegmentStringUtil from '../../noding/SegmentStringUtil'
import PreparedPolygonPredicate from './PreparedPolygonPredicate'
export default class PreparedPolygonIntersects extends PreparedPolygonPredicate {
  constructor() {
    super()
    PreparedPolygonIntersects.constructor_.apply(this, arguments)
  }
  static constructor_() {
    const prepPoly = arguments[0]
    PreparedPolygonPredicate.constructor_.call(this, prepPoly)
  }
  static intersects(prep, geom) {
    const polyInt = new PreparedPolygonIntersects(prep)
    return polyInt.intersects(geom)
  }
  intersects(geom) {
    const isInPrepGeomArea = this.isAnyTestComponentInTarget(geom)
    if (isInPrepGeomArea) return true
    if (geom.getDimension() === 0) return false
    const lineSegStr = SegmentStringUtil.extractSegmentStrings(geom)
    if (lineSegStr.size() > 0) {
      const segsIntersect = this._prepPoly.getIntersectionFinder().intersects(lineSegStr)
      if (segsIntersect) return true
    }
    if (geom.getDimension() === 2) {
      const isPrepGeomInArea = this.isAnyTargetComponentInAreaTest(geom, this._prepPoly.getRepresentativePoints())
      if (isPrepGeomInArea) return true
    }
    return false
  }
}
