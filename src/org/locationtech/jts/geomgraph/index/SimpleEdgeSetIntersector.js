import hasInterface from '../../../../../hasInterface'
import EdgeSetIntersector from './EdgeSetIntersector'
import SegmentIntersector from './SegmentIntersector'
import List from '../../../../../java/util/List'
export default class SimpleEdgeSetIntersector extends EdgeSetIntersector {
  constructor() {
    super()
    SimpleEdgeSetIntersector.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this.nOverlaps = null
  }
  computeIntersects(e0, e1, si) {
    const pts0 = e0.getCoordinates()
    const pts1 = e1.getCoordinates()
    for (let i0 = 0; i0 < pts0.length - 1; i0++) 
      for (let i1 = 0; i1 < pts1.length - 1; i1++) 
        si.addIntersections(e0, i0, e1, i1)
      
    
  }
  computeIntersections() {
    if (arguments[2] instanceof SegmentIntersector && (hasInterface(arguments[0], List) && hasInterface(arguments[1], List))) {
      const edges0 = arguments[0], edges1 = arguments[1], si = arguments[2]
      this.nOverlaps = 0
      for (let i0 = edges0.iterator(); i0.hasNext(); ) {
        const edge0 = i0.next()
        for (let i1 = edges1.iterator(); i1.hasNext(); ) {
          const edge1 = i1.next()
          this.computeIntersects(edge0, edge1, si)
        }
      }
    } else if (typeof arguments[2] === 'boolean' && (hasInterface(arguments[0], List) && arguments[1] instanceof SegmentIntersector)) {
      const edges = arguments[0], si = arguments[1], testAllSegments = arguments[2]
      this.nOverlaps = 0
      for (let i0 = edges.iterator(); i0.hasNext(); ) {
        const edge0 = i0.next()
        for (let i1 = edges.iterator(); i1.hasNext(); ) {
          const edge1 = i1.next()
          if (testAllSegments || edge0 !== edge1) this.computeIntersects(edge0, edge1, si)
        }
      }
    }
  }
}
