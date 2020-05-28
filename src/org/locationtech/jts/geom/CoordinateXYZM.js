import Coordinate from './Coordinate'
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException'
export default class CoordinateXYZM extends Coordinate {
  constructor() {
    super()
    CoordinateXYZM.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._m = null
    if (arguments.length === 0) {
      Coordinate.constructor_.call(this)
      this._m = 0.0
    } else if (arguments.length === 1) {
      if (arguments[0] instanceof CoordinateXYZM) {
        const coord = arguments[0]
        Coordinate.constructor_.call(this, coord)
        this._m = coord._m
      } else if (arguments[0] instanceof Coordinate) {
        const coord = arguments[0]
        Coordinate.constructor_.call(this, coord)
        this._m = this.getM()
      }
    } else if (arguments.length === 4) {
      const x = arguments[0], y = arguments[1], z = arguments[2], m = arguments[3]
      Coordinate.constructor_.call(this, x, y, z)
      this._m = m
    }
  }
  getM() {
    return this._m
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
      this.z = value
      break
    case Coordinate.M:
      this._m = value
      break
    default:
      throw new IllegalArgumentException('Invalid ordinate index: ' + ordinateIndex)
    }
  }
  setM(m) {
    this._m = m
  }
  getOrdinate(ordinateIndex) {
    switch (ordinateIndex) {
    case Coordinate.X:
      return this.x
    case Coordinate.Y:
      return this.y
    case Coordinate.Z:
      return this.getZ()
    case Coordinate.M:
      return this.getM()
    }
    throw new IllegalArgumentException('Invalid ordinate index: ' + ordinateIndex)
  }
  copy() {
    return new CoordinateXYZM(this)
  }
  toString() {
    return '(' + this.x + ', ' + this.y + ', ' + this.getZ() + ' m=' + this.getM() + ')'
  }
  setCoordinate(other) {
    this.x = other.x
    this.y = other.y
    this.z = other.getZ()
    this._m = other.getM()
  }
}
