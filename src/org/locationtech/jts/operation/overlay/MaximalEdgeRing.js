import MinimalEdgeRing from './MinimalEdgeRing';
import extend from '../../../../../extend';
import EdgeRing from '../../geomgraph/EdgeRing';
import ArrayList from '../../../../../java/util/ArrayList';
import inherits from '../../../../../inherits';
export default function MaximalEdgeRing() {
	let start = arguments[0], geometryFactory = arguments[1];
	EdgeRing.call(this, start, geometryFactory);
}
inherits(MaximalEdgeRing, EdgeRing);
extend(MaximalEdgeRing.prototype, {
	buildMinimalRings: function () {
		var minEdgeRings = new ArrayList();
		var de = this.startDe;
		do {
			if (de.getMinEdgeRing() === null) {
				var minEr = new MinimalEdgeRing(de, this.geometryFactory);
				minEdgeRings.add(minEr);
			}
			de = de.getNext();
		} while (de !== this.startDe);
		return minEdgeRings;
	},
	setEdgeRing: function (de, er) {
		de.setEdgeRing(er);
	},
	linkDirectedEdgesForMinimalEdgeRings: function () {
		var de = this.startDe;
		do {
			var node = de.getNode();
			node.getEdges().linkMinimalDirectedEdges(this);
			de = de.getNext();
		} while (de !== this.startDe);
	},
	getNext: function (de) {
		return de.getNext();
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return MaximalEdgeRing;
	}
});
