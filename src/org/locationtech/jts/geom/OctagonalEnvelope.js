import LineString from './LineString'
import CoordinateList from './CoordinateList'
import Geometry from './Geometry'
import hasInterface from '../../../../hasInterface'
import Coordinate from './Coordinate'
import Point from './Point'
import Double from '../../../../java/lang/Double'
import GeometryComponentFilter from './GeometryComponentFilter'
import CoordinateSequence from './CoordinateSequence'
import Envelope from './Envelope'
export default class OctagonalEnvelope {
  constructor() {
    OctagonalEnvelope.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._minX = Double.NaN
    this._maxX = null
    this._minY = null
    this._maxY = null
    this._minA = null
    this._maxA = null
    this._minB = null
    this._maxB = null
    if (arguments.length === 0) {} else if (arguments.length === 1) {
      if (arguments[0] instanceof Coordinate) {
        const p = arguments[0]
        this.expandToInclude(p)
      } else if (arguments[0] instanceof Envelope) {
        const env = arguments[0]
        this.expandToInclude(env)
      } else if (arguments[0] instanceof OctagonalEnvelope) {
        const oct = arguments[0]
        this.expandToInclude(oct)
      } else if (arguments[0] instanceof Geometry) {
        const geom = arguments[0]
        this.expandToInclude(geom)
      }
    } else if (arguments.length === 2) {
      const p0 = arguments[0], p1 = arguments[1]
      this.expandToInclude(p0)
      this.expandToInclude(p1)
    }
  }
  static octagonalEnvelope(geom) {
    return new OctagonalEnvelope(geom).toGeometry(geom.getFactory())
  }
  static computeB(x, y) {
    return x - y
  }
  static computeA(x, y) {
    return x + y
  }
  toGeometry(geomFactory) {
    if (this.isNull()) 
      return geomFactory.createPoint()
    
    const px00 = new Coordinate(this._minX, this._minA - this._minX)
    const px01 = new Coordinate(this._minX, this._minX - this._minB)
    const px10 = new Coordinate(this._maxX, this._maxX - this._maxB)
    const px11 = new Coordinate(this._maxX, this._maxA - this._maxX)
    const py00 = new Coordinate(this._minA - this._minY, this._minY)
    const py01 = new Coordinate(this._minY + this._maxB, this._minY)
    const py10 = new Coordinate(this._maxY + this._minB, this._maxY)
    const py11 = new Coordinate(this._maxA - this._maxY, this._maxY)
    const pm = geomFactory.getPrecisionModel()
    pm.makePrecise(px00)
    pm.makePrecise(px01)
    pm.makePrecise(px10)
    pm.makePrecise(px11)
    pm.makePrecise(py00)
    pm.makePrecise(py01)
    pm.makePrecise(py10)
    pm.makePrecise(py11)
    const coordList = new CoordinateList()
    coordList.add(px00, false)
    coordList.add(px01, false)
    coordList.add(py10, false)
    coordList.add(py11, false)
    coordList.add(px11, false)
    coordList.add(px10, false)
    coordList.add(py01, false)
    coordList.add(py00, false)
    if (coordList.size() === 1) 
      return geomFactory.createPoint(px00)
    
    if (coordList.size() === 2) {
      const pts = coordList.toCoordinateArray()
      return geomFactory.createLineString(pts)
    }
    coordList.add(px00, false)
    const pts = coordList.toCoordinateArray()
    return geomFactory.createPolygon(geomFactory.createLinearRing(pts))
  }
  getMinA() {
    return this._minA
  }
  getMaxB() {
    return this._maxB
  }
  isValid() {
    if (this.isNull()) return true
    return this._minX <= this._maxX && this._minY <= this._maxY && this._minA <= this._maxA && this._minB <= this._maxB
  }
  isNull() {
    return Double.isNaN(this._minX)
  }
  getMaxX() {
    return this._maxX
  }
  intersects() {
    if (arguments[0] instanceof OctagonalEnvelope) {
      const other = arguments[0]
      if (this.isNull() || other.isNull()) 
        return false
      
      if (this._minX > other._maxX) return false
      if (this._maxX < other._minX) return false
      if (this._minY > other._maxY) return false
      if (this._maxY < other._minY) return false
      if (this._minA > other._maxA) return false
      if (this._maxA < other._minA) return false
      if (this._minB > other._maxB) return false
      if (this._maxB < other._minB) return false
      return true
    } else if (arguments[0] instanceof Coordinate) {
      const p = arguments[0]
      if (this._minX > p.x) return false
      if (this._maxX < p.x) return false
      if (this._minY > p.y) return false
      if (this._maxY < p.y) return false
      const A = OctagonalEnvelope.computeA(p.x, p.y)
      const B = OctagonalEnvelope.computeB(p.x, p.y)
      if (this._minA > A) return false
      if (this._maxA < A) return false
      if (this._minB > B) return false
      if (this._maxB < B) return false
      return true
    }
  }
  getMinY() {
    return this._minY
  }
  getMinX() {
    return this._minX
  }
  expandToInclude() {
    if (arguments.length === 1) {
      if (arguments[0] instanceof Geometry) {
        const g = arguments[0]
        g.apply(new BoundingOctagonComponentFilter(this))
      } else if (hasInterface(arguments[0], CoordinateSequence)) {
        const seq = arguments[0]
        for (let i = 0; i < seq.size(); i++) {
          const x = seq.getX(i)
          const y = seq.getY(i)
          this.expandToInclude(x, y)
        }
        return this
      } else if (arguments[0] instanceof OctagonalEnvelope) {
        const oct = arguments[0]
        if (oct.isNull()) return this
        if (this.isNull()) {
          this._minX = oct._minX
          this._maxX = oct._maxX
          this._minY = oct._minY
          this._maxY = oct._maxY
          this._minA = oct._minA
          this._maxA = oct._maxA
          this._minB = oct._minB
          this._maxB = oct._maxB
          return this
        }
        if (oct._minX < this._minX) this._minX = oct._minX
        if (oct._maxX > this._maxX) this._maxX = oct._maxX
        if (oct._minY < this._minY) this._minY = oct._minY
        if (oct._maxY > this._maxY) this._maxY = oct._maxY
        if (oct._minA < this._minA) this._minA = oct._minA
        if (oct._maxA > this._maxA) this._maxA = oct._maxA
        if (oct._minB < this._minB) this._minB = oct._minB
        if (oct._maxB > this._maxB) this._maxB = oct._maxB
        return this
      } else if (arguments[0] instanceof Coordinate) {
        const p = arguments[0]
        this.expandToInclude(p.x, p.y)
        return this
      } else if (arguments[0] instanceof Envelope) {
        const env = arguments[0]
        this.expandToInclude(env.getMinX(), env.getMinY())
        this.expandToInclude(env.getMinX(), env.getMaxY())
        this.expandToInclude(env.getMaxX(), env.getMinY())
        this.expandToInclude(env.getMaxX(), env.getMaxY())
        return this
      }
    } else if (arguments.length === 2) {
      const x = arguments[0], y = arguments[1]
      const A = OctagonalEnvelope.computeA(x, y)
      const B = OctagonalEnvelope.computeB(x, y)
      if (this.isNull()) {
        this._minX = x
        this._maxX = x
        this._minY = y
        this._maxY = y
        this._minA = A
        this._maxA = A
        this._minB = B
        this._maxB = B
      } else {
        if (x < this._minX) this._minX = x
        if (x > this._maxX) this._maxX = x
        if (y < this._minY) this._minY = y
        if (y > this._maxY) this._maxY = y
        if (A < this._minA) this._minA = A
        if (A > this._maxA) this._maxA = A
        if (B < this._minB) this._minB = B
        if (B > this._maxB) this._maxB = B
      }
      return this
    }
  }
  getMinB() {
    return this._minB
  }
  setToNull() {
    this._minX = Double.NaN
  }
  expandBy(distance) {
    if (this.isNull()) return null
    const diagonalDistance = OctagonalEnvelope.SQRT2 * distance
    this._minX -= distance
    this._maxX += distance
    this._minY -= distance
    this._maxY += distance
    this._minA -= diagonalDistance
    this._maxA += diagonalDistance
    this._minB -= diagonalDistance
    this._maxB += diagonalDistance
    if (!this.isValid()) this.setToNull()
  }
  getMaxA() {
    return this._maxA
  }
  contains(other) {
    if (this.isNull() || other.isNull()) 
      return false
    
    return other._minX >= this._minX && other._maxX <= this._maxX && other._minY >= this._minY && other._maxY <= this._maxY && other._minA >= this._minA && other._maxA <= this._maxA && other._minB >= this._minB && other._maxB <= this._maxB
  }
  getMaxY() {
    return this._maxY
  }
}
class BoundingOctagonComponentFilter {
  constructor() {
    BoundingOctagonComponentFilter.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this.oe = null
    const oe = arguments[0]
    this.oe = oe
  }
  filter(geom) {
    if (geom instanceof LineString) 
      this.oe.expandToInclude(geom.getCoordinateSequence())
    else if (geom instanceof Point) 
      this.oe.expandToInclude(geom.getCoordinateSequence())
    
  }
  get interfaces_() {
    return [GeometryComponentFilter]
  }
}
OctagonalEnvelope.BoundingOctagonComponentFilter = BoundingOctagonComponentFilter
OctagonalEnvelope.SQRT2 = Math.sqrt(2.0)
