import GeometryFactory from '../../geom/GeometryFactory'
import Coordinate from '../../geom/Coordinate'
import ArrayList from '../../../../../java/util/ArrayList'
export default class OffsetSegmentString {
  constructor() {
    OffsetSegmentString.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._ptList = null
    this._precisionModel = null
    this._minimimVertexDistance = 0.0
    this._ptList = new ArrayList()
  }
  getCoordinates() {
    const coord = this._ptList.toArray(OffsetSegmentString.COORDINATE_ARRAY_TYPE)
    return coord
  }
  setPrecisionModel(precisionModel) {
    this._precisionModel = precisionModel
  }
  addPt(pt) {
    const bufPt = new Coordinate(pt)
    this._precisionModel.makePrecise(bufPt)
    if (this.isRedundant(bufPt)) return null
    this._ptList.add(bufPt)
  }
  reverse() {}
  addPts(pt, isForward) {
    if (isForward) 
      for (let i = 0; i < pt.length; i++) 
        this.addPt(pt[i])
      
    else 
      for (let i = pt.length - 1; i >= 0; i--) 
        this.addPt(pt[i])
      
    
  }
  isRedundant(pt) {
    if (this._ptList.size() < 1) return false
    const lastPt = this._ptList.get(this._ptList.size() - 1)
    const ptDist = pt.distance(lastPt)
    if (ptDist < this._minimimVertexDistance) return true
    return false
  }
  toString() {
    const fact = new GeometryFactory()
    const line = fact.createLineString(this.getCoordinates())
    return line.toString()
  }
  closeRing() {
    if (this._ptList.size() < 1) return null
    const startPt = new Coordinate(this._ptList.get(0))
    const lastPt = this._ptList.get(this._ptList.size() - 1)
    if (startPt.equals(lastPt)) return null
    this._ptList.add(startPt)
  }
  setMinimumVertexDistance(minimimVertexDistance) {
    this._minimimVertexDistance = minimimVertexDistance
  }
}
OffsetSegmentString.COORDINATE_ARRAY_TYPE = new Array(0).fill(null)
