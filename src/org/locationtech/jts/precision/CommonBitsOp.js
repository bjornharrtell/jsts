import CommonBitsRemover from './CommonBitsRemover'
export default class CommonBitsOp {
  constructor() {
    CommonBitsOp.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._returnToOriginalPrecision = true
    this._cbr = null
    if (arguments.length === 0) {
      CommonBitsOp.constructor_.call(this, true)
    } else if (arguments.length === 1) {
      const returnToOriginalPrecision = arguments[0]
      this._returnToOriginalPrecision = returnToOriginalPrecision
    }
  }
  computeResultPrecision(result) {
    if (this._returnToOriginalPrecision) this._cbr.addCommonBits(result)
    return result
  }
  union(geom0, geom1) {
    const geom = this.removeCommonBits(geom0, geom1)
    return this.computeResultPrecision(geom[0].union(geom[1]))
  }
  intersection(geom0, geom1) {
    const geom = this.removeCommonBits(geom0, geom1)
    return this.computeResultPrecision(geom[0].intersection(geom[1]))
  }
  removeCommonBits() {
    if (arguments.length === 1) {
      const geom0 = arguments[0]
      this._cbr = new CommonBitsRemover()
      this._cbr.add(geom0)
      const geom = this._cbr.removeCommonBits(geom0.copy())
      return geom
    } else if (arguments.length === 2) {
      const geom0 = arguments[0], geom1 = arguments[1]
      this._cbr = new CommonBitsRemover()
      this._cbr.add(geom0)
      this._cbr.add(geom1)
      const geom = new Array(2).fill(null)
      geom[0] = this._cbr.removeCommonBits(geom0.copy())
      geom[1] = this._cbr.removeCommonBits(geom1.copy())
      return geom
    }
  }
  buffer(geom0, distance) {
    const geom = this.removeCommonBits(geom0)
    return this.computeResultPrecision(geom.buffer(distance))
  }
  symDifference(geom0, geom1) {
    const geom = this.removeCommonBits(geom0, geom1)
    return this.computeResultPrecision(geom[0].symDifference(geom[1]))
  }
  difference(geom0, geom1) {
    const geom = this.removeCommonBits(geom0, geom1)
    return this.computeResultPrecision(geom[0].difference(geom[1]))
  }
}
