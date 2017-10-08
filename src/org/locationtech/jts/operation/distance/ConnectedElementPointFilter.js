import LineString from '../../geom/LineString';
import Point from '../../geom/Point';
import Polygon from '../../geom/Polygon';
import extend from '../../../../../extend';
import ArrayList from '../../../../../java/util/ArrayList';
import GeometryFilter from '../../geom/GeometryFilter';
export default function ConnectedElementPointFilter() {
	this._pts = null;
	let pts = arguments[0];
	this._pts = pts;
}
extend(ConnectedElementPointFilter.prototype, {
	filter: function (geom) {
		if (geom instanceof Point || geom instanceof LineString || geom instanceof Polygon) this._pts.add(geom.getCoordinate());
	},
	interfaces_: function () {
		return [GeometryFilter];
	},
	getClass: function () {
		return ConnectedElementPointFilter;
	}
});
ConnectedElementPointFilter.getCoordinates = function (geom) {
	var pts = new ArrayList();
	geom.apply(new ConnectedElementPointFilter(pts));
	return pts;
};
