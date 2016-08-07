import extend from '../../../../extend';
export default function GeometryComponentFilter() {}
extend(GeometryComponentFilter.prototype, {
	filter: function (geom) {},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return GeometryComponentFilter;
	}
});
