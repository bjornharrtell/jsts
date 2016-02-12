import TreeSet from '../../../../java/util/TreeSet';
import CoordinateFilter from '../geom/CoordinateFilter';
import ArrayList from '../../../../java/util/ArrayList';
export default class UniqueCoordinateArrayFilter {
	constructor(...args) {
		this.treeSet = new TreeSet();
		this.list = new ArrayList();
		switch (args.length) {
			case 0:
				{
					let [] = args;
					break;
				}
		}
	}
	get interfaces_() {
		return [CoordinateFilter];
	}
	static filterCoordinates(coords) {
		var filter = new UniqueCoordinateArrayFilter();
		for (var i = 0; i < coords.length; i++) {
			filter.filter(coords[i]);
		}
		return filter.getCoordinates();
	}
	filter(coord) {
		if (!this.treeSet.contains(coord)) {
			this.list.add(coord);
			this.treeSet.add(coord);
		}
	}
	getCoordinates() {
		var coordinates = new Array(this.list.size());
		return this.list.toArray(coordinates);
	}
	getClass() {
		return UniqueCoordinateArrayFilter;
	}
}

