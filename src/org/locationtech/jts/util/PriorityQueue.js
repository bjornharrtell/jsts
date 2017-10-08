import extend from '../../../../extend';
import ArrayList from '../../../../java/util/ArrayList';
export default function PriorityQueue() {
	this.__size = null;
	this._items = null;
	this.__size = 0;
	this._items = new ArrayList();
	this._items.add(null);
}
extend(PriorityQueue.prototype, {
	poll: function () {
		if (this.isEmpty()) return null;
		var minItem = this._items.get(1);
		this._items.set(1, this._items.get(this.__size));
		this.__size -= 1;
		this.reorder(1);
		return minItem;
	},
	size: function () {
		return this.__size;
	},
	reorder: function (hole) {
		var child = null;
		var tmp = this._items.get(hole);
		for (; hole * 2 <= this.__size; hole = child) {
			child = hole * 2;
			if (child !== this.__size && this._items.get(child + 1).compareTo(this._items.get(child)) < 0) child++;
			if (this._items.get(child).compareTo(tmp) < 0) this._items.set(hole, this._items.get(child)); else break;
		}
		this._items.set(hole, tmp);
	},
	clear: function () {
		this.__size = 0;
		this._items.clear();
	},
	isEmpty: function () {
		return this.__size === 0;
	},
	add: function (x) {
		this._items.add(null);
		this.__size += 1;
		var hole = this.__size;
		this._items.set(0, x);
		for (; x.compareTo(this._items.get(Math.trunc(hole / 2))) < 0; hole /= 2) {
			this._items.set(hole, this._items.get(Math.trunc(hole / 2)));
		}
		this._items.set(hole, x);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return PriorityQueue;
	}
});
