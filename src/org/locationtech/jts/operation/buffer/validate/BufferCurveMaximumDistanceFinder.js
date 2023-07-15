import Coordinate from '../../../geom/Coordinate.js'
import PointPairDistance from './PointPairDistance.js'
import CoordinateSequenceFilter from '../../../geom/CoordinateSequenceFilter.js'
import DistanceToPointFinder from './DistanceToPointFinder.js'
import CoordinateFilter from '../../../geom/CoordinateFilter.js'
export default class BufferCurveMaximumDistanceFinder {
  constructor() {
    BufferCurveMaximumDistanceFinder.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._inputGeom = null
    this._maxPtDist = new PointPairDistance()
    const inputGeom = arguments[0]
    this._inputGeom = inputGeom
  }
  computeMaxMidpointDistance(curve) {
    const distFilter = new MaxMidpointDistanceFilter(this._inputGeom)
    curve.apply(distFilter)
    this._maxPtDist.setMaximum(distFilter.getMaxPointDistance())
  }
  getDistancePoints() {
    return this._maxPtDist
  }
  findDistance(bufferCurve) {
    this.computeMaxVertexDistance(bufferCurve)
    this.computeMaxMidpointDistance(bufferCurve)
    return this._maxPtDist.getDistance()
  }
  computeMaxVertexDistance(curve) {
    const distFilter = new MaxPointDistanceFilter(this._inputGeom)
    curve.apply(distFilter)
    this._maxPtDist.setMaximum(distFilter.getMaxPointDistance())
  }
}
class MaxPointDistanceFilter {
  constructor() {
    MaxPointDistanceFilter.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._maxPtDist = new PointPairDistance()
    this._minPtDist = new PointPairDistance()
    this._geom = null
    const geom = arguments[0]
    this._geom = geom
  }
  filter(pt) {
    this._minPtDist.initialize()
    DistanceToPointFinder.computeDistance(this._geom, pt, this._minPtDist)
    this._maxPtDist.setMaximum(this._minPtDist)
  }
  getMaxPointDistance() {
    return this._maxPtDist
  }
  get interfaces_() {
    return [CoordinateFilter]
  }
}
class MaxMidpointDistanceFilter {
  constructor() {
    MaxMidpointDistanceFilter.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._maxPtDist = new PointPairDistance()
    this._minPtDist = new PointPairDistance()
    this._geom = null
    const geom = arguments[0]
    this._geom = geom
  }
  filter(seq, index) {
    if (index === 0) return null
    const p0 = seq.getCoordinate(index - 1)
    const p1 = seq.getCoordinate(index)
    const midPt = new Coordinate((p0.x + p1.x) / 2, (p0.y + p1.y) / 2)
    this._minPtDist.initialize()
    DistanceToPointFinder.computeDistance(this._geom, midPt, this._minPtDist)
    this._maxPtDist.setMaximum(this._minPtDist)
  }
  isGeometryChanged() {
    return false
  }
  getMaxPointDistance() {
    return this._maxPtDist
  }
  isDone() {
    return false
  }
  get interfaces_() {
    return [CoordinateSequenceFilter]
  }
}
BufferCurveMaximumDistanceFinder.MaxPointDistanceFilter = MaxPointDistanceFilter
BufferCurveMaximumDistanceFinder.MaxMidpointDistanceFilter = MaxMidpointDistanceFilter
