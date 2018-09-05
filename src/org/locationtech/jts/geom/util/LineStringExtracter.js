import LineString from '../LineString';
import GeometryCollection from '../GeometryCollection';
import ArrayList from '../../../../../java/util/ArrayList';
import GeometryFilter from '../GeometryFilter';
export default class LineStringExtracter {
	constructor() {
		LineStringExtracter.constructor_.apply(this, arguments);
	}
	static getGeometry(geom) {
		return geom.getFactory().buildGeometry(LineStringExtracter.getLines(geom));
	}
	static getLines() {
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
	}
	filter(geom) {
		if (geom instanceof LineString) this._comps.add(geom);
	}
	getClass() {
		return LineStringExtracter;
	}
	get interfaces_() {
		return [GeometryFilter];
	}
}
LineStringExtracter.constructor_ = function () {
	this._comps = null;
	let comps = arguments[0];
	this._comps = comps;
};
