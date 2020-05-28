import LineString from '../geom/LineString'
import Geometry from '../geom/Geometry'
import Coordinate from '../geom/Coordinate'
import Point from '../geom/Point'
import Polygon from '../geom/Polygon'
import Orientation from './Orientation'
import GeometryCollection from '../geom/GeometryCollection'
export default class Centroid {
  constructor() {
    Centroid.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._areaBasePt = null
    this._triangleCent3 = new Coordinate()
    this._areasum2 = 0
    this._cg3 = new Coordinate()
    this._lineCentSum = new Coordinate()
    this._totalLength = 0.0
    this._ptCount = 0
    this._ptCentSum = new Coordinate()
    const geom = arguments[0]
    this._areaBasePt = null
    this.add(geom)
  }
  static area2(p1, p2, p3) {
    return (p2.x - p1.x) * (p3.y - p1.y) - (p3.x - p1.x) * (p2.y - p1.y)
  }
  static centroid3(p1, p2, p3, c) {
    c.x = p1.x + p2.x + p3.x
    c.y = p1.y + p2.y + p3.y
    return null
  }
  static getCentroid(geom) {
    const cent = new Centroid(geom)
    return cent.getCentroid()
  }
  setAreaBasePoint(basePt) {
    this._areaBasePt = basePt
  }
  addPoint(pt) {
    this._ptCount += 1
    this._ptCentSum.x += pt.x
    this._ptCentSum.y += pt.y
  }
  addLineSegments(pts) {
    let lineLen = 0.0
    for (let i = 0; i < pts.length - 1; i++) {
      const segmentLen = pts[i].distance(pts[i + 1])
      if (segmentLen === 0.0) continue
      lineLen += segmentLen
      const midx = (pts[i].x + pts[i + 1].x) / 2
      this._lineCentSum.x += segmentLen * midx
      const midy = (pts[i].y + pts[i + 1].y) / 2
      this._lineCentSum.y += segmentLen * midy
    }
    this._totalLength += lineLen
    if (lineLen === 0.0 && pts.length > 0) this.addPoint(pts[0])
  }
  addHole(pts) {
    const isPositiveArea = Orientation.isCCW(pts)
    for (let i = 0; i < pts.length - 1; i++) 
      this.addTriangle(this._areaBasePt, pts[i], pts[i + 1], isPositiveArea)
    
    this.addLineSegments(pts)
  }
  getCentroid() {
    const cent = new Coordinate()
    if (Math.abs(this._areasum2) > 0.0) {
      cent.x = this._cg3.x / 3 / this._areasum2
      cent.y = this._cg3.y / 3 / this._areasum2
    } else if (this._totalLength > 0.0) {
      cent.x = this._lineCentSum.x / this._totalLength
      cent.y = this._lineCentSum.y / this._totalLength
    } else if (this._ptCount > 0) {
      cent.x = this._ptCentSum.x / this._ptCount
      cent.y = this._ptCentSum.y / this._ptCount
    } else {
      return null
    }
    return cent
  }
  addShell(pts) {
    if (pts.length > 0) this.setAreaBasePoint(pts[0])
    const isPositiveArea = !Orientation.isCCW(pts)
    for (let i = 0; i < pts.length - 1; i++) 
      this.addTriangle(this._areaBasePt, pts[i], pts[i + 1], isPositiveArea)
    
    this.addLineSegments(pts)
  }
  addTriangle(p0, p1, p2, isPositiveArea) {
    const sign = isPositiveArea ? 1.0 : -1.0
    Centroid.centroid3(p0, p1, p2, this._triangleCent3)
    const area2 = Centroid.area2(p0, p1, p2)
    this._cg3.x += sign * area2 * this._triangleCent3.x
    this._cg3.y += sign * area2 * this._triangleCent3.y
    this._areasum2 += sign * area2
  }
  add() {
    if (arguments[0] instanceof Polygon) {
      const poly = arguments[0]
      this.addShell(poly.getExteriorRing().getCoordinates())
      for (let i = 0; i < poly.getNumInteriorRing(); i++) 
        this.addHole(poly.getInteriorRingN(i).getCoordinates())
      
    } else if (arguments[0] instanceof Geometry) {
      const geom = arguments[0]
      if (geom.isEmpty()) return null
      if (geom instanceof Point) {
        this.addPoint(geom.getCoordinate())
      } else if (geom instanceof LineString) {
        this.addLineSegments(geom.getCoordinates())
      } else if (geom instanceof Polygon) {
        const poly = geom
        this.add(poly)
      } else if (geom instanceof GeometryCollection) {
        const gc = geom
        for (let i = 0; i < gc.getNumGeometries(); i++) 
          this.add(gc.getGeometryN(i))
        
      }
    }
  }
}
