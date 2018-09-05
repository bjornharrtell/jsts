import CoordinateFilter from '../geom/CoordinateFilter';
export default class CoordinateArrayFilter {
	constructor() {
		CoordinateArrayFilter.constructor_.apply(this, arguments);
	}
	filter(coord) {
		this.pts[this.n++] = coord;
	}
	getCoordinates() {
		return this.pts;
	}
	getClass() {
		return CoordinateArrayFilter;
	}
	get interfaces_() {
		return [CoordinateFilter];
	}
}
CoordinateArrayFilter.constructor_ = function () {
	this.pts = null;
	this.n = 0;
	let size = arguments[0];
	this.pts = new Array(size).fill(null);
};
