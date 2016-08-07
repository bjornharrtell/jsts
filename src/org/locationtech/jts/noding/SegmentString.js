import extend from '../../../../extend';
export default function SegmentString() {}
extend(SegmentString.prototype, {
	getCoordinates: function () {},
	size: function () {},
	getCoordinate: function (i) {},
	isClosed: function () {},
	setData: function (data) {},
	getData: function () {},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return SegmentString;
	}
});
