import NumberUtil from '../util/NumberUtil'
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException'
import Double from '../../../../java/lang/Double'
import Comparable from '../../../../java/lang/Comparable'
import Cloneable from '../../../../java/lang/Cloneable'
import Comparator from '../../../../java/util/Comparator'
import Serializable from '../../../../java/io/Serializable'
import Assert from '../util/Assert'

const kBuf = new ArrayBuffer(8)
const kBufAsF64 = new Float64Array(kBuf)
const kBufAsI32 = new Int32Array(kBuf)

export default class Coordinate {
  constructor() {
    Coordinate.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this.x = null
    this.y = null
    this.z = null
    if (arguments.length === 0) {
      Coordinate.constructor_.call(this, 0.0, 0.0)
    } else if (arguments.length === 1) {
      const c = arguments[0]
      Coordinate.constructor_.call(this, c.x, c.y, c.getZ())
    } else if (arguments.length === 2) {
      const x = arguments[0], y = arguments[1]
      Coordinate.constructor_.call(this, x, y, Coordinate.NULL_ORDINATE)
    } else if (arguments.length === 3) {
      const x = arguments[0], y = arguments[1], z = arguments[2]
      this.x = x
      this.y = y
      this.z = z
    }
  }
  static hashCode(n) {
    kBufAsF64[0] = n
    return kBufAsI32[0] ^ kBufAsI32[1]
  }
  getM() {
    return Double.NaN
  }
  setOrdinate(ordinateIndex, value) {
    switch (ordinateIndex) {
    case Coordinate.X:
      this.x = value
      break
    case Coordinate.Y:
      this.y = value
      break
    case Coordinate.Z:
      this.setZ(value)
      break
    default:
      throw new IllegalArgumentException('Invalid ordinate index: ' + ordinateIndex)
    }
  }
  equals2D() {
    if (arguments.length === 1) {
      const other = arguments[0]
      if (this.x !== other.x) 
        return false
      
      if (this.y !== other.y) 
        return false
      
      return true
    } else if (arguments.length === 2) {
      const c = arguments[0], tolerance = arguments[1]
      if (!NumberUtil.equalsWithTolerance(this.x, c.x, tolerance)) 
        return false
      
      if (!NumberUtil.equalsWithTolerance(this.y, c.y, tolerance)) 
        return false
      
      return true
    }
  }
  setM(m) {
    throw new IllegalArgumentException('Invalid ordinate index: ' + Coordinate.M)
  }
  getZ() {
    return this.z
  }
  getOrdinate(ordinateIndex) {
    switch (ordinateIndex) {
    case Coordinate.X:
      return this.x
    case Coordinate.Y:
      return this.y
    case Coordinate.Z:
      return this.getZ()
    }
    throw new IllegalArgumentException('Invalid ordinate index: ' + ordinateIndex)
  }
  equals3D(other) {
    return this.x === other.x && this.y === other.y && (this.getZ() === other.getZ() || Double.isNaN(this.getZ()) && Double.isNaN(other.getZ()))
  }
  equals(other) {
    if (!(other instanceof Coordinate)) 
      return false
    
    return this.equals2D(other)
  }
  equalInZ(c, tolerance) {
    return NumberUtil.equalsWithTolerance(this.getZ(), c.getZ(), tolerance)
  }
  setX(x) {
    this.x = x
  }
  compareTo(o) {
    const other = o
    if (this.x < other.x) return -1
    if (this.x > other.x) return 1
    if (this.y < other.y) return -1
    if (this.y > other.y) return 1
    return 0
  }
  getX() {
    return this.x
  }
  setZ(z) {
    this.z = z
  }
  clone() {
    try {
      const coord = null
      return coord
    } catch (e) {
      if (e instanceof CloneNotSupportedException) {
        Assert.shouldNeverReachHere('this shouldn\'t happen because this class is Cloneable')
        return null
      } else {
        throw e
      }
    } finally {}
  }
  copy() {
    return new Coordinate(this)
  }
  toString() {
    return '(' + this.x + ', ' + this.y + ', ' + this.getZ() + ')'
  }
  distance3D(c) {
    const dx = this.x - c.x
    const dy = this.y - c.y
    const dz = this.getZ() - c.getZ()
    return Math.sqrt(dx * dx + dy * dy + dz * dz)
  }
  getY() {
    return this.y
  }
  setY(y) {
    this.y = y
  }
  distance(c) {
    const dx = this.x - c.x
    const dy = this.y - c.y
    return Math.sqrt(dx * dx + dy * dy)
  }
  hashCode() {
    let result = 17
    result = 37 * result + Coordinate.hashCode(this.x)
    result = 37 * result + Coordinate.hashCode(this.y)
    return result
  }
  setCoordinate(other) {
    this.x = other.x
    this.y = other.y
    this.z = other.getZ()
  }
  get interfaces_() {
    return [Comparable, Cloneable, Serializable]
  }
}
class DimensionalComparator {
  constructor() {
    DimensionalComparator.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._dimensionsToTest = 2
    if (arguments.length === 0) {
      DimensionalComparator.constructor_.call(this, 2)
    } else if (arguments.length === 1) {
      const dimensionsToTest = arguments[0]
      if (dimensionsToTest !== 2 && dimensionsToTest !== 3) throw new IllegalArgumentException('only 2 or 3 dimensions may be specified')
      this._dimensionsToTest = dimensionsToTest
    }
  }
  static compare(a, b) {
    if (a < b) return -1
    if (a > b) return 1
    if (Double.isNaN(a)) {
      if (Double.isNaN(b)) return 0
      return -1
    }
    if (Double.isNaN(b)) return 1
    return 0
  }
  compare(c1, c2) {
    const compX = DimensionalComparator.compare(c1.x, c2.x)
    if (compX !== 0) return compX
    const compY = DimensionalComparator.compare(c1.y, c2.y)
    if (compY !== 0) return compY
    if (this._dimensionsToTest <= 2) return 0
    const compZ = DimensionalComparator.compare(c1.getZ(), c2.getZ())
    return compZ
  }
  get interfaces_() {
    return [Comparator]
  }
}
Coordinate.DimensionalComparator = DimensionalComparator
Coordinate.NULL_ORDINATE = Double.NaN
Coordinate.X = 0
Coordinate.Y = 1
Coordinate.Z = 2
Coordinate.M = 3
