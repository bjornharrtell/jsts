import LineString from '../../geom/LineString';
import Point from '../../geom/Point';
import Polygon from '../../geom/Polygon';
import GeometryLocation from './GeometryLocation';
import ArrayList from '../../../../../java/util/ArrayList';
import GeometryFilter from '../../geom/GeometryFilter';
export default class ConnectedElementLocationFilter {
	constructor(...args) {
		this.locations = null;
		switch (args.length) {
			case 1:
				return ((...args) => {
					let [locations] = args;
					this.locations = locations;
				})(...args);
		}
	}
	get interfaces_() {
		return [GeometryFilter];
	}
	static getLocations(geom) {
		var locations = new ArrayList();
		geom.apply(new ConnectedElementLocationFilter(locations));
		return locations;
	}
	filter(geom) {
		if (geom instanceof Point || geom instanceof LineString || geom instanceof Polygon) this.locations.add(new GeometryLocation(geom, 0, geom.getCoordinate()));
	}
	getClass() {
		return ConnectedElementLocationFilter;
	}
}

