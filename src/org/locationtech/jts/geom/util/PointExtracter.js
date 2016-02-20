import Point from '../Point';
import extend from '../../../../../extend';
import Collections from '../../../../../java/util/Collections';
import GeometryCollection from '../GeometryCollection';
import ArrayList from '../../../../../java/util/ArrayList';
import GeometryFilter from '../GeometryFilter';
export default function PointExtracter() {
	this.pts = null;
	let pts = arguments[0];
	this.pts = pts;
}
extend(PointExtracter.prototype, {
	filter: function (geom) {
		if (geom instanceof Point) this.pts.add(geom);
	},
	interfaces_: function () {
		return [GeometryFilter];
	},
	getClass: function () {
		return PointExtracter;
	}
});
PointExtracter.getPoints = function () {
	if (arguments.length === 1) {
		let geom = arguments[0];
		if (geom instanceof Point) {
			return Collections.singletonList(geom);
		}
		return PointExtracter.getPoints(geom, new ArrayList());
	} else if (arguments.length === 2) {
		let geom = arguments[0], list = arguments[1];
		if (geom instanceof Point) {
			list.add(geom);
		} else if (geom instanceof GeometryCollection) {
			geom.apply(new PointExtracter(list));
		}
		return list;
	}
};

