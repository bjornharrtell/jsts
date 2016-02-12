import FacetSequenceTreeBuilder from './FacetSequenceTreeBuilder';
import ItemDistance from '../../index/strtree/ItemDistance';
export default class IndexedFacetDistance {
	constructor(...args) {
		this.cachedTree = null;
		if (args.length === 1) {
			let [g1] = args;
			this.cachedTree = FacetSequenceTreeBuilder.build(g1);
		}
	}
	get interfaces_() {
		return [];
	}
	static get FacetSequenceDistance() {
		return FacetSequenceDistance;
	}
	static distance(g1, g2) {
		var dist = new IndexedFacetDistance(g1);
		return dist.getDistance(g2);
	}
	static facetDistance(obj) {
		var o1 = obj[0];
		var o2 = obj[1];
		return o1.distance(o2);
	}
	getDistance(g) {
		var tree2 = FacetSequenceTreeBuilder.build(g);
		var obj = this.cachedTree.nearestNeighbour(tree2, new FacetSequenceDistance());
		return IndexedFacetDistance.facetDistance(obj);
	}
	getClass() {
		return IndexedFacetDistance;
	}
}
class FacetSequenceDistance {
	get interfaces_() {
		return [ItemDistance];
	}
	distance(item1, item2) {
		var fs1 = item1.getItem();
		var fs2 = item2.getItem();
		return fs1.distance(fs2);
	}
	getClass() {
		return FacetSequenceDistance;
	}
}

