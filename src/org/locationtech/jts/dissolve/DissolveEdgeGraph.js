import EdgeGraph from '../edgegraph/EdgeGraph';
import extend from '../../../../extend';
import DissolveHalfEdge from './DissolveHalfEdge';
import inherits from '../../../../inherits';
export default function DissolveEdgeGraph() {
	EdgeGraph.apply(this);
}
inherits(DissolveEdgeGraph, EdgeGraph);
extend(DissolveEdgeGraph.prototype, {
	createEdge: function (p0) {
		return new DissolveHalfEdge(p0);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return DissolveEdgeGraph;
	}
});
