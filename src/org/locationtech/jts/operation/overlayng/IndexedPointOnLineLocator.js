import PointLocator from '../../algorithm/PointLocator.js'
import PointOnGeometryLocator from '../../algorithm/locate/PointOnGeometryLocator.js'
export default class IndexedPointOnLineLocator {
  constructor() {
    IndexedPointOnLineLocator.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._inputGeom = null
    const geomLinear = arguments[0]
    this._inputGeom = geomLinear
  }
  locate(p) {
    const locator = new PointLocator()
    return locator.locate(p, this._inputGeom)
  }
  get interfaces_() {
    return [PointOnGeometryLocator]
  }
}
