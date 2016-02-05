import ArrayList from '../../../../../java/util/ArrayList';
import Serializable from '../../../../../java/io/Serializable';
export default class NodeBase {
	constructor(...args) {
		(() => {
			this.items = new ArrayList();
			this.subnode = new Array(4);
		})();
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
		return [Serializable];
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
			if (this.subnode[i] !== null) return true;
		}
		return false;
	}
	isPrunable() {
		return !(this.hasChildren() || this.hasItems());
	}
	addAllItems(resultItems) {
		resultItems.addAll(this.items);
		for (var i = 0; i < 4; i++) {
			if (this.subnode[i] !== null) {
				this.subnode[i].addAllItems(resultItems);
			}
		}
		return resultItems;
	}
	getNodeCount() {
		var subSize = 0;
		for (var i = 0; i < 4; i++) {
			if (this.subnode[i] !== null) {
				subSize += this.subnode[i].size();
			}
		}
		return subSize + 1;
	}
	size() {
		var subSize = 0;
		for (var i = 0; i < 4; i++) {
			if (this.subnode[i] !== null) {
				subSize += this.subnode[i].size();
			}
		}
		return subSize + this.items.size();
	}
	addAllItemsFromOverlapping(searchEnv, resultItems) {
		if (!this.isSearchMatch(searchEnv)) return null;
		resultItems.addAll(this.items);
		for (var i = 0; i < 4; i++) {
			if (this.subnode[i] !== null) {
				this.subnode[i].addAllItemsFromOverlapping(searchEnv, resultItems);
			}
		}
	}
	visitItems(searchEnv, visitor) {
		for (var i = this.items.iterator(); i.hasNext(); ) {
			visitor.visitItem(i.next());
		}
	}
	hasItems() {
		return !this.items.isEmpty();
	}
	remove(itemEnv, item) {
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
	}
	visit(searchEnv, visitor) {
		if (!this.isSearchMatch(searchEnv)) return null;
		this.visitItems(searchEnv, visitor);
		for (var i = 0; i < 4; i++) {
			if (this.subnode[i] !== null) {
				this.subnode[i].visit(searchEnv, visitor);
			}
		}
	}
	getItems() {
		return this.items;
	}
	depth() {
		var maxSubDepth = 0;
		for (var i = 0; i < 4; i++) {
			if (this.subnode[i] !== null) {
				var sqd = this.subnode[i].depth();
				if (sqd > maxSubDepth) maxSubDepth = sqd;
			}
		}
		return maxSubDepth + 1;
	}
	isEmpty() {
		var isEmpty = true;
		if (!this.items.isEmpty()) isEmpty = false;
		for (var i = 0; i < 4; i++) {
			if (this.subnode[i] !== null) {
				if (!this.subnode[i].isEmpty()) isEmpty = false;
			}
		}
		return isEmpty;
	}
	add(item) {
		this.items.add(item);
	}
	getClass() {
		return NodeBase;
	}
}

