import extend from '../../../../../extend';
export default function PointOnGeometryLocator() {}
extend(PointOnGeometryLocator.prototype, {
	locate: function (p) {},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return PointOnGeometryLocator;
	}
});

