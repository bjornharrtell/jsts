import Coordinate from '../geom/Coordinate'
import SegmentPointComparator from './SegmentPointComparator'
import Comparable from '../../../../java/lang/Comparable'
export default class SegmentNode {
  constructor() {
    SegmentNode.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._segString = null
    this.coord = null
    this.segmentIndex = null
    this._segmentOctant = null
    this._isInterior = null
    const segString = arguments[0], coord = arguments[1], segmentIndex = arguments[2], segmentOctant = arguments[3]
    this._segString = segString
    this.coord = new Coordinate(coord)
    this.segmentIndex = segmentIndex
    this._segmentOctant = segmentOctant
    this._isInterior = !coord.equals2D(segString.getCoordinate(segmentIndex))
  }
  getCoordinate() {
    return this.coord
  }
  print(out) {
    out.print(this.coord)
    out.print(' seg # = ' + this.segmentIndex)
  }
  compareTo(obj) {
    const other = obj
    if (this.segmentIndex < other.segmentIndex) return -1
    if (this.segmentIndex > other.segmentIndex) return 1
    if (this.coord.equals2D(other.coord)) return 0
    if (!this._isInterior) return -1
    if (!other._isInterior) return 1
    return SegmentPointComparator.compare(this._segmentOctant, this.coord, other.coord)
  }
  isEndPoint(maxSegmentIndex) {
    if (this.segmentIndex === 0 && !this._isInterior) return true
    if (this.segmentIndex === maxSegmentIndex) return true
    return false
  }
  toString() {
    return this.segmentIndex + ':' + this.coord.toString()
  }
  isInterior() {
    return this._isInterior
  }
  get interfaces_() {
    return [Comparable]
  }
}
