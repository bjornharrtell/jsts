import Coordinate from '../../geom/Coordinate'
import Polygon from '../../geom/Polygon'
import RectangleLineIntersector from '../../algorithm/RectangleLineIntersector'
import ShortCircuitedGeometryVisitor from '../../geom/util/ShortCircuitedGeometryVisitor'
import SimplePointInAreaLocator from '../../algorithm/locate/SimplePointInAreaLocator'
import LinearComponentExtracter from '../../geom/util/LinearComponentExtracter'
export default class RectangleIntersects {
  constructor() {
    RectangleIntersects.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._rectangle = null
    this._rectEnv = null
    const rectangle = arguments[0]
    this._rectangle = rectangle
    this._rectEnv = rectangle.getEnvelopeInternal()
  }
  static intersects(rectangle, b) {
    const rp = new RectangleIntersects(rectangle)
    return rp.intersects(b)
  }
  intersects(geom) {
    if (!this._rectEnv.intersects(geom.getEnvelopeInternal())) return false
    const visitor = new EnvelopeIntersectsVisitor(this._rectEnv)
    visitor.applyTo(geom)
    if (visitor.intersects()) return true
    const ecpVisitor = new GeometryContainsPointVisitor(this._rectangle)
    ecpVisitor.applyTo(geom)
    if (ecpVisitor.containsPoint()) return true
    const riVisitor = new RectangleIntersectsSegmentVisitor(this._rectangle)
    riVisitor.applyTo(geom)
    if (riVisitor.intersects()) return true
    return false
  }
}
class EnvelopeIntersectsVisitor extends ShortCircuitedGeometryVisitor {
  constructor() {
    super()
    EnvelopeIntersectsVisitor.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._rectEnv = null
    this._intersects = false
    const rectEnv = arguments[0]
    this._rectEnv = rectEnv
  }
  isDone() {
    return this._intersects === true
  }
  visit(element) {
    const elementEnv = element.getEnvelopeInternal()
    if (!this._rectEnv.intersects(elementEnv)) 
      return null
    
    if (this._rectEnv.contains(elementEnv)) {
      this._intersects = true
      return null
    }
    if (elementEnv.getMinX() >= this._rectEnv.getMinX() && elementEnv.getMaxX() <= this._rectEnv.getMaxX()) {
      this._intersects = true
      return null
    }
    if (elementEnv.getMinY() >= this._rectEnv.getMinY() && elementEnv.getMaxY() <= this._rectEnv.getMaxY()) {
      this._intersects = true
      return null
    }
  }
  intersects() {
    return this._intersects
  }
}
class GeometryContainsPointVisitor extends ShortCircuitedGeometryVisitor {
  constructor() {
    super()
    GeometryContainsPointVisitor.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._rectSeq = null
    this._rectEnv = null
    this._containsPoint = false
    const rectangle = arguments[0]
    this._rectSeq = rectangle.getExteriorRing().getCoordinateSequence()
    this._rectEnv = rectangle.getEnvelopeInternal()
  }
  isDone() {
    return this._containsPoint === true
  }
  visit(geom) {
    if (!(geom instanceof Polygon)) return null
    const elementEnv = geom.getEnvelopeInternal()
    if (!this._rectEnv.intersects(elementEnv)) return null
    const rectPt = new Coordinate()
    for (let i = 0; i < 4; i++) {
      this._rectSeq.getCoordinate(i, rectPt)
      if (!elementEnv.contains(rectPt)) continue
      if (SimplePointInAreaLocator.containsPointInPolygon(rectPt, geom)) {
        this._containsPoint = true
        return null
      }
    }
  }
  containsPoint() {
    return this._containsPoint
  }
}
class RectangleIntersectsSegmentVisitor extends ShortCircuitedGeometryVisitor {
  constructor() {
    super()
    RectangleIntersectsSegmentVisitor.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._rectEnv = null
    this._rectIntersector = null
    this._hasIntersection = false
    this._p0 = new Coordinate()
    this._p1 = new Coordinate()
    const rectangle = arguments[0]
    this._rectEnv = rectangle.getEnvelopeInternal()
    this._rectIntersector = new RectangleLineIntersector(this._rectEnv)
  }
  intersects() {
    return this._hasIntersection
  }
  isDone() {
    return this._hasIntersection === true
  }
  visit(geom) {
    const elementEnv = geom.getEnvelopeInternal()
    if (!this._rectEnv.intersects(elementEnv)) return null
    const lines = LinearComponentExtracter.getLines(geom)
    this.checkIntersectionWithLineStrings(lines)
  }
  checkIntersectionWithLineStrings(lines) {
    for (let i = lines.iterator(); i.hasNext(); ) {
      const testLine = i.next()
      this.checkIntersectionWithSegments(testLine)
      if (this._hasIntersection) return null
    }
  }
  checkIntersectionWithSegments(testLine) {
    const seq1 = testLine.getCoordinateSequence()
    for (let j = 1; j < seq1.size(); j++) {
      seq1.getCoordinate(j - 1, this._p0)
      seq1.getCoordinate(j, this._p1)
      if (this._rectIntersector.intersects(this._p0, this._p1)) {
        this._hasIntersection = true
        return null
      }
    }
  }
}
