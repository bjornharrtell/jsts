import CoordinateSequenceFactory from '../CoordinateSequenceFactory'
import hasInterface from '../../../../../hasInterface'
import PackedCoordinateSequence from './PackedCoordinateSequence'
import Coordinates from '../Coordinates'
import CoordinateSequence from '../CoordinateSequence'
import Serializable from '../../../../../java/io/Serializable'
export default class PackedCoordinateSequenceFactory {
  constructor() {
    PackedCoordinateSequenceFactory.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._type = PackedCoordinateSequenceFactory.DOUBLE
    if (arguments.length === 0) {
      PackedCoordinateSequenceFactory.constructor_.call(this, PackedCoordinateSequenceFactory.DOUBLE)
    } else if (arguments.length === 1) {
      const type = arguments[0]
      this._type = type
    }
  }
  getType() {
    return this._type
  }
  create() {
    if (arguments.length === 1) {
      if (arguments[0] instanceof Array) {
        const coordinates = arguments[0]
        let dimension = PackedCoordinateSequenceFactory.DEFAULT_DIMENSION
        let measures = PackedCoordinateSequenceFactory.DEFAULT_MEASURES
        if (coordinates !== null && coordinates.length > 0 && coordinates[0] !== null) {
          const first = coordinates[0]
          dimension = Coordinates.dimension(first)
          measures = Coordinates.measures(first)
        }
        if (this._type === PackedCoordinateSequenceFactory.DOUBLE) 
          return new PackedCoordinateSequence.Double(coordinates, dimension, measures)
        else 
          return new PackedCoordinateSequence.Float(coordinates, dimension, measures)
        
      } else if (hasInterface(arguments[0], CoordinateSequence)) {
        const coordSeq = arguments[0]
        const dimension = coordSeq.getDimension()
        const measures = coordSeq.getMeasures()
        if (this._type === PackedCoordinateSequenceFactory.DOUBLE) 
          return new PackedCoordinateSequence.Double(coordSeq.toCoordinateArray(), dimension, measures)
        else 
          return new PackedCoordinateSequence.Float(coordSeq.toCoordinateArray(), dimension, measures)
        
      }
    } else if (arguments.length === 2) {
      if (arguments[0] instanceof Array && Number.isInteger(arguments[1])) {
        const packedCoordinates = arguments[0], dimension = arguments[1]
        return this.create(packedCoordinates, dimension, PackedCoordinateSequenceFactory.DEFAULT_MEASURES)
      } else if (arguments[0] instanceof Array && Number.isInteger(arguments[1])) {
        const packedCoordinates = arguments[0], dimension = arguments[1]
        return this.create(packedCoordinates, dimension, PackedCoordinateSequenceFactory.DEFAULT_MEASURES)
      } else if (Number.isInteger(arguments[0]) && Number.isInteger(arguments[1])) {
        const size = arguments[0], dimension = arguments[1]
        if (this._type === PackedCoordinateSequenceFactory.DOUBLE) 
          return new PackedCoordinateSequence.Double(size, dimension, PackedCoordinateSequenceFactory.DEFAULT_MEASURES)
        else 
          return new PackedCoordinateSequence.Float(size, dimension, PackedCoordinateSequenceFactory.DEFAULT_MEASURES)
        
      }
    } else if (arguments.length === 3) {
      if (Number.isInteger(arguments[2]) && (arguments[0] instanceof Array && Number.isInteger(arguments[1]))) {
        const packedCoordinates = arguments[0], dimension = arguments[1], measures = arguments[2]
        if (this._type === PackedCoordinateSequenceFactory.DOUBLE) 
          return new PackedCoordinateSequence.Double(packedCoordinates, dimension, measures)
        else 
          return new PackedCoordinateSequence.Float(packedCoordinates, dimension, measures)
        
      } else if (Number.isInteger(arguments[2]) && (arguments[0] instanceof Array && Number.isInteger(arguments[1]))) {
        const packedCoordinates = arguments[0], dimension = arguments[1], measures = arguments[2]
        if (this._type === PackedCoordinateSequenceFactory.DOUBLE) 
          return new PackedCoordinateSequence.Double(packedCoordinates, dimension, measures)
        else 
          return new PackedCoordinateSequence.Float(packedCoordinates, dimension, measures)
        
      } else if (Number.isInteger(arguments[2]) && (Number.isInteger(arguments[0]) && Number.isInteger(arguments[1]))) {
        const size = arguments[0], dimension = arguments[1], measures = arguments[2]
        if (this._type === PackedCoordinateSequenceFactory.DOUBLE) 
          return new PackedCoordinateSequence.Double(size, dimension, measures)
        else 
          return new PackedCoordinateSequence.Float(size, dimension, measures)
        
      }
    }
  }
  get interfaces_() {
    return [CoordinateSequenceFactory, Serializable]
  }
}
PackedCoordinateSequenceFactory.DOUBLE = 0
PackedCoordinateSequenceFactory.FLOAT = 1
PackedCoordinateSequenceFactory.DOUBLE_FACTORY = new PackedCoordinateSequenceFactory(PackedCoordinateSequenceFactory.DOUBLE)
PackedCoordinateSequenceFactory.FLOAT_FACTORY = new PackedCoordinateSequenceFactory(PackedCoordinateSequenceFactory.FLOAT)
PackedCoordinateSequenceFactory.DEFAULT_MEASURES = 0
PackedCoordinateSequenceFactory.DEFAULT_DIMENSION = 3
