import Boundable from './Boundable';
import Serializable from '../../../../../java/io/Serializable';
export default class ItemBoundable {
	constructor(...args) {
		(() => {
			this.bounds = null;
			this.item = null;
		})();
		const overloads = (...args) => {
			switch (args.length) {
				case 2:
					return ((...args) => {
						let [bounds, item] = args;
						this.bounds = bounds;
						this.item = item;
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [Boundable, Serializable];
	}
	getItem() {
		return this.item;
	}
	getBounds() {
		return this.bounds;
	}
	getClass() {
		return ItemBoundable;
	}
}

