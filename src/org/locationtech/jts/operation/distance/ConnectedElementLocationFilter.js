import LineString from '../../geom/LineString.js'
import Point from '../../geom/Point.js'
import Polygon from '../../geom/Polygon.js'
import GeometryLocation from './GeometryLocation.js'
import ArrayList from '../../../../../java/util/ArrayList.js'
import GeometryFilter from '../../geom/GeometryFilter.js'
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
