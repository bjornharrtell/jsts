import PointLocator from '../../algorithm/PointLocator'
import SegmentStringUtil from '../../noding/SegmentStringUtil'
import ComponentCoordinateExtracter from '../util/ComponentCoordinateExtracter'
export default class PreparedLineStringIntersects {
  constructor() {
    PreparedLineStringIntersects.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._prepLine = null
    const prepLine = arguments[0]
    this._prepLine = prepLine
  }
  static intersects(prep, geom) {
    const op = new PreparedLineStringIntersects(prep)
    return op.intersects(geom)
  }
  isAnyTestPointInTarget(testGeom) {
    const locator = new PointLocator()
    const coords = ComponentCoordinateExtracter.getCoordinates(testGeom)
    for (let i = coords.iterator(); i.hasNext(); ) {
      const p = i.next()
      if (locator.intersects(p, this._prepLine.getGeometry())) return true
    }
    return false
  }
  intersects(geom) {
    const lineSegStr = SegmentStringUtil.extractSegmentStrings(geom)
    if (lineSegStr.size() > 0) {
      const segsIntersect = this._prepLine.getIntersectionFinder().intersects(lineSegStr)
      if (segsIntersect) return true
    }
    if (geom.getDimension() === 1) return false
    if (geom.getDimension() === 2 && this._prepLine.isAnyTargetComponentInTest(geom)) return true
    if (geom.getDimension() === 0) return this.isAnyTestPointInTarget(geom)
    return false
  }
}
