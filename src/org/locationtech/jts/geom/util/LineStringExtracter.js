import LineString from '../LineString';
import GeometryCollection from '../GeometryCollection';
import ArrayList from '../../../../../java/util/ArrayList';
import GeometryFilter from '../GeometryFilter';
export default class LineStringExtracter {
	constructor(...args) {
		this.comps = null;
		if (args.length === 1) {
			let [comps] = args;
			this.comps = comps;
		}
	}
	get interfaces_() {
		return [GeometryFilter];
	}
	static getGeometry(geom) {
		return geom.getFactory().buildGeometry(LineStringExtracter.getLines(geom));
	}
	static getLines(...args) {
		if (args.length === 1) {
			let [geom] = args;
			return LineStringExtracter.getLines(geom, new ArrayList());
		} else if (args.length === 2) {
			let [geom, lines] = args;
			if (geom instanceof LineString) {
				lines.add(geom);
			} else if (geom instanceof GeometryCollection) {
				geom.apply(new LineStringExtracter(lines));
			}
			return lines;
		}
	}
	filter(geom) {
		if (geom instanceof LineString) this.comps.add(geom);
	}
	getClass() {
		return LineStringExtracter;
	}
}

