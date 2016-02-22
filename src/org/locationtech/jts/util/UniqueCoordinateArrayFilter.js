import TreeSet from '../../../../java/util/TreeSet';
import CoordinateFilter from '../geom/CoordinateFilter';
import extend from '../../../../extend';
import ArrayList from '../../../../java/util/ArrayList';
export default function UniqueCoordinateArrayFilter() {
	this.treeSet = new TreeSet();
	this.list = new ArrayList();
}
extend(UniqueCoordinateArrayFilter.prototype, {
	filter: function (coord) {
		if (!this.treeSet.contains(coord)) {
			this.list.add(coord);
			this.treeSet.add(coord);
		}
	},
	getCoordinates: function () {
		var coordinates = new Array(this.list.size()).fill(null);
		return this.list.toArray(coordinates);
	},
	interfaces_: function () {
		return [CoordinateFilter];
	},
	getClass: function () {
		return UniqueCoordinateArrayFilter;
	}
});
UniqueCoordinateArrayFilter.filterCoordinates = function (coords) {
	var filter = new UniqueCoordinateArrayFilter();
	for (var i = 0; i < coords.length; i++) {
		filter.filter(coords[i]);
	}
	return filter.getCoordinates();
};

