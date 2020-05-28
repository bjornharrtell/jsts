import BufferParameters from './BufferParameters'
import Geometry from '../../geom/Geometry'
import BufferBuilder from './BufferBuilder'
import ScaledNoder from '../../noding/ScaledNoder'
import TopologyException from '../../geom/TopologyException'
import MathUtil from '../../math/MathUtil'
import PrecisionModel from '../../geom/PrecisionModel'
import RuntimeException from '../../../../../java/lang/RuntimeException'
import MCIndexSnapRounder from '../../noding/snapround/MCIndexSnapRounder'
export default class BufferOp {
  constructor() {
    BufferOp.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._argGeom = null
    this._distance = null
    this._bufParams = new BufferParameters()
    this._resultGeometry = null
    this._saveException = null
    if (arguments.length === 1) {
      const g = arguments[0]
      this._argGeom = g
    } else if (arguments.length === 2) {
      const g = arguments[0], bufParams = arguments[1]
      this._argGeom = g
      this._bufParams = bufParams
    }
  }
  static bufferOp() {
    if (arguments.length === 2) {
      const g = arguments[0], distance = arguments[1]
      const gBuf = new BufferOp(g)
      const geomBuf = gBuf.getResultGeometry(distance)
      return geomBuf
    } else if (arguments.length === 3) {
      if (Number.isInteger(arguments[2]) && (arguments[0] instanceof Geometry && typeof arguments[1] === 'number')) {
        const g = arguments[0], distance = arguments[1], quadrantSegments = arguments[2]
        const bufOp = new BufferOp(g)
        bufOp.setQuadrantSegments(quadrantSegments)
        const geomBuf = bufOp.getResultGeometry(distance)
        return geomBuf
      } else if (arguments[2] instanceof BufferParameters && (arguments[0] instanceof Geometry && typeof arguments[1] === 'number')) {
        const g = arguments[0], distance = arguments[1], params = arguments[2]
        const bufOp = new BufferOp(g, params)
        const geomBuf = bufOp.getResultGeometry(distance)
        return geomBuf
      }
    } else if (arguments.length === 4) {
      const g = arguments[0], distance = arguments[1], quadrantSegments = arguments[2], endCapStyle = arguments[3]
      const bufOp = new BufferOp(g)
      bufOp.setQuadrantSegments(quadrantSegments)
      bufOp.setEndCapStyle(endCapStyle)
      const geomBuf = bufOp.getResultGeometry(distance)
      return geomBuf
    }
  }
  static precisionScaleFactor(g, distance, maxPrecisionDigits) {
    const env = g.getEnvelopeInternal()
    const envMax = MathUtil.max(Math.abs(env.getMaxX()), Math.abs(env.getMaxY()), Math.abs(env.getMinX()), Math.abs(env.getMinY()))
    const expandByDistance = distance > 0.0 ? distance : 0.0
    const bufEnvMax = envMax + 2 * expandByDistance
    const bufEnvPrecisionDigits = Math.trunc(Math.log(bufEnvMax) / Math.log(10) + 1.0)
    const minUnitLog10 = maxPrecisionDigits - bufEnvPrecisionDigits
    const scaleFactor = Math.pow(10.0, minUnitLog10)
    return scaleFactor
  }
  bufferFixedPrecision(fixedPM) {
    const noder = new ScaledNoder(new MCIndexSnapRounder(new PrecisionModel(1.0)), fixedPM.getScale())
    const bufBuilder = new BufferBuilder(this._bufParams)
    bufBuilder.setWorkingPrecisionModel(fixedPM)
    bufBuilder.setNoder(noder)
    this._resultGeometry = bufBuilder.buffer(this._argGeom, this._distance)
  }
  bufferReducedPrecision() {
    if (arguments.length === 0) {
      for (let precDigits = BufferOp.MAX_PRECISION_DIGITS; precDigits >= 0; precDigits--) {
        try {
          this.bufferReducedPrecision(precDigits)
        } catch (ex) {
          if (ex instanceof TopologyException) 
            this._saveException = ex
          else throw ex
        } finally {}
        if (this._resultGeometry !== null) return null
      }
      throw this._saveException
    } else if (arguments.length === 1) {
      const precisionDigits = arguments[0]
      const sizeBasedScaleFactor = BufferOp.precisionScaleFactor(this._argGeom, this._distance, precisionDigits)
      const fixedPM = new PrecisionModel(sizeBasedScaleFactor)
      this.bufferFixedPrecision(fixedPM)
    }
  }
  computeGeometry() {
    this.bufferOriginalPrecision()
    if (this._resultGeometry !== null) return null
    const argPM = this._argGeom.getFactory().getPrecisionModel()
    if (argPM.getType() === PrecisionModel.FIXED) this.bufferFixedPrecision(argPM); else this.bufferReducedPrecision()
  }
  setQuadrantSegments(quadrantSegments) {
    this._bufParams.setQuadrantSegments(quadrantSegments)
  }
  bufferOriginalPrecision() {
    try {
      const bufBuilder = new BufferBuilder(this._bufParams)
      this._resultGeometry = bufBuilder.buffer(this._argGeom, this._distance)
    } catch (ex) {
      if (ex instanceof RuntimeException) 
        this._saveException = ex
      else throw ex
    } finally {}
  }
  getResultGeometry(distance) {
    this._distance = distance
    this.computeGeometry()
    return this._resultGeometry
  }
  setEndCapStyle(endCapStyle) {
    this._bufParams.setEndCapStyle(endCapStyle)
  }
}
BufferOp.CAP_ROUND = BufferParameters.CAP_ROUND
BufferOp.CAP_BUTT = BufferParameters.CAP_FLAT
BufferOp.CAP_FLAT = BufferParameters.CAP_FLAT
BufferOp.CAP_SQUARE = BufferParameters.CAP_SQUARE
BufferOp.MAX_PRECISION_DIGITS = 12
