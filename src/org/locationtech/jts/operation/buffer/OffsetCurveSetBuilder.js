import Location from '../../geom/Location'
import LineString from '../../geom/LineString'
import Position from '../../geomgraph/Position'
import Point from '../../geom/Point'
import NodedSegmentString from '../../noding/NodedSegmentString'
import Polygon from '../../geom/Polygon'
import MultiPoint from '../../geom/MultiPoint'
import LinearRing from '../../geom/LinearRing'
import Orientation from '../../algorithm/Orientation'
import MultiPolygon from '../../geom/MultiPolygon'
import Label from '../../geomgraph/Label'
import GeometryCollection from '../../geom/GeometryCollection'
import UnsupportedOperationException from '../../../../../java/lang/UnsupportedOperationException'
import CoordinateArrays from '../../geom/CoordinateArrays'
import ArrayList from '../../../../../java/util/ArrayList'
import Distance from '../../algorithm/Distance'
import MultiLineString from '../../geom/MultiLineString'
import Triangle from '../../geom/Triangle'
export default class OffsetCurveSetBuilder {
  constructor() {
    OffsetCurveSetBuilder.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._inputGeom = null
    this._distance = null
    this._curveBuilder = null
    this._curveList = new ArrayList()
    const inputGeom = arguments[0], distance = arguments[1], curveBuilder = arguments[2]
    this._inputGeom = inputGeom
    this._distance = distance
    this._curveBuilder = curveBuilder
  }
  addRingSide(coord, offsetDistance, side, cwLeftLoc, cwRightLoc) {
    if (offsetDistance === 0.0 && coord.length < LinearRing.MINIMUM_VALID_SIZE) return null
    let leftLoc = cwLeftLoc
    let rightLoc = cwRightLoc
    if (coord.length >= LinearRing.MINIMUM_VALID_SIZE && Orientation.isCCW(coord)) {
      leftLoc = cwRightLoc
      rightLoc = cwLeftLoc
      side = Position.opposite(side)
    }
    const curve = this._curveBuilder.getRingCurve(coord, side, offsetDistance)
    this.addCurve(curve, leftLoc, rightLoc)
  }
  addRingBothSides(coord, distance) {
    this.addRingSide(coord, distance, Position.LEFT, Location.EXTERIOR, Location.INTERIOR)
    this.addRingSide(coord, distance, Position.RIGHT, Location.INTERIOR, Location.EXTERIOR)
  }
  addPoint(p) {
    if (this._distance <= 0.0) return null
    const coord = p.getCoordinates()
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
    const shellCoord = CoordinateArrays.removeRepeatedPoints(shell.getCoordinates())
    if (this._distance < 0.0 && this.isErodedCompletely(shell, this._distance)) return null
    if (this._distance <= 0.0 && shellCoord.length < 3) return null
    this.addRingSide(shellCoord, offsetDistance, offsetSide, Location.EXTERIOR, Location.INTERIOR)
    for (let i = 0; i < p.getNumInteriorRing(); i++) {
      const hole = p.getInteriorRingN(i)
      const holeCoord = CoordinateArrays.removeRepeatedPoints(hole.getCoordinates())
      if (this._distance > 0.0 && this.isErodedCompletely(hole, -this._distance)) continue
      this.addRingSide(holeCoord, offsetDistance, Position.opposite(offsetSide), Location.INTERIOR, Location.EXTERIOR)
    }
  }
  isTriangleErodedCompletely(triangleCoord, bufferDistance) {
    const tri = new Triangle(triangleCoord[0], triangleCoord[1], triangleCoord[2])
    const inCentre = tri.inCentre()
    const distToCentre = Distance.pointToSegment(inCentre, tri.p0, tri.p1)
    return distToCentre < Math.abs(bufferDistance)
  }
  addLineString(line) {
    if (this._curveBuilder.isLineOffsetEmpty(this._distance)) return null
    const coord = CoordinateArrays.removeRepeatedPoints(line.getCoordinates())
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
    if (g instanceof Polygon) this.addPolygon(g); else if (g instanceof LineString) this.addLineString(g); else if (g instanceof Point) this.addPoint(g); else if (g instanceof MultiPoint) this.addCollection(g); else if (g instanceof MultiLineString) this.addCollection(g); else if (g instanceof MultiPolygon) this.addCollection(g); else if (g instanceof GeometryCollection) this.addCollection(g); else throw new UnsupportedOperationException(g.getGeometryType())
  }
  isErodedCompletely(ring, bufferDistance) {
    const ringCoord = ring.getCoordinates()
    if (ringCoord.length < 4) return bufferDistance < 0
    if (ringCoord.length === 4) return this.isTriangleErodedCompletely(ringCoord, bufferDistance)
    const env = ring.getEnvelopeInternal()
    const envMinDimension = Math.min(env.getHeight(), env.getWidth())
    if (bufferDistance < 0.0 && 2 * Math.abs(bufferDistance) > envMinDimension) return true
    return false
  }
  addCollection(gc) {
    for (let i = 0; i < gc.getNumGeometries(); i++) {
      const g = gc.getGeometryN(i)
      this.add(g)
    }
  }
}
