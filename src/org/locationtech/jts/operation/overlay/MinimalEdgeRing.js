import EdgeRing from '../../geomgraph/EdgeRing';
export default class MinimalEdgeRing extends EdgeRing {
	constructor(...args) {
		super();
		const overloads = (...args) => {
			switch (args.length) {
				case 2:
					return ((...args) => {
						let [start, geometryFactory] = args;
						super(start, geometryFactory);
					})(...args);
			}
		};
		return overloads.apply(this, args);
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

