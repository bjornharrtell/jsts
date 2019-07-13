import MonotoneChain from './MonotoneChain'
import Integer from '../../../../../java/lang/Integer'
import ArrayList from '../../../../../java/util/ArrayList'
import Quadrant from '../../geomgraph/Quadrant'
export default class MonotoneChainBuilder {
  constructor () {
    MonotoneChainBuilder.constructor_.apply(this, arguments)
  }

  static getChainStartIndices (pts) {
    let start = 0
    const startIndexList = new ArrayList()
    startIndexList.add(new Integer(start))
    do {
      const last = MonotoneChainBuilder.findChainEnd(pts, start)
      startIndexList.add(new Integer(last))
      start = last
    } while (start < pts.length - 1)
    const startIndex = MonotoneChainBuilder.toIntArray(startIndexList)
    return startIndex
  }

  static findChainEnd (pts, start) {
    let safeStart = start
    while (safeStart < pts.length - 1 && pts[safeStart].equals2D(pts[safeStart + 1])) {
      safeStart++
    }
    if (safeStart >= pts.length - 1) {
      return pts.length - 1
    }
    const chainQuad = Quadrant.quadrant(pts[safeStart], pts[safeStart + 1])
    let last = start + 1
    while (last < pts.length) {
      if (!pts[last - 1].equals2D(pts[last])) {
        const quad = Quadrant.quadrant(pts[last - 1], pts[last])
        if (quad !== chainQuad) break
      }
      last++
    }
    return last - 1
  }

  static getChains () {
    if (arguments.length === 1) {
      const pts = arguments[0]
      return MonotoneChainBuilder.getChains(pts, null)
    } else if (arguments.length === 2) {
      const pts = arguments[0]; const context = arguments[1]
      const mcList = new ArrayList()
      const startIndex = MonotoneChainBuilder.getChainStartIndices(pts)
      for (let i = 0; i < startIndex.length - 1; i++) {
        const mc = new MonotoneChain(pts, startIndex[i], startIndex[i + 1], context)
        mcList.add(mc)
      }
      return mcList
    }
  }

  static toIntArray (list) {
    const array = new Array(list.size()).fill(null)
    for (let i = 0; i < array.length; i++) {
      array[i] = list.get(i).intValue()
    }
    return array
  }

  getClass () {
    return MonotoneChainBuilder
  }

  get interfaces_ () {
    return []
  }
}
MonotoneChainBuilder.constructor_ = function () {}
