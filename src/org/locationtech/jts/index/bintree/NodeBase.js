import ArrayList from '../../../../../java/util/ArrayList';
export default class NodeBase {
	constructor(...args) {
		this.items = new ArrayList();
		this.subnode = [null, null];
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
		return [];
	}
	static getSubnodeIndex(interval, centre) {
		var subnodeIndex = -1;
		if (interval.min >= centre) subnodeIndex = 1;
		if (interval.max <= centre) subnodeIndex = 0;
		return subnodeIndex;
	}
	hasChildren() {
		for (var i = 0; i < 2; i++) {
			if (this.subnode[i] !== null) return true;
		}
		return false;
	}
	isPrunable() {
		return !(this.hasChildren() || this.hasItems());
	}
	addAllItems(items) {
		items.addAll(this.items);
		for (var i = 0; i < 2; i++) {
			if (this.subnode[i] !== null) {
				this.subnode[i].addAllItems(items);
			}
		}
		return items;
	}
	size() {
		var subSize = 0;
		for (var i = 0; i < 2; i++) {
			if (this.subnode[i] !== null) {
				subSize += this.subnode[i].size();
			}
		}
		return subSize + this.items.size();
	}
	addAllItemsFromOverlapping(interval, resultItems) {
		if (interval !== null && !this.isSearchMatch(interval)) return null;
		resultItems.addAll(this.items);
		if (this.subnode[0] !== null) this.subnode[0].addAllItemsFromOverlapping(interval, resultItems);
		if (this.subnode[1] !== null) this.subnode[1].addAllItemsFromOverlapping(interval, resultItems);
	}
	hasItems() {
		return !this.items.isEmpty();
	}
	remove(itemInterval, item) {
		if (!this.isSearchMatch(itemInterval)) return false;
		var found = false;
		for (var i = 0; i < 2; i++) {
			if (this.subnode[i] !== null) {
				found = this.subnode[i].remove(itemInterval, item);
				if (found) {
					if (this.subnode[i].isPrunable()) this.subnode[i] = null;
					break;
				}
			}
		}
		if (found) return found;
		found = this.items.remove(item);
		return found;
	}
	getItems() {
		return this.items;
	}
	depth() {
		var maxSubDepth = 0;
		for (var i = 0; i < 2; i++) {
			if (this.subnode[i] !== null) {
				var sqd = this.subnode[i].depth();
				if (sqd > maxSubDepth) maxSubDepth = sqd;
			}
		}
		return maxSubDepth + 1;
	}
	nodeSize() {
		var subSize = 0;
		for (var i = 0; i < 2; i++) {
			if (this.subnode[i] !== null) {
				subSize += this.subnode[i].nodeSize();
			}
		}
		return subSize + 1;
	}
	add(item) {
		this.items.add(item);
	}
	getClass() {
		return NodeBase;
	}
}

