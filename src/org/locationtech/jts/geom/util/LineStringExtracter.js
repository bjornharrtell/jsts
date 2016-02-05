import LineString from '../LineString';
import GeometryCollection from '../GeometryCollection';
import ArrayList from '../../../../../java/util/ArrayList';
import GeometryFilter from '../GeometryFilter';
export default class LineStringExtracter {
	constructor(...args) {
		(() => {
			this.comps = null;
		})();
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [comps] = args;
						this.comps = comps;
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [GeometryFilter];
	}
	static getGeometry(geom) {
		return geom.getFactory().buildGeometry(LineStringExtracter.getLines(geom));
	}
	static getLines(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [geom] = args;
						return LineStringExtracter.getLines(geom, new ArrayList());
					})(...args);
				case 2:
					return ((...args) => {
						let [geom, lines] = args;
						if (geom instanceof LineString) {
							lines.add(geom);
						} else if (geom instanceof GeometryCollection) {
							geom.apply(new LineStringExtracter(lines));
						}
						return lines;
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	filter(geom) {
		if (geom instanceof LineString) this.comps.add(geom);
	}
	getClass() {
		return LineStringExtracter;
	}
}

