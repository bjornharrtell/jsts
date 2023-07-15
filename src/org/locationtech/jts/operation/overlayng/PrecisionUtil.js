import Geometry from '../../geom/Geometry.js'
import CoordinateFilter from '../../geom/CoordinateFilter.js'
import OrdinateFormat from '../../io/OrdinateFormat.js'
import MathUtil from '../../math/MathUtil.js'
import PrecisionModel from '../../geom/PrecisionModel.js'
export default class PrecisionUtil {
  static robustScale() {
    if (arguments.length === 1) {
      const a = arguments[0]
      const inherentScale = PrecisionUtil.inherentScale(a)
      const safeScale = PrecisionUtil.safeScale(a)
      return PrecisionUtil.robustScale(inherentScale, safeScale)
    } else if (arguments.length === 2) {
      if (arguments[0] instanceof Geometry && arguments[1] instanceof Geometry) {
        const a = arguments[0], b = arguments[1]
        const inherentScale = PrecisionUtil.inherentScale(a, b)
        const safeScale = PrecisionUtil.safeScale(a, b)
        return PrecisionUtil.robustScale(inherentScale, safeScale)
      } else if (typeof arguments[0] === 'number' && typeof arguments[1] === 'number') {
        const inherentScale = arguments[0], safeScale = arguments[1]
        if (inherentScale <= safeScale) 
          return inherentScale
        
        return safeScale
      }
    }
  }
  static precisionScale(value, precisionDigits) {
    const magnitude = Math.trunc(Math.log(value) / Math.log(10) + 1.0)
    const precDigits = precisionDigits - magnitude
    const scaleFactor = Math.pow(10.0, precDigits)
    return scaleFactor
  }
  static safeScale() {
    if (arguments.length === 1) {
      if (typeof arguments[0] === 'number') {
        const value = arguments[0]
        return PrecisionUtil.precisionScale(value, PrecisionUtil.MAX_ROBUST_DP_DIGITS)
      } else if (arguments[0] instanceof Geometry) {
        const geom = arguments[0]
        return PrecisionUtil.safeScale(PrecisionUtil.maxBoundMagnitude(geom.getEnvelopeInternal()))
      }
    } else if (arguments.length === 2) {
      const a = arguments[0], b = arguments[1]
      let maxBnd = PrecisionUtil.maxBoundMagnitude(a.getEnvelopeInternal())
      if (b !== null) {
        const maxBndB = PrecisionUtil.maxBoundMagnitude(b.getEnvelopeInternal())
        maxBnd = Math.max(maxBnd, maxBndB)
      }
      const scale = PrecisionUtil.safeScale(maxBnd)
      return scale
    }
  }
  static inherentScale() {
    if (arguments.length === 1) {
      if (typeof arguments[0] === 'number') {
        const value = arguments[0]
        const numDec = PrecisionUtil.numberOfDecimals(value)
        const scaleFactor = Math.pow(10.0, numDec)
        return scaleFactor
      } else if (arguments[0] instanceof Geometry) {
        const geom = arguments[0]
        const scaleFilter = new InherentScaleFilter()
        geom.apply(scaleFilter)
        return scaleFilter.getScale()
      }
    } else if (arguments.length === 2) {
      const a = arguments[0], b = arguments[1]
      let scale = PrecisionUtil.inherentScale(a)
      if (b !== null) {
        const scaleB = PrecisionUtil.inherentScale(b)
        scale = Math.max(scale, scaleB)
      }
      return scale
    }
  }
  static numberOfDecimals(value) {
    const s = OrdinateFormat.DEFAULT.format(value)
    if (s.endsWith('.0')) return 0
    const len = s.length
    const decIndex = s.indexOf('.')
    if (decIndex <= 0) return 0
    return len - decIndex - 1
  }
  static maxBoundMagnitude(env) {
    return MathUtil.max(Math.abs(env.getMaxX()), Math.abs(env.getMaxY()), Math.abs(env.getMinX()), Math.abs(env.getMinY()))
  }
  static robustPM() {
    if (arguments.length === 1) {
      const a = arguments[0]
      const scale = PrecisionUtil.robustScale(a)
      return new PrecisionModel(scale)
    } else if (arguments.length === 2) {
      const a = arguments[0], b = arguments[1]
      const scale = PrecisionUtil.robustScale(a, b)
      return new PrecisionModel(scale)
    }
  }
}
class InherentScaleFilter {
  constructor() {
    InherentScaleFilter.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._scale = 0
  }
  getScale() {
    return this._scale
  }
  filter(coord) {
    this.updateScaleMax(coord.getX())
    this.updateScaleMax(coord.getY())
  }
  updateScaleMax(value) {
    const scaleVal = PrecisionUtil.inherentScale(value)
    if (scaleVal > this._scale) 
      this._scale = scaleVal
    
  }
  get interfaces_() {
    return [CoordinateFilter]
  }
}
PrecisionUtil.InherentScaleFilter = InherentScaleFilter
PrecisionUtil.MAX_ROBUST_DP_DIGITS = 14
