import EdgeEnd from '../../geomgraph/EdgeEnd'
import Label from '../../geomgraph/Label'
import ArrayList from '../../../../../java/util/ArrayList'
export default class EdgeEndBuilder {
  createEdgeEndForNext(edge, l, eiCurr, eiNext) {
    const iNext = eiCurr.segmentIndex + 1
    if (iNext >= edge.getNumPoints() && eiNext === null) return null
    let pNext = edge.getCoordinate(iNext)
    if (eiNext !== null && eiNext.segmentIndex === eiCurr.segmentIndex) pNext = eiNext.coord
    const e = new EdgeEnd(edge, eiCurr.coord, pNext, new Label(edge.getLabel()))
    l.add(e)
  }
  createEdgeEndForPrev(edge, l, eiCurr, eiPrev) {
    let iPrev = eiCurr.segmentIndex
    if (eiCurr.dist === 0.0) {
      if (iPrev === 0) return null
      iPrev--
    }
    let pPrev = edge.getCoordinate(iPrev)
    if (eiPrev !== null && eiPrev.segmentIndex >= iPrev) pPrev = eiPrev.coord
    const label = new Label(edge.getLabel())
    label.flip()
    const e = new EdgeEnd(edge, eiCurr.coord, pPrev, label)
    l.add(e)
  }
  computeEdgeEnds() {
    if (arguments.length === 1) {
      const edges = arguments[0]
      const l = new ArrayList()
      for (let i = edges; i.hasNext(); ) {
        const e = i.next()
        this.computeEdgeEnds(e, l)
      }
      return l
    } else if (arguments.length === 2) {
      const edge = arguments[0], l = arguments[1]
      const eiList = edge.getEdgeIntersectionList()
      eiList.addEndpoints()
      const it = eiList.iterator()
      let eiPrev = null
      let eiCurr = null
      if (!it.hasNext()) return null
      let eiNext = it.next()
      do {
        eiPrev = eiCurr
        eiCurr = eiNext
        eiNext = null
        if (it.hasNext()) eiNext = it.next()
        if (eiCurr !== null) {
          this.createEdgeEndForPrev(edge, l, eiCurr, eiPrev)
          this.createEdgeEndForNext(edge, l, eiCurr, eiNext)
        }
      } while (eiCurr !== null)
    }
  }
}
