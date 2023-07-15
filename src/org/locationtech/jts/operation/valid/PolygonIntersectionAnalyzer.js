import PolygonNodeTopology from '../../algorithm/PolygonNodeTopology.js'
import SegmentIntersector from '../../noding/SegmentIntersector.js'
import PolygonRing from './PolygonRing.js'
import RobustLineIntersector from '../../algorithm/RobustLineIntersector.js'
import TopologyValidationError from './TopologyValidationError.js'
import IllegalStateException from '../../../../../java/lang/IllegalStateException.js'
export default class PolygonIntersectionAnalyzer {
  constructor() {
    PolygonIntersectionAnalyzer.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._isInvertedRingValid = null
    this._li = new RobustLineIntersector()
    this._invalidCode = PolygonIntersectionAnalyzer.NO_INVALID_INTERSECTION
    this._invalidLocation = null
    this._hasDoubleTouch = false
    this._doubleTouchLocation = null
    const isInvertedRingValid = arguments[0]
    this._isInvertedRingValid = isInvertedRingValid
  }
  static prevCoordinateInRing(ringSS, segIndex) {
    let prevIndex = segIndex - 1
    if (prevIndex < 0) 
      prevIndex = ringSS.size() - 2
    
    return ringSS.getCoordinate(prevIndex)
  }
  static isAdjacentInRing(ringSS, segIndex0, segIndex1) {
    const delta = Math.abs(segIndex1 - segIndex0)
    if (delta <= 1) return true
    if (delta >= ringSS.size() - 2) return true
    return false
  }
  getDoubleTouchLocation() {
    return this._doubleTouchLocation
  }
  hasDoubleTouch() {
    return this._hasDoubleTouch
  }
  addSelfTouch(ss, intPt, e00, e01, e10, e11) {
    const polyRing = ss.getData()
    if (polyRing === null) 
      throw new IllegalStateException('SegmentString missing PolygonRing data when checking self-touches')
    
    polyRing.addSelfTouch(intPt, e00, e01, e10, e11)
  }
  findInvalidIntersection(ss0, segIndex0, ss1, segIndex1) {
    const p00 = ss0.getCoordinate(segIndex0)
    const p01 = ss0.getCoordinate(segIndex0 + 1)
    const p10 = ss1.getCoordinate(segIndex1)
    const p11 = ss1.getCoordinate(segIndex1 + 1)
    this._li.computeIntersection(p00, p01, p10, p11)
    if (!this._li.hasIntersection()) 
      return PolygonIntersectionAnalyzer.NO_INVALID_INTERSECTION
    
    const isSameSegString = ss0 === ss1
    if (this._li.isProper() || this._li.getIntersectionNum() >= 2) 
      return TopologyValidationError.SELF_INTERSECTION
    
    const intPt = this._li.getIntersection(0)
    const isAdjacentSegments = isSameSegString && PolygonIntersectionAnalyzer.isAdjacentInRing(ss0, segIndex0, segIndex1)
    if (isAdjacentSegments) return PolygonIntersectionAnalyzer.NO_INVALID_INTERSECTION
    if (isSameSegString && !this._isInvertedRingValid) 
      return TopologyValidationError.RING_SELF_INTERSECTION
    
    if (intPt.equals2D(p01) || intPt.equals2D(p11)) return PolygonIntersectionAnalyzer.NO_INVALID_INTERSECTION
    let e00 = p00
    let e01 = p01
    if (intPt.equals2D(p00)) {
      e00 = PolygonIntersectionAnalyzer.prevCoordinateInRing(ss0, segIndex0)
      e01 = p01
    }
    let e10 = p10
    let e11 = p11
    if (intPt.equals2D(p10)) {
      e10 = PolygonIntersectionAnalyzer.prevCoordinateInRing(ss1, segIndex1)
      e11 = p11
    }
    const hasCrossing = PolygonNodeTopology.isCrossing(intPt, e00, e01, e10, e11)
    if (hasCrossing) 
      return TopologyValidationError.SELF_INTERSECTION
    
    if (isSameSegString && this._isInvertedRingValid) 
      this.addSelfTouch(ss0, intPt, e00, e01, e10, e11)
    
    const isDoubleTouch = this.addDoubleTouch(ss0, ss1, intPt)
    if (isDoubleTouch && !isSameSegString) {
      this._hasDoubleTouch = true
      this._doubleTouchLocation = intPt
    }
    return PolygonIntersectionAnalyzer.NO_INVALID_INTERSECTION
  }
  processIntersections(ss0, segIndex0, ss1, segIndex1) {
    const isSameSegString = ss0 === ss1
    const isSameSegment = isSameSegString && segIndex0 === segIndex1
    if (isSameSegment) return null
    const code = this.findInvalidIntersection(ss0, segIndex0, ss1, segIndex1)
    if (code !== PolygonIntersectionAnalyzer.NO_INVALID_INTERSECTION) {
      this._invalidCode = code
      this._invalidLocation = this._li.getIntersection(0)
    }
  }
  isDone() {
    return this.isInvalid() || this._hasDoubleTouch
  }
  addDoubleTouch(ss0, ss1, intPt) {
    return PolygonRing.addTouch(ss0.getData(), ss1.getData(), intPt)
  }
  isInvalid() {
    return this._invalidCode >= 0
  }
  getInvalidLocation() {
    return this._invalidLocation
  }
  getInvalidCode() {
    return this._invalidCode
  }
  get interfaces_() {
    return [SegmentIntersector]
  }
}
PolygonIntersectionAnalyzer.NO_INVALID_INTERSECTION = -1
