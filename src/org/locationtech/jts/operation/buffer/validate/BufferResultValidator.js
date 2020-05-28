import BufferDistanceValidator from './BufferDistanceValidator'
import Polygon from '../../../geom/Polygon'
import MultiPolygon from '../../../geom/MultiPolygon'
import System from '../../../../../../java/lang/System'
import Envelope from '../../../geom/Envelope'
export default class BufferResultValidator {
  constructor() {
    BufferResultValidator.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._input = null
    this._distance = null
    this._result = null
    this._isValid = true
    this._errorMsg = null
    this._errorLocation = null
    this._errorIndicator = null
    const input = arguments[0], distance = arguments[1], result = arguments[2]
    this._input = input
    this._distance = distance
    this._result = result
  }
  static isValidMsg(g, distance, result) {
    const validator = new BufferResultValidator(g, distance, result)
    if (!validator.isValid()) return validator.getErrorMessage()
    return null
  }
  static isValid(g, distance, result) {
    const validator = new BufferResultValidator(g, distance, result)
    if (validator.isValid()) return true
    return false
  }
  isValid() {
    this.checkPolygonal()
    if (!this._isValid) return this._isValid
    this.checkExpectedEmpty()
    if (!this._isValid) return this._isValid
    this.checkEnvelope()
    if (!this._isValid) return this._isValid
    this.checkArea()
    if (!this._isValid) return this._isValid
    this.checkDistance()
    return this._isValid
  }
  checkEnvelope() {
    if (this._distance < 0.0) return null
    let padding = this._distance * BufferResultValidator.MAX_ENV_DIFF_FRAC
    if (padding === 0.0) padding = 0.001
    const expectedEnv = new Envelope(this._input.getEnvelopeInternal())
    expectedEnv.expandBy(this._distance)
    const bufEnv = new Envelope(this._result.getEnvelopeInternal())
    bufEnv.expandBy(padding)
    if (!bufEnv.contains(expectedEnv)) {
      this._isValid = false
      this._errorMsg = 'Buffer envelope is incorrect'
      this._errorIndicator = this._input.getFactory().toGeometry(bufEnv)
    }
    this.report('Envelope')
  }
  checkDistance() {
    const distValid = new BufferDistanceValidator(this._input, this._distance, this._result)
    if (!distValid.isValid()) {
      this._isValid = false
      this._errorMsg = distValid.getErrorMessage()
      this._errorLocation = distValid.getErrorLocation()
      this._errorIndicator = distValid.getErrorIndicator()
    }
    this.report('Distance')
  }
  checkArea() {
    const inputArea = this._input.getArea()
    const resultArea = this._result.getArea()
    if (this._distance > 0.0 && inputArea > resultArea) {
      this._isValid = false
      this._errorMsg = 'Area of positive buffer is smaller than input'
      this._errorIndicator = this._result
    }
    if (this._distance < 0.0 && inputArea < resultArea) {
      this._isValid = false
      this._errorMsg = 'Area of negative buffer is larger than input'
      this._errorIndicator = this._result
    }
    this.report('Area')
  }
  checkPolygonal() {
    if (!(this._result instanceof Polygon || this._result instanceof MultiPolygon)) this._isValid = false
    this._errorMsg = 'Result is not polygonal'
    this._errorIndicator = this._result
    this.report('Polygonal')
  }
  getErrorIndicator() {
    return this._errorIndicator
  }
  getErrorLocation() {
    return this._errorLocation
  }
  checkExpectedEmpty() {
    if (this._input.getDimension() >= 2) return null
    if (this._distance > 0.0) return null
    if (!this._result.isEmpty()) {
      this._isValid = false
      this._errorMsg = 'Result is non-empty'
      this._errorIndicator = this._result
    }
    this.report('ExpectedEmpty')
  }
  report(checkName) {
    if (!BufferResultValidator.VERBOSE) return null
    System.out.println('Check ' + checkName + ': ' + (this._isValid ? 'passed' : 'FAILED'))
  }
  getErrorMessage() {
    return this._errorMsg
  }
}
BufferResultValidator.VERBOSE = false
BufferResultValidator.MAX_ENV_DIFF_FRAC = .012
