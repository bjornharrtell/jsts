import EdgeRing from '../../geomgraph/EdgeRing';
export default class MinimalEdgeRing extends EdgeRing {
	constructor() {
		super();
		MinimalEdgeRing.constructor_.apply(this, arguments);
	}
	setEdgeRing(de, er) {
		de.setMinEdgeRing(er);
	}
	getNext(de) {
		return de.getNextMin();
	}
	getClass() {
		return MinimalEdgeRing;
	}
	get interfaces_() {
		return [];
	}
}
MinimalEdgeRing.constructor_ = function () {
	let start = arguments[0], geometryFactory = arguments[1];
	EdgeRing.constructor_.call(this, start, geometryFactory);
};
