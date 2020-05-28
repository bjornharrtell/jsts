import Double from '../../../../java/lang/Double'
import Integer from '../../../../java/lang/Integer'
import Comparator from '../../../../java/util/Comparator'
export default class CoordinateSequenceComparator {
  constructor() {
    CoordinateSequenceComparator.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._dimensionLimit = null
    if (arguments.length === 0) {
      this._dimensionLimit = Integer.MAX_VALUE
    } else if (arguments.length === 1) {
      const dimensionLimit = arguments[0]
      this._dimensionLimit = dimensionLimit
    }
  }
  static compare(a, b) {
    if (a < b) return -1
    if (a > b) return 1
    if (Double.isNaN(a)) {
      if (Double.isNaN(b)) return 0
      return -1
    }
    if (Double.isNaN(b)) return 1
    return 0
  }
  compare(o1, o2) {
    const s1 = o1
    const s2 = o2
    const size1 = s1.size()
    const size2 = s2.size()
    const dim1 = s1.getDimension()
    const dim2 = s2.getDimension()
    let minDim = dim1
    if (dim2 < minDim) minDim = dim2
    let dimLimited = false
    if (this._dimensionLimit <= minDim) {
      minDim = this._dimensionLimit
      dimLimited = true
    }
    if (!dimLimited) {
      if (dim1 < dim2) return -1
      if (dim1 > dim2) return 1
    }
    let i = 0
    while (i < size1 && i < size2) {
      const ptComp = this.compareCoordinate(s1, s2, i, minDim)
      if (ptComp !== 0) return ptComp
      i++
    }
    if (i < size1) return 1
    if (i < size2) return -1
    return 0
  }
  compareCoordinate(s1, s2, i, dimension) {
    for (let d = 0; d < dimension; d++) {
      const ord1 = s1.getOrdinate(i, d)
      const ord2 = s2.getOrdinate(i, d)
      const comp = CoordinateSequenceComparator.compare(ord1, ord2)
      if (comp !== 0) return comp
    }
    return 0
  }
  get interfaces_() {
    return [Comparator]
  }
}
