import hasInterface from '../../../../hasInterface'
import CoordinateSequence from './CoordinateSequence'
export default class CoordinateSequenceFactory {
  constructor () {
    CoordinateSequenceFactory.constructor_.apply(this, arguments)
  }

  create () {
    if (arguments.length === 1) {
      if (arguments[0] instanceof Array) {
        const coordinates = arguments[0]
      } else if (hasInterface(arguments[0], CoordinateSequence)) {
        const coordSeq = arguments[0]
      }
    } else if (arguments.length === 2) {
      const size = arguments[0]; const dimension = arguments[1]
    } else if (arguments.length === 3) {
      const size = arguments[0]; const dimension = arguments[1]; const measures = arguments[2]
      return this.create(size, dimension)
    }
  }

  getClass () {
    return CoordinateSequenceFactory
  }

  get interfaces_ () {
    return []
  }
}
CoordinateSequenceFactory.constructor_ = function () {}
