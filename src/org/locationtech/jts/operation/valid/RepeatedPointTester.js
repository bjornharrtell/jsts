import LineString from '../../geom/LineString'
import Geometry from '../../geom/Geometry'
import Point from '../../geom/Point'
import Polygon from '../../geom/Polygon'
import MultiPoint from '../../geom/MultiPoint'
import GeometryCollection from '../../geom/GeometryCollection'
import UnsupportedOperationException from '../../../../../java/lang/UnsupportedOperationException'
export default class RepeatedPointTester {
  constructor() {
    RepeatedPointTester.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._repeatedCoord = null
  }
  getCoordinate() {
    return this._repeatedCoord
  }
  hasRepeatedPoint() {
    if (arguments[0] instanceof Geometry) {
      const g = arguments[0]
      if (g.isEmpty()) return false
      if (g instanceof Point) return false; else if (g instanceof MultiPoint) return false; else if (g instanceof LineString) return this.hasRepeatedPoint(g.getCoordinates()); else if (g instanceof Polygon) return this.hasRepeatedPoint(g); else if (g instanceof GeometryCollection) return this.hasRepeatedPoint(g); else throw new UnsupportedOperationException(g.getGeometryType())
    } else if (arguments[0] instanceof Array) {
      const coord = arguments[0]
      for (let i = 1; i < coord.length; i++) 
        if (coord[i - 1].equals(coord[i])) {
          this._repeatedCoord = coord[i]
          return true
        }
      
      return false
    } else if (arguments[0] instanceof Polygon) {
      const p = arguments[0]
      if (this.hasRepeatedPoint(p.getExteriorRing().getCoordinates())) return true
      for (let i = 0; i < p.getNumInteriorRing(); i++) 
        if (this.hasRepeatedPoint(p.getInteriorRingN(i).getCoordinates())) return true
      
      return false
    } else if (arguments[0] instanceof GeometryCollection) {
      const gc = arguments[0]
      for (let i = 0; i < gc.getNumGeometries(); i++) {
        const g = gc.getGeometryN(i)
        if (this.hasRepeatedPoint(g)) return true
      }
      return false
    }
  }
}
