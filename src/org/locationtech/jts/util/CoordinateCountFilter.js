import CoordinateFilter from '../geom/CoordinateFilter';
export default class CoordinateCountFilter {
	constructor() {
		CoordinateCountFilter.constructor_.apply(this, arguments);
	}
	filter(coord) {
		this._n++;
	}
	getCount() {
		return this._n;
	}
	getClass() {
		return CoordinateCountFilter;
	}
	get interfaces_() {
		return [CoordinateFilter];
	}
}
CoordinateCountFilter.constructor_ = function () {
	this._n = 0;
};
