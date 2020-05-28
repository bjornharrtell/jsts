import MonotoneChainIndexer from './MonotoneChainIndexer'
import Envelope from '../../geom/Envelope'
export default class MonotoneChainEdge {
  constructor() {
    MonotoneChainEdge.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this.e = null
    this.pts = null
    this.startIndex = null
    const e = arguments[0]
    this.e = e
    this.pts = e.getCoordinates()
    const mcb = new MonotoneChainIndexer()
    this.startIndex = mcb.getChainStartIndices(this.pts)
  }
  getCoordinates() {
    return this.pts
  }
  getMaxX(chainIndex) {
    const x1 = this.pts[this.startIndex[chainIndex]].x
    const x2 = this.pts[this.startIndex[chainIndex + 1]].x
    return x1 > x2 ? x1 : x2
  }
  getMinX(chainIndex) {
    const x1 = this.pts[this.startIndex[chainIndex]].x
    const x2 = this.pts[this.startIndex[chainIndex + 1]].x
    return x1 < x2 ? x1 : x2
  }
  computeIntersectsForChain() {
    if (arguments.length === 4) {
      const chainIndex0 = arguments[0], mce = arguments[1], chainIndex1 = arguments[2], si = arguments[3]
      this.computeIntersectsForChain(this.startIndex[chainIndex0], this.startIndex[chainIndex0 + 1], mce, mce.startIndex[chainIndex1], mce.startIndex[chainIndex1 + 1], si)
    } else if (arguments.length === 6) {
      const start0 = arguments[0], end0 = arguments[1], mce = arguments[2], start1 = arguments[3], end1 = arguments[4], ei = arguments[5]
      if (end0 - start0 === 1 && end1 - start1 === 1) {
        ei.addIntersections(this.e, start0, mce.e, start1)
        return null
      }
      if (!this.overlaps(start0, end0, mce, start1, end1)) return null
      const mid0 = Math.trunc((start0 + end0) / 2)
      const mid1 = Math.trunc((start1 + end1) / 2)
      if (start0 < mid0) {
        if (start1 < mid1) this.computeIntersectsForChain(start0, mid0, mce, start1, mid1, ei)
        if (mid1 < end1) this.computeIntersectsForChain(start0, mid0, mce, mid1, end1, ei)
      }
      if (mid0 < end0) {
        if (start1 < mid1) this.computeIntersectsForChain(mid0, end0, mce, start1, mid1, ei)
        if (mid1 < end1) this.computeIntersectsForChain(mid0, end0, mce, mid1, end1, ei)
      }
    }
  }
  overlaps(start0, end0, mce, start1, end1) {
    return Envelope.intersects(this.pts[start0], this.pts[end0], mce.pts[start1], mce.pts[end1])
  }
  getStartIndexes() {
    return this.startIndex
  }
  computeIntersects(mce, si) {
    for (let i = 0; i < this.startIndex.length - 1; i++) 
      for (let j = 0; j < mce.startIndex.length - 1; j++) 
        this.computeIntersectsForChain(i, mce, j, si)
      
    
  }
}
