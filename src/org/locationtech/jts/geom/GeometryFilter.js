export default class GeometryFilter {
	constructor() {
		GeometryFilter.constructor_.apply(this, arguments);
	}
	filter(geom) {}
	getClass() {
		return GeometryFilter;
	}
	get interfaces_() {
		return [];
	}
}
GeometryFilter.constructor_ = function () {};
