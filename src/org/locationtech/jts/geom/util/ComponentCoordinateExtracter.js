import LineString from '../LineString';
import Point from '../Point';
import GeometryComponentFilter from '../GeometryComponentFilter';
import ArrayList from '../../../../../java/util/ArrayList';
export default class ComponentCoordinateExtracter {
	constructor() {
		ComponentCoordinateExtracter.constructor_.apply(this, arguments);
	}
	static getCoordinates(geom) {
		var coords = new ArrayList();
		geom.apply(new ComponentCoordinateExtracter(coords));
		return coords;
	}
	filter(geom) {
		if (geom instanceof LineString || geom instanceof Point) this._coords.add(geom.getCoordinate());
	}
	getClass() {
		return ComponentCoordinateExtracter;
	}
	get interfaces_() {
		return [GeometryComponentFilter];
	}
}
ComponentCoordinateExtracter.constructor_ = function () {
	this._coords = null;
	let coords = arguments[0];
	this._coords = coords;
};
