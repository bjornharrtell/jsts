import ArrayList from '../../../../java/util/ArrayList';
export default class PriorityQueue {
	constructor(...args) {
		this._size = null;
		this.items = null;
		switch (args.length) {
			case 0:
				{
					let [] = args;
					this._size = 0;
					this.items = new ArrayList();
					this.items.add(null);
					break;
				}
		}
	}
	get interfaces_() {
		return [];
	}
	poll() {
		if (this.isEmpty()) return null;
		var minItem = this.items.get(1);
		this.items.set(1, this.items.get(this._size));
		this._size -= 1;
		this.reorder(1);
		return minItem;
	}
	size() {
		return this._size;
	}
	reorder(hole) {
		var child = null;
		var tmp = this.items.get(hole);
		for (; hole * 2 <= this._size; hole = child) {
			child = hole * 2;
			if (child !== this._size && this.items.get(child + 1).compareTo(this.items.get(child)) < 0) child++;
			if (this.items.get(child).compareTo(tmp) < 0) this.items.set(hole, this.items.get(child)); else break;
		}
		this.items.set(hole, tmp);
	}
	clear() {
		this._size = 0;
		this.items.clear();
	}
	isEmpty() {
		return this._size === 0;
	}
	add(x) {
		this.items.add(null);
		this._size += 1;
		var hole = this._size;
		this.items.set(0, x);
		for (; x.compareTo(this.items.get(Math.trunc(hole / 2))) < 0; hole /= 2) {
			this.items.set(hole, this.items.get(Math.trunc(hole / 2)));
		}
		this.items.set(hole, x);
	}
	getClass() {
		return PriorityQueue;
	}
}

