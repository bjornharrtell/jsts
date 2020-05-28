import Coordinate from './Coordinate'
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException'
export default class CoordinateXYM extends Coordinate {
  constructor() {
    super()
    CoordinateXYM.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._m = null
    if (arguments.length === 0) {
      Coordinate.constructor_.call(this)
      this._m = 0.0
    } else if (arguments.length === 1) {
      if (arguments[0] instanceof CoordinateXYM) {
        const coord = arguments[0]
        Coordinate.constructor_.call(this, coord.x, coord.y)
        this._m = coord._m
      } else if (arguments[0] instanceof Coordinate) {
        const coord = arguments[0]
        Coordinate.constructor_.call(this, coord.x, coord.y)
        this._m = this.getM()
      }
    } else if (arguments.length === 3) {
      const x = arguments[0], y = arguments[1], m = arguments[2]
      Coordinate.constructor_.call(this, x, y, Coordinate.NULL_ORDINATE)
      this._m = m
    }
  }
  getM() {
    return this._m
  }
  setOrdinate(ordinateIndex, value) {
    switch (ordinateIndex) {
    case CoordinateXYM.X:
      this.x = value
      break
    case CoordinateXYM.Y:
      this.y = value
      break
    case CoordinateXYM.M:
      this._m = value
      break
    default:
      throw new IllegalArgumentException('Invalid ordinate index: ' + ordinateIndex)
    }
  }
  setM(m) {
    this._m = m
  }
  getZ() {
    return Coordinate.NULL_ORDINATE
  }
  getOrdinate(ordinateIndex) {
    switch (ordinateIndex) {
    case CoordinateXYM.X:
      return this.x
    case CoordinateXYM.Y:
      return this.y
    case CoordinateXYM.M:
      return this._m
    }
    throw new IllegalArgumentException('Invalid ordinate index: ' + ordinateIndex)
  }
  setZ(z) {
    throw new IllegalArgumentException('CoordinateXY dimension 2 does not support z-ordinate')
  }
  copy() {
    return new CoordinateXYM(this)
  }
  toString() {
    return '(' + this.x + ', ' + this.y + ' m=' + this.getM() + ')'
  }
  setCoordinate(other) {
    this.x = other.x
    this.y = other.y
    this.z = other.getZ()
    this._m = other.getM()
  }
}
CoordinateXYM.X = 0
CoordinateXYM.Y = 1
CoordinateXYM.Z = -1
CoordinateXYM.M = 2
