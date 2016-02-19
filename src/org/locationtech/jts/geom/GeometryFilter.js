import extend from '../../../../extend';
export default function GeometryFilter() {}
extend(GeometryFilter.prototype, {
	filter: function (geom) {},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return GeometryFilter;
	}
});

