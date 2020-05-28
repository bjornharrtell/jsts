import LineString from '../geom/LineString'
import Geometry from '../geom/Geometry'
import Coordinate from '../geom/Coordinate'
import Double from '../../../../java/lang/Double'
import Centroid from './Centroid'
import GeometryCollection from '../geom/GeometryCollection'
export default class InteriorPointLine {
  constructor() {
    InteriorPointLine.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._centroid = null
    this._minDistance = Double.MAX_VALUE
    this._interiorPoint = null
    const g = arguments[0]
    if (g.isEmpty()) {
      this._centroid = null
    } else {
      this._centroid = Centroid.getCentroid(g)
      g.getPrecisionModel().makePrecise(this._centroid)
    }
    this.addInterior(g)
    if (this._interiorPoint === null) this.addEndpoints(g)
  }
  static getInteriorPoint(geom) {
    const intPt = new InteriorPointLine(geom)
    return intPt.getInteriorPoint()
  }
  addEndpoints() {
    if (arguments[0] instanceof Geometry) {
      const geom = arguments[0]
      if (geom instanceof LineString) {
        this.addEndpoints(geom.getCoordinates())
      } else if (geom instanceof GeometryCollection) {
        const gc = geom
        for (let i = 0; i < gc.getNumGeometries(); i++) 
          this.addEndpoints(gc.getGeometryN(i))
        
      }
    } else if (arguments[0] instanceof Array) {
      const pts = arguments[0]
      this.add(pts[0])
      this.add(pts[pts.length - 1])
    }
  }
  getInteriorPoint() {
    return this._interiorPoint
  }
  addInterior() {
    if (arguments[0] instanceof Geometry) {
      const geom = arguments[0]
      if (geom instanceof LineString) {
        this.addInterior(geom.getCoordinates())
      } else if (geom instanceof GeometryCollection) {
        const gc = geom
        for (let i = 0; i < gc.getNumGeometries(); i++) 
          this.addInterior(gc.getGeometryN(i))
        
      }
    } else if (arguments[0] instanceof Array) {
      const pts = arguments[0]
      for (let i = 1; i < pts.length - 1; i++) 
        this.add(pts[i])
      
    }
  }
  add(point) {
    const dist = point.distance(this._centroid)
    if (dist < this._minDistance) {
      this._interiorPoint = new Coordinate(point)
      this._minDistance = dist
    }
  }
}
