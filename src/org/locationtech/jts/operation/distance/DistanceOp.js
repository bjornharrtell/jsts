import PointLocator from '../../algorithm/PointLocator'
import PolygonExtracter from '../../geom/util/PolygonExtracter'
import Location from '../../geom/Location'
import LineString from '../../geom/LineString'
import hasInterface from '../../../../../hasInterface'
import IllegalArgumentException from '../../../../../java/lang/IllegalArgumentException'
import Point from '../../geom/Point'
import Polygon from '../../geom/Polygon'
import GeometryLocation from './GeometryLocation'
import Double from '../../../../../java/lang/Double'
import PointExtracter from '../../geom/util/PointExtracter'
import ConnectedElementLocationFilter from './ConnectedElementLocationFilter'
import LineSegment from '../../geom/LineSegment'
import LinearComponentExtracter from '../../geom/util/LinearComponentExtracter'
import Envelope from '../../geom/Envelope'
import List from '../../../../../java/util/List'
import Distance from '../../algorithm/Distance'
export default class DistanceOp {
  constructor() {
    DistanceOp.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._geom = null
    this._terminateDistance = 0.0
    this._ptLocator = new PointLocator()
    this._minDistanceLocation = null
    this._minDistance = Double.MAX_VALUE
    if (arguments.length === 2) {
      const g0 = arguments[0], g1 = arguments[1]
      DistanceOp.constructor_.call(this, g0, g1, 0.0)
    } else if (arguments.length === 3) {
      const g0 = arguments[0], g1 = arguments[1], terminateDistance = arguments[2]
      this._geom = new Array(2).fill(null)
      this._geom[0] = g0
      this._geom[1] = g1
      this._terminateDistance = terminateDistance
    }
  }
  static distance(g0, g1) {
    const distOp = new DistanceOp(g0, g1)
    return distOp.distance()
  }
  static isWithinDistance(g0, g1, distance) {
    const envDist = g0.getEnvelopeInternal().distance(g1.getEnvelopeInternal())
    if (envDist > distance) return false
    const distOp = new DistanceOp(g0, g1, distance)
    return distOp.distance() <= distance
  }
  static nearestPoints(g0, g1) {
    const distOp = new DistanceOp(g0, g1)
    return distOp.nearestPoints()
  }
  computeContainmentDistance() {
    if (arguments.length === 0) {
      const locPtPoly = new Array(2).fill(null)
      this.computeContainmentDistance(0, locPtPoly)
      if (this._minDistance <= this._terminateDistance) return null
      this.computeContainmentDistance(1, locPtPoly)
    } else if (arguments.length === 2) {
      const polyGeomIndex = arguments[0], locPtPoly = arguments[1]
      const polyGeom = this._geom[polyGeomIndex]
      if (polyGeom.getDimension() < 2) return null
      const locationsIndex = 1 - polyGeomIndex
      const polys = PolygonExtracter.getPolygons(polyGeom)
      if (polys.size() > 0) {
        const insideLocs = ConnectedElementLocationFilter.getLocations(this._geom[locationsIndex])
        this.computeContainmentDistance(insideLocs, polys, locPtPoly)
        if (this._minDistance <= this._terminateDistance) {
          this._minDistanceLocation[locationsIndex] = locPtPoly[0]
          this._minDistanceLocation[polyGeomIndex] = locPtPoly[1]
          return null
        }
      }
    } else if (arguments.length === 3) {
      if (arguments[2] instanceof Array && (hasInterface(arguments[0], List) && hasInterface(arguments[1], List))) {
        const locs = arguments[0], polys = arguments[1], locPtPoly = arguments[2]
        for (let i = 0; i < locs.size(); i++) {
          const loc = locs.get(i)
          for (let j = 0; j < polys.size(); j++) {
            this.computeContainmentDistance(loc, polys.get(j), locPtPoly)
            if (this._minDistance <= this._terminateDistance) return null
          }
        }
      } else if (arguments[2] instanceof Array && (arguments[0] instanceof GeometryLocation && arguments[1] instanceof Polygon)) {
        const ptLoc = arguments[0], poly = arguments[1], locPtPoly = arguments[2]
        const pt = ptLoc.getCoordinate()
        if (Location.EXTERIOR !== this._ptLocator.locate(pt, poly)) {
          this._minDistance = 0.0
          locPtPoly[0] = ptLoc
          locPtPoly[1] = new GeometryLocation(poly, pt)
          
          return null
        }
      }
    }
  }
  computeMinDistanceLinesPoints(lines, points, locGeom) {
    for (let i = 0; i < lines.size(); i++) {
      const line = lines.get(i)
      for (let j = 0; j < points.size(); j++) {
        const pt = points.get(j)
        this.computeMinDistance(line, pt, locGeom)
        if (this._minDistance <= this._terminateDistance) return null
      }
    }
  }
  computeFacetDistance() {
    const locGeom = new Array(2).fill(null)
    const lines0 = LinearComponentExtracter.getLines(this._geom[0])
    const lines1 = LinearComponentExtracter.getLines(this._geom[1])
    const pts0 = PointExtracter.getPoints(this._geom[0])
    const pts1 = PointExtracter.getPoints(this._geom[1])
    this.computeMinDistanceLines(lines0, lines1, locGeom)
    this.updateMinDistance(locGeom, false)
    if (this._minDistance <= this._terminateDistance) return null
    locGeom[0] = null
    locGeom[1] = null
    this.computeMinDistanceLinesPoints(lines0, pts1, locGeom)
    this.updateMinDistance(locGeom, false)
    if (this._minDistance <= this._terminateDistance) return null
    locGeom[0] = null
    locGeom[1] = null
    this.computeMinDistanceLinesPoints(lines1, pts0, locGeom)
    this.updateMinDistance(locGeom, true)
    if (this._minDistance <= this._terminateDistance) return null
    locGeom[0] = null
    locGeom[1] = null
    this.computeMinDistancePoints(pts0, pts1, locGeom)
    this.updateMinDistance(locGeom, false)
  }
  nearestLocations() {
    this.computeMinDistance()
    return this._minDistanceLocation
  }
  updateMinDistance(locGeom, flip) {
    if (locGeom[0] === null) return null
    if (flip) {
      this._minDistanceLocation[0] = locGeom[1]
      this._minDistanceLocation[1] = locGeom[0]
    } else {
      this._minDistanceLocation[0] = locGeom[0]
      this._minDistanceLocation[1] = locGeom[1]
    }
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
      this.computeContainmentDistance()
      if (this._minDistance <= this._terminateDistance) return null
      this.computeFacetDistance()
    } else if (arguments.length === 3) {
      if (arguments[2] instanceof Array && (arguments[0] instanceof LineString && arguments[1] instanceof Point)) {
        const line = arguments[0], pt = arguments[1], locGeom = arguments[2]
        if (line.getEnvelopeInternal().distance(pt.getEnvelopeInternal()) > this._minDistance) return null
        const coord0 = line.getCoordinates()
        const coord = pt.getCoordinate()
        for (let i = 0; i < coord0.length - 1; i++) {
          const dist = Distance.pointToSegment(coord, coord0[i], coord0[i + 1])
          if (dist < this._minDistance) {
            this._minDistance = dist
            const seg = new LineSegment(coord0[i], coord0[i + 1])
            const segClosestPoint = seg.closestPoint(coord)
            locGeom[0] = new GeometryLocation(line, i, segClosestPoint)
            locGeom[1] = new GeometryLocation(pt, 0, coord)
          }
          if (this._minDistance <= this._terminateDistance) return null
        }
      } else if (arguments[2] instanceof Array && (arguments[0] instanceof LineString && arguments[1] instanceof LineString)) {
        const line0 = arguments[0], line1 = arguments[1], locGeom = arguments[2]
        if (line0.getEnvelopeInternal().distance(line1.getEnvelopeInternal()) > this._minDistance) return null
        const coord0 = line0.getCoordinates()
        const coord1 = line1.getCoordinates()
        for (let i = 0; i < coord0.length - 1; i++) {
          const segEnv0 = new Envelope(coord0[i], coord0[i + 1])
          if (segEnv0.distance(line1.getEnvelopeInternal()) > this._minDistance) continue
          for (let j = 0; j < coord1.length - 1; j++) {
            const segEnv1 = new Envelope(coord1[j], coord1[j + 1])
            if (segEnv0.distance(segEnv1) > this._minDistance) continue
            const dist = Distance.segmentToSegment(coord0[i], coord0[i + 1], coord1[j], coord1[j + 1])
            if (dist < this._minDistance) {
              this._minDistance = dist
              const seg0 = new LineSegment(coord0[i], coord0[i + 1])
              const seg1 = new LineSegment(coord1[j], coord1[j + 1])
              const closestPt = seg0.closestPoints(seg1)
              locGeom[0] = new GeometryLocation(line0, i, closestPt[0])
              locGeom[1] = new GeometryLocation(line1, j, closestPt[1])
            }
            if (this._minDistance <= this._terminateDistance) return null
          }
        }
      }
    }
  }
  computeMinDistancePoints(points0, points1, locGeom) {
    for (let i = 0; i < points0.size(); i++) {
      const pt0 = points0.get(i)
      for (let j = 0; j < points1.size(); j++) {
        const pt1 = points1.get(j)
        const dist = pt0.getCoordinate().distance(pt1.getCoordinate())
        if (dist < this._minDistance) {
          this._minDistance = dist
          locGeom[0] = new GeometryLocation(pt0, 0, pt0.getCoordinate())
          locGeom[1] = new GeometryLocation(pt1, 0, pt1.getCoordinate())
        }
        if (this._minDistance <= this._terminateDistance) return null
      }
    }
  }
  distance() {
    if (this._geom[0] === null || this._geom[1] === null) throw new IllegalArgumentException('null geometries are not supported')
    if (this._geom[0].isEmpty() || this._geom[1].isEmpty()) return 0.0
    this.computeMinDistance()
    return this._minDistance
  }
  computeMinDistanceLines(lines0, lines1, locGeom) {
    for (let i = 0; i < lines0.size(); i++) {
      const line0 = lines0.get(i)
      for (let j = 0; j < lines1.size(); j++) {
        const line1 = lines1.get(j)
        this.computeMinDistance(line0, line1, locGeom)
        if (this._minDistance <= this._terminateDistance) return null
      }
    }
  }
}
