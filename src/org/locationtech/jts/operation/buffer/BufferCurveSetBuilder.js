import Location from '../../geom/Location.js'
import LineString from '../../geom/LineString.js'
import Position from '../../geom/Position.js'
import Point from '../../geom/Point.js'
import NodedSegmentString from '../../noding/NodedSegmentString.js'
import Polygon from '../../geom/Polygon.js'
import MultiPoint from '../../geom/MultiPoint.js'
import OffsetCurveBuilder from './OffsetCurveBuilder.js'
import LinearRing from '../../geom/LinearRing.js'
import Orientation from '../../algorithm/Orientation.js'
import MultiPolygon from '../../geom/MultiPolygon.js'
import Label from '../../geomgraph/Label.js'
import GeometryCollection from '../../geom/GeometryCollection.js'
import UnsupportedOperationException from '../../../../../java/lang/UnsupportedOperationException.js'
import CoordinateArrays from '../../geom/CoordinateArrays.js'
import ArrayList from '../../../../../java/util/ArrayList.js'
import Distance from '../../algorithm/Distance.js'
import MultiLineString from '../../geom/MultiLineString.js'
import Triangle from '../../geom/Triangle.js'
export default class BufferCurveSetBuilder {
  constructor() {
    BufferCurveSetBuilder.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._inputGeom = null
    this._distance = null
    this._curveBuilder = null
    this._curveList = new ArrayList()
    this._isInvertOrientation = false
    const inputGeom = arguments[0], distance = arguments[1], precisionModel = arguments[2], bufParams = arguments[3]
    this._inputGeom = inputGeom
    this._distance = distance
    this._curveBuilder = new OffsetCurveBuilder(precisionModel, bufParams)
  }
  static clean(coords) {
    return CoordinateArrays.removeRepeatedOrInvalidPoints(coords)
  }
  static isTriangleErodedCompletely(triangleCoord, bufferDistance) {
    const tri = new Triangle(triangleCoord[0], triangleCoord[1], triangleCoord[2])
    const inCentre = tri.inCentre()
    const distToCentre = Distance.pointToSegment(inCentre, tri.p0, tri.p1)
    return distToCentre < Math.abs(bufferDistance)
  }
  static isRingCurveInverted(inputPts, distance, curvePts) {
    if (distance === 0.0) return false
    if (inputPts.length <= 3) return false
    if (inputPts.length >= BufferCurveSetBuilder.MAX_INVERTED_RING_SIZE) return false
    if (curvePts.length > BufferCurveSetBuilder.INVERTED_CURVE_VERTEX_FACTOR * inputPts.length) return false
    const distTol = BufferCurveSetBuilder.NEARNESS_FACTOR * Math.abs(distance)
    const maxDist = BufferCurveSetBuilder.maxDistance(curvePts, inputPts)
    const isCurveTooClose = maxDist < distTol
    return isCurveTooClose
  }
  static maxDistance(pts, line) {
    let maxDistance = 0
    for (const p of pts) {
      const dist = Distance.pointToSegmentString(p, line)
      if (dist > maxDistance) 
        maxDistance = dist
      
    }
    return maxDistance
  }
  static isErodedCompletely(ring, bufferDistance) {
    const ringCoord = ring.getCoordinates()
    if (ringCoord.length < 4) return bufferDistance < 0
    if (ringCoord.length === 4) return BufferCurveSetBuilder.isTriangleErodedCompletely(ringCoord, bufferDistance)
    const env = ring.getEnvelopeInternal()
    const envMinDimension = Math.min(env.getHeight(), env.getWidth())
    if (bufferDistance < 0.0 && 2 * Math.abs(bufferDistance) > envMinDimension) return true
    return false
  }
  addRingSide(coord, offsetDistance, side, cwLeftLoc, cwRightLoc) {
    if (offsetDistance === 0.0 && coord.length < LinearRing.MINIMUM_VALID_SIZE) return null
    let leftLoc = cwLeftLoc
    let rightLoc = cwRightLoc
    const isCCW = this.isRingCCW(coord)
    if (coord.length >= LinearRing.MINIMUM_VALID_SIZE && isCCW) {
      leftLoc = cwRightLoc
      rightLoc = cwLeftLoc
      side = Position.opposite(side)
    }
    const curve = this._curveBuilder.getRingCurve(coord, side, offsetDistance)
    if (BufferCurveSetBuilder.isRingCurveInverted(coord, offsetDistance, curve)) 
      return null
    
    this.addCurve(curve, leftLoc, rightLoc)
  }
  isRingCCW(coord) {
    const isCCW = Orientation.isCCWArea(coord)
    if (this._isInvertOrientation) return !isCCW
    return isCCW
  }
  addRingBothSides(coord, distance) {
    this.addRingSide(coord, distance, Position.LEFT, Location.EXTERIOR, Location.INTERIOR)
    this.addRingSide(coord, distance, Position.RIGHT, Location.INTERIOR, Location.EXTERIOR)
  }
  addPoint(p) {
    if (this._distance <= 0.0) return null
    const coord = p.getCoordinates()
    if (coord.length >= 1 && !coord[0].isValid()) return null
    const curve = this._curveBuilder.getLineCurve(coord, this._distance)
    this.addCurve(curve, Location.EXTERIOR, Location.INTERIOR)
  }
  addPolygon(p) {
    let offsetDistance = this._distance
    let offsetSide = Position.LEFT
    if (this._distance < 0.0) {
      offsetDistance = -this._distance
      offsetSide = Position.RIGHT
    }
    const shell = p.getExteriorRing()
    const shellCoord = BufferCurveSetBuilder.clean(shell.getCoordinates())
    if (this._distance < 0.0 && BufferCurveSetBuilder.isErodedCompletely(shell, this._distance)) return null
    if (this._distance <= 0.0 && shellCoord.length < 3) return null
    this.addRingSide(shellCoord, offsetDistance, offsetSide, Location.EXTERIOR, Location.INTERIOR)
    for (let i = 0; i < p.getNumInteriorRing(); i++) {
      const hole = p.getInteriorRingN(i)
      const holeCoord = BufferCurveSetBuilder.clean(hole.getCoordinates())
      if (this._distance > 0.0 && BufferCurveSetBuilder.isErodedCompletely(hole, -this._distance)) continue
      this.addRingSide(holeCoord, offsetDistance, Position.opposite(offsetSide), Location.INTERIOR, Location.EXTERIOR)
    }
  }
  setInvertOrientation(isInvertOrientation) {
    this._isInvertOrientation = isInvertOrientation
  }
  addLineString(line) {
    if (this._curveBuilder.isLineOffsetEmpty(this._distance)) return null
    const coord = BufferCurveSetBuilder.clean(line.getCoordinates())
    if (CoordinateArrays.isRing(coord) && !this._curveBuilder.getBufferParameters().isSingleSided()) {
      this.addRingBothSides(coord, this._distance)
    } else {
      const curve = this._curveBuilder.getLineCurve(coord, this._distance)
      this.addCurve(curve, Location.EXTERIOR, Location.INTERIOR)
    }
  }
  addCurve(coord, leftLoc, rightLoc) {
    if (coord === null || coord.length < 2) return null
    const e = new NodedSegmentString(coord, new Label(0, Location.BOUNDARY, leftLoc, rightLoc))
    this._curveList.add(e)
  }
  getCurves() {
    this.add(this._inputGeom)
    return this._curveList
  }
  add(g) {
    if (g.isEmpty()) return null
    if (g instanceof Polygon) this.addPolygon(g); else if (g instanceof LineString) this.addLineString(g); else if (g instanceof Point) this.addPoint(g); else if (g instanceof MultiPoint) this.addCollection(g); else if (g instanceof MultiLineString) this.addCollection(g); else if (g instanceof MultiPolygon) this.addCollection(g); else if (g instanceof GeometryCollection) this.addCollection(g); else throw new UnsupportedOperationException(g.getClass().getName())
  }
  addCollection(gc) {
    for (let i = 0; i < gc.getNumGeometries(); i++) {
      const g = gc.getGeometryN(i)
      this.add(g)
    }
  }
}
BufferCurveSetBuilder.MAX_INVERTED_RING_SIZE = 9
BufferCurveSetBuilder.INVERTED_CURVE_VERTEX_FACTOR = 4
BufferCurveSetBuilder.NEARNESS_FACTOR = 0.99
