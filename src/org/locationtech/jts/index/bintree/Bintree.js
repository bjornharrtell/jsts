import Root from './Root';
import Interval from './Interval';
import extend from '../../../../../extend';
import ArrayList from '../../../../../java/util/ArrayList';
export default function Bintree() {
	this.root = null;
	this.minExtent = 1.0;
	this.root = new Root();
}
extend(Bintree.prototype, {
	size: function () {
		if (this.root !== null) return this.root.size();
		return 0;
	},
	insert: function (itemInterval, item) {
		this.collectStats(itemInterval);
		var insertInterval = Bintree.ensureExtent(itemInterval, this.minExtent);
		this.root.insert(insertInterval, item);
	},
	query: function () {
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
			this.root.addAllItemsFromOverlapping(interval, foundItems);
		}
	},
	iterator: function () {
		var foundItems = new ArrayList();
		this.root.addAllItems(foundItems);
		return foundItems.iterator();
	},
	remove: function (itemInterval, item) {
		var insertInterval = Bintree.ensureExtent(itemInterval, this.minExtent);
		return this.root.remove(insertInterval, item);
	},
	collectStats: function (interval) {
		var del = interval.getWidth();
		if (del < this.minExtent && del > 0.0) this.minExtent = del;
	},
	depth: function () {
		if (this.root !== null) return this.root.depth();
		return 0;
	},
	nodeSize: function () {
		if (this.root !== null) return this.root.nodeSize();
		return 0;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return Bintree;
	}
});
Bintree.ensureExtent = function (itemInterval, minExtent) {
	var min = itemInterval.getMin();
	var max = itemInterval.getMax();
	if (min !== max) return itemInterval;
	if (min === max) {
		min = min - minExtent / 2.0;
		max = min + minExtent / 2.0;
	}
	return new Interval(min, max);
};
