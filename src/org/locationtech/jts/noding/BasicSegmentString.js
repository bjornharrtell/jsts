import WKTWriter from '../io/WKTWriter'
import CoordinateArraySequence from '../geom/impl/CoordinateArraySequence'
import Octant from './Octant'
import SegmentString from './SegmentString'
export default class BasicSegmentString {
  constructor() {
    BasicSegmentString.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._pts = null
    this._data = null
    const pts = arguments[0], data = arguments[1]
    this._pts = pts
    this._data = data
  }
  getCoordinates() {
    return this._pts
  }
  size() {
    return this._pts.length
  }
  getCoordinate(i) {
    return this._pts[i]
  }
  isClosed() {
    return this._pts[0].equals(this._pts[this._pts.length - 1])
  }
  getSegmentOctant(index) {
    if (index === this._pts.length - 1) return -1
    return Octant.octant(this.getCoordinate(index), this.getCoordinate(index + 1))
  }
  setData(data) {
    this._data = data
  }
  getData() {
    return this._data
  }
  toString() {
    return WKTWriter.toLineString(new CoordinateArraySequence(this._pts))
  }
  get interfaces_() {
    return [SegmentString]
  }
}
