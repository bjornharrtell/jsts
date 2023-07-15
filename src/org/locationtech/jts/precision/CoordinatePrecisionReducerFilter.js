import CoordinateSequenceFilter from '../geom/CoordinateSequenceFilter.js'
export default class CoordinatePrecisionReducerFilter {
  constructor() {
    CoordinatePrecisionReducerFilter.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._precModel = null
    const precModel = arguments[0]
    this._precModel = precModel
  }
  filter(seq, i) {
    seq.setOrdinate(i, 0, this._precModel.makePrecise(seq.getOrdinate(i, 0)))
    seq.setOrdinate(i, 1, this._precModel.makePrecise(seq.getOrdinate(i, 1)))
  }
  isGeometryChanged() {
    return true
  }
  isDone() {
    return false
  }
  get interfaces_() {
    return [CoordinateSequenceFilter]
  }
}
