import Orientation from '../algorithm/Orientation'
import Comparable from '../../../../java/lang/Comparable'
import ArrayList from '../../../../java/util/ArrayList'
import Quadrant from '../geomgraph/Quadrant'
import GraphComponent from './GraphComponent'
export default class DirectedEdge extends GraphComponent {
  constructor() {
    super()
    DirectedEdge.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._parentEdge = null
    this._from = null
    this._to = null
    this._p0 = null
    this._p1 = null
    this._sym = null
    this._edgeDirection = null
    this._quadrant = null
    this._angle = null
    if (arguments.length === 0) {} else if (arguments.length === 4) {
      const from = arguments[0], to = arguments[1], directionPt = arguments[2], edgeDirection = arguments[3]
      this._from = from
      this._to = to
      this._edgeDirection = edgeDirection
      this._p0 = from.getCoordinate()
      this._p1 = directionPt
      const dx = this._p1.x - this._p0.x
      const dy = this._p1.y - this._p0.y
      this._quadrant = Quadrant.quadrant(dx, dy)
      this._angle = Math.atan2(dy, dx)
    }
  }
  static toEdges(dirEdges) {
    const edges = new ArrayList()
    for (let i = dirEdges.iterator(); i.hasNext(); ) 
      edges.add(i.next()._parentEdge)
    
    return edges
  }
  isRemoved() {
    return this._parentEdge === null
  }
  compareDirection(e) {
    if (this._quadrant > e._quadrant) return 1
    if (this._quadrant < e._quadrant) return -1
    return Orientation.index(e._p0, e._p1, this._p1)
  }
  getCoordinate() {
    return this._from.getCoordinate()
  }
  print(out) {
    const className = this.getClass().getName()
    const lastDotPos = className.lastIndexOf('.')
    const name = className.substring(lastDotPos + 1)
    out.print('  ' + name + ': ' + this._p0 + ' - ' + this._p1 + ' ' + this._quadrant + ':' + this._angle)
  }
  getDirectionPt() {
    return this._p1
  }
  getAngle() {
    return this._angle
  }
  compareTo(obj) {
    const de = obj
    return this.compareDirection(de)
  }
  getFromNode() {
    return this._from
  }
  getSym() {
    return this._sym
  }
  setEdge(parentEdge) {
    this._parentEdge = parentEdge
  }
  remove() {
    this._sym = null
    this._parentEdge = null
  }
  getEdge() {
    return this._parentEdge
  }
  getQuadrant() {
    return this._quadrant
  }
  setSym(sym) {
    this._sym = sym
  }
  getToNode() {
    return this._to
  }
  getEdgeDirection() {
    return this._edgeDirection
  }
  get interfaces_() {
    return [Comparable]
  }
}
