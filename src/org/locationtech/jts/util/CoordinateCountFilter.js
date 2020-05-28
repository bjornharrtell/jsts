import CoordinateFilter from '../geom/CoordinateFilter'
export default class CoordinateCountFilter {
  constructor() {
    CoordinateCountFilter.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._n = 0
  }
  filter(coord) {
    this._n++
  }
  getCount() {
    return this._n
  }
  get interfaces_() {
    return [CoordinateFilter]
  }
}
