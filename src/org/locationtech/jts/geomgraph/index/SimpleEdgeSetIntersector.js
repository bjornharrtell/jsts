import EdgeSetIntersector from './EdgeSetIntersector';
import SegmentIntersector from './SegmentIntersector';
import List from '../../../../../java/util/List';
export default class SimpleEdgeSetIntersector extends EdgeSetIntersector {
	constructor(...args) {
		super();
		this.nOverlaps = null;
		const overloads = (...args) => {
			switch (args.length) {
				case 0:
					return ((...args) => {
						let [] = args;
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	computeIntersects(e0, e1, si) {
		var pts0 = e0.getCoordinates();
		var pts1 = e1.getCoordinates();
		for (var i0 = 0; i0 < pts0.length - 1; i0++) {
			for (var i1 = 0; i1 < pts1.length - 1; i1++) {
				si.addIntersections(e0, i0, e1, i1);
			}
		}
	}
	computeIntersections(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 3:
					if (args[2] instanceof SegmentIntersector && (args[0].interfaces_ && args[0].interfaces_.indexOf(List) > -1 && (args[1].interfaces_ && args[1].interfaces_.indexOf(List) > -1))) {
						return ((...args) => {
							let [edges0, edges1, si] = args;
							this.nOverlaps = 0;
							for (var i0 = edges0.iterator(); i0.hasNext(); ) {
								var edge0 = i0.next();
								for (var i1 = edges1.iterator(); i1.hasNext(); ) {
									var edge1 = i1.next();
									this.computeIntersects(edge0, edge1, si);
								}
							}
						})(...args);
					} else if (typeof args[2] === "boolean" && (args[0].interfaces_ && args[0].interfaces_.indexOf(List) > -1 && args[1] instanceof SegmentIntersector)) {
						return ((...args) => {
							let [edges, si, testAllSegments] = args;
							this.nOverlaps = 0;
							for (var i0 = edges.iterator(); i0.hasNext(); ) {
								var edge0 = i0.next();
								for (var i1 = edges.iterator(); i1.hasNext(); ) {
									var edge1 = i1.next();
									if (testAllSegments || edge0 !== edge1) this.computeIntersects(edge0, edge1, si);
								}
							}
						})(...args);
					}
			}
		};
		return overloads.apply(this, args);
	}
	getClass() {
		return SimpleEdgeSetIntersector;
	}
}

