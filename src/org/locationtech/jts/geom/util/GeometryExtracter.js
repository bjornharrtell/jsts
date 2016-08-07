import extend from '../../../../../extend';
import GeometryCollection from '../GeometryCollection';
import ArrayList from '../../../../../java/util/ArrayList';
import GeometryFilter from '../GeometryFilter';
export default function GeometryExtracter() {
	this.sortIndex = -1;
	this.comps = null;
	let sortIndex = arguments[0], comps = arguments[1];
	this.sortIndex = sortIndex;
	this.comps = comps;
}
extend(GeometryExtracter.prototype, {
	filter: function (geom) {
		if (this.sortIndex === -1 || geom.getSortIndex() === this.sortIndex) this.comps.add(geom);
	},
	interfaces_: function () {
		return [GeometryFilter];
	},
	getClass: function () {
		return GeometryExtracter;
	}
});
GeometryExtracter.extract = function () {
	if (arguments.length === 2) {
		let geom = arguments[0], sortIndex = arguments[1];
		return GeometryExtracter.extract(geom, sortIndex, new ArrayList());
	} else if (arguments.length === 3) {
		let geom = arguments[0], sortIndex = arguments[1], list = arguments[2];
		if (geom.getSortIndex() === sortIndex) {
			list.add(geom);
		} else if (geom instanceof GeometryCollection) {
			geom.apply(new GeometryExtracter(sortIndex, list));
		}
		return list;
	}
};
