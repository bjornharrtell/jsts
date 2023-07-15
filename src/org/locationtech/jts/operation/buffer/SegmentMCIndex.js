import STRtree from '../../index/strtree/STRtree.js'
import ItemVisitor from '../../index/ItemVisitor.js'
import MonotoneChainBuilder from '../../index/chain/MonotoneChainBuilder.js'
export default class SegmentMCIndex {
  constructor() {
    SegmentMCIndex.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._index = null
    const segs = arguments[0]
    this._index = this.buildIndex(segs)
  }
  buildIndex(segs) {
    const index = new STRtree()
    const segChains = MonotoneChainBuilder.getChains(segs, segs)
    for (const mc of segChains) 
      index.insert(mc.getEnvelope(), mc)
    
    return index
  }
  query(env, action) {
    this._index.query(env, new (class {
      get interfaces_() {
        return [ItemVisitor]
      }
      visitItem(item) {
        const testChain = item
        testChain.select(env, action)
      }
    })())
  }
}
