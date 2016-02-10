import CoordinateSequenceFilter from '../geom/CoordinateSequenceFilter';
export default class CoordinatePrecisionReducerFilter {
	constructor(...args) {
		this.precModel = null;
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [precModel] = args;
						this.precModel = precModel;
					})(...args);
			}
		};
		return overloads.apply(this, args);
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

