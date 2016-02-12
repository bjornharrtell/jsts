import CGAlgorithms from '../../algorithm/CGAlgorithms';
import IsValidOp from './IsValidOp';
import ArrayList from '../../../../../java/util/ArrayList';
import Assert from '../../util/Assert';
export default class SimpleNestedRingTester {
	constructor(...args) {
		this.graph = null;
		this.rings = new ArrayList();
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
	getNestedPoint() {
		return this.nestedPt;
	}
	isNonNested() {
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
	}
	add(ring) {
		this.rings.add(ring);
	}
	getClass() {
		return SimpleNestedRingTester;
	}
}

