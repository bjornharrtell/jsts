import extend from '../../../../../extend';
import DirectedEdge from '../../planargraph/DirectedEdge';
import Assert from '../../util/Assert';
import inherits from '../../../../../inherits';
export default function LineMergeDirectedEdge() {
	let from = arguments[0], to = arguments[1], directionPt = arguments[2], edgeDirection = arguments[3];
	DirectedEdge.call(this, from, to, directionPt, edgeDirection);
}
inherits(LineMergeDirectedEdge, DirectedEdge);
extend(LineMergeDirectedEdge.prototype, {
	getNext: function () {
		if (this.getToNode().getDegree() !== 2) {
			return null;
		}
		if (this.getToNode().getOutEdges().getEdges().get(0) === this.getSym()) {
			return this.getToNode().getOutEdges().getEdges().get(1);
		}
		Assert.isTrue(this.getToNode().getOutEdges().getEdges().get(1) === this.getSym());
		return this.getToNode().getOutEdges().getEdges().get(0);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return LineMergeDirectedEdge;
	}
});

