import extend from '../../../../../extend';
import ArrayList from '../../../../../java/util/ArrayList';
export default function NodeBase() {
	this.items = new ArrayList();
	this.subnode = [null, null];
}
extend(NodeBase.prototype, {
	hasChildren: function () {
		for (var i = 0; i < 2; i++) {
			if (this.subnode[i] !== null) return true;
		}
		return false;
	},
	isPrunable: function () {
		return !(this.hasChildren() || this.hasItems());
	},
	addAllItems: function (items) {
		items.addAll(this.items);
		for (var i = 0; i < 2; i++) {
			if (this.subnode[i] !== null) {
				this.subnode[i].addAllItems(items);
			}
		}
		return items;
	},
	size: function () {
		var subSize = 0;
		for (var i = 0; i < 2; i++) {
			if (this.subnode[i] !== null) {
				subSize += this.subnode[i].size();
			}
		}
		return subSize + this.items.size();
	},
	addAllItemsFromOverlapping: function (interval, resultItems) {
		if (interval !== null && !this.isSearchMatch(interval)) return null;
		resultItems.addAll(this.items);
		if (this.subnode[0] !== null) this.subnode[0].addAllItemsFromOverlapping(interval, resultItems);
		if (this.subnode[1] !== null) this.subnode[1].addAllItemsFromOverlapping(interval, resultItems);
	},
	hasItems: function () {
		return !this.items.isEmpty();
	},
	remove: function (itemInterval, item) {
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
	},
	getItems: function () {
		return this.items;
	},
	depth: function () {
		var maxSubDepth = 0;
		for (var i = 0; i < 2; i++) {
			if (this.subnode[i] !== null) {
				var sqd = this.subnode[i].depth();
				if (sqd > maxSubDepth) maxSubDepth = sqd;
			}
		}
		return maxSubDepth + 1;
	},
	nodeSize: function () {
		var subSize = 0;
		for (var i = 0; i < 2; i++) {
			if (this.subnode[i] !== null) {
				subSize += this.subnode[i].nodeSize();
			}
		}
		return subSize + 1;
	},
	add: function (item) {
		this.items.add(item);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return NodeBase;
	}
});
NodeBase.getSubnodeIndex = function (interval, centre) {
	var subnodeIndex = -1;
	if (interval.min >= centre) subnodeIndex = 1;
	if (interval.max <= centre) subnodeIndex = 0;
	return subnodeIndex;
};

