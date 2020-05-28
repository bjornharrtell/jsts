import hasInterface from '../../../../../hasInterface'
import SegmentIntersectionDetector from '../../noding/SegmentIntersectionDetector'
import SegmentStringUtil from '../../noding/SegmentStringUtil'
import Polygonal from '../Polygonal'
import PreparedPolygonPredicate from './PreparedPolygonPredicate'
export default class AbstractPreparedPolygonContains extends PreparedPolygonPredicate {
  constructor() {
    super()
    AbstractPreparedPolygonContains.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._requireSomePointInInterior = true
    this._hasSegmentIntersection = false
    this._hasProperIntersection = false
    this._hasNonProperIntersection = false
    const prepPoly = arguments[0]
    PreparedPolygonPredicate.constructor_.call(this, prepPoly)
  }
  eval(geom) {
    const isAllInTargetArea = this.isAllTestComponentsInTarget(geom)
    if (!isAllInTargetArea) return false
    if (this._requireSomePointInInterior && geom.getDimension() === 0) {
      const isAnyInTargetInterior = this.isAnyTestComponentInTargetInterior(geom)
      return isAnyInTargetInterior
    }
    const properIntersectionImpliesNotContained = this.isProperIntersectionImpliesNotContainedSituation(geom)
    this.findAndClassifyIntersections(geom)
    if (properIntersectionImpliesNotContained && this._hasProperIntersection) return false
    if (this._hasSegmentIntersection && !this._hasNonProperIntersection) return false
    if (this._hasSegmentIntersection) 
      return this.fullTopologicalPredicate(geom)
    
    if (hasInterface(geom, Polygonal)) {
      const isTargetInTestArea = this.isAnyTargetComponentInAreaTest(geom, this._prepPoly.getRepresentativePoints())
      if (isTargetInTestArea) return false
    }
    return true
  }
  findAndClassifyIntersections(geom) {
    const lineSegStr = SegmentStringUtil.extractSegmentStrings(geom)
    const intDetector = new SegmentIntersectionDetector()
    intDetector.setFindAllIntersectionTypes(true)
    this._prepPoly.getIntersectionFinder().intersects(lineSegStr, intDetector)
    this._hasSegmentIntersection = intDetector.hasIntersection()
    this._hasProperIntersection = intDetector.hasProperIntersection()
    this._hasNonProperIntersection = intDetector.hasNonProperIntersection()
  }
  isProperIntersectionImpliesNotContainedSituation(testGeom) {
    if (hasInterface(testGeom, Polygonal)) return true
    if (this.isSingleShell(this._prepPoly.getGeometry())) return true
    return false
  }
  isSingleShell(geom) {
    if (geom.getNumGeometries() !== 1) return false
    const poly = geom.getGeometryN(0)
    const numHoles = poly.getNumInteriorRing()
    if (numHoles === 0) return true
    return false
  }
}
