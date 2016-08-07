import NodedSegmentString from './NodedSegmentString';
import extend from '../../../../extend';
import inherits from '../../../../inherits';
import SinglePassNoder from './SinglePassNoder';
export default function SimpleNoder() {
	SinglePassNoder.apply(this);
	this.nodedSegStrings = null;
}
inherits(SimpleNoder, SinglePassNoder);
extend(SimpleNoder.prototype, {
	computeNodes: function (inputSegStrings) {
		this.nodedSegStrings = inputSegStrings;
		for (var i0 = inputSegStrings.iterator(); i0.hasNext(); ) {
			var edge0 = i0.next();
			for (var i1 = inputSegStrings.iterator(); i1.hasNext(); ) {
				var edge1 = i1.next();
				this.computeIntersects(edge0, edge1);
			}
		}
	},
	computeIntersects: function (e0, e1) {
		var pts0 = e0.getCoordinates();
		var pts1 = e1.getCoordinates();
		for (var i0 = 0; i0 < pts0.length - 1; i0++) {
			for (var i1 = 0; i1 < pts1.length - 1; i1++) {
				this.segInt.processIntersections(e0, i0, e1, i1);
			}
		}
	},
	getNodedSubstrings: function () {
		return NodedSegmentString.getNodedSubstrings(this.nodedSegStrings);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return SimpleNoder;
	}
});
