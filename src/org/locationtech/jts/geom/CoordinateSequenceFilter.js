import extend from '../../../../extend';
export default function CoordinateSequenceFilter() {}
extend(CoordinateSequenceFilter.prototype, {
	filter: function (seq, i) {},
	isDone: function () {},
	isGeometryChanged: function () {},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return CoordinateSequenceFilter;
	}
});
