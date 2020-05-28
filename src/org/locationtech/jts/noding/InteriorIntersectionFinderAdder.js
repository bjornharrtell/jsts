import SegmentIntersector from './SegmentIntersector'
import ArrayList from '../../../../java/util/ArrayList'
export default class InteriorIntersectionFinderAdder {
  constructor() {
    InteriorIntersectionFinderAdder.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._li = null
    this._interiorIntersections = null
    const li = arguments[0]
    this._li = li
    this._interiorIntersections = new ArrayList()
  }
  processIntersections(e0, segIndex0, e1, segIndex1) {
    if (e0 === e1 && segIndex0 === segIndex1) return null
    const p00 = e0.getCoordinates()[segIndex0]
    const p01 = e0.getCoordinates()[segIndex0 + 1]
    const p10 = e1.getCoordinates()[segIndex1]
    const p11 = e1.getCoordinates()[segIndex1 + 1]
    this._li.computeIntersection(p00, p01, p10, p11)
    if (this._li.hasIntersection()) 
      if (this._li.isInteriorIntersection()) {
        for (let intIndex = 0; intIndex < this._li.getIntersectionNum(); intIndex++) 
          this._interiorIntersections.add(this._li.getIntersection(intIndex))
        
        e0.addIntersections(this._li, segIndex0, 0)
        e1.addIntersections(this._li, segIndex1, 1)
      }
    
  }
  isDone() {
    return false
  }
  getInteriorIntersections() {
    return this._interiorIntersections
  }
  get interfaces_() {
    return [SegmentIntersector]
  }
}
