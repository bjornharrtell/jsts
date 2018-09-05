import Root from './Root';
import Interval from './Interval';
import ArrayList from '../../../../../java/util/ArrayList';
export default class Bintree {
	constructor() {
		Bintree.constructor_.apply(this, arguments);
	}
	static ensureExtent(itemInterval, minExtent) {
		var min = itemInterval.getMin();
		var max = itemInterval.getMax();
		if (min !== max) return itemInterval;
		if (min === max) {
			min = min - minExtent / 2.0;
			max = min + minExtent / 2.0;
		}
		return new Interval(min, max);
	}
	size() {
		if (this._root !== null) return this._root.size();
		return 0;
	}
	insert(itemInterval, item) {
		this.collectStats(itemInterval);
		var insertInterval = Bintree.ensureExtent(itemInterval, this._minExtent);
		this._root.insert(insertInterval, item);
	}
	query() {
		if (arguments.length === 1) {
			if (typeof arguments[0] === "number") {
				let x = arguments[0];
				return this.query(new Interval(x, x));
			} else if (arguments[0] instanceof Interval) {
				let interval = arguments[0];
				var foundItems = new ArrayList();
				this.query(interval, foundItems);
				return foundItems;
			}
		} else if (arguments.length === 2) {
			let interval = arguments[0], foundItems = arguments[1];
			this._root.addAllItemsFromOverlapping(interval, foundItems);
		}
	}
	iterator() {
		var foundItems = new ArrayList();
		this._root.addAllItems(foundItems);
		return foundItems.iterator();
	}
	remove(itemInterval, item) {
		var insertInterval = Bintree.ensureExtent(itemInterval, this._minExtent);
		return this._root.remove(insertInterval, item);
	}
	collectStats(interval) {
		var del = interval.getWidth();
		if (del < this._minExtent && del > 0.0) this._minExtent = del;
	}
	depth() {
		if (this._root !== null) return this._root.depth();
		return 0;
	}
	nodeSize() {
		if (this._root !== null) return this._root.nodeSize();
		return 0;
	}
	getClass() {
		return Bintree;
	}
	get interfaces_() {
		return [];
	}
}
Bintree.constructor_ = function () {
	this._root = null;
	this._minExtent = 1.0;
	this._root = new Root();
};
