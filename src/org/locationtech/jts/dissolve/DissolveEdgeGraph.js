import EdgeGraph from '../edgegraph/EdgeGraph.js'
import DissolveHalfEdge from './DissolveHalfEdge.js'
export default class DissolveEdgeGraph extends EdgeGraph {
  constructor() {
    super()
  }
  createEdge(p0) {
    return new DissolveHalfEdge(p0)
  }
}
