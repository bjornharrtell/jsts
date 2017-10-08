import Quadtree from '../../index/quadtree/Quadtree';
import CGAlgorithms from '../../algorithm/CGAlgorithms';
import IsValidOp from './IsValidOp';
import extend from '../../../../../extend';
import ArrayList from '../../../../../java/util/ArrayList';
import Envelope from '../../geom/Envelope';
import Assert from '../../util/Assert';
export default function QuadtreeNestedRingTester() {
	this._graph = null;
	this._rings = new ArrayList();
	this._totalEnv = new Envelope();
	this._quadtree = null;
	this._nestedPt = null;
	let graph = arguments[0];
	this._graph = graph;
}
extend(QuadtreeNestedRingTester.prototype, {
	getNestedPoint: function () {
		return this._nestedPt;
	},
	isNonNested: function () {
		this.buildQuadtree();
		for (var i = 0; i < this._rings.size(); i++) {
			var innerRing = this._rings.get(i);
			var innerRingPts = innerRing.getCoordinates();
			var results = this._quadtree.query(innerRing.getEnvelopeInternal());
			for (var j = 0; j < results.size(); j++) {
				var searchRing = results.get(j);
				var searchRingPts = searchRing.getCoordinates();
				if (innerRing === searchRing) continue;
				if (!innerRing.getEnvelopeInternal().intersects(searchRing.getEnvelopeInternal())) continue;
				var innerRingPt = IsValidOp.findPtNotNode(innerRingPts, searchRing, this._graph);
				Assert.isTrue(innerRingPt !== null, "Unable to find a ring point not a node of the search ring");
				var isInside = CGAlgorithms.isPointInRing(innerRingPt, searchRingPts);
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
	buildQuadtree: function () {
		this._quadtree = new Quadtree();
		for (var i = 0; i < this._rings.size(); i++) {
			var ring = this._rings.get(i);
			var env = ring.getEnvelopeInternal();
			this._quadtree.insert(env, ring);
		}
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return QuadtreeNestedRingTester;
	}
});
