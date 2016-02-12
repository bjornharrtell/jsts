import CoordinateSequenceFilter from '../geom/CoordinateSequenceFilter';
export default class CoordinatePrecisionReducerFilter {
	constructor(...args) {
		this.precModel = null;
		if (args.length === 1) {
			let [precModel] = args;
			this.precModel = precModel;
		}
	}
	get interfaces_() {
		return [CoordinateSequenceFilter];
	}
	filter(seq, i) {
		seq.setOrdinate(i, 0, this.precModel.makePrecise(seq.getOrdinate(i, 0)));
		seq.setOrdinate(i, 1, this.precModel.makePrecise(seq.getOrdinate(i, 1)));
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
}

