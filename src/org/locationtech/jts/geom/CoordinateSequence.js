import Double from '../../../../java/lang/Double'
import Cloneable from '../../../../java/lang/Cloneable'
export default class CoordinateSequence {
  getM(index) {
    if (this.hasM()) {
      const mIndex = this.getDimension() - this.getMeasures()
      return this.getOrdinate(index, mIndex)
    } else {
      return Double.NaN
    }
  }
  setOrdinate(index, ordinateIndex, value) {}
  getZ(index) {
    if (this.hasZ()) 
      return this.getOrdinate(index, 2)
    else 
      return Double.NaN
    
  }
  size() {}
  getOrdinate(index, ordinateIndex) {}
  getCoordinate() {
    if (arguments.length === 1) {
      const i = arguments[0]
    } else if (arguments.length === 2) {
      const index = arguments[0], coord = arguments[1]
    }
  }
  getCoordinateCopy(i) {}
  createCoordinate() {}
  getDimension() {}
  hasM() {
    return this.getMeasures() > 0
  }
  getX(index) {}
  hasZ() {
    return this.getDimension() - this.getMeasures() > 2
  }
  getMeasures() {
    return 0
  }
  expandEnvelope(env) {}
  copy() {}
  getY(index) {}
  toCoordinateArray() {}
  get interfaces_() {
    return [Cloneable]
  }
}
CoordinateSequence.X = 0
CoordinateSequence.Y = 1
CoordinateSequence.Z = 2
CoordinateSequence.M = 3
