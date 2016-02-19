import extend from '../../../../../extend';
import ItemDistance from './ItemDistance';
export default function GeometryItemDistance() {}
extend(GeometryItemDistance.prototype, {
	distance: function (item1, item2) {
		var g1 = item1.getItem();
		var g2 = item2.getItem();
		return g1.distance(g2);
	},
	interfaces_: function () {
		return [ItemDistance];
	},
	getClass: function () {
		return GeometryItemDistance;
	}
});

