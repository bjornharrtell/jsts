import DirectedEdge from '../../planargraph/DirectedEdge';
import Assert from '../../util/Assert';
export default class LineMergeDirectedEdge extends DirectedEdge {
	constructor() {
		super();
		LineMergeDirectedEdge.constructor_.apply(this, arguments);
	}
	getNext() {
		if (this.getToNode().getDegree() !== 2) {
			return null;
		}
		if (this.getToNode().getOutEdges().getEdges().get(0) === this.getSym()) {
			return this.getToNode().getOutEdges().getEdges().get(1);
		}
		Assert.isTrue(this.getToNode().getOutEdges().getEdges().get(1) === this.getSym());
		return this.getToNode().getOutEdges().getEdges().get(0);
	}
	getClass() {
		return LineMergeDirectedEdge;
	}
	get interfaces_() {
		return [];
	}
}
LineMergeDirectedEdge.constructor_ = function () {
	let from = arguments[0], to = arguments[1], directionPt = arguments[2], edgeDirection = arguments[3];
	DirectedEdge.constructor_.call(this, from, to, directionPt, edgeDirection);
};
