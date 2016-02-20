import Polygon from '../Polygon';
import extend from '../../../../../extend';
import GeometryCollection from '../GeometryCollection';
import ArrayList from '../../../../../java/util/ArrayList';
import GeometryFilter from '../GeometryFilter';
export default function PolygonExtracter() {
	this.comps = null;
	let comps = arguments[0];
	this.comps = comps;
}
extend(PolygonExtracter.prototype, {
	filter: function (geom) {
		if (geom instanceof Polygon) this.comps.add(geom);
	},
	interfaces_: function () {
		return [GeometryFilter];
	},
	getClass: function () {
		return PolygonExtracter;
	}
});
PolygonExtracter.getPolygons = function () {
	if (arguments.length === 1) {
		let geom = arguments[0];
		return PolygonExtracter.getPolygons(geom, new ArrayList());
	} else if (arguments.length === 2) {
		let geom = arguments[0], list = arguments[1];
		if (geom instanceof Polygon) {
			list.add(geom);
		} else if (geom instanceof GeometryCollection) {
			geom.apply(new PolygonExtracter(list));
		}
		return list;
	}
};

