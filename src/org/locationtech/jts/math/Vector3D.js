import Coordinate from '../geom/Coordinate'
export default class Vector3D {
  constructor() {
    Vector3D.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._x = null
    this._y = null
    this._z = null
    if (arguments.length === 1) {
      const v = arguments[0]
      this._x = v.x
      this._y = v.y
      this._z = v.getZ()
    } else if (arguments.length === 2) {
      const from = arguments[0], to = arguments[1]
      this._x = to.x - from.x
      this._y = to.y - from.y
      this._z = to.getZ() - from.getZ()
    } else if (arguments.length === 3) {
      const x = arguments[0], y = arguments[1], z = arguments[2]
      this._x = x
      this._y = y
      this._z = z
    }
  }
  static length(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y + v.getZ() * v.getZ())
  }
  static dot() {
    if (arguments.length === 2) {
      const v1 = arguments[0], v2 = arguments[1]
      return v1.x * v2.x + v1.y * v2.y + v1.getZ() * v2.getZ()
    } else if (arguments.length === 4) {
      const A = arguments[0], B = arguments[1], C = arguments[2], D = arguments[3]
      const ABx = B.x - A.x
      const ABy = B.y - A.y
      const ABz = B.getZ() - A.getZ()
      const CDx = D.x - C.x
      const CDy = D.y - C.y
      const CDz = D.getZ() - C.getZ()
      return ABx * CDx + ABy * CDy + ABz * CDz
    }
  }
  static normalize(v) {
    const len = Vector3D.length(v)
    return new Coordinate(v.x / len, v.y / len, v.getZ() / len)
  }
  static create() {
    if (arguments.length === 1) {
      const coord = arguments[0]
      return new Vector3D(coord)
    } else if (arguments.length === 3) {
      const x = arguments[0], y = arguments[1], z = arguments[2]
      return new Vector3D(x, y, z)
    }
  }
  dot(v) {
    return this._x * v._x + this._y * v._y + this._z * v._z
  }
  getZ() {
    return this._z
  }
  subtract(v) {
    return Vector3D.create(this._x - v._x, this._y - v._y, this._z - v._z)
  }
  equals(o) {
    if (!(o instanceof Vector3D)) 
      return false
    
    const v = o
    return this._x === v._x && this._y === v._y && this._z === v._z
  }
  normalize() {
    const length = this.length()
    if (length > 0.0) return this.divide(this.length())
    return Vector3D.create(0.0, 0.0, 0.0)
  }
  divide(d) {
    return Vector3D.create(this._x / d, this._y / d, this._z / d)
  }
  getX() {
    return this._x
  }
  toString() {
    return '[' + this._x + ', ' + this._y + ', ' + this._z + ']'
  }
  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z)
  }
  getY() {
    return this._y
  }
  add(v) {
    return Vector3D.create(this._x + v._x, this._y + v._y, this._z + v._z)
  }
  hashCode() {
    let result = 17
    result = 37 * result + Coordinate.hashCode(this._x)
    result = 37 * result + Coordinate.hashCode(this._y)
    result = 37 * result + Coordinate.hashCode(this._z)
    return result
  }
}
