import extend from '../../../../extend';
import ArrayList from '../../../../java/util/ArrayList';
export default function PriorityQueue() {
	this._size = null;
	this.items = null;
	this._size = 0;
	this.items = new ArrayList();
	this.items.add(null);
}
extend(PriorityQueue.prototype, {
	poll: function () {
		if (this.isEmpty()) return null;
		var minItem = this.items.get(1);
		this.items.set(1, this.items.get(this._size));
		this._size -= 1;
		this.reorder(1);
		return minItem;
	},
	size: function () {
		return this._size;
	},
	reorder: function (hole) {
		var child = null;
		var tmp = this.items.get(hole);
		for (; hole * 2 <= this._size; hole = child) {
			child = hole * 2;
			if (child !== this._size && this.items.get(child + 1).compareTo(this.items.get(child)) < 0) child++;
			if (this.items.get(child).compareTo(tmp) < 0) this.items.set(hole, this.items.get(child)); else break;
		}
		this.items.set(hole, tmp);
	},
	clear: function () {
		this._size = 0;
		this.items.clear();
	},
	isEmpty: function () {
		return this._size === 0;
	},
	add: function (x) {
		this.items.add(null);
		this._size += 1;
		var hole = this._size;
		this.items.set(0, x);
		for (; x.compareTo(this.items.get(Math.trunc(hole / 2))) < 0; hole /= 2) {
			this.items.set(hole, this.items.get(Math.trunc(hole / 2)));
		}
		this.items.set(hole, x);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return PriorityQueue;
	}
});
