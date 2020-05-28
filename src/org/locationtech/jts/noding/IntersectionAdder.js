import SegmentIntersector from './SegmentIntersector'
export default class IntersectionAdder {
  constructor() {
    IntersectionAdder.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._hasIntersection = false
    this._hasProper = false
    this._hasProperInterior = false
    this._hasInterior = false
    this._properIntersectionPoint = null
    this._li = null
    this._isSelfIntersection = null
    this.numIntersections = 0
    this.numInteriorIntersections = 0
    this.numProperIntersections = 0
    this.numTests = 0
    const li = arguments[0]
    this._li = li
  }
  static isAdjacentSegments(i1, i2) {
    return Math.abs(i1 - i2) === 1
  }
  isTrivialIntersection(e0, segIndex0, e1, segIndex1) {
    if (e0 === e1) 
      if (this._li.getIntersectionNum() === 1) {
        if (IntersectionAdder.isAdjacentSegments(segIndex0, segIndex1)) return true
        if (e0.isClosed()) {
          const maxSegIndex = e0.size() - 1
          if (segIndex0 === 0 && segIndex1 === maxSegIndex || segIndex1 === 0 && segIndex0 === maxSegIndex) 
            return true
          
        }
      }
    
    return false
  }
  getProperIntersectionPoint() {
    return this._properIntersectionPoint
  }
  hasProperInteriorIntersection() {
    return this._hasProperInterior
  }
  getLineIntersector() {
    return this._li
  }
  hasProperIntersection() {
    return this._hasProper
  }
  processIntersections(e0, segIndex0, e1, segIndex1) {
    if (e0 === e1 && segIndex0 === segIndex1) return null
    this.numTests++
    const p00 = e0.getCoordinates()[segIndex0]
    const p01 = e0.getCoordinates()[segIndex0 + 1]
    const p10 = e1.getCoordinates()[segIndex1]
    const p11 = e1.getCoordinates()[segIndex1 + 1]
    this._li.computeIntersection(p00, p01, p10, p11)
    if (this._li.hasIntersection()) {
      this.numIntersections++
      if (this._li.isInteriorIntersection()) {
        this.numInteriorIntersections++
        this._hasInterior = true
      }
      if (!this.isTrivialIntersection(e0, segIndex0, e1, segIndex1)) {
        this._hasIntersection = true
        e0.addIntersections(this._li, segIndex0, 0)
        e1.addIntersections(this._li, segIndex1, 1)
        if (this._li.isProper()) {
          this.numProperIntersections++
          this._hasProper = true
          this._hasProperInterior = true
        }
      }
    }
  }
  hasIntersection() {
    return this._hasIntersection
  }
  isDone() {
    return false
  }
  hasInteriorIntersection() {
    return this._hasInterior
  }
  get interfaces_() {
    return [SegmentIntersector]
  }
}
