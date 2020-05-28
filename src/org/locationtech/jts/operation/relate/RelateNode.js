import Node from '../../geomgraph/Node'
export default class RelateNode extends Node {
  constructor() {
    super()
    RelateNode.constructor_.apply(this, arguments)
  }
  static constructor_() {
    const coord = arguments[0], edges = arguments[1]
    Node.constructor_.call(this, coord, edges)
  }
  updateIMFromEdges(im) {
    this._edges.updateIM(im)
  }
  computeIM(im) {
    im.setAtLeastIfValid(this._label.getLocation(0), this._label.getLocation(1), 0)
  }
}
