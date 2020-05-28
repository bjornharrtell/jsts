import CoordinateXY from './CoordinateXY'
import Coordinate from './Coordinate'
import CoordinateXYM from './CoordinateXYM'
import CoordinateXYZM from './CoordinateXYZM'
export default class Coordinates {
  static measures(coordinate) {
    if (coordinate instanceof CoordinateXY) 
      return 0
    else if (coordinate instanceof CoordinateXYM) 
      return 1
    else if (coordinate instanceof CoordinateXYZM) 
      return 1
    else if (coordinate instanceof Coordinate) 
      return 0
    
    return 0
  }
  static dimension(coordinate) {
    if (coordinate instanceof CoordinateXY) 
      return 2
    else if (coordinate instanceof CoordinateXYM) 
      return 3
    else if (coordinate instanceof CoordinateXYZM) 
      return 4
    else if (coordinate instanceof Coordinate) 
      return 3
    
    return 3
  }
  static create() {
    if (arguments.length === 1) {
      const dimension = arguments[0]
      return Coordinates.create(dimension, 0)
    } else if (arguments.length === 2) {
      const dimension = arguments[0], measures = arguments[1]
      if (dimension === 2) 
        return new CoordinateXY()
      else if (dimension === 3 && measures === 0) 
        return new Coordinate()
      else if (dimension === 3 && measures === 1) 
        return new CoordinateXYM()
      else if (dimension === 4 && measures === 1) 
        return new CoordinateXYZM()
      
      return new Coordinate()
    }
  }
}
