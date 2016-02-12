import Boundable from './Boundable';
import Serializable from '../../../../../java/io/Serializable';
export default class ItemBoundable {
	constructor(...args) {
		this.bounds = null;
		this.item = null;
		if (args.length === 2) {
			let [bounds, item] = args;
			this.bounds = bounds;
			this.item = item;
		}
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

