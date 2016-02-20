import LineString from '../LineString';
import Point from '../Point';
import extend from '../../../../../extend';
import GeometryComponentFilter from '../GeometryComponentFilter';
import ArrayList from '../../../../../java/util/ArrayList';
export default function ComponentCoordinateExtracter() {
	this.coords = null;
	let coords = arguments[0];
	this.coords = coords;
}
extend(ComponentCoordinateExtracter.prototype, {
	filter: function (geom) {
		if (geom instanceof LineString || geom instanceof Point) this.coords.add(geom.getCoordinate());
	},
	interfaces_: function () {
		return [GeometryComponentFilter];
	},
	getClass: function () {
		return ComponentCoordinateExtracter;
	}
});
ComponentCoordinateExtracter.getCoordinates = function (geom) {
	var coords = new ArrayList();
	geom.apply(new ComponentCoordinateExtracter(coords));
	return coords;
};

