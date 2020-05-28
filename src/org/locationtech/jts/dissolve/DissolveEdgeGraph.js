import EdgeGraph from '../edgegraph/EdgeGraph'
import DissolveHalfEdge from './DissolveHalfEdge'
export default class DissolveEdgeGraph extends EdgeGraph {
  constructor() {
    super()
  }
  createEdge(p0) {
    return new DissolveHalfEdge(p0)
  }
}
