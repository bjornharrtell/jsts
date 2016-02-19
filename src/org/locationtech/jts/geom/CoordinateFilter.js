import extend from '../../../../extend';
export default function CoordinateFilter() {}
extend(CoordinateFilter.prototype, {
	filter: function (coord) {},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return CoordinateFilter;
	}
});

