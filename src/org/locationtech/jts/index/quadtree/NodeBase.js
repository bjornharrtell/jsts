import ArrayList from '../../../../../java/util/ArrayList';
import Serializable from '../../../../../java/io/Serializable';
export default class NodeBase {
	constructor() {
		NodeBase.constructor_.apply(this, arguments);
	}
	static getSubnodeIndex(env, centrex, centrey) {
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
	}
	hasChildren() {
		for (var i = 0; i < 4; i++) {
			if (this._subnode[i] !== null) return true;
		}
		return false;
	}
	isPrunable() {
		return !(this.hasChildren() || this.hasItems());
	}
	addAllItems(resultItems) {
		resultItems.addAll(this._items);
		for (var i = 0; i < 4; i++) {
			if (this._subnode[i] !== null) {
				this._subnode[i].addAllItems(resultItems);
			}
		}
		return resultItems;
	}
	getNodeCount() {
		var subSize = 0;
		for (var i = 0; i < 4; i++) {
			if (this._subnode[i] !== null) {
				subSize += this._subnode[i].size();
			}
		}
		return subSize + 1;
	}
	size() {
		var subSize = 0;
		for (var i = 0; i < 4; i++) {
			if (this._subnode[i] !== null) {
				subSize += this._subnode[i].size();
			}
		}
		return subSize + this._items.size();
	}
	addAllItemsFromOverlapping(searchEnv, resultItems) {
		if (!this.isSearchMatch(searchEnv)) return null;
		resultItems.addAll(this._items);
		for (var i = 0; i < 4; i++) {
			if (this._subnode[i] !== null) {
				this._subnode[i].addAllItemsFromOverlapping(searchEnv, resultItems);
			}
		}
	}
	visitItems(searchEnv, visitor) {
		for (var i = this._items.iterator(); i.hasNext(); ) {
			visitor.visitItem(i.next());
		}
	}
	hasItems() {
		return !this._items.isEmpty();
	}
	remove(itemEnv, item) {
		if (!this.isSearchMatch(itemEnv)) return false;
		var found = false;
		for (var i = 0; i < 4; i++) {
			if (this._subnode[i] !== null) {
				found = this._subnode[i].remove(itemEnv, item);
				if (found) {
					if (this._subnode[i].isPrunable()) this._subnode[i] = null;
					break;
				}
			}
		}
		if (found) return found;
		found = this._items.remove(item);
		return found;
	}
	visit(searchEnv, visitor) {
		if (!this.isSearchMatch(searchEnv)) return null;
		this.visitItems(searchEnv, visitor);
		for (var i = 0; i < 4; i++) {
			if (this._subnode[i] !== null) {
				this._subnode[i].visit(searchEnv, visitor);
			}
		}
	}
	getItems() {
		return this._items;
	}
	depth() {
		var maxSubDepth = 0;
		for (var i = 0; i < 4; i++) {
			if (this._subnode[i] !== null) {
				var sqd = this._subnode[i].depth();
				if (sqd > maxSubDepth) maxSubDepth = sqd;
			}
		}
		return maxSubDepth + 1;
	}
	isEmpty() {
		var isEmpty = true;
		if (!this._items.isEmpty()) isEmpty = false; else {
			for (var i = 0; i < 4; i++) {
				if (this._subnode[i] !== null) {
					if (!this._subnode[i].isEmpty()) {
						isEmpty = false;
						break;
					}
				}
			}
		}
		return isEmpty;
	}
	add(item) {
		this._items.add(item);
	}
	getClass() {
		return NodeBase;
	}
	get interfaces_() {
		return [Serializable];
	}
}
NodeBase.constructor_ = function () {
	this._items = new ArrayList();
	this._subnode = new Array(4).fill(null);
};
