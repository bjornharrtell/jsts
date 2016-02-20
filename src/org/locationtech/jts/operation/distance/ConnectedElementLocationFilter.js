import LineString from '../../geom/LineString';
import Point from '../../geom/Point';
import Polygon from '../../geom/Polygon';
import GeometryLocation from './GeometryLocation';
import extend from '../../../../../extend';
import ArrayList from '../../../../../java/util/ArrayList';
import GeometryFilter from '../../geom/GeometryFilter';
export default function ConnectedElementLocationFilter() {
	this.locations = null;
	let locations = arguments[0];
	this.locations = locations;
}
extend(ConnectedElementLocationFilter.prototype, {
	filter: function (geom) {
		if (geom instanceof Point || geom instanceof LineString || geom instanceof Polygon) this.locations.add(new GeometryLocation(geom, 0, geom.getCoordinate()));
	},
	interfaces_: function () {
		return [GeometryFilter];
	},
	getClass: function () {
		return ConnectedElementLocationFilter;
	}
});
ConnectedElementLocationFilter.getLocations = function (geom) {
	var locations = new ArrayList();
	geom.apply(new ConnectedElementLocationFilter(locations));
	return locations;
};

