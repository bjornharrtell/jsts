import LineString from '../LineString'
import Point from '../Point'
import GeometryComponentFilter from '../GeometryComponentFilter'
import ArrayList from '../../../../../java/util/ArrayList'
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
