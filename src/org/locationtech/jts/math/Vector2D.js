import Coordinate from '../geom/Coordinate'
import CGAlgorithmsDD from '../algorithm/CGAlgorithmsDD'
import Angle from '../algorithm/Angle'
import Assert from '../util/Assert'
export default class Vector2D {
  constructor() {
    Vector2D.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._x = null
    this._y = null
    if (arguments.length === 0) {
      Vector2D.constructor_.call(this, 0.0, 0.0)
    } else if (arguments.length === 1) {
      if (arguments[0] instanceof Vector2D) {
        const v = arguments[0]
        this._x = v._x
        this._y = v._y
      } else if (arguments[0] instanceof Coordinate) {
        const v = arguments[0]
        this._x = v.x
        this._y = v.y
      }
    } else if (arguments.length === 2) {
      if (typeof arguments[0] === 'number' && typeof arguments[1] === 'number') {
        const x = arguments[0], y = arguments[1]
        this._x = x
        this._y = y
      } else if (arguments[0] instanceof Coordinate && arguments[1] instanceof Coordinate) {
        const from = arguments[0], to = arguments[1]
        this._x = to.x - from.x
        this._y = to.y - from.y
      }
    }
  }
  static create() {
    if (arguments.length === 1) {
      if (arguments[0] instanceof Vector2D) {
        const v = arguments[0]
        return new Vector2D(v)
      } else if (arguments[0] instanceof Coordinate) {
        const coord = arguments[0]
        return new Vector2D(coord)
      }
    } else if (arguments.length === 2) {
      if (typeof arguments[0] === 'number' && typeof arguments[1] === 'number') {
        const x = arguments[0], y = arguments[1]
        return new Vector2D(x, y)
      } else if (arguments[0] instanceof Coordinate && arguments[1] instanceof Coordinate) {
        const from = arguments[0], to = arguments[1]
        return new Vector2D(from, to)
      }
    }
  }
  dot(v) {
    return this._x * v._x + this._y * v._y
  }
  isParallel(v) {
    return 0.0 === CGAlgorithmsDD.signOfDet2x2(this._x, this._y, v._x, v._y)
  }
  getComponent(index) {
    if (index === 0) return this._x
    return this._y
  }
  subtract(v) {
    return Vector2D.create(this._x - v._x, this._y - v._y)
  }
  equals(o) {
    if (!(o instanceof Vector2D)) 
      return false
    
    const v = o
    return this._x === v._x && this._y === v._y
  }
  normalize() {
    const length = this.length()
    if (length > 0.0) return this.divide(length)
    return Vector2D.create(0.0, 0.0)
  }
  angle() {
    if (arguments.length === 0) {
      return Math.atan2(this._y, this._x)
    } else if (arguments.length === 1) {
      const v = arguments[0]
      return Angle.diff(v.angle(), this.angle())
    }
  }
  weightedSum(v, frac) {
    return Vector2D.create(frac * this._x + (1.0 - frac) * v._x, frac * this._y + (1.0 - frac) * v._y)
  }
  divide(d) {
    return Vector2D.create(this._x / d, this._y / d)
  }
  rotateByQuarterCircle(numQuarters) {
    let nQuad = numQuarters % 4
    if (numQuarters < 0 && nQuad !== 0) 
      nQuad = nQuad + 4
    
    switch (nQuad) {
    case 0:
      return Vector2D.create(this._x, this._y)
    case 1:
      return Vector2D.create(-this._y, this._x)
    case 2:
      return Vector2D.create(-this._x, -this._y)
    case 3:
      return Vector2D.create(this._y, -this._x)
    }
    Assert.shouldNeverReachHere()
    return null
  }
  rotate(angle) {
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    return Vector2D.create(this._x * cos - this._y * sin, this._x * sin + this._y * cos)
  }
  angleTo(v) {
    const a1 = this.angle()
    const a2 = v.angle()
    const angDel = a2 - a1
    if (angDel <= -Math.PI) return angDel + Angle.PI_TIMES_2
    if (angDel > Math.PI) return angDel - Angle.PI_TIMES_2
    return angDel
  }
  getX() {
    return this._x
  }
  lengthSquared() {
    return this._x * this._x + this._y * this._y
  }
  negate() {
    return Vector2D.create(-this._x, -this._y)
  }
  clone() {
    return new Vector2D(this)
  }
  toCoordinate() {
    return new Coordinate(this._x, this._y)
  }
  translate(coord) {
    return new Coordinate(this._x + coord.x, this._y + coord.y)
  }
  multiply(d) {
    return Vector2D.create(this._x * d, this._y * d)
  }
  toString() {
    return '[' + this._x + ', ' + this._y + ']'
  }
  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y)
  }
  average(v) {
    return this.weightedSum(v, 0.5)
  }
  getY() {
    return this._y
  }
  add(v) {
    return Vector2D.create(this._x + v._x, this._y + v._y)
  }
  distance(v) {
    const delx = v._x - this._x
    const dely = v._y - this._y
    return Math.sqrt(delx * delx + dely * dely)
  }
  hashCode() {
    let result = 17
    result = 37 * result + Coordinate.hashCode(this._x)
    result = 37 * result + Coordinate.hashCode(this._y)
    return result
  }
}
