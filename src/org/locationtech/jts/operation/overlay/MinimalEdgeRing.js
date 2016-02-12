import EdgeRing from '../../geomgraph/EdgeRing';
export default class MinimalEdgeRing extends EdgeRing {
	constructor(...args) {
		super();
		if (args.length === 2) {
			let [start, geometryFactory] = args;
			super(start, geometryFactory);
		}
	}
	get interfaces_() {
		return [];
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
}

