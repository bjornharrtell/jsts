import CGAlgorithms from '../../algorithm/CGAlgorithms';
import SweepLineIndex from '../../index/sweepline/SweepLineIndex';
import IsValidOp from './IsValidOp';
import SweepLineInterval from '../../index/sweepline/SweepLineInterval';
import extend from '../../../../../extend';
import ArrayList from '../../../../../java/util/ArrayList';
import Assert from '../../util/Assert';
export default function SweeplineNestedRingTester() {
	this._graph = null;
	this._rings = new ArrayList();
	this._sweepLine = null;
	this._nestedPt = null;
	let graph = arguments[0];
	this._graph = graph;
}
extend(SweeplineNestedRingTester.prototype, {
	buildIndex: function () {
		this._sweepLine = new SweepLineIndex();
		for (var i = 0; i < this._rings.size(); i++) {
			var ring = this._rings.get(i);
			var env = ring.getEnvelopeInternal();
			var sweepInt = new SweepLineInterval(env.getMinX(), env.getMaxX(), ring);
			this._sweepLine.add(sweepInt);
		}
	},
	getNestedPoint: function () {
		return this._nestedPt;
	},
	isNonNested: function () {
		this.buildIndex();
		var action = new OverlapAction();
		this._sweepLine.computeOverlaps(action);
		return action.isNonNested;
	},
	add: function (ring) {
		this._rings.add(ring);
	},
	isInside: function (innerRing, searchRing) {
		var innerRingPts = innerRing.getCoordinates();
		var searchRingPts = searchRing.getCoordinates();
		if (!innerRing.getEnvelopeInternal().intersects(searchRing.getEnvelopeInternal())) return false;
		var innerRingPt = IsValidOp.findPtNotNode(innerRingPts, searchRing, this._graph);
		Assert.isTrue(innerRingPt !== null, "Unable to find a ring point not a node of the search ring");
		var isInside = CGAlgorithms.isPointInRing(innerRingPt, searchRingPts);
		if (isInside) {
			this._nestedPt = innerRingPt;
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
