import Polygon from '../Polygon';
import GeometryCollection from '../GeometryCollection';
import ArrayList from '../../../../../java/util/ArrayList';
import GeometryFilter from '../GeometryFilter';
export default class PolygonExtracter {
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
	static getPolygons(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [geom] = args;
						return PolygonExtracter.getPolygons(geom, new ArrayList());
					})(...args);
				case 2:
					return ((...args) => {
						let [geom, list] = args;
						if (geom instanceof Polygon) {
							list.add(geom);
						} else if (geom instanceof GeometryCollection) {
							geom.apply(new PolygonExtracter(list));
						}
						return list;
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	filter(geom) {
		if (geom instanceof Polygon) this.comps.add(geom);
	}
	getClass() {
		return PolygonExtracter;
	}
}

