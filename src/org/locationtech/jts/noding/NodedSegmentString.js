import SegmentNodeList from './SegmentNodeList'
import WKTWriter from '../io/WKTWriter'
import CoordinateArraySequence from '../geom/impl/CoordinateArraySequence'
import Coordinate from '../geom/Coordinate'
import Octant from './Octant'
import ArrayList from '../../../../java/util/ArrayList'
import NodableSegmentString from './NodableSegmentString'
export default class NodedSegmentString {
  constructor() {
    NodedSegmentString.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._nodeList = new SegmentNodeList(this)
    this._pts = null
    this._data = null
    const pts = arguments[0], data = arguments[1]
    this._pts = pts
    this._data = data
  }
  static getNodedSubstrings() {
    if (arguments.length === 1) {
      const segStrings = arguments[0]
      const resultEdgelist = new ArrayList()
      NodedSegmentString.getNodedSubstrings(segStrings, resultEdgelist)
      return resultEdgelist
    } else if (arguments.length === 2) {
      const segStrings = arguments[0], resultEdgelist = arguments[1]
      for (let i = segStrings.iterator(); i.hasNext(); ) {
        const ss = i.next()
        ss.getNodeList().addSplitEdges(resultEdgelist)
      }
    }
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
    return this.safeOctant(this.getCoordinate(index), this.getCoordinate(index + 1))
  }
  setData(data) {
    this._data = data
  }
  safeOctant(p0, p1) {
    if (p0.equals2D(p1)) return 0
    return Octant.octant(p0, p1)
  }
  getData() {
    return this._data
  }
  addIntersection() {
    if (arguments.length === 2) {
      const intPt = arguments[0], segmentIndex = arguments[1]
      this.addIntersectionNode(intPt, segmentIndex)
    } else if (arguments.length === 4) {
      const li = arguments[0], segmentIndex = arguments[1], geomIndex = arguments[2], intIndex = arguments[3]
      const intPt = new Coordinate(li.getIntersection(intIndex))
      this.addIntersection(intPt, segmentIndex)
    }
  }
  toString() {
    return WKTWriter.toLineString(new CoordinateArraySequence(this._pts))
  }
  getNodeList() {
    return this._nodeList
  }
  addIntersectionNode(intPt, segmentIndex) {
    let normalizedSegmentIndex = segmentIndex
    const nextSegIndex = normalizedSegmentIndex + 1
    if (nextSegIndex < this._pts.length) {
      const nextPt = this._pts[nextSegIndex]
      if (intPt.equals2D(nextPt)) 
        normalizedSegmentIndex = nextSegIndex
      
    }
    const ei = this._nodeList.add(intPt, normalizedSegmentIndex)
    return ei
  }
  addIntersections(li, segmentIndex, geomIndex) {
    for (let i = 0; i < li.getIntersectionNum(); i++) 
      this.addIntersection(li, segmentIndex, geomIndex, i)
    
  }
  get interfaces_() {
    return [NodableSegmentString]
  }
}
