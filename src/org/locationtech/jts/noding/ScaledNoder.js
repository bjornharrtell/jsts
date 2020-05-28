import hasInterface from '../../../../hasInterface'
import Collection from '../../../../java/util/Collection'
import Noder from './Noder'
import Coordinate from '../geom/Coordinate'
import NodedSegmentString from './NodedSegmentString'
import System from '../../../../java/lang/System'
import CoordinateArrays from '../geom/CoordinateArrays'
import ArrayList from '../../../../java/util/ArrayList'
export default class ScaledNoder {
  constructor() {
    ScaledNoder.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._noder = null
    this._scaleFactor = null
    this._offsetX = null
    this._offsetY = null
    this._isScaled = false
    if (arguments.length === 2) {
      const noder = arguments[0], scaleFactor = arguments[1]
      ScaledNoder.constructor_.call(this, noder, scaleFactor, 0, 0)
    } else if (arguments.length === 4) {
      const noder = arguments[0], scaleFactor = arguments[1], offsetX = arguments[2], offsetY = arguments[3]
      this._noder = noder
      this._scaleFactor = scaleFactor
      this._isScaled = !this.isIntegerPrecision()
    }
  }
  rescale() {
    if (hasInterface(arguments[0], Collection)) {
      const segStrings = arguments[0]
      for (let i = segStrings.iterator(); i.hasNext(); ) {
        const ss = i.next()
        this.rescale(ss.getCoordinates())
      }
    } else if (arguments[0] instanceof Array) {
      const pts = arguments[0]
      for (let i = 0; i < pts.length; i++) {
        pts[i].x = pts[i].x / this._scaleFactor + this._offsetX
        pts[i].y = pts[i].y / this._scaleFactor + this._offsetY
      }
      if (pts.length === 2 && pts[0].equals2D(pts[1])) 
        System.out.println(pts)
      
    }
  }
  scale() {
    if (hasInterface(arguments[0], Collection)) {
      const segStrings = arguments[0]
      const nodedSegmentStrings = new ArrayList(segStrings.size())
      for (let i = segStrings.iterator(); i.hasNext(); ) {
        const ss = i.next()
        nodedSegmentStrings.add(new NodedSegmentString(this.scale(ss.getCoordinates()), ss.getData()))
      }
      return nodedSegmentStrings
    } else if (arguments[0] instanceof Array) {
      const pts = arguments[0]
      const roundPts = new Array(pts.length).fill(null)
      for (let i = 0; i < pts.length; i++) 
        roundPts[i] = new Coordinate(Math.round((pts[i].x - this._offsetX) * this._scaleFactor), Math.round((pts[i].y - this._offsetY) * this._scaleFactor), pts[i].getZ())
      
      const roundPtsNoDup = CoordinateArrays.removeRepeatedPoints(roundPts)
      return roundPtsNoDup
    }
  }
  isIntegerPrecision() {
    return this._scaleFactor === 1.0
  }
  getNodedSubstrings() {
    const splitSS = this._noder.getNodedSubstrings()
    if (this._isScaled) this.rescale(splitSS)
    return splitSS
  }
  computeNodes(inputSegStrings) {
    let intSegStrings = inputSegStrings
    if (this._isScaled) intSegStrings = this.scale(inputSegStrings)
    this._noder.computeNodes(intSegStrings)
  }
  get interfaces_() {
    return [Noder]
  }
}
