import extend from '../../../../../extend';
import FacetSequenceTreeBuilder from './FacetSequenceTreeBuilder';
import ItemDistance from '../../index/strtree/ItemDistance';
export default function IndexedFacetDistance() {
	this.cachedTree = null;
	let g1 = arguments[0];
	this.cachedTree = FacetSequenceTreeBuilder.build(g1);
}
extend(IndexedFacetDistance.prototype, {
	getDistance: function (g) {
		var tree2 = FacetSequenceTreeBuilder.build(g);
		var obj = this.cachedTree.nearestNeighbour(tree2, new FacetSequenceDistance());
		return IndexedFacetDistance.facetDistance(obj);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return IndexedFacetDistance;
	}
});
IndexedFacetDistance.distance = function (g1, g2) {
	var dist = new IndexedFacetDistance(g1);
	return dist.getDistance(g2);
};
IndexedFacetDistance.facetDistance = function (obj) {
	var o1 = obj[0];
	var o2 = obj[1];
	return o1.distance(o2);
};
function FacetSequenceDistance() {}
extend(FacetSequenceDistance.prototype, {
	distance: function (item1, item2) {
		var fs1 = item1.getItem();
		var fs2 = item2.getItem();
		return fs1.distance(fs2);
	},
	interfaces_: function () {
		return [ItemDistance];
	},
	getClass: function () {
		return FacetSequenceDistance;
	}
});
IndexedFacetDistance.FacetSequenceDistance = FacetSequenceDistance;

