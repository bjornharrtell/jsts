import CGAlgorithms from '../../algorithm/CGAlgorithms';
import IsValidOp from './IsValidOp';
import extend from '../../../../../extend';
import ArrayList from '../../../../../java/util/ArrayList';
import Assert from '../../util/Assert';
export default function SimpleNestedRingTester() {
	this.graph = null;
	this.rings = new ArrayList();
	this.nestedPt = null;
	let graph = arguments[0];
	this.graph = graph;
}
extend(SimpleNestedRingTester.prototype, {
	getNestedPoint: function () {
		return this.nestedPt;
	},
	isNonNested: function () {
		for (var i = 0; i < this.rings.size(); i++) {
			var innerRing = this.rings.get(i);
			var innerRingPts = innerRing.getCoordinates();
			for (var j = 0; j < this.rings.size(); j++) {
				var searchRing = this.rings.get(j);
				var searchRingPts = searchRing.getCoordinates();
				if (innerRing === searchRing) continue;
				if (!innerRing.getEnvelopeInternal().intersects(searchRing.getEnvelopeInternal())) continue;
				var innerRingPt = IsValidOp.findPtNotNode(innerRingPts, searchRing, this.graph);
				Assert.isTrue(innerRingPt !== null, "Unable to find a ring point not a node of the search ring");
				var isInside = CGAlgorithms.isPointInRing(innerRingPt, searchRingPts);
				if (isInside) {
					this.nestedPt = innerRingPt;
					return false;
				}
			}
		}
		return true;
	},
	add: function (ring) {
		this.rings.add(ring);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return SimpleNestedRingTester;
	}
});
