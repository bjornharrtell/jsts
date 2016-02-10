import LineString from '../LineString';
import Point from '../Point';
import GeometryComponentFilter from '../GeometryComponentFilter';
import ArrayList from '../../../../../java/util/ArrayList';
export default class ComponentCoordinateExtracter {
	constructor(...args) {
		this.coords = null;
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [coords] = args;
						this.coords = coords;
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [GeometryComponentFilter];
	}
	static getCoordinates(geom) {
		var coords = new ArrayList();
		geom.apply(new ComponentCoordinateExtracter(coords));
		return coords;
	}
	filter(geom) {
		if (geom instanceof LineString || geom instanceof Point) this.coords.add(geom.getCoordinate());
	}
	getClass() {
		return ComponentCoordinateExtracter;
	}
}

