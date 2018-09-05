export default class CoordinateFilter {
	constructor() {
		CoordinateFilter.constructor_.apply(this, arguments);
	}
	filter(coord) {}
	getClass() {
		return CoordinateFilter;
	}
	get interfaces_() {
		return [];
	}
}
CoordinateFilter.constructor_ = function () {};
