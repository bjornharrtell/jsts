import STRtree from '../../index/strtree/STRtree';
import IsValidOp from './IsValidOp';
import PointLocation from '../../algorithm/PointLocation';
import ArrayList from '../../../../../java/util/ArrayList';
import Envelope from '../../geom/Envelope';
export default class IndexedNestedRingTester {
	constructor() {
		IndexedNestedRingTester.constructor_.apply(this, arguments);
	}
	buildIndex() {
		this._index = new STRtree();
		for (var i = 0; i < this._rings.size(); i++) {
			var ring = this._rings.get(i);
			var env = ring.getEnvelopeInternal();
			this._index.insert(env, ring);
		}
	}
	getNestedPoint() {
		return this._nestedPt;
	}
	isNonNested() {
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
	}
	add(ring) {
		this._rings.add(ring);
		this._totalEnv.expandToInclude(ring.getEnvelopeInternal());
	}
	getClass() {
		return IndexedNestedRingTester;
	}
	get interfaces_() {
		return [];
	}
}
IndexedNestedRingTester.constructor_ = function () {
	this._graph = null;
	this._rings = new ArrayList();
	this._totalEnv = new Envelope();
	this._index = null;
	this._nestedPt = null;
	let graph = arguments[0];
	this._graph = graph;
};
