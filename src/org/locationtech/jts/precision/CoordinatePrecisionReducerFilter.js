import extend from '../../../../extend';
import CoordinateSequenceFilter from '../geom/CoordinateSequenceFilter';
export default function CoordinatePrecisionReducerFilter() {
	this._precModel = null;
	let precModel = arguments[0];
	this._precModel = precModel;
}
extend(CoordinatePrecisionReducerFilter.prototype, {
	filter: function (seq, i) {
		seq.setOrdinate(i, 0, this._precModel.makePrecise(seq.getOrdinate(i, 0)));
		seq.setOrdinate(i, 1, this._precModel.makePrecise(seq.getOrdinate(i, 1)));
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
