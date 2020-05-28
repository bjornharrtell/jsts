import SimpleMCSweepLineIntersector from '../../geomgraph/index/SimpleMCSweepLineIntersector'
import SegmentIntersector from '../../geomgraph/index/SegmentIntersector'
import ArrayList from '../../../../../java/util/ArrayList'
export default class EdgeSetNoder {
  constructor() {
    EdgeSetNoder.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._li = null
    this._inputEdges = new ArrayList()
    const li = arguments[0]
    this._li = li
  }
  addEdges(edges) {
    this._inputEdges.addAll(edges)
  }
  getNodedEdges() {
    const esi = new SimpleMCSweepLineIntersector()
    const si = new SegmentIntersector(this._li, true, false)
    esi.computeIntersections(this._inputEdges, si, true)
    const splitEdges = new ArrayList()
    for (let i = this._inputEdges.iterator(); i.hasNext(); ) {
      const e = i.next()
      e.getEdgeIntersectionList().addSplitEdges(splitEdges)
    }
    return splitEdges
  }
}
