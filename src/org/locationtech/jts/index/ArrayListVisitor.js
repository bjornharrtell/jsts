import ItemVisitor from './ItemVisitor';
import ArrayList from '../../../../java/util/ArrayList';
export default class ArrayListVisitor {
	constructor(...args) {
		this.items = new ArrayList();
		if (args.length === 0) {
			let [] = args;
		}
	}
	get interfaces_() {
		return [ItemVisitor];
	}
	visitItem(item) {
		this.items.add(item);
	}
	getItems() {
		return this.items;
	}
	getClass() {
		return ArrayListVisitor;
	}
}

