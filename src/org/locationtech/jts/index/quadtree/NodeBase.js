import extend from '../../../../../extend';
import ArrayList from '../../../../../java/util/ArrayList';
import Serializable from '../../../../../java/io/Serializable';
export default function NodeBase() {
	this.items = new ArrayList();
	this.subnode = new Array(4).fill(null);
}
extend(NodeBase.prototype, {
	hasChildren: function () {
		for (var i = 0; i < 4; i++) {
			if (this.subnode[i] !== null) return true;
		}
		return false;
	},
	isPrunable: function () {
		return !(this.hasChildren() || this.hasItems());
	},
	addAllItems: function (resultItems) {
		resultItems.addAll(this.items);
		for (var i = 0; i < 4; i++) {
			if (this.subnode[i] !== null) {
				this.subnode[i].addAllItems(resultItems);
			}
		}
		return resultItems;
	},
	getNodeCount: function () {
		var subSize = 0;
		for (var i = 0; i < 4; i++) {
			if (this.subnode[i] !== null) {
				subSize += this.subnode[i].size();
			}
		}
		return subSize + 1;
	},
	size: function () {
		var subSize = 0;
		for (var i = 0; i < 4; i++) {
			if (this.subnode[i] !== null) {
				subSize += this.subnode[i].size();
			}
		}
		return subSize + this.items.size();
	},
	addAllItemsFromOverlapping: function (searchEnv, resultItems) {
		if (!this.isSearchMatch(searchEnv)) return null;
		resultItems.addAll(this.items);
		for (var i = 0; i < 4; i++) {
			if (this.subnode[i] !== null) {
				this.subnode[i].addAllItemsFromOverlapping(searchEnv, resultItems);
			}
		}
	},
	visitItems: function (searchEnv, visitor) {
		for (var i = this.items.iterator(); i.hasNext(); ) {
			visitor.visitItem(i.next());
		}
	},
	hasItems: function () {
		return !this.items.isEmpty();
	},
	remove: function (itemEnv, item) {
		if (!this.isSearchMatch(itemEnv)) return false;
		var found = false;
		for (var i = 0; i < 4; i++) {
			if (this.subnode[i] !== null) {
				found = this.subnode[i].remove(itemEnv, item);
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
	visit: function (searchEnv, visitor) {
		if (!this.isSearchMatch(searchEnv)) return null;
		this.visitItems(searchEnv, visitor);
		for (var i = 0; i < 4; i++) {
			if (this.subnode[i] !== null) {
				this.subnode[i].visit(searchEnv, visitor);
			}
		}
	},
	getItems: function () {
		return this.items;
	},
	depth: function () {
		var maxSubDepth = 0;
		for (var i = 0; i < 4; i++) {
			if (this.subnode[i] !== null) {
				var sqd = this.subnode[i].depth();
				if (sqd > maxSubDepth) maxSubDepth = sqd;
			}
		}
		return maxSubDepth + 1;
	},
	isEmpty: function () {
		var isEmpty = true;
		if (!this.items.isEmpty()) isEmpty = false;
		for (var i = 0; i < 4; i++) {
			if (this.subnode[i] !== null) {
				if (!this.subnode[i].isEmpty()) isEmpty = false;
			}
		}
		return isEmpty;
	},
	add: function (item) {
		this.items.add(item);
	},
	interfaces_: function () {
		return [Serializable];
	},
	getClass: function () {
		return NodeBase;
	}
});
NodeBase.getSubnodeIndex = function (env, centrex, centrey) {
	var subnodeIndex = -1;
	if (env.getMinX() >= centrex) {
		if (env.getMinY() >= centrey) subnodeIndex = 3;
		if (env.getMaxY() <= centrey) subnodeIndex = 1;
	}
	if (env.getMaxX() <= centrex) {
		if (env.getMinY() >= centrey) subnodeIndex = 2;
		if (env.getMaxY() <= centrey) subnodeIndex = 0;
	}
	return subnodeIndex;
};

