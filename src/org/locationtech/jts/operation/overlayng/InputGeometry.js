import Location from '../../geom/Location.js'
import IndexedPointInAreaLocator from '../../algorithm/locate/IndexedPointInAreaLocator.js'
export default class InputGeometry {
  constructor() {
    InputGeometry.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._geom = new Array(2).fill(null)
    this._ptLocatorA = null
    this._ptLocatorB = null
    this._isCollapsed = new Array(2).fill(null)
    const geomA = arguments[0], geomB = arguments[1]
    this._geom = [geomA, geomB]
  }
  hasPoints() {
    return this.getDimension(0) === 0 || this.getDimension(1) === 0
  }
  isAllPoints() {
    return this.getDimension(0) === 0 && this._geom[1] !== null && this.getDimension(1) === 0
  }
  getGeometry(geomIndex) {
    return this._geom[geomIndex]
  }
  isSingle() {
    return this._geom[1] === null
  }
  isLine(geomIndex) {
    return this.getDimension(geomIndex) === 1
  }
  getDimension(index) {
    if (this._geom[index] === null) return -1
    return this._geom[index].getDimension()
  }
  getEnvelope(geomIndex) {
    return this._geom[geomIndex].getEnvelopeInternal()
  }
  setCollapsed(geomIndex, isGeomCollapsed) {
    this._isCollapsed[geomIndex] = isGeomCollapsed
  }
  getAreaIndex() {
    if (this.getDimension(0) === 2) return 0
    if (this.getDimension(1) === 2) return 1
    return -1
  }
  getLocator(geomIndex) {
    if (geomIndex === 0) {
      if (this._ptLocatorA === null) this._ptLocatorA = new IndexedPointInAreaLocator(this.getGeometry(geomIndex))
      return this._ptLocatorA
    } else {
      if (this._ptLocatorB === null) this._ptLocatorB = new IndexedPointInAreaLocator(this.getGeometry(geomIndex))
      return this._ptLocatorB
    }
  }
  hasEdges(geomIndex) {
    return this._geom[geomIndex] !== null && this._geom[geomIndex].getDimension() > 0
  }
  locatePointInArea(geomIndex, pt) {
    if (this._isCollapsed[geomIndex]) return Location.EXTERIOR
    if (this.getGeometry(geomIndex).isEmpty() || this._isCollapsed[geomIndex]) return Location.EXTERIOR
    const ptLocator = this.getLocator(geomIndex)
    return ptLocator.locate(pt)
  }
  isArea(geomIndex) {
    return this._geom[geomIndex] !== null && this._geom[geomIndex].getDimension() === 2
  }
  isEmpty(geomIndex) {
    return this._geom[geomIndex].isEmpty()
  }
}
