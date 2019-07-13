import Coordinate from '../geom/Coordinate'
export default class Vector3D {
  constructor () {
    Vector3D.constructor_.apply(this, arguments)
  }

  static length (v) {
    return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z)
  }

  static dot () {
    if (arguments.length === 2) {
      const v1 = arguments[0]; const v2 = arguments[1]
      return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z
    } else if (arguments.length === 4) {
      const A = arguments[0]; const B = arguments[1]; const C = arguments[2]; const D = arguments[3]
      var ABx = B.x - A.x
      var ABy = B.y - A.y
      var ABz = B.z - A.z
      var CDx = D.x - C.x
      var CDy = D.y - C.y
      var CDz = D.z - C.z
      return ABx * CDx + ABy * CDy + ABz * CDz
    }
  }

  static normalize (v) {
    var len = Vector3D.length(v)
    return new Coordinate(v.x / len, v.y / len, v.z / len)
  }

  static create () {
    if (arguments.length === 1) {
      const coord = arguments[0]
      return new Vector3D(coord)
    } else if (arguments.length === 3) {
      const x = arguments[0]; const y = arguments[1]; const z = arguments[2]
      return new Vector3D(x, y, z)
    }
  }

  dot (v) {
    return this._x * v._x + this._y * v._y + this._z * v._z
  }

  getZ () {
    return this._z
  }

  normalize () {
    var length = this.length()
    if (length > 0.0) return this.divide(this.length())
    return Vector3D.create(0.0, 0.0, 0.0)
  }

  divide (d) {
    return Vector3D.create(this._x / d, this._y / d, this._z / d)
  }

  getX () {
    return this._x
  }

  toString () {
    return '[' + this._x + ', ' + this._y + ', ' + this._z + ']'
  }

  length () {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z)
  }

  getY () {
    return this._y
  }

  getClass () {
    return Vector3D
  }

  get interfaces_ () {
    return []
  }
}
Vector3D.constructor_ = function () {
  this._x = null
  this._y = null
  this._z = null
  if (arguments.length === 1) {
    const v = arguments[0]
    this._x = v.x
    this._y = v.y
    this._z = v.z
  } else if (arguments.length === 2) {
    const from = arguments[0]; const to = arguments[1]
    this._x = to.x - from.x
    this._y = to.y - from.y
    this._z = to.z - from.z
  } else if (arguments.length === 3) {
    const x = arguments[0]; const y = arguments[1]; const z = arguments[2]
    this._x = x
    this._y = y
    this._z = z
  }
}
