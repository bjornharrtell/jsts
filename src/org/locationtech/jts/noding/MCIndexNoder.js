import STRtree from '../index/strtree/STRtree'
import NodedSegmentString from './NodedSegmentString'
import MonotoneChainOverlapAction from '../index/chain/MonotoneChainOverlapAction'
import MonotoneChainBuilder from '../index/chain/MonotoneChainBuilder'
import ArrayList from '../../../../java/util/ArrayList'
import SinglePassNoder from './SinglePassNoder'
export default class MCIndexNoder extends SinglePassNoder {
  constructor () {
    super()
    MCIndexNoder.constructor_.apply(this, arguments)
  }

  getMonotoneChains () {
    return this._monoChains
  }

  getNodedSubstrings () {
    return NodedSegmentString.getNodedSubstrings(this._nodedSegStrings)
  }

  getIndex () {
    return this._index
  }

  add (segStr) {
    const segChains = MonotoneChainBuilder.getChains(segStr.getCoordinates(), segStr)
    for (let i = segChains.iterator(); i.hasNext();) {
      const mc = i.next()
      mc.setId(this._idCounter++)
      this._index.insert(mc.getEnvelope(), mc)
      this._monoChains.add(mc)
    }
  }

  computeNodes (inputSegStrings) {
    this._nodedSegStrings = inputSegStrings
    for (let i = inputSegStrings.iterator(); i.hasNext();)
      this.add(i.next())

    this.intersectChains()
  }

  intersectChains () {
    const overlapAction = new SegmentOverlapAction(this._segInt)
    for (let i = this._monoChains.iterator(); i.hasNext();) {
      const queryChain = i.next()
      const overlapChains = this._index.query(queryChain.getEnvelope())
      for (let j = overlapChains.iterator(); j.hasNext();) {
        const testChain = j.next()
        if (testChain.getId() > queryChain.getId()) {
          queryChain.computeOverlaps(testChain, overlapAction)
          this._nOverlaps++
        }
        if (this._segInt.isDone()) return null
      }
    }
  }

  getClass () {
    return MCIndexNoder
  }

  get interfaces_ () {
    return []
  }
}
class SegmentOverlapAction extends MonotoneChainOverlapAction {
  constructor () {
    super()
    SegmentOverlapAction.constructor_.apply(this, arguments)
  }

  overlap () {
    if (arguments.length === 4) {
      const mc1 = arguments[0]; const start1 = arguments[1]; const mc2 = arguments[2]; const start2 = arguments[3]
      const ss1 = mc1.getContext()
      const ss2 = mc2.getContext()
      this._si.processIntersections(ss1, start1, ss2, start2)
    } else {
      return super.overlap.apply(this, arguments)
    }
  }

  getClass () {
    return SegmentOverlapAction
  }

  get interfaces_ () {
    return []
  }
}
SegmentOverlapAction.constructor_ = function () {
  this._si = null
  const si = arguments[0]
  this._si = si
}
MCIndexNoder.SegmentOverlapAction = SegmentOverlapAction
MCIndexNoder.constructor_ = function () {
  this._monoChains = new ArrayList()
  this._index = new STRtree()
  this._idCounter = 0
  this._nodedSegStrings = null
  this._nOverlaps = 0
  if (arguments.length === 0) {} else if (arguments.length === 1) {
    const si = arguments[0]
    SinglePassNoder.constructor_.call(this, si)
  }
}
