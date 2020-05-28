import PointLocator from '../../../algorithm/PointLocator'
import Location from '../../../geom/Location'
import GeometryFactory from '../../../geom/GeometryFactory'
import Polygon from '../../../geom/Polygon'
import LineSegment from '../../../geom/LineSegment'
import ArrayList from '../../../../../../java/util/ArrayList'
import GeometryFilter from '../../../geom/GeometryFilter'
export default class FuzzyPointLocator {
  constructor() {
    FuzzyPointLocator.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._g = null
    this._boundaryDistanceTolerance = null
    this._linework = null
    this._ptLocator = new PointLocator()
    this._seg = new LineSegment()
    const g = arguments[0], boundaryDistanceTolerance = arguments[1]
    this._g = g
    this._boundaryDistanceTolerance = boundaryDistanceTolerance
    this._linework = this.extractLinework(g)
  }
  isWithinToleranceOfBoundary(pt) {
    for (let i = 0; i < this._linework.getNumGeometries(); i++) {
      const line = this._linework.getGeometryN(i)
      const seq = line.getCoordinateSequence()
      for (let j = 0; j < seq.size() - 1; j++) {
        seq.getCoordinate(j, this._seg.p0)
        seq.getCoordinate(j + 1, this._seg.p1)
        const dist = this._seg.distance(pt)
        if (dist <= this._boundaryDistanceTolerance) return true
      }
    }
    return false
  }
  getLocation(pt) {
    if (this.isWithinToleranceOfBoundary(pt)) return Location.BOUNDARY
    return this._ptLocator.locate(pt, this._g)
  }
  extractLinework(g) {
    const extracter = new PolygonalLineworkExtracter()
    g.apply(extracter)
    const linework = extracter.getLinework()
    const lines = GeometryFactory.toLineStringArray(linework)
    return g.getFactory().createMultiLineString(lines)
  }
}
class PolygonalLineworkExtracter {
  constructor() {
    PolygonalLineworkExtracter.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._linework = null
    this._linework = new ArrayList()
  }
  getLinework() {
    return this._linework
  }
  filter(g) {
    if (g instanceof Polygon) {
      const poly = g
      this._linework.add(poly.getExteriorRing())
      for (let i = 0; i < poly.getNumInteriorRing(); i++) 
        this._linework.add(poly.getInteriorRingN(i))
      
    }
  }
  get interfaces_() {
    return [GeometryFilter]
  }
}
