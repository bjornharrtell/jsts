import MinimalEdgeRing from './MinimalEdgeRing';
import EdgeRing from '../../geomgraph/EdgeRing';
import ArrayList from '../../../../../java/util/ArrayList';
export default class MaximalEdgeRing extends EdgeRing {
	constructor() {
		super();
		MaximalEdgeRing.constructor_.apply(this, arguments);
	}
	buildMinimalRings() {
		var minEdgeRings = new ArrayList();
		var de = this._startDe;
		do {
			if (de.getMinEdgeRing() === null) {
				var minEr = new MinimalEdgeRing(de, this._geometryFactory);
				minEdgeRings.add(minEr);
			}
			de = de.getNext();
		} while (de !== this._startDe);
		return minEdgeRings;
	}
	setEdgeRing(de, er) {
		de.setEdgeRing(er);
	}
	linkDirectedEdgesForMinimalEdgeRings() {
		var de = this._startDe;
		do {
			var node = de.getNode();
			node.getEdges().linkMinimalDirectedEdges(this);
			de = de.getNext();
		} while (de !== this._startDe);
	}
	getNext(de) {
		return de.getNext();
	}
	getClass() {
		return MaximalEdgeRing;
	}
	get interfaces_() {
		return [];
	}
}
MaximalEdgeRing.constructor_ = function () {
	let start = arguments[0], geometryFactory = arguments[1];
	EdgeRing.constructor_.call(this, start, geometryFactory);
};
