import ItemVisitor from './ItemVisitor';
import ArrayList from '../../../../java/util/ArrayList';
export default class ArrayListVisitor {
	constructor() {
		ArrayListVisitor.constructor_.apply(this, arguments);
	}
	visitItem(item) {
		this._items.add(item);
	}
	getItems() {
		return this._items;
	}
	getClass() {
		return ArrayListVisitor;
	}
	get interfaces_() {
		return [ItemVisitor];
	}
}
ArrayListVisitor.constructor_ = function () {
	this._items = new ArrayList();
};
