import extend from '../../../../extend';
export default function PointInRing() {}
extend(PointInRing.prototype, {
	isInside: function (pt) {},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return PointInRing;
	}
});

