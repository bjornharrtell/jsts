import hasInterface from '../../../../../hasInterface'
import Coordinate from '../Coordinate'
import Double from '../../../../../java/lang/Double'
import Coordinates from '../Coordinates'
import CoordinateSequence from '../CoordinateSequence'
import CoordinateArrays from '../CoordinateArrays'
import Serializable from '../../../../../java/io/Serializable'
import StringBuilder from '../../../../../java/lang/StringBuilder'
export default class CoordinateArraySequence {
  constructor() {
    CoordinateArraySequence.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._dimension = 3
    this._measures = 0
    this._coordinates = null
    if (arguments.length === 1) {
      if (arguments[0] instanceof Array) {
        const coordinates = arguments[0]
        CoordinateArraySequence.constructor_.call(this, coordinates, CoordinateArrays.dimension(coordinates), CoordinateArrays.measures(coordinates))
      } else if (Number.isInteger(arguments[0])) {
        const size = arguments[0]
        this._coordinates = new Array(size).fill(null)
        for (let i = 0; i < size; i++) 
          this._coordinates[i] = new Coordinate()
        
      } else if (hasInterface(arguments[0], CoordinateSequence)) {
        const coordSeq = arguments[0]
        if (coordSeq === null) {
          this._coordinates = new Array(0).fill(null)
          return null
        }
        this._dimension = coordSeq.getDimension()
        this._measures = coordSeq.getMeasures()
        this._coordinates = new Array(coordSeq.size()).fill(null)
        for (let i = 0; i < this._coordinates.length; i++) 
          this._coordinates[i] = coordSeq.getCoordinateCopy(i)
        
      }
    } else if (arguments.length === 2) {
      if (arguments[0] instanceof Array && Number.isInteger(arguments[1])) {
        const coordinates = arguments[0], dimension = arguments[1]
        CoordinateArraySequence.constructor_.call(this, coordinates, dimension, CoordinateArrays.measures(coordinates))
      } else if (Number.isInteger(arguments[0]) && Number.isInteger(arguments[1])) {
        const size = arguments[0], dimension = arguments[1]
        this._coordinates = new Array(size).fill(null)
        this._dimension = dimension
        for (let i = 0; i < size; i++) 
          this._coordinates[i] = Coordinates.create(dimension)
        
      }
    } else if (arguments.length === 3) {
      if (Number.isInteger(arguments[2]) && (arguments[0] instanceof Array && Number.isInteger(arguments[1]))) {
        const coordinates = arguments[0], dimension = arguments[1], measures = arguments[2]
        this._dimension = dimension
        this._measures = measures
        if (coordinates === null) 
          this._coordinates = new Array(0).fill(null)
        else 
          this._coordinates = coordinates
        
      } else if (Number.isInteger(arguments[2]) && (Number.isInteger(arguments[0]) && Number.isInteger(arguments[1]))) {
        const size = arguments[0], dimension = arguments[1], measures = arguments[2]
        this._coordinates = new Array(size).fill(null)
        this._dimension = dimension
        this._measures = measures
        for (let i = 0; i < size; i++) 
          this._coordinates[i] = this.createCoordinate()
        
      }
    }
  }
  getM(index) {
    if (this.hasM()) 
      return this._coordinates[index].getM()
    else 
      return Double.NaN
    
  }
  setOrdinate(index, ordinateIndex, value) {
    switch (ordinateIndex) {
    case CoordinateSequence.X:
      this._coordinates[index].x = value
      break
    case CoordinateSequence.Y:
      this._coordinates[index].y = value
      break
    default:
      this._coordinates[index].setOrdinate(ordinateIndex, value)
    }
  }
  getZ(index) {
    if (this.hasZ()) 
      return this._coordinates[index].getZ()
    else 
      return Double.NaN
    
  }
  size() {
    return this._coordinates.length
  }
  getOrdinate(index, ordinateIndex) {
    switch (ordinateIndex) {
    case CoordinateSequence.X:
      return this._coordinates[index].x
    case CoordinateSequence.Y:
      return this._coordinates[index].y
    default:
      return this._coordinates[index].getOrdinate(ordinateIndex)
    }
  }
  getCoordinate() {
    if (arguments.length === 1) {
      const i = arguments[0]
      return this._coordinates[i]
    } else if (arguments.length === 2) {
      const index = arguments[0], coord = arguments[1]
      coord.setCoordinate(this._coordinates[index])
    }
  }
  getCoordinateCopy(i) {
    const copy = this.createCoordinate()
    copy.setCoordinate(this._coordinates[i])
    return copy
  }
  createCoordinate() {
    return Coordinates.create(this.getDimension(), this.getMeasures())
  }
  getDimension() {
    return this._dimension
  }
  getX(index) {
    return this._coordinates[index].x
  }
  getMeasures() {
    return this._measures
  }
  expandEnvelope(env) {
    for (let i = 0; i < this._coordinates.length; i++) 
      env.expandToInclude(this._coordinates[i])
    
    return env
  }
  copy() {
    const cloneCoordinates = new Array(this.size()).fill(null)
    for (let i = 0; i < this._coordinates.length; i++) {
      const duplicate = this.createCoordinate()
      duplicate.setCoordinate(this._coordinates[i])
      cloneCoordinates[i] = duplicate
    }
    return new CoordinateArraySequence(cloneCoordinates, this._dimension, this._measures)
  }
  toString() {
    if (this._coordinates.length > 0) {
      const strBuilder = new StringBuilder(17 * this._coordinates.length)
      strBuilder.append('(')
      strBuilder.append(this._coordinates[0])
      for (let i = 1; i < this._coordinates.length; i++) {
        strBuilder.append(', ')
        strBuilder.append(this._coordinates[i])
      }
      strBuilder.append(')')
      return strBuilder.toString()
    } else {
      return '()'
    }
  }
  getY(index) {
    return this._coordinates[index].y
  }
  toCoordinateArray() {
    return this._coordinates
  }
  get interfaces_() {
    return [CoordinateSequence, Serializable]
  }
}
