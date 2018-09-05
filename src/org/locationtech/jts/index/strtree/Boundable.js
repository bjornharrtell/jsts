export default class Boundable {
	constructor() {
		Boundable.constructor_.apply(this, arguments);
	}
	getBounds() {}
	getClass() {
		return Boundable;
	}
	get interfaces_() {
		return [];
	}
}
Boundable.constructor_ = function () {};
