import OrientedCoordinateArray from '../noding/OrientedCoordinateArray'
import ArrayList from '../../../../java/util/ArrayList'
import TreeMap from '../../../../java/util/TreeMap'
export default class EdgeList {
  constructor() {
    EdgeList.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._edges = new ArrayList()
    this._ocaMap = new TreeMap()
  }
  print(out) {
    out.print('MULTILINESTRING ( ')
    for (let j = 0; j < this._edges.size(); j++) {
      const e = this._edges.get(j)
      if (j > 0) out.print(',')
      out.print('(')
      const pts = e.getCoordinates()
      for (let i = 0; i < pts.length; i++) {
        if (i > 0) out.print(',')
        out.print(pts[i].x + ' ' + pts[i].y)
      }
      out.println(')')
    }
    out.print(')  ')
  }
  addAll(edgeColl) {
    for (let i = edgeColl.iterator(); i.hasNext(); ) 
      this.add(i.next())
    
  }
  findEdgeIndex(e) {
    for (let i = 0; i < this._edges.size(); i++) 
      if (this._edges.get(i).equals(e)) return i
    
    return -1
  }
  iterator() {
    return this._edges.iterator()
  }
  getEdges() {
    return this._edges
  }
  get(i) {
    return this._edges.get(i)
  }
  findEqualEdge(e) {
    const oca = new OrientedCoordinateArray(e.getCoordinates())
    const matchEdge = this._ocaMap.get(oca)
    return matchEdge
  }
  add(e) {
    this._edges.add(e)
    const oca = new OrientedCoordinateArray(e.getCoordinates())
    this._ocaMap.put(oca, e)
  }
}
