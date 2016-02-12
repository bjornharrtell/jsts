import ItemVisitor from './ItemVisitor';
import ArrayList from '../../../../java/util/ArrayList';
export default class ArrayListVisitor {
	constructor(...args) {
		this.items = new ArrayList();
		switch (args.length) {
			case 0:
				return ((...args) => {
					let [] = args;
				})(...args);
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

