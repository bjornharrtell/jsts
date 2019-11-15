import Cloneable from '../../../../java/lang/Cloneable'
export default class CoordinateSequence {
  constructor () {
    CoordinateSequence.constructor_.apply(this, arguments)
  }

  setOrdinate (index, ordinateIndex, value) {}
  size () {}
  getOrdinate (index, ordinateIndex) {}
  getCoordinate () {
    if (arguments.length === 1) {
      const i = arguments[0]
    } else if (arguments.length === 2) {
      const index = arguments[0]; const coord = arguments[1]
    }
  }

  getCoordinateCopy (i) {}
  getDimension () {}
  getX (index) {}
  expandEnvelope (env) {}
  copy () {}
  getY (index) {}
  toCoordinateArray () {}
  getClass () {
    return CoordinateSequence
  }

  get interfaces_ () {
    return [Cloneable]
  }
}
CoordinateSequence.constructor_ = function () {}
CoordinateSequence.X = 0
CoordinateSequence.Y = 1
CoordinateSequence.Z = 2
CoordinateSequence.M = 3
