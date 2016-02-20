import LineString from '../LineString';
import extend from '../../../../../extend';
import GeometryCollection from '../GeometryCollection';
import ArrayList from '../../../../../java/util/ArrayList';
import GeometryFilter from '../GeometryFilter';
export default function LineStringExtracter() {
	this.comps = null;
	let comps = arguments[0];
	this.comps = comps;
}
extend(LineStringExtracter.prototype, {
	filter: function (geom) {
		if (geom instanceof LineString) this.comps.add(geom);
	},
	interfaces_: function () {
		return [GeometryFilter];
	},
	getClass: function () {
		return LineStringExtracter;
	}
});
LineStringExtracter.getGeometry = function (geom) {
	return geom.getFactory().buildGeometry(LineStringExtracter.getLines(geom));
};
LineStringExtracter.getLines = function () {
	if (arguments.length === 1) {
		let geom = arguments[0];
		return LineStringExtracter.getLines(geom, new ArrayList());
	} else if (arguments.length === 2) {
		let geom = arguments[0], lines = arguments[1];
		if (geom instanceof LineString) {
			lines.add(geom);
		} else if (geom instanceof GeometryCollection) {
			geom.apply(new LineStringExtracter(lines));
		}
		return lines;
	}
};

