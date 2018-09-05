import ItemDistance from './ItemDistance';
export default class GeometryItemDistance {
	constructor() {
		GeometryItemDistance.constructor_.apply(this, arguments);
	}
	distance(item1, item2) {
		var g1 = item1.getItem();
		var g2 = item2.getItem();
		return g1.distance(g2);
	}
	getClass() {
		return GeometryItemDistance;
	}
	get interfaces_() {
		return [ItemDistance];
	}
}
GeometryItemDistance.constructor_ = function () {};
