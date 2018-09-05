import CoordinateSequenceFilter from '../geom/CoordinateSequenceFilter';
export default class CoordinatePrecisionReducerFilter {
	constructor() {
		CoordinatePrecisionReducerFilter.constructor_.apply(this, arguments);
	}
	filter(seq, i) {
		seq.setOrdinate(i, 0, this._precModel.makePrecise(seq.getOrdinate(i, 0)));
		seq.setOrdinate(i, 1, this._precModel.makePrecise(seq.getOrdinate(i, 1)));
	}
	isDone() {
		return false;
	}
	isGeometryChanged() {
		return true;
	}
	getClass() {
		return CoordinatePrecisionReducerFilter;
	}
	get interfaces_() {
		return [CoordinateSequenceFilter];
	}
}
CoordinatePrecisionReducerFilter.constructor_ = function () {
	this._precModel = null;
	let precModel = arguments[0];
	this._precModel = precModel;
};
