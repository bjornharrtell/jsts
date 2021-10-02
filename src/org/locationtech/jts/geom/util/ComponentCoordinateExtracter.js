import LineString from '../LineString.js'
import Point from '../Point.js'
import GeometryComponentFilter from '../GeometryComponentFilter.js'
import ArrayList from '../../../../../java/util/ArrayList.js'
export default class ComponentCoordinateExtracter {
  constructor() {
    ComponentCoordinateExtracter.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._coords = null
    const coords = arguments[0]
    this._coords = coords
  }
  static getCoordinates(geom) {
    const coords = new ArrayList()
    geom.apply(new ComponentCoordinateExtracter(coords))
    return coords
  }
  filter(geom) {
    if (geom instanceof LineString || geom instanceof Point) this._coords.add(geom.getCoordinate())
  }
  get interfaces_() {
    return [GeometryComponentFilter]
  }
}
