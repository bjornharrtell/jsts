import DirectedEdge from '../../planargraph/DirectedEdge';
import Assert from '../../util/Assert';
export default class LineMergeDirectedEdge extends DirectedEdge {
	constructor(...args) {
		super();
		(() => {})();
		const overloads = (...args) => {
			switch (args.length) {
				case 4:
					return ((...args) => {
						let [from, to, directionPt, edgeDirection] = args;
						super(from, to, directionPt, edgeDirection);
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [];
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
}

