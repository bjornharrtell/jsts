import LineString from '../../geom/LineString'
import Point from '../../geom/Point'
import Polygon from '../../geom/Polygon'
import ArrayList from '../../../../../java/util/ArrayList'
import GeometryFilter from '../../geom/GeometryFilter'
export default class ConnectedElementPointFilter {
  constructor() {
    ConnectedElementPointFilter.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._pts = null
    const pts = arguments[0]
    this._pts = pts
  }
  static getCoordinates(geom) {
    const pts = new ArrayList()
    geom.apply(new ConnectedElementPointFilter(pts))
    return pts
  }
  filter(geom) {
    if (geom instanceof Point || geom instanceof LineString || geom instanceof Polygon) this._pts.add(geom.getCoordinate())
  }
  get interfaces_() {
    return [GeometryFilter]
  }
}
