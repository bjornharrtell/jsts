import extend from '../../../../../extend';
import GeometryCollection from '../GeometryCollection';
import ArrayList from '../../../../../java/util/ArrayList';
import GeometryFilter from '../GeometryFilter';
export default function GeometryExtracter() {
	this.clz = null;
	this.comps = null;
	let clz = arguments[0], comps = arguments[1];
	this.clz = clz;
	this.comps = comps;
}
extend(GeometryExtracter.prototype, {
	filter: function (geom) {
		if (this.clz === null || GeometryExtracter.isOfClass(geom, this.clz)) this.comps.add(geom);
	},
	interfaces_: function () {
		return [GeometryFilter];
	},
	getClass: function () {
		return GeometryExtracter;
	}
});
GeometryExtracter.isOfClass = function (o, clz) {
	return clz.isAssignableFrom(o.getClass());
};
GeometryExtracter.extract = function () {
	if (arguments.length === 2) {
		let geom = arguments[0], clz = arguments[1];
		return GeometryExtracter.extract(geom, clz, new ArrayList());
	} else if (arguments.length === 3) {
		let geom = arguments[0], clz = arguments[1], list = arguments[2];
		if (GeometryExtracter.isOfClass(geom, clz)) {
			list.add(geom);
		} else if (geom instanceof GeometryCollection) {
			geom.apply(new GeometryExtracter(clz, list));
		}
		return list;
	}
};

