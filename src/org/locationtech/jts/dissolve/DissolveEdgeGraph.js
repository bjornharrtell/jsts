import EdgeGraph from '../edgegraph/EdgeGraph';
import DissolveHalfEdge from './DissolveHalfEdge';
export default class DissolveEdgeGraph extends EdgeGraph {
	get interfaces_() {
		return [];
	}
	createEdge(p0) {
		return new DissolveHalfEdge(p0);
	}
	getClass() {
		return DissolveEdgeGraph;
	}
}

