import HashMap from '../../../../java/util/HashMap'
import Coordinate from './Coordinate'
import Double from '../../../../java/lang/Double'
import Integer from '../../../../java/lang/Integer'
import Comparable from '../../../../java/lang/Comparable'
import Serializable from '../../../../java/io/Serializable'
export default class PrecisionModel {
  constructor() {
    PrecisionModel.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._modelType = null
    this._scale = null
    if (arguments.length === 0) 
      this._modelType = PrecisionModel.FLOATING
    else if (arguments.length === 1) 
      if (arguments[0] instanceof Type) {
        const modelType = arguments[0]
        this._modelType = modelType
        if (modelType === PrecisionModel.FIXED) 
          this.setScale(1.0)
        
      } else if (typeof arguments[0] === 'number') {
        const scale = arguments[0]
        this._modelType = PrecisionModel.FIXED
        this.setScale(scale)
      } else if (arguments[0] instanceof PrecisionModel) {
        const pm = arguments[0]
        this._modelType = pm._modelType
        this._scale = pm._scale
      }
    
  }
  static mostPrecise(pm1, pm2) {
    if (pm1.compareTo(pm2) >= 0) return pm1
    return pm2
  }
  equals(other) {
    if (!(other instanceof PrecisionModel)) 
      return false
    
    const otherPrecisionModel = other
    return this._modelType === otherPrecisionModel._modelType && this._scale === otherPrecisionModel._scale
  }
  compareTo(o) {
    const other = o
    const sigDigits = this.getMaximumSignificantDigits()
    const otherSigDigits = other.getMaximumSignificantDigits()
    return Integer.compare(sigDigits, otherSigDigits)
  }
  getScale() {
    return this._scale
  }
  isFloating() {
    return this._modelType === PrecisionModel.FLOATING || this._modelType === PrecisionModel.FLOATING_SINGLE
  }
  getType() {
    return this._modelType
  }
  toString() {
    let description = 'UNKNOWN'
    if (this._modelType === PrecisionModel.FLOATING) 
      description = 'Floating'
    else if (this._modelType === PrecisionModel.FLOATING_SINGLE) 
      description = 'Floating-Single'
    else if (this._modelType === PrecisionModel.FIXED) 
      description = 'Fixed (Scale=' + this.getScale() + ')'
    
    return description
  }
  makePrecise() {
    if (typeof arguments[0] === 'number') {
      const val = arguments[0]
      if (Double.isNaN(val)) return val
      if (this._modelType === PrecisionModel.FLOATING_SINGLE) {
        const floatSingleVal = val
        return floatSingleVal
      }
      if (this._modelType === PrecisionModel.FIXED) 
        return Math.round(val * this._scale) / this._scale
      
      return val
    } else if (arguments[0] instanceof Coordinate) {
      const coord = arguments[0]
      if (this._modelType === PrecisionModel.FLOATING) return null
      coord.x = this.makePrecise(coord.x)
      coord.y = this.makePrecise(coord.y)
    }
  }
  getMaximumSignificantDigits() {
    let maxSigDigits = 16
    if (this._modelType === PrecisionModel.FLOATING) 
      maxSigDigits = 16
    else if (this._modelType === PrecisionModel.FLOATING_SINGLE) 
      maxSigDigits = 6
    else if (this._modelType === PrecisionModel.FIXED) 
      maxSigDigits = 1 + Math.trunc(Math.ceil(Math.log(this.getScale()) / Math.log(10)))
    
    return maxSigDigits
  }
  setScale(scale) {
    this._scale = Math.abs(scale)
  }
  get interfaces_() {
    return [Serializable, Comparable]
  }
}
class Type {
  constructor() {
    Type.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._name = null
    const name = arguments[0]
    this._name = name
    Type.nameToTypeMap.put(name, this)
  }
  readResolve() {
    return Type.nameToTypeMap.get(this._name)
  }
  toString() {
    return this._name
  }
  get interfaces_() {
    return [Serializable]
  }
}
Type.nameToTypeMap = new HashMap()
PrecisionModel.Type = Type
PrecisionModel.FIXED = new Type('FIXED')
PrecisionModel.FLOATING = new Type('FLOATING')
PrecisionModel.FLOATING_SINGLE = new Type('FLOATING SINGLE')
PrecisionModel.maximumPreciseValue = 9007199254740992.0
