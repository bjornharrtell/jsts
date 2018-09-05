export default class CoordinateSequenceFilter {
	constructor() {
		CoordinateSequenceFilter.constructor_.apply(this, arguments);
	}
	filter(seq, i) {}
	isDone() {}
	isGeometryChanged() {}
	getClass() {
		return CoordinateSequenceFilter;
	}
	get interfaces_() {
		return [];
	}
}
CoordinateSequenceFilter.constructor_ = function () {};
