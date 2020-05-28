import LineString from '../../geom/LineString'
import Point from '../../geom/Point'
import Polygon from '../../geom/Polygon'
import GeometryLocation from './GeometryLocation'
import ArrayList from '../../../../../java/util/ArrayList'
import GeometryFilter from '../../geom/GeometryFilter'
export default class ConnectedElementLocationFilter {
  constructor() {
    ConnectedElementLocationFilter.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._locations = null
    const locations = arguments[0]
    this._locations = locations
  }
  static getLocations(geom) {
    const locations = new ArrayList()
    geom.apply(new ConnectedElementLocationFilter(locations))
    return locations
  }
  filter(geom) {
    if (geom.isEmpty()) return null
    if (geom instanceof Point || geom instanceof LineString || geom instanceof Polygon) this._locations.add(new GeometryLocation(geom, 0, geom.getCoordinate()))
  }
  get interfaces_() {
    return [GeometryFilter]
  }
}
