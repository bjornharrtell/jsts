import Coordinate from '../geom/Coordinate'
import LineSegment from '../geom/LineSegment'
import Comparable from '../../../../java/lang/Comparable'
export default class LinearLocation {
  constructor() {
    LinearLocation.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._componentIndex = 0
    this._segmentIndex = 0
    this._segmentFraction = 0.0
    if (arguments.length === 0) {} else if (arguments.length === 1) {
      const loc = arguments[0]
      this._componentIndex = loc._componentIndex
      this._segmentIndex = loc._segmentIndex
      this._segmentFraction = loc._segmentFraction
    } else if (arguments.length === 2) {
      const segmentIndex = arguments[0], segmentFraction = arguments[1]
      LinearLocation.constructor_.call(this, 0, segmentIndex, segmentFraction)
    } else if (arguments.length === 3) {
      const componentIndex = arguments[0], segmentIndex = arguments[1], segmentFraction = arguments[2]
      this._componentIndex = componentIndex
      this._segmentIndex = segmentIndex
      this._segmentFraction = segmentFraction
      this.normalize()
    } else if (arguments.length === 4) {
      const componentIndex = arguments[0], segmentIndex = arguments[1], segmentFraction = arguments[2], doNormalize = arguments[3]
      this._componentIndex = componentIndex
      this._segmentIndex = segmentIndex
      this._segmentFraction = segmentFraction
      if (doNormalize) this.normalize()
    }
  }
  static getEndLocation(linear) {
    const loc = new LinearLocation()
    loc.setToEnd(linear)
    return loc
  }
  static pointAlongSegmentByFraction(p0, p1, frac) {
    if (frac <= 0.0) return p0
    if (frac >= 1.0) return p1
    const x = (p1.x - p0.x) * frac + p0.x
    const y = (p1.y - p0.y) * frac + p0.y
    const z = (p1.getZ() - p0.getZ()) * frac + p0.getZ()
    return new Coordinate(x, y, z)
  }
  static compareLocationValues(componentIndex0, segmentIndex0, segmentFraction0, componentIndex1, segmentIndex1, segmentFraction1) {
    if (componentIndex0 < componentIndex1) return -1
    if (componentIndex0 > componentIndex1) return 1
    if (segmentIndex0 < segmentIndex1) return -1
    if (segmentIndex0 > segmentIndex1) return 1
    if (segmentFraction0 < segmentFraction1) return -1
    if (segmentFraction0 > segmentFraction1) return 1
    return 0
  }
  static numSegments(line) {
    const npts = line.getNumPoints()
    if (npts <= 1) return 0
    return npts - 1
  }
  getSegmentIndex() {
    return this._segmentIndex
  }
  getComponentIndex() {
    return this._componentIndex
  }
  isEndpoint(linearGeom) {
    const lineComp = linearGeom.getGeometryN(this._componentIndex)
    const nseg = LinearLocation.numSegments(lineComp)
    return this._segmentIndex >= nseg || this._segmentIndex === nseg - 1 && this._segmentFraction >= 1.0
  }
  isValid(linearGeom) {
    if (this._componentIndex < 0 || this._componentIndex >= linearGeom.getNumGeometries()) return false
    const lineComp = linearGeom.getGeometryN(this._componentIndex)
    if (this._segmentIndex < 0 || this._segmentIndex > lineComp.getNumPoints()) return false
    if (this._segmentIndex === lineComp.getNumPoints() && this._segmentFraction !== 0.0) return false
    if (this._segmentFraction < 0.0 || this._segmentFraction > 1.0) return false
    return true
  }
  normalize() {
    if (this._segmentFraction < 0.0) 
      this._segmentFraction = 0.0
    
    if (this._segmentFraction > 1.0) 
      this._segmentFraction = 1.0
    
    if (this._componentIndex < 0) {
      this._componentIndex = 0
      this._segmentIndex = 0
      this._segmentFraction = 0.0
    }
    if (this._segmentIndex < 0) {
      this._segmentIndex = 0
      this._segmentFraction = 0.0
    }
    if (this._segmentFraction === 1.0) {
      this._segmentFraction = 0.0
      this._segmentIndex += 1
    }
  }
  toLowest(linearGeom) {
    const lineComp = linearGeom.getGeometryN(this._componentIndex)
    const nseg = LinearLocation.numSegments(lineComp)
    if (this._segmentIndex < nseg) return this
    return new LinearLocation(this._componentIndex, nseg - 1, 1.0, false)
  }
  getCoordinate(linearGeom) {
    const lineComp = linearGeom.getGeometryN(this._componentIndex)
    const p0 = lineComp.getCoordinateN(this._segmentIndex)
    if (this._segmentIndex >= LinearLocation.numSegments(lineComp)) return p0
    const p1 = lineComp.getCoordinateN(this._segmentIndex + 1)
    return LinearLocation.pointAlongSegmentByFraction(p0, p1, this._segmentFraction)
  }
  getSegmentFraction() {
    return this._segmentFraction
  }
  getSegment(linearGeom) {
    const lineComp = linearGeom.getGeometryN(this._componentIndex)
    const p0 = lineComp.getCoordinateN(this._segmentIndex)
    if (this._segmentIndex >= LinearLocation.numSegments(lineComp)) {
      const prev = lineComp.getCoordinateN(lineComp.getNumPoints() - 2)
      return new LineSegment(prev, p0)
    }
    const p1 = lineComp.getCoordinateN(this._segmentIndex + 1)
    return new LineSegment(p0, p1)
  }
  clamp(linear) {
    if (this._componentIndex >= linear.getNumGeometries()) {
      this.setToEnd(linear)
      return null
    }
    if (this._segmentIndex >= linear.getNumPoints()) {
      const line = linear.getGeometryN(this._componentIndex)
      this._segmentIndex = LinearLocation.numSegments(line)
      this._segmentFraction = 1.0
    }
  }
  setToEnd(linear) {
    this._componentIndex = linear.getNumGeometries() - 1
    const lastLine = linear.getGeometryN(this._componentIndex)
    this._segmentIndex = LinearLocation.numSegments(lastLine)
    this._segmentFraction = 0.0
  }
  compareTo(o) {
    const other = o
    if (this._componentIndex < other._componentIndex) return -1
    if (this._componentIndex > other._componentIndex) return 1
    if (this._segmentIndex < other._segmentIndex) return -1
    if (this._segmentIndex > other._segmentIndex) return 1
    if (this._segmentFraction < other._segmentFraction) return -1
    if (this._segmentFraction > other._segmentFraction) return 1
    return 0
  }
  copy() {
    return new LinearLocation(this._componentIndex, this._segmentIndex, this._segmentFraction)
  }
  toString() {
    return 'LinearLoc[' + this._componentIndex + ', ' + this._segmentIndex + ', ' + this._segmentFraction + ']'
  }
  isOnSameSegment(loc) {
    if (this._componentIndex !== loc._componentIndex) return false
    if (this._segmentIndex === loc._segmentIndex) return true
    if (loc._segmentIndex - this._segmentIndex === 1 && loc._segmentFraction === 0.0) return true
    if (this._segmentIndex - loc._segmentIndex === 1 && this._segmentFraction === 0.0) return true
    return false
  }
  snapToVertex(linearGeom, minDistance) {
    if (this._segmentFraction <= 0.0 || this._segmentFraction >= 1.0) return null
    const segLen = this.getSegmentLength(linearGeom)
    const lenToStart = this._segmentFraction * segLen
    const lenToEnd = segLen - lenToStart
    if (lenToStart <= lenToEnd && lenToStart < minDistance) 
      this._segmentFraction = 0.0
    else if (lenToEnd <= lenToStart && lenToEnd < minDistance) 
      this._segmentFraction = 1.0
    
  }
  compareLocationValues(componentIndex1, segmentIndex1, segmentFraction1) {
    if (this._componentIndex < componentIndex1) return -1
    if (this._componentIndex > componentIndex1) return 1
    if (this._segmentIndex < segmentIndex1) return -1
    if (this._segmentIndex > segmentIndex1) return 1
    if (this._segmentFraction < segmentFraction1) return -1
    if (this._segmentFraction > segmentFraction1) return 1
    return 0
  }
  getSegmentLength(linearGeom) {
    const lineComp = linearGeom.getGeometryN(this._componentIndex)
    let segIndex = this._segmentIndex
    if (this._segmentIndex >= LinearLocation.numSegments(lineComp)) segIndex = lineComp.getNumPoints() - 2
    const p0 = lineComp.getCoordinateN(segIndex)
    const p1 = lineComp.getCoordinateN(segIndex + 1)
    return p0.distance(p1)
  }
  isVertex() {
    return this._segmentFraction <= 0.0 || this._segmentFraction >= 1.0
  }
  get interfaces_() {
    return [Comparable]
  }
}
