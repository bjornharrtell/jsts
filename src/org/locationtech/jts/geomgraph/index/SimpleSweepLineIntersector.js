import hasInterface from '../../../../../hasInterface'
import SweepLineSegment from './SweepLineSegment'
import SweepLineEvent from './SweepLineEvent'
import EdgeSetIntersector from './EdgeSetIntersector'
import Collections from '../../../../../java/util/Collections'
import SegmentIntersector from './SegmentIntersector'
import ArrayList from '../../../../../java/util/ArrayList'
import Edge from '../Edge'
import List from '../../../../../java/util/List'
export default class SimpleSweepLineIntersector extends EdgeSetIntersector {
  constructor() {
    super()
    SimpleSweepLineIntersector.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this.events = new ArrayList()
    this.nOverlaps = null
  }
  processOverlaps(start, end, ev0, si) {
    const ss0 = ev0.getObject()
    for (let i = start; i < end; i++) {
      const ev1 = this.events.get(i)
      if (ev1.isInsert()) {
        const ss1 = ev1.getObject()
        if (!ev0.isSameLabel(ev1)) {
          ss0.computeIntersections(ss1, si)
          this.nOverlaps++
        }
      }
    }
  }
  prepareEvents() {
    Collections.sort(this.events)
    for (let i = 0; i < this.events.size(); i++) {
      const ev = this.events.get(i)
      if (ev.isDelete()) 
        ev.getInsertEvent().setDeleteEventIndex(i)
      
    }
  }
  computeIntersections() {
    if (arguments.length === 1) {
      const si = arguments[0]
      this.nOverlaps = 0
      this.prepareEvents()
      for (let i = 0; i < this.events.size(); i++) {
        const ev = this.events.get(i)
        if (ev.isInsert()) 
          this.processOverlaps(i, ev.getDeleteEventIndex(), ev, si)
        
      }
    } else if (arguments.length === 3) {
      if (arguments[2] instanceof SegmentIntersector && (hasInterface(arguments[0], List) && hasInterface(arguments[1], List))) {
        const edges0 = arguments[0], edges1 = arguments[1], si = arguments[2]
        this.add(edges0, edges0)
        this.add(edges1, edges1)
        this.computeIntersections(si)
      } else if (typeof arguments[2] === 'boolean' && (hasInterface(arguments[0], List) && arguments[1] instanceof SegmentIntersector)) {
        const edges = arguments[0], si = arguments[1], testAllSegments = arguments[2]
        if (testAllSegments) this.add(edges, null); else this.add(edges)
        this.computeIntersections(si)
      }
    }
  }
  add() {
    if (arguments.length === 1) {
      const edges = arguments[0]
      for (let i = edges.iterator(); i.hasNext(); ) {
        const edge = i.next()
        this.add(edge, edge)
      }
    } else if (arguments.length === 2) {
      if (hasInterface(arguments[0], List) && arguments[1] instanceof Object) {
        const edges = arguments[0], edgeSet = arguments[1]
        for (let i = edges.iterator(); i.hasNext(); ) {
          const edge = i.next()
          this.add(edge, edgeSet)
        }
      } else if (arguments[0] instanceof Edge && arguments[1] instanceof Object) {
        const edge = arguments[0], edgeSet = arguments[1]
        const pts = edge.getCoordinates()
        for (let i = 0; i < pts.length - 1; i++) {
          const ss = new SweepLineSegment(edge, i)
          const insertEvent = new SweepLineEvent(edgeSet, ss.getMinX(), null)
          this.events.add(insertEvent)
          this.events.add(new SweepLineEvent(ss.getMaxX(), insertEvent))
        }
      }
    }
  }
}
