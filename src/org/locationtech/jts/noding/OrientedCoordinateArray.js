import Comparable from '../../../../java/lang/Comparable'
import CoordinateArrays from '../geom/CoordinateArrays'
export default class OrientedCoordinateArray {
  constructor() {
    OrientedCoordinateArray.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._pts = null
    this._orientation = null
    const pts = arguments[0]
    this._pts = pts
    this._orientation = OrientedCoordinateArray.orientation(pts)
  }
  static orientation(pts) {
    return CoordinateArrays.increasingDirection(pts) === 1
  }
  static compareOriented(pts1, orientation1, pts2, orientation2) {
    const dir1 = orientation1 ? 1 : -1
    const dir2 = orientation2 ? 1 : -1
    const limit1 = orientation1 ? pts1.length : -1
    const limit2 = orientation2 ? pts2.length : -1
    let i1 = orientation1 ? 0 : pts1.length - 1
    let i2 = orientation2 ? 0 : pts2.length - 1
    while (true) {
      const compPt = pts1[i1].compareTo(pts2[i2])
      if (compPt !== 0) return compPt
      i1 += dir1
      i2 += dir2
      const done1 = i1 === limit1
      const done2 = i2 === limit2
      if (done1 && !done2) return -1
      if (!done1 && done2) return 1
      if (done1 && done2) return 0
    }
  }
  compareTo(o1) {
    const oca = o1
    const comp = OrientedCoordinateArray.compareOriented(this._pts, this._orientation, oca._pts, oca._orientation)
    return comp
  }
  get interfaces_() {
    return [Comparable]
  }
}
