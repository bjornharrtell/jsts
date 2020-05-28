import LineString from '../../geom/LineString'
import Geometry from '../../geom/Geometry'
import Coordinate from '../../geom/Coordinate'
import IllegalArgumentException from '../../../../../java/lang/IllegalArgumentException'
import Point from '../../geom/Point'
import PlanarPolygon3D from './PlanarPolygon3D'
import Polygon from '../../geom/Polygon'
import GeometryLocation from '../distance/GeometryLocation'
import Double from '../../../../../java/lang/Double'
import LineSegment from '../../geom/LineSegment'
import GeometryCollection from '../../geom/GeometryCollection'
import CGAlgorithms3D from '../../algorithm/CGAlgorithms3D'
export default class Distance3DOp {
  constructor() {
    Distance3DOp.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._geom = null
    this._terminateDistance = 0.0
    this._minDistanceLocation = null
    this._minDistance = Double.MAX_VALUE
    this._isDone = false
    if (arguments.length === 2) {
      const g0 = arguments[0], g1 = arguments[1]
      Distance3DOp.constructor_.call(this, g0, g1, 0.0)
    } else if (arguments.length === 3) {
      const g0 = arguments[0], g1 = arguments[1], terminateDistance = arguments[2]
      this._geom = new Array(2).fill(null)
      this._geom[0] = g0
      this._geom[1] = g1
      this._terminateDistance = terminateDistance
    }
  }
  static segmentPoint(p0, p1, d0, d1) {
    if (d0 <= 0) return new Coordinate(p0)
    if (d1 <= 0) return new Coordinate(p1)
    const f = Math.abs(d0) / (Math.abs(d0) + Math.abs(d1))
    const intx = p0.x + f * (p1.x - p0.x)
    const inty = p0.y + f * (p1.y - p0.y)
    const intz = p0.getZ() + f * (p1.getZ() - p0.getZ())
    return new Coordinate(intx, inty, intz)
  }
  static nearestPoints(g0, g1) {
    const distOp = new Distance3DOp(g0, g1)
    return distOp.nearestPoints()
  }
  static polyPlane(poly) {
    return new PlanarPolygon3D(poly)
  }
  static isWithinDistance(g0, g1, distance) {
    const distOp = new Distance3DOp(g0, g1, distance)
    return distOp.distance() <= distance
  }
  static distance(g0, g1) {
    const distOp = new Distance3DOp(g0, g1)
    return distOp.distance()
  }
  computeMinDistancePolygonPoint(polyPlane, point, flip) {
    const pt = point.getCoordinate()
    const shell = polyPlane.getPolygon().getExteriorRing()
    if (polyPlane.intersects(pt, shell)) {
      const nHole = polyPlane.getPolygon().getNumInteriorRing()
      for (let i = 0; i < nHole; i++) {
        const hole = polyPlane.getPolygon().getInteriorRingN(i)
        if (polyPlane.intersects(pt, hole)) {
          this.computeMinDistanceLinePoint(hole, point, flip)
          return null
        }
      }
      const dist = Math.abs(polyPlane.getPlane().orientedDistance(pt))
      this.updateDistance(dist, new GeometryLocation(polyPlane.getPolygon(), 0, pt), new GeometryLocation(point, 0, pt), flip)
    }
    this.computeMinDistanceLinePoint(shell, point, flip)
  }
  intersection(poly, line) {
    const seq = line.getCoordinateSequence()
    if (seq.size() === 0) return null
    const p0 = new Coordinate()
    seq.getCoordinate(0, p0)
    let d0 = poly.getPlane().orientedDistance(p0)
    const p1 = new Coordinate()
    for (let i = 0; i < seq.size() - 1; i++) {
      seq.getCoordinate(i, p0)
      seq.getCoordinate(i + 1, p1)
      const d1 = poly.getPlane().orientedDistance(p1)
      if (d0 * d1 > 0) continue
      const intPt = Distance3DOp.segmentPoint(p0, p1, d0, d1)
      if (poly.intersects(intPt)) 
        return intPt
      
      d0 = d1
    }
    return null
  }
  computeMinDistancePolygonPolygon(poly0, poly1, flip) {
    this.computeMinDistancePolygonRings(poly0, poly1, flip)
    if (this._isDone) return null
    const polyPlane1 = new PlanarPolygon3D(poly1)
    this.computeMinDistancePolygonRings(polyPlane1, poly0.getPolygon(), flip)
  }
  computeMinDistancePointPoint(point0, point1, flip) {
    const dist = CGAlgorithms3D.distance(point0.getCoordinate(), point1.getCoordinate())
    if (dist < this._minDistance) 
      this.updateDistance(dist, new GeometryLocation(point0, 0, point0.getCoordinate()), new GeometryLocation(point1, 0, point1.getCoordinate()), flip)
    
  }
  computeMinDistanceMultiMulti(g0, g1, flip) {
    if (g0 instanceof GeometryCollection) {
      const n = g0.getNumGeometries()
      for (let i = 0; i < n; i++) {
        const g = g0.getGeometryN(i)
        this.computeMinDistanceMultiMulti(g, g1, flip)
        if (this._isDone) return null
      }
    } else {
      if (g0.isEmpty()) return null
      if (g0 instanceof Polygon) 
        this.computeMinDistanceOneMulti(Distance3DOp.polyPlane(g0), g1, flip)
      else this.computeMinDistanceOneMulti(g0, g1, flip)
    }
  }
  computeMinDistanceOneMulti() {
    if (typeof arguments[2] === 'boolean' && (arguments[0] instanceof Geometry && arguments[1] instanceof Geometry)) {
      const g0 = arguments[0], g1 = arguments[1], flip = arguments[2]
      if (g1 instanceof GeometryCollection) {
        const n = g1.getNumGeometries()
        for (let i = 0; i < n; i++) {
          const g = g1.getGeometryN(i)
          this.computeMinDistanceOneMulti(g0, g, flip)
          if (this._isDone) return null
        }
      } else {
        this.computeMinDistance(g0, g1, flip)
      }
    } else if (typeof arguments[2] === 'boolean' && (arguments[0] instanceof PlanarPolygon3D && arguments[1] instanceof Geometry)) {
      const poly = arguments[0], geom = arguments[1], flip = arguments[2]
      if (geom instanceof GeometryCollection) {
        const n = geom.getNumGeometries()
        for (let i = 0; i < n; i++) {
          const g = geom.getGeometryN(i)
          this.computeMinDistanceOneMulti(poly, g, flip)
          if (this._isDone) return null
        }
      } else {
        if (geom instanceof Point) {
          this.computeMinDistancePolygonPoint(poly, geom, flip)
          return null
        }
        if (geom instanceof LineString) {
          this.computeMinDistancePolygonLine(poly, geom, flip)
          return null
        }
        if (geom instanceof Polygon) {
          this.computeMinDistancePolygonPolygon(poly, geom, flip)
          return null
        }
      }
    }
  }
  computeMinDistanceLinePoint(line, point, flip) {
    const lineCoord = line.getCoordinates()
    const coord = point.getCoordinate()
    for (let i = 0; i < lineCoord.length - 1; i++) {
      const dist = CGAlgorithms3D.distancePointSegment(coord, lineCoord[i], lineCoord[i + 1])
      if (dist < this._minDistance) {
        const seg = new LineSegment(lineCoord[i], lineCoord[i + 1])
        const segClosestPoint = seg.closestPoint(coord)
        this.updateDistance(dist, new GeometryLocation(line, i, segClosestPoint), new GeometryLocation(point, 0, coord), flip)
      }
      if (this._isDone) return null
    }
  }
  nearestLocations() {
    this.computeMinDistance()
    return this._minDistanceLocation
  }
  nearestPoints() {
    this.computeMinDistance()
    const nearestPts = [this._minDistanceLocation[0].getCoordinate(), this._minDistanceLocation[1].getCoordinate()]
    return nearestPts
  }
  computeMinDistance() {
    if (arguments.length === 0) {
      if (this._minDistanceLocation !== null) return null
      this._minDistanceLocation = new Array(2).fill(null)
      const geomIndex = this.mostPolygonalIndex()
      const flip = geomIndex === 1
      this.computeMinDistanceMultiMulti(this._geom[geomIndex], this._geom[1 - geomIndex], flip)
    } else if (arguments.length === 3) {
      const g0 = arguments[0], g1 = arguments[1], flip = arguments[2]
      if (g0 instanceof Point) {
        if (g1 instanceof Point) {
          this.computeMinDistancePointPoint(g0, g1, flip)
          return null
        }
        if (g1 instanceof LineString) {
          this.computeMinDistanceLinePoint(g1, g0, !flip)
          return null
        }
        if (g1 instanceof Polygon) {
          this.computeMinDistancePolygonPoint(Distance3DOp.polyPlane(g1), g0, !flip)
          return null
        }
      }
      if (g0 instanceof LineString) {
        if (g1 instanceof Point) {
          this.computeMinDistanceLinePoint(g0, g1, flip)
          return null
        }
        if (g1 instanceof LineString) {
          this.computeMinDistanceLineLine(g0, g1, flip)
          return null
        }
        if (g1 instanceof Polygon) {
          this.computeMinDistancePolygonLine(Distance3DOp.polyPlane(g1), g0, !flip)
          return null
        }
      }
      if (g0 instanceof Polygon) {
        if (g1 instanceof Point) {
          this.computeMinDistancePolygonPoint(Distance3DOp.polyPlane(g0), g1, flip)
          return null
        }
        if (g1 instanceof LineString) {
          this.computeMinDistancePolygonLine(Distance3DOp.polyPlane(g0), g1, flip)
          return null
        }
        if (g1 instanceof Polygon) {
          this.computeMinDistancePolygonPolygon(Distance3DOp.polyPlane(g0), g1, flip)
          return null
        }
      }
    }
  }
  computeMinDistanceLineLine(line0, line1, flip) {
    const coord0 = line0.getCoordinates()
    const coord1 = line1.getCoordinates()
    for (let i = 0; i < coord0.length - 1; i++) 
      for (let j = 0; j < coord1.length - 1; j++) {
        const dist = CGAlgorithms3D.distanceSegmentSegment(coord0[i], coord0[i + 1], coord1[j], coord1[j + 1])
        if (dist < this._minDistance) {
          this._minDistance = dist
          const seg0 = new LineSegment(coord0[i], coord0[i + 1])
          const seg1 = new LineSegment(coord1[j], coord1[j + 1])
          const closestPt = seg0.closestPoints(seg1)
          this.updateDistance(dist, new GeometryLocation(line0, i, closestPt[0]), new GeometryLocation(line1, j, closestPt[1]), flip)
        }
        if (this._isDone) return null
      }
    
  }
  computeMinDistancePolygonLine(poly, line, flip) {
    const intPt = this.intersection(poly, line)
    if (intPt !== null) {
      this.updateDistance(0, new GeometryLocation(poly.getPolygon(), 0, intPt), new GeometryLocation(line, 0, intPt), flip)
      return null
    }
    this.computeMinDistanceLineLine(poly.getPolygon().getExteriorRing(), line, flip)
    if (this._isDone) return null
    const nHole = poly.getPolygon().getNumInteriorRing()
    for (let i = 0; i < nHole; i++) {
      this.computeMinDistanceLineLine(poly.getPolygon().getInteriorRingN(i), line, flip)
      if (this._isDone) return null
    }
  }
  distance() {
    if (this._geom[0] === null || this._geom[1] === null) throw new IllegalArgumentException('null geometries are not supported')
    if (this._geom[0].isEmpty() || this._geom[1].isEmpty()) return 0.0
    this.computeMinDistance()
    return this._minDistance
  }
  mostPolygonalIndex() {
    const dim0 = this._geom[0].getDimension()
    const dim1 = this._geom[1].getDimension()
    if (dim0 >= 2 && dim1 >= 2) {
      if (this._geom[0].getNumPoints() > this._geom[1].getNumPoints()) return 0
      return 1
    }
    if (dim0 >= 2) return 0
    if (dim1 >= 2) return 1
    return 0
  }
  computeMinDistancePolygonRings(poly, ringPoly, flip) {
    this.computeMinDistancePolygonLine(poly, ringPoly.getExteriorRing(), flip)
    if (this._isDone) return null
    const nHole = ringPoly.getNumInteriorRing()
    for (let i = 0; i < nHole; i++) {
      this.computeMinDistancePolygonLine(poly, ringPoly.getInteriorRingN(i), flip)
      if (this._isDone) return null
    }
  }
  updateDistance(dist, loc0, loc1, flip) {
    this._minDistance = dist
    const index = flip ? 1 : 0
    this._minDistanceLocation[index] = loc0
    this._minDistanceLocation[1 - index] = loc1
    if (this._minDistance < this._terminateDistance) this._isDone = true
  }
}
