import Coordinate from './Coordinate'
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException'
export default class CoordinateXY extends Coordinate {
  constructor() {
    super()
    CoordinateXY.constructor_.apply(this, arguments)
  }
  static constructor_() {
    if (arguments.length === 0) {
      Coordinate.constructor_.call(this)
    } else if (arguments.length === 1) {
      if (arguments[0] instanceof CoordinateXY) {
        const coord = arguments[0]
        Coordinate.constructor_.call(this, coord.x, coord.y)
      } else if (arguments[0] instanceof Coordinate) {
        const coord = arguments[0]
        Coordinate.constructor_.call(this, coord.x, coord.y)
      }
    } else if (arguments.length === 2) {
      const x = arguments[0], y = arguments[1]
      Coordinate.constructor_.call(this, x, y, Coordinate.NULL_ORDINATE)
    }
  }
  setOrdinate(ordinateIndex, value) {
    switch (ordinateIndex) {
    case CoordinateXY.X:
      this.x = value
      break
    case CoordinateXY.Y:
      this.y = value
      break
    default:
      throw new IllegalArgumentException('Invalid ordinate index: ' + ordinateIndex)
    }
  }
  getZ() {
    return Coordinate.NULL_ORDINATE
  }
  getOrdinate(ordinateIndex) {
    switch (ordinateIndex) {
    case CoordinateXY.X:
      return this.x
    case CoordinateXY.Y:
      return this.y
    }
    throw new IllegalArgumentException('Invalid ordinate index: ' + ordinateIndex)
  }
  setZ(z) {
    throw new IllegalArgumentException('CoordinateXY dimension 2 does not support z-ordinate')
  }
  copy() {
    return new CoordinateXY(this)
  }
  toString() {
    return '(' + this.x + ', ' + this.y + ')'
  }
  setCoordinate(other) {
    this.x = other.x
    this.y = other.y
    this.z = other.getZ()
  }
}
CoordinateXY.X = 0
CoordinateXY.Y = 1
CoordinateXY.Z = -1
CoordinateXY.M = -1
