import ItemVisitor from './ItemVisitor';
import ArrayList from '../../../../java/util/ArrayList';
export default class ArrayListVisitor {
	constructor(...args) {
		this.items = new ArrayList();
		const overloads = (...args) => {
			switch (args.length) {
				case 0:
					return ((...args) => {
						let [] = args;
					})(...args);
			}
		};
		return overloads.apply(this, args);
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

