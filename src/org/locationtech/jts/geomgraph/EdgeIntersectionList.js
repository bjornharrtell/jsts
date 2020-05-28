import EdgeIntersection from './EdgeIntersection'
import Coordinate from '../geom/Coordinate'
import Label from './Label'
import Edge from './Edge'
import TreeMap from '../../../../java/util/TreeMap'
export default class EdgeIntersectionList {
  constructor() {
    EdgeIntersectionList.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._nodeMap = new TreeMap()
    this.edge = null
    const edge = arguments[0]
    this.edge = edge
  }
  print(out) {
    out.println('Intersections:')
    for (let it = this.iterator(); it.hasNext(); ) {
      const ei = it.next()
      ei.print(out)
    }
  }
  iterator() {
    return this._nodeMap.values().iterator()
  }
  addSplitEdges(edgeList) {
    this.addEndpoints()
    const it = this.iterator()
    let eiPrev = it.next()
    while (it.hasNext()) {
      const ei = it.next()
      const newEdge = this.createSplitEdge(eiPrev, ei)
      edgeList.add(newEdge)
      eiPrev = ei
    }
  }
  addEndpoints() {
    const maxSegIndex = this.edge.pts.length - 1
    this.add(this.edge.pts[0], 0, 0.0)
    this.add(this.edge.pts[maxSegIndex], maxSegIndex, 0.0)
  }
  createSplitEdge(ei0, ei1) {
    let npts = ei1.segmentIndex - ei0.segmentIndex + 2
    const lastSegStartPt = this.edge.pts[ei1.segmentIndex]
    const useIntPt1 = ei1.dist > 0.0 || !ei1.coord.equals2D(lastSegStartPt)
    if (!useIntPt1) 
      npts--
    
    const pts = new Array(npts).fill(null)
    let ipt = 0
    pts[ipt++] = new Coordinate(ei0.coord)
    for (let i = ei0.segmentIndex + 1; i <= ei1.segmentIndex; i++) 
      pts[ipt++] = this.edge.pts[i]
    
    if (useIntPt1) pts[ipt] = ei1.coord
    return new Edge(pts, new Label(this.edge._label))
  }
  add(intPt, segmentIndex, dist) {
    const eiNew = new EdgeIntersection(intPt, segmentIndex, dist)
    const ei = this._nodeMap.get(eiNew)
    if (ei !== null) 
      return ei
    
    this._nodeMap.put(eiNew, eiNew)
    return eiNew
  }
  isIntersection(pt) {
    for (let it = this.iterator(); it.hasNext(); ) {
      const ei = it.next()
      if (ei.coord.equals(pt)) return true
    }
    return false
  }
}
