import WKTWriter from '../../io/WKTWriter'
export default class GeometryLocation {
  constructor() {
    GeometryLocation.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._component = null
    this._segIndex = null
    this._pt = null
    if (arguments.length === 2) {
      const component = arguments[0], pt = arguments[1]
      GeometryLocation.constructor_.call(this, component, GeometryLocation.INSIDE_AREA, pt)
    } else if (arguments.length === 3) {
      const component = arguments[0], segIndex = arguments[1], pt = arguments[2]
      this._component = component
      this._segIndex = segIndex
      this._pt = pt
    }
  }
  getSegmentIndex() {
    return this._segIndex
  }
  getCoordinate() {
    return this._pt
  }
  isInsideArea() {
    return this._segIndex === GeometryLocation.INSIDE_AREA
  }
  toString() {
    return this._component.getGeometryType() + '[' + this._segIndex + ']' + '-' + WKTWriter.toPoint(this._pt)
  }
  getGeometryComponent() {
    return this._component
  }
}
GeometryLocation.INSIDE_AREA = -1
