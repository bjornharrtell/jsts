import LineString from '../../geom/LineString'
import Coordinate from '../../geom/Coordinate'
import Point from '../../geom/Point'
import Polygon from '../../geom/Polygon'
export default class RectangleContains {
  constructor() {
    RectangleContains.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._rectEnv = null
    const rectangle = arguments[0]
    this._rectEnv = rectangle.getEnvelopeInternal()
  }
  static contains(rectangle, b) {
    const rc = new RectangleContains(rectangle)
    return rc.contains(b)
  }
  isContainedInBoundary(geom) {
    if (geom instanceof Polygon) return false
    if (geom instanceof Point) return this.isPointContainedInBoundary(geom)
    if (geom instanceof LineString) return this.isLineStringContainedInBoundary(geom)
    for (let i = 0; i < geom.getNumGeometries(); i++) {
      const comp = geom.getGeometryN(i)
      if (!this.isContainedInBoundary(comp)) return false
    }
    return true
  }
  isLineSegmentContainedInBoundary(p0, p1) {
    if (p0.equals(p1)) return this.isPointContainedInBoundary(p0)
    if (p0.x === p1.x) {
      if (p0.x === this._rectEnv.getMinX() || p0.x === this._rectEnv.getMaxX()) return true
    } else if (p0.y === p1.y) {
      if (p0.y === this._rectEnv.getMinY() || p0.y === this._rectEnv.getMaxY()) return true
    }
    return false
  }
  isLineStringContainedInBoundary(line) {
    const seq = line.getCoordinateSequence()
    const p0 = new Coordinate()
    const p1 = new Coordinate()
    for (let i = 0; i < seq.size() - 1; i++) {
      seq.getCoordinate(i, p0)
      seq.getCoordinate(i + 1, p1)
      if (!this.isLineSegmentContainedInBoundary(p0, p1)) return false
    }
    return true
  }
  isPointContainedInBoundary() {
    if (arguments[0] instanceof Point) {
      const point = arguments[0]
      return this.isPointContainedInBoundary(point.getCoordinate())
    } else if (arguments[0] instanceof Coordinate) {
      const pt = arguments[0]
      return pt.x === this._rectEnv.getMinX() || pt.x === this._rectEnv.getMaxX() || pt.y === this._rectEnv.getMinY() || pt.y === this._rectEnv.getMaxY()
    }
  }
  contains(geom) {
    if (!this._rectEnv.contains(geom.getEnvelopeInternal())) return false
    if (this.isContainedInBoundary(geom)) return false
    return true
  }
}
