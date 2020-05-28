import MonotoneChain from './MonotoneChain'
import ArrayList from '../../../../../java/util/ArrayList'
import Quadrant from '../../geomgraph/Quadrant'
export default class MonotoneChainBuilder {
  static findChainEnd(pts, start) {
    let safeStart = start
    while (safeStart < pts.length - 1 && pts[safeStart].equals2D(pts[safeStart + 1])) 
      safeStart++
    
    if (safeStart >= pts.length - 1) 
      return pts.length - 1
    
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
  static getChains() {
    if (arguments.length === 1) {
      const pts = arguments[0]
      return MonotoneChainBuilder.getChains(pts, null)
    } else if (arguments.length === 2) {
      const pts = arguments[0], context = arguments[1]
      const mcList = new ArrayList()
      let chainStart = 0
      do {
        const chainEnd = MonotoneChainBuilder.findChainEnd(pts, chainStart)
        const mc = new MonotoneChain(pts, chainStart, chainEnd, context)
        mcList.add(mc)
        chainStart = chainEnd
      } while (chainStart < pts.length - 1)
      return mcList
    }
  }
}
