export default class ItemVisitor {
	constructor() {
		ItemVisitor.constructor_.apply(this, arguments);
	}
	visitItem(item) {}
	getClass() {
		return ItemVisitor;
	}
	get interfaces_() {
		return [];
	}
}
ItemVisitor.constructor_ = function () {};
