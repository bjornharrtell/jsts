import CoordinateFilter from '../geom/CoordinateFilter'
export default class CoordinateArrayFilter {
  constructor() {
    CoordinateArrayFilter.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this.pts = null
    this.n = 0
    const size = arguments[0]
    this.pts = new Array(size).fill(null)
  }
  filter(coord) {
    this.pts[this.n++] = coord
  }
  getCoordinates() {
    return this.pts
  }
  get interfaces_() {
    return [CoordinateFilter]
  }
}
