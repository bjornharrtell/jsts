import SegmentSetMutualIntersector from './SegmentSetMutualIntersector'
import STRtree from '../index/strtree/STRtree'
import MonotoneChainOverlapAction from '../index/chain/MonotoneChainOverlapAction'
import MonotoneChainBuilder from '../index/chain/MonotoneChainBuilder'
import ArrayList from '../../../../java/util/ArrayList'
export default class MCIndexSegmentSetMutualIntersector {
  constructor() {
    MCIndexSegmentSetMutualIntersector.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._index = new STRtree()
    const baseSegStrings = arguments[0]
    this.initBaseSegments(baseSegStrings)
  }
  addToIndex(segStr) {
    const segChains = MonotoneChainBuilder.getChains(segStr.getCoordinates(), segStr)
    for (let i = segChains.iterator(); i.hasNext(); ) {
      const mc = i.next()
      this._index.insert(mc.getEnvelope(), mc)
    }
  }
  addToMonoChains(segStr, monoChains) {
    const segChains = MonotoneChainBuilder.getChains(segStr.getCoordinates(), segStr)
    for (let i = segChains.iterator(); i.hasNext(); ) {
      const mc = i.next()
      monoChains.add(mc)
    }
  }
  process(segStrings, segInt) {
    const monoChains = new ArrayList()
    for (let i = segStrings.iterator(); i.hasNext(); ) 
      this.addToMonoChains(i.next(), monoChains)
    
    this.intersectChains(monoChains, segInt)
  }
  initBaseSegments(segStrings) {
    for (let i = segStrings.iterator(); i.hasNext(); ) 
      this.addToIndex(i.next())
    
    this._index.build()
  }
  getIndex() {
    return this._index
  }
  intersectChains(monoChains, segInt) {
    const overlapAction = new SegmentOverlapAction(segInt)
    for (let i = monoChains.iterator(); i.hasNext(); ) {
      const queryChain = i.next()
      const overlapChains = this._index.query(queryChain.getEnvelope())
      for (let j = overlapChains.iterator(); j.hasNext(); ) {
        const testChain = j.next()
        queryChain.computeOverlaps(testChain, overlapAction)
        if (segInt.isDone()) return null
      }
    }
  }
  get interfaces_() {
    return [SegmentSetMutualIntersector]
  }
}
class SegmentOverlapAction extends MonotoneChainOverlapAction {
  constructor() {
    super()
    SegmentOverlapAction.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._si = null
    const si = arguments[0]
    this._si = si
  }
  overlap() {
    if (arguments.length === 4) {
      const mc1 = arguments[0], start1 = arguments[1], mc2 = arguments[2], start2 = arguments[3]
      const ss1 = mc1.getContext()
      const ss2 = mc2.getContext()
      this._si.processIntersections(ss1, start1, ss2, start2)
    } else {
      return super.overlap.apply(this, arguments)
    }
  }
}
MCIndexSegmentSetMutualIntersector.SegmentOverlapAction = SegmentOverlapAction
