import SegmentIntersector from './SegmentIntersector'
import ArrayList from '../../../../java/util/ArrayList'
export default class NodingIntersectionFinder {
  constructor() {
    NodingIntersectionFinder.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._findAllIntersections = false
    this._isCheckEndSegmentsOnly = false
    this._keepIntersections = true
    this._isInteriorIntersectionsOnly = false
    this._li = null
    this._interiorIntersection = null
    this._intSegments = null
    this._intersections = new ArrayList()
    this._intersectionCount = 0
    const li = arguments[0]
    this._li = li
    this._interiorIntersection = null
  }
  static createAllIntersectionsFinder(li) {
    const finder = new NodingIntersectionFinder(li)
    finder.setFindAllIntersections(true)
    return finder
  }
  static isInteriorVertexIntersection() {
    if (arguments.length === 4) {
      const p0 = arguments[0], p1 = arguments[1], isEnd0 = arguments[2], isEnd1 = arguments[3]
      if (isEnd0 && isEnd1) return false
      if (p0.equals2D(p1)) 
        return true
      
      return false
    } else if (arguments.length === 8) {
      const p00 = arguments[0], p01 = arguments[1], p10 = arguments[2], p11 = arguments[3], isEnd00 = arguments[4], isEnd01 = arguments[5], isEnd10 = arguments[6], isEnd11 = arguments[7]
      if (NodingIntersectionFinder.isInteriorVertexIntersection(p00, p10, isEnd00, isEnd10)) return true
      if (NodingIntersectionFinder.isInteriorVertexIntersection(p00, p11, isEnd00, isEnd11)) return true
      if (NodingIntersectionFinder.isInteriorVertexIntersection(p01, p10, isEnd01, isEnd10)) return true
      if (NodingIntersectionFinder.isInteriorVertexIntersection(p01, p11, isEnd01, isEnd11)) return true
      return false
    }
  }
  static createInteriorIntersectionCounter(li) {
    const finder = new NodingIntersectionFinder(li)
    finder.setInteriorIntersectionsOnly(true)
    finder.setFindAllIntersections(true)
    finder.setKeepIntersections(false)
    return finder
  }
  static createIntersectionCounter(li) {
    const finder = new NodingIntersectionFinder(li)
    finder.setFindAllIntersections(true)
    finder.setKeepIntersections(false)
    return finder
  }
  static isEndSegment(segStr, index) {
    if (index === 0) return true
    if (index >= segStr.size() - 2) return true
    return false
  }
  static createAnyIntersectionFinder(li) {
    return new NodingIntersectionFinder(li)
  }
  static createInteriorIntersectionsFinder(li) {
    const finder = new NodingIntersectionFinder(li)
    finder.setFindAllIntersections(true)
    finder.setInteriorIntersectionsOnly(true)
    return finder
  }
  setCheckEndSegmentsOnly(isCheckEndSegmentsOnly) {
    this._isCheckEndSegmentsOnly = isCheckEndSegmentsOnly
  }
  getIntersectionSegments() {
    return this._intSegments
  }
  count() {
    return this._intersectionCount
  }
  getIntersections() {
    return this._intersections
  }
  setFindAllIntersections(findAllIntersections) {
    this._findAllIntersections = findAllIntersections
  }
  setKeepIntersections(keepIntersections) {
    this._keepIntersections = keepIntersections
  }
  getIntersection() {
    return this._interiorIntersection
  }
  processIntersections(e0, segIndex0, e1, segIndex1) {
    if (!this._findAllIntersections && this.hasIntersection()) return null
    const isSameSegString = e0 === e1
    const isSameSegment = isSameSegString && segIndex0 === segIndex1
    if (isSameSegment) return null
    if (this._isCheckEndSegmentsOnly) {
      const isEndSegPresent = NodingIntersectionFinder.isEndSegment(e0, segIndex0) || NodingIntersectionFinder.isEndSegment(e1, segIndex1)
      if (!isEndSegPresent) return null
    }
    const p00 = e0.getCoordinate(segIndex0)
    const p01 = e0.getCoordinate(segIndex0 + 1)
    const p10 = e1.getCoordinate(segIndex1)
    const p11 = e1.getCoordinate(segIndex1 + 1)
    const isEnd00 = segIndex0 === 0
    const isEnd01 = segIndex0 + 2 === e0.size()
    const isEnd10 = segIndex1 === 0
    const isEnd11 = segIndex1 + 2 === e1.size()
    this._li.computeIntersection(p00, p01, p10, p11)
    const isInteriorInt = this._li.hasIntersection() && this._li.isInteriorIntersection()
    let isInteriorVertexInt = false
    if (!this._isInteriorIntersectionsOnly) {
      const isAdjacentSegment = isSameSegString && Math.abs(segIndex1 - segIndex0) <= 1
      isInteriorVertexInt = !isAdjacentSegment && NodingIntersectionFinder.isInteriorVertexIntersection(p00, p01, p10, p11, isEnd00, isEnd01, isEnd10, isEnd11)
    }
    if (isInteriorInt || isInteriorVertexInt) {
      this._intSegments = new Array(4).fill(null)
      this._intSegments[0] = p00
      this._intSegments[1] = p01
      this._intSegments[2] = p10
      this._intSegments[3] = p11
      this._interiorIntersection = this._li.getIntersection(0)
      if (this._keepIntersections) this._intersections.add(this._interiorIntersection)
      this._intersectionCount++
    }
  }
  hasIntersection() {
    return this._interiorIntersection !== null
  }
  isDone() {
    if (this._findAllIntersections) return false
    return this._interiorIntersection !== null
  }
  setInteriorIntersectionsOnly(isInteriorIntersectionsOnly) {
    this._isInteriorIntersectionsOnly = isInteriorIntersectionsOnly
  }
  get interfaces_() {
    return [SegmentIntersector]
  }
}
