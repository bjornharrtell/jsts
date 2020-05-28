import CoordinateSequenceFactory from '../CoordinateSequenceFactory'
import hasInterface from '../../../../../hasInterface'
import CoordinateArraySequence from './CoordinateArraySequence'
import CoordinateSequence from '../CoordinateSequence'
import Serializable from '../../../../../java/io/Serializable'
export default class CoordinateArraySequenceFactory {
  static instance() {
    return CoordinateArraySequenceFactory.instanceObject
  }
  readResolve() {
    return CoordinateArraySequenceFactory.instance()
  }
  create() {
    if (arguments.length === 1) {
      if (arguments[0] instanceof Array) {
        const coordinates = arguments[0]
        return new CoordinateArraySequence(coordinates)
      } else if (hasInterface(arguments[0], CoordinateSequence)) {
        const coordSeq = arguments[0]
        return new CoordinateArraySequence(coordSeq)
      }
    } else if (arguments.length === 2) {
      let size = arguments[0], dimension = arguments[1]
      if (dimension > 3) dimension = 3
      if (dimension < 2) dimension = 2
      return new CoordinateArraySequence(size, dimension)
    } else if (arguments.length === 3) {
      let size = arguments[0], dimension = arguments[1], measures = arguments[2]
      let spatial = dimension - measures
      if (measures > 1) 
        measures = 1
      
      if (spatial > 3) 
        spatial = 3
      
      if (spatial < 2) spatial = 2
      return new CoordinateArraySequence(size, spatial + measures, measures)
    }
  }
  get interfaces_() {
    return [CoordinateSequenceFactory, Serializable]
  }
}
CoordinateArraySequenceFactory.instanceObject = new CoordinateArraySequenceFactory()
