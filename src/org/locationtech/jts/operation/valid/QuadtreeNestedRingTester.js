import Quadtree from '../../index/quadtree/Quadtree';
import CGAlgorithms from '../../algorithm/CGAlgorithms';
import IsValidOp from './IsValidOp';
import extend from '../../../../../extend';
import ArrayList from '../../../../../java/util/ArrayList';
import Envelope from '../../geom/Envelope';
import Assert from '../../util/Assert';
export default function QuadtreeNestedRingTester() {
	this.graph = null;
	this.rings = new ArrayList();
	this.totalEnv = new Envelope();
	this.quadtree = null;
	this.nestedPt = null;
	let graph = arguments[0];
	this.graph = graph;
}
extend(QuadtreeNestedRingTester.prototype, {
	getNestedPoint: function () {
		return this.nestedPt;
	},
	isNonNested: function () {
		this.buildQuadtree();
		for (var i = 0; i < this.rings.size(); i++) {
			var innerRing = this.rings.get(i);
			var innerRingPts = innerRing.getCoordinates();
			var results = this.quadtree.query(innerRing.getEnvelopeInternal());
			for (var j = 0; j < results.size(); j++) {
				var searchRing = results.get(j);
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
		this.totalEnv.expandToInclude(ring.getEnvelopeInternal());
	},
	buildQuadtree: function () {
		this.quadtree = new Quadtree();
		for (var i = 0; i < this.rings.size(); i++) {
			var ring = this.rings.get(i);
			var env = ring.getEnvelopeInternal();
			this.quadtree.insert(env, ring);
		}
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return QuadtreeNestedRingTester;
	}
});
