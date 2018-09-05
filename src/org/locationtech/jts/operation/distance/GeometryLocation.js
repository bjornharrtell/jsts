export default class GeometryLocation {
	constructor() {
		GeometryLocation.constructor_.apply(this, arguments);
	}
	isInsideArea() {
		return this._segIndex === GeometryLocation.INSIDE_AREA;
	}
	getCoordinate() {
		return this._pt;
	}
	getGeometryComponent() {
		return this._component;
	}
	getSegmentIndex() {
		return this._segIndex;
	}
	getClass() {
		return GeometryLocation;
	}
	get interfaces_() {
		return [];
	}
}
GeometryLocation.constructor_ = function () {
	this._component = null;
	this._segIndex = null;
	this._pt = null;
	if (arguments.length === 2) {
		let component = arguments[0], pt = arguments[1];
		GeometryLocation.constructor_.call(this, component, GeometryLocation.INSIDE_AREA, pt);
	} else if (arguments.length === 3) {
		let component = arguments[0], segIndex = arguments[1], pt = arguments[2];
		this._component = component;
		this._segIndex = segIndex;
		this._pt = pt;
	}
};
GeometryLocation.INSIDE_AREA = -1;
