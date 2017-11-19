import STRtree from '../../index/strtree/STRtree';
import IsValidOp from './IsValidOp';
import PointLocation from '../../algorithm/PointLocation';
import extend from '../../../../../extend';
import ArrayList from '../../../../../java/util/ArrayList';
import Envelope from '../../geom/Envelope';
export default function IndexedNestedRingTester() {
	this._graph = null;
	this._rings = new ArrayList();
	this._totalEnv = new Envelope();
	this._index = null;
	this._nestedPt = null;
	let graph = arguments[0];
	this._graph = graph;
}
extend(IndexedNestedRingTester.prototype, {
	buildIndex: function () {
		this._index = new STRtree();
		for (var i = 0; i < this._rings.size(); i++) {
			var ring = this._rings.get(i);
			var env = ring.getEnvelopeInternal();
			this._index.insert(env, ring);
		}
	},
	getNestedPoint: function () {
		return this._nestedPt;
	},
	isNonNested: function () {
		this.buildIndex();
		for (var i = 0; i < this._rings.size(); i++) {
			var innerRing = this._rings.get(i);
			var innerRingPts = innerRing.getCoordinates();
			var results = this._index.query(innerRing.getEnvelopeInternal());
			for (var j = 0; j < results.size(); j++) {
				var searchRing = results.get(j);
				var searchRingPts = searchRing.getCoordinates();
				if (innerRing === searchRing) continue;
				if (!innerRing.getEnvelopeInternal().intersects(searchRing.getEnvelopeInternal())) continue;
				var innerRingPt = IsValidOp.findPtNotNode(innerRingPts, searchRing, this._graph);
				if (innerRingPt === null) continue;
				var isInside = PointLocation.isInRing(innerRingPt, searchRingPts);
				if (isInside) {
					this._nestedPt = innerRingPt;
					return false;
				}
			}
		}
		return true;
	},
	add: function (ring) {
		this._rings.add(ring);
		this._totalEnv.expandToInclude(ring.getEnvelopeInternal());
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return IndexedNestedRingTester;
	}
});
