import Geometry from '../geom/Geometry.js'
import Coordinate from '../geom/Coordinate.js'
import Point from '../geom/Point.js'
import Double from '../../../../java/lang/Double.js'
import Centroid from './Centroid.js'
import GeometryCollection from '../geom/GeometryCollection.js'
export default class InteriorPointPoint {
  constructor() {
    InteriorPointPoint.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._centroid = null
    this._minDistance = Double.MAX_VALUE
    this._interiorPoint = null
    const g = arguments[0]
    this._centroid = Centroid.getCentroid(g)
    this.add(g)
  }
  static getInteriorPoint(geom) {
    const intPt = new InteriorPointPoint(geom)
    return intPt.getInteriorPoint()
  }
  getInteriorPoint() {
    return this._interiorPoint
  }
  add() {
    if (arguments[0] instanceof Geometry) {
      const geom = arguments[0]
      if (geom instanceof Point) {
        this.add(geom.getCoordinate())
      } else if (geom instanceof GeometryCollection) {
        const gc = geom
        for (let i = 0; i < gc.getNumGeometries(); i++) 
          this.add(gc.getGeometryN(i))
        
      }
    } else if (arguments[0] instanceof Coordinate) {
      const point = arguments[0]
      const dist = point.distance(this._centroid)
      if (dist < this._minDistance) {
        this._interiorPoint = new Coordinate(point)
        this._minDistance = dist
      }
    }
  }
}
