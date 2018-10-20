export default class MapOp {
	constructor() {
		MapOp.constructor_.apply(this, arguments);
	}
	map(g) {}
	getClass() {
		return MapOp;
	}
	get interfaces_() {
		return [];
	}
}
MapOp.constructor_ = function () {};
