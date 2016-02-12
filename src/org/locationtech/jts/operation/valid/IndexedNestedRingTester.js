import CGAlgorithms from '../../algorithm/CGAlgorithms';
import STRtree from '../../index/strtree/STRtree';
import IsValidOp from './IsValidOp';
import ArrayList from '../../../../../java/util/ArrayList';
import Envelope from '../../geom/Envelope';
export default class IndexedNestedRingTester {
	constructor(...args) {
		this.graph = null;
		this.rings = new ArrayList();
		this.totalEnv = new Envelope();
		this.index = null;
		this.nestedPt = null;
		switch (args.length) {
			case 1:
				{
					let [graph] = args;
					this.graph = graph;
					break;
				}
		}
	}
	get interfaces_() {
		return [];
	}
	buildIndex() {
		this.index = new STRtree();
		for (var i = 0; i < this.rings.size(); i++) {
			var ring = this.rings.get(i);
			var env = ring.getEnvelopeInternal();
			this.index.insert(env, ring);
		}
	}
	getNestedPoint() {
		return this.nestedPt;
	}
	isNonNested() {
		this.buildIndex();
		for (var i = 0; i < this.rings.size(); i++) {
			var innerRing = this.rings.get(i);
			var innerRingPts = innerRing.getCoordinates();
			var results = this.index.query(innerRing.getEnvelopeInternal());
			for (var j = 0; j < results.size(); j++) {
				var searchRing = results.get(j);
				var searchRingPts = searchRing.getCoordinates();
				if (innerRing === searchRing) continue;
				if (!innerRing.getEnvelopeInternal().intersects(searchRing.getEnvelopeInternal())) continue;
				var innerRingPt = IsValidOp.findPtNotNode(innerRingPts, searchRing, this.graph);
				if (innerRingPt === null) continue;
				var isInside = CGAlgorithms.isPointInRing(innerRingPt, searchRingPts);
				if (isInside) {
					this.nestedPt = innerRingPt;
					return false;
				}
			}
		}
		return true;
	}
	add(ring) {
		this.rings.add(ring);
		this.totalEnv.expandToInclude(ring.getEnvelopeInternal());
	}
	getClass() {
		return IndexedNestedRingTester;
	}
}

