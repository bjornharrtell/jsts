import Coordinate from '../../geom/Coordinate'
import Coordinates from '../../geom/Coordinates'
import CoordinateSequence from '../../geom/CoordinateSequence'
import UnsupportedOperationException from '../../../../../java/lang/UnsupportedOperationException'
export default class AxisPlaneCoordinateSequence {
  constructor() {
    AxisPlaneCoordinateSequence.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._seq = null
    this._indexMap = null
    const seq = arguments[0], indexMap = arguments[1]
    this._seq = seq
    this._indexMap = indexMap
  }
  static projectToYZ(seq) {
    return new AxisPlaneCoordinateSequence(seq, AxisPlaneCoordinateSequence.YZ_INDEX)
  }
  static projectToXZ(seq) {
    return new AxisPlaneCoordinateSequence(seq, AxisPlaneCoordinateSequence.XZ_INDEX)
  }
  static projectToXY(seq) {
    return new AxisPlaneCoordinateSequence(seq, AxisPlaneCoordinateSequence.XY_INDEX)
  }
  setOrdinate(index, ordinateIndex, value) {
    throw new UnsupportedOperationException()
  }
  getZ(index) {
    return this.getOrdinate(index, CoordinateSequence.Z)
  }
  size() {
    return this._seq.size()
  }
  getOrdinate(index, ordinateIndex) {
    if (ordinateIndex > 1) return 0
    return this._seq.getOrdinate(index, this._indexMap[ordinateIndex])
  }
  getCoordinate() {
    if (arguments.length === 1) {
      const i = arguments[0]
      return this.getCoordinateCopy(i)
    } else if (arguments.length === 2) {
      const index = arguments[0], coord = arguments[1]
      coord.x = this.getOrdinate(index, CoordinateSequence.X)
      coord.y = this.getOrdinate(index, CoordinateSequence.Y)
      coord.setZ(this.getOrdinate(index, CoordinateSequence.Z))
    }
  }
  getCoordinateCopy(i) {
    return new Coordinate(this.getX(i), this.getY(i), this.getZ(i))
  }
  createCoordinate() {
    return Coordinates.create(this.getDimension(), this.getMeasures())
  }
  getDimension() {
    return 2
  }
  getX(index) {
    return this.getOrdinate(index, CoordinateSequence.X)
  }
  clone() {
    throw new UnsupportedOperationException()
  }
  expandEnvelope(env) {
    throw new UnsupportedOperationException()
  }
  copy() {
    throw new UnsupportedOperationException()
  }
  getY(index) {
    return this.getOrdinate(index, CoordinateSequence.Y)
  }
  toCoordinateArray() {
    throw new UnsupportedOperationException()
  }
  get interfaces_() {
    return [CoordinateSequence]
  }
}
AxisPlaneCoordinateSequence.XY_INDEX = [0, 1]
AxisPlaneCoordinateSequence.XZ_INDEX = [0, 2]
AxisPlaneCoordinateSequence.YZ_INDEX = [1, 2]
