import DirectedEdge from '../../planargraph/DirectedEdge'
export default class PolygonizeDirectedEdge extends DirectedEdge {
  constructor() {
    super()
    PolygonizeDirectedEdge.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._edgeRing = null
    this._next = null
    this._label = -1
    const from = arguments[0], to = arguments[1], directionPt = arguments[2], edgeDirection = arguments[3]
    DirectedEdge.constructor_.call(this, from, to, directionPt, edgeDirection)
  }
  getNext() {
    return this._next
  }
  isInRing() {
    return this._edgeRing !== null
  }
  setRing(edgeRing) {
    this._edgeRing = edgeRing
  }
  setLabel(label) {
    this._label = label
  }
  getLabel() {
    return this._label
  }
  setNext(next) {
    this._next = next
  }
  getRing() {
    return this._edgeRing
  }
}
