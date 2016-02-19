import extend from '../../../../extend';
import CoordinateSequenceFilter from '../geom/CoordinateSequenceFilter';
export default function CoordinatePrecisionReducerFilter() {
	this.precModel = null;
	if (arguments.length === 1) {
		let precModel = arguments[0];
		this.precModel = precModel;
	}
}
extend(CoordinatePrecisionReducerFilter.prototype, {
	filter: function (seq, i) {
		seq.setOrdinate(i, 0, this.precModel.makePrecise(seq.getOrdinate(i, 0)));
		seq.setOrdinate(i, 1, this.precModel.makePrecise(seq.getOrdinate(i, 1)));
	},
	isDone: function () {
		return false;
	},
	isGeometryChanged: function () {
		return true;
	},
	interfaces_: function () {
		return [CoordinateSequenceFilter];
	},
	getClass: function () {
		return CoordinatePrecisionReducerFilter;
	}
});

