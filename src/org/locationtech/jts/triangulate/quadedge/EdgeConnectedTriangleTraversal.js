import hasInterface from '../../../../../hasInterface'
import Collection from '../../../../../java/util/Collection'
import QuadEdgeTriangle from './QuadEdgeTriangle'
import LinkedList from '../../../../../java/util/LinkedList'
export default class EdgeConnectedTriangleTraversal {
  constructor() {
    EdgeConnectedTriangleTraversal.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._triQueue = new LinkedList()
  }
  init() {
    if (arguments[0] instanceof QuadEdgeTriangle) {
      const tri = arguments[0]
      this._triQueue.addLast(tri)
    } else if (hasInterface(arguments[0], Collection)) {
      const tris = arguments[0]
      this._triQueue.addAll(tris)
    }
  }
  process(currTri, visitor) {
    currTri.getNeighbours()
    for (let i = 0; i < 3; i++) {
      const neighTri = currTri.getEdge(i).sym().getData()
      if (neighTri === null) continue
      if (visitor.visit(currTri, i, neighTri)) this._triQueue.addLast(neighTri)
    }
  }
  visitAll(visitor) {
    while (!this._triQueue.isEmpty()) {
      const tri = this._triQueue.removeFirst()
      this.process(tri, visitor)
    }
  }
}
