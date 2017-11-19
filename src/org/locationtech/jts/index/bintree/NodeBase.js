import extend from '../../../../../extend';
import ArrayList from '../../../../../java/util/ArrayList';
export default function NodeBase() {
	this._items = new ArrayList();
	this._subnode = new Array(2).fill(null);
}
extend(NodeBase.prototype, {
	hasChildren: function () {
		for (var i = 0; i < 2; i++) {
			if (this._subnode[i] !== null) return true;
		}
		return false;
	},
	isPrunable: function () {
		return !(this.hasChildren() || this.hasItems());
	},
	addAllItems: function (items) {
		items.addAll(this._items);
		for (var i = 0; i < 2; i++) {
			if (this._subnode[i] !== null) {
				this._subnode[i].addAllItems(items);
			}
		}
		return items;
	},
	size: function () {
		var subSize = 0;
		for (var i = 0; i < 2; i++) {
			if (this._subnode[i] !== null) {
				subSize += this._subnode[i].size();
			}
		}
		return subSize + this._items.size();
	},
	addAllItemsFromOverlapping: function (interval, resultItems) {
		if (interval !== null && !this.isSearchMatch(interval)) return null;
		resultItems.addAll(this._items);
		if (this._subnode[0] !== null) this._subnode[0].addAllItemsFromOverlapping(interval, resultItems);
		if (this._subnode[1] !== null) this._subnode[1].addAllItemsFromOverlapping(interval, resultItems);
	},
	hasItems: function () {
		return !this._items.isEmpty();
	},
	remove: function (itemInterval, item) {
		if (!this.isSearchMatch(itemInterval)) return false;
		var found = false;
		for (var i = 0; i < 2; i++) {
			if (this._subnode[i] !== null) {
				found = this._subnode[i].remove(itemInterval, item);
				if (found) {
					if (this._subnode[i].isPrunable()) this._subnode[i] = null;
					break;
				}
			}
		}
		if (found) return found;
		found = this._items.remove(item);
		return found;
	},
	getItems: function () {
		return this._items;
	},
	depth: function () {
		var maxSubDepth = 0;
		for (var i = 0; i < 2; i++) {
			if (this._subnode[i] !== null) {
				var sqd = this._subnode[i].depth();
				if (sqd > maxSubDepth) maxSubDepth = sqd;
			}
		}
		return maxSubDepth + 1;
	},
	nodeSize: function () {
		var subSize = 0;
		for (var i = 0; i < 2; i++) {
			if (this._subnode[i] !== null) {
				subSize += this._subnode[i].nodeSize();
			}
		}
		return subSize + 1;
	},
	add: function (item) {
		this._items.add(item);
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
