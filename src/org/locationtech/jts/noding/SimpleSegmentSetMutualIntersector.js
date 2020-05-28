import SegmentSetMutualIntersector from './SegmentSetMutualIntersector'
export default class SimpleSegmentSetMutualIntersector {
  constructor() {
    SimpleSegmentSetMutualIntersector.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._baseSegStrings = null
    const segStrings = arguments[0]
    this._baseSegStrings = segStrings
  }
  intersect(ss0, ss1, segInt) {
    const pts0 = ss0.getCoordinates()
    const pts1 = ss1.getCoordinates()
    for (let i0 = 0; i0 < pts0.length - 1; i0++) 
      for (let i1 = 0; i1 < pts1.length - 1; i1++) {
        segInt.processIntersections(ss0, i0, ss1, i1)
        if (segInt.isDone()) return null
      }
    
  }
  process(segStrings, segInt) {
    for (let i = this._baseSegStrings.iterator(); i.hasNext(); ) {
      const baseSS = i.next()
      for (let j = segStrings.iterator(); j.hasNext(); ) {
        const ss = j.next()
        this.intersect(baseSS, ss, segInt)
        if (segInt.isDone()) return null
      }
    }
  }
  get interfaces_() {
    return [SegmentSetMutualIntersector]
  }
}
