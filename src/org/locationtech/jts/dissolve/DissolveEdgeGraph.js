import EdgeGraph from '../edgegraph/EdgeGraph';
import DissolveHalfEdge from './DissolveHalfEdge';
export default class DissolveEdgeGraph extends EdgeGraph {
	constructor() {
		super();
		DissolveEdgeGraph.constructor_.apply(this, arguments);
	}
	createEdge(p0) {
		return new DissolveHalfEdge(p0);
	}
	getClass() {
		return DissolveEdgeGraph;
	}
	get interfaces_() {
		return [];
	}
}
DissolveEdgeGraph.constructor_ = function () {};
