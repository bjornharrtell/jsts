import CGAlgorithms from '../../algorithm/CGAlgorithms';
import SweepLineIndex from '../../index/sweepline/SweepLineIndex';
import IsValidOp from './IsValidOp';
import SweepLineInterval from '../../index/sweepline/SweepLineInterval';
import extend from '../../../../../extend';
import ArrayList from '../../../../../java/util/ArrayList';
import Assert from '../../util/Assert';
export default function SweeplineNestedRingTester() {
	this.graph = null;
	this.rings = new ArrayList();
	this.sweepLine = null;
	this.nestedPt = null;
	let graph = arguments[0];
	this.graph = graph;
}
extend(SweeplineNestedRingTester.prototype, {
	buildIndex: function () {
		this.sweepLine = new SweepLineIndex();
		for (var i = 0; i < this.rings.size(); i++) {
			var ring = this.rings.get(i);
			var env = ring.getEnvelopeInternal();
			var sweepInt = new SweepLineInterval(env.getMinX(), env.getMaxX(), ring);
			this.sweepLine.add(sweepInt);
		}
	},
	getNestedPoint: function () {
		return this.nestedPt;
	},
	isNonNested: function () {
		this.buildIndex();
		var action = new OverlapAction();
		this.sweepLine.computeOverlaps(action);
		return action.isNonNested;
	},
	add: function (ring) {
		this.rings.add(ring);
	},
	isInside: function (innerRing, searchRing) {
		var innerRingPts = innerRing.getCoordinates();
		var searchRingPts = searchRing.getCoordinates();
		if (!innerRing.getEnvelopeInternal().intersects(searchRing.getEnvelopeInternal())) return false;
		var innerRingPt = IsValidOp.findPtNotNode(innerRingPts, searchRing, this.graph);
		Assert.isTrue(innerRingPt !== null, "Unable to find a ring point not a node of the search ring");
		var isInside = CGAlgorithms.isPointInRing(innerRingPt, searchRingPts);
		if (isInside) {
			this.nestedPt = innerRingPt;
			return true;
		}
		return false;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return SweeplineNestedRingTester;
	}
});
