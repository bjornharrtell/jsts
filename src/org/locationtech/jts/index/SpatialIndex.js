import extend from '../../../../extend';
export default function SpatialIndex() {}
extend(SpatialIndex.prototype, {
	insert: function (itemEnv, item) {},
	remove: function (itemEnv, item) {},
	query: function () {
		if (arguments.length === 1) {
			let searchEnv = arguments[0];
		} else if (arguments.length === 2) {
			let searchEnv = arguments[0], visitor = arguments[1];
		}
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return SpatialIndex;
	}
});
