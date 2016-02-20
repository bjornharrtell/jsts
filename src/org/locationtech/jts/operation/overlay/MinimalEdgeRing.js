import extend from '../../../../../extend';
import EdgeRing from '../../geomgraph/EdgeRing';
import inherits from '../../../../../inherits';
export default function MinimalEdgeRing() {
	let start = arguments[0], geometryFactory = arguments[1];
	EdgeRing.call(this, start, geometryFactory);
}
inherits(MinimalEdgeRing, EdgeRing);
extend(MinimalEdgeRing.prototype, {
	setEdgeRing: function (de, er) {
		de.setMinEdgeRing(er);
	},
	getNext: function (de) {
		return de.getNextMin();
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return MinimalEdgeRing;
	}
});

