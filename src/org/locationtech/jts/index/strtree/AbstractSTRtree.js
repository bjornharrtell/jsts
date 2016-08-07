import ItemBoundable from './ItemBoundable';
import hasInterface from '../../../../../hasInterface';
import ItemVisitor from '../ItemVisitor';
import AbstractNode from './AbstractNode';
import extend from '../../../../../extend';
import Collections from '../../../../../java/util/Collections';
import ArrayList from '../../../../../java/util/ArrayList';
import Serializable from '../../../../../java/io/Serializable';
import Assert from '../../util/Assert';
import List from '../../../../../java/util/List';
export default function AbstractSTRtree() {
	this.root = null;
	this.built = false;
	this.itemBoundables = new ArrayList();
	this.nodeCapacity = null;
	if (arguments.length === 0) {
		AbstractSTRtree.call(this, AbstractSTRtree.DEFAULT_NODE_CAPACITY);
	} else if (arguments.length === 1) {
		let nodeCapacity = arguments[0];
		Assert.isTrue(nodeCapacity > 1, "Node capacity must be greater than 1");
		this.nodeCapacity = nodeCapacity;
	}
}
extend(AbstractSTRtree.prototype, {
	getNodeCapacity: function () {
		return this.nodeCapacity;
	},
	lastNode: function (nodes) {
		return nodes.get(nodes.size() - 1);
	},
	size: function () {
		if (arguments.length === 0) {
			if (this.isEmpty()) {
				return 0;
			}
			this.build();
			return this.size(this.root);
		} else if (arguments.length === 1) {
			let node = arguments[0];
			var size = 0;
			for (var i = node.getChildBoundables().iterator(); i.hasNext(); ) {
				var childBoundable = i.next();
				if (childBoundable instanceof AbstractNode) {
					size += this.size(childBoundable);
				} else if (childBoundable instanceof ItemBoundable) {
					size += 1;
				}
			}
			return size;
		}
	},
	removeItem: function (node, item) {
		var childToRemove = null;
		for (var i = node.getChildBoundables().iterator(); i.hasNext(); ) {
			var childBoundable = i.next();
			if (childBoundable instanceof ItemBoundable) {
				if (childBoundable.getItem() === item) childToRemove = childBoundable;
			}
		}
		if (childToRemove !== null) {
			node.getChildBoundables().remove(childToRemove);
			return true;
		}
		return false;
	},
	itemsTree: function () {
		if (arguments.length === 0) {
			this.build();
			var valuesTree = this.itemsTree(this.root);
			if (valuesTree === null) return new ArrayList();
			return valuesTree;
		} else if (arguments.length === 1) {
			let node = arguments[0];
			var valuesTreeForNode = new ArrayList();
			for (var i = node.getChildBoundables().iterator(); i.hasNext(); ) {
				var childBoundable = i.next();
				if (childBoundable instanceof AbstractNode) {
					var valuesTreeForChild = this.itemsTree(childBoundable);
					if (valuesTreeForChild !== null) valuesTreeForNode.add(valuesTreeForChild);
				} else if (childBoundable instanceof ItemBoundable) {
					valuesTreeForNode.add(childBoundable.getItem());
				} else {
					Assert.shouldNeverReachHere();
				}
			}
			if (valuesTreeForNode.size() <= 0) return null;
			return valuesTreeForNode;
		}
	},
	insert: function (bounds, item) {
		Assert.isTrue(!this.built, "Cannot insert items into an STR packed R-tree after it has been built.");
		this.itemBoundables.add(new ItemBoundable(bounds, item));
	},
	boundablesAtLevel: function () {
		if (arguments.length === 1) {
			let level = arguments[0];
			var boundables = new ArrayList();
			this.boundablesAtLevel(level, this.root, boundables);
			return boundables;
		} else if (arguments.length === 3) {
			let level = arguments[0], top = arguments[1], boundables = arguments[2];
			Assert.isTrue(level > -2);
			if (top.getLevel() === level) {
				boundables.add(top);
				return null;
			}
			for (var i = top.getChildBoundables().iterator(); i.hasNext(); ) {
				var boundable = i.next();
				if (boundable instanceof AbstractNode) {
					this.boundablesAtLevel(level, boundable, boundables);
				} else {
					Assert.isTrue(boundable instanceof ItemBoundable);
					if (level === -1) {
						boundables.add(boundable);
					}
				}
			}
			return null;
		}
	},
	query: function () {
		if (arguments.length === 1) {
			let searchBounds = arguments[0];
			this.build();
			var matches = new ArrayList();
			if (this.isEmpty()) {
				return matches;
			}
			if (this.getIntersectsOp().intersects(this.root.getBounds(), searchBounds)) {
				this.query(searchBounds, this.root, matches);
			}
			return matches;
		} else if (arguments.length === 2) {
			let searchBounds = arguments[0], visitor = arguments[1];
			this.build();
			if (this.isEmpty()) {
				return null;
			}
			if (this.getIntersectsOp().intersects(this.root.getBounds(), searchBounds)) {
				this.query(searchBounds, this.root, visitor);
			}
		} else if (arguments.length === 3) {
			if (hasInterface(arguments[2], ItemVisitor) && (arguments[0] instanceof Object && arguments[1] instanceof AbstractNode)) {
				let searchBounds = arguments[0], node = arguments[1], visitor = arguments[2];
				var childBoundables = node.getChildBoundables();
				for (var i = 0; i < childBoundables.size(); i++) {
					var childBoundable = childBoundables.get(i);
					if (!this.getIntersectsOp().intersects(childBoundable.getBounds(), searchBounds)) {
						continue;
					}
					if (childBoundable instanceof AbstractNode) {
						this.query(searchBounds, childBoundable, visitor);
					} else if (childBoundable instanceof ItemBoundable) {
						visitor.visitItem(childBoundable.getItem());
					} else {
						Assert.shouldNeverReachHere();
					}
				}
			} else if (hasInterface(arguments[2], List) && (arguments[0] instanceof Object && arguments[1] instanceof AbstractNode)) {
				let searchBounds = arguments[0], node = arguments[1], matches = arguments[2];
				var childBoundables = node.getChildBoundables();
				for (var i = 0; i < childBoundables.size(); i++) {
					var childBoundable = childBoundables.get(i);
					if (!this.getIntersectsOp().intersects(childBoundable.getBounds(), searchBounds)) {
						continue;
					}
					if (childBoundable instanceof AbstractNode) {
						this.query(searchBounds, childBoundable, matches);
					} else if (childBoundable instanceof ItemBoundable) {
						matches.add(childBoundable.getItem());
					} else {
						Assert.shouldNeverReachHere();
					}
				}
			}
		}
	},
	build: function () {
		if (this.built) return null;
		this.root = this.itemBoundables.isEmpty() ? this.createNode(0) : this.createHigherLevels(this.itemBoundables, -1);
		this.itemBoundables = null;
		this.built = true;
	},
	getRoot: function () {
		this.build();
		return this.root;
	},
	remove: function () {
		if (arguments.length === 2) {
			let searchBounds = arguments[0], item = arguments[1];
			this.build();
			if (this.getIntersectsOp().intersects(this.root.getBounds(), searchBounds)) {
				return this.remove(searchBounds, this.root, item);
			}
			return false;
		} else if (arguments.length === 3) {
			let searchBounds = arguments[0], node = arguments[1], item = arguments[2];
			var found = this.removeItem(node, item);
			if (found) return true;
			var childToPrune = null;
			for (var i = node.getChildBoundables().iterator(); i.hasNext(); ) {
				var childBoundable = i.next();
				if (!this.getIntersectsOp().intersects(childBoundable.getBounds(), searchBounds)) {
					continue;
				}
				if (childBoundable instanceof AbstractNode) {
					found = this.remove(searchBounds, childBoundable, item);
					if (found) {
						childToPrune = childBoundable;
						break;
					}
				}
			}
			if (childToPrune !== null) {
				if (childToPrune.getChildBoundables().isEmpty()) {
					node.getChildBoundables().remove(childToPrune);
				}
			}
			return found;
		}
	},
	createHigherLevels: function (boundablesOfALevel, level) {
		Assert.isTrue(!boundablesOfALevel.isEmpty());
		var parentBoundables = this.createParentBoundables(boundablesOfALevel, level + 1);
		if (parentBoundables.size() === 1) {
			return parentBoundables.get(0);
		}
		return this.createHigherLevels(parentBoundables, level + 1);
	},
	depth: function () {
		if (arguments.length === 0) {
			if (this.isEmpty()) {
				return 0;
			}
			this.build();
			return this.depth(this.root);
		} else if (arguments.length === 1) {
			let node = arguments[0];
			var maxChildDepth = 0;
			for (var i = node.getChildBoundables().iterator(); i.hasNext(); ) {
				var childBoundable = i.next();
				if (childBoundable instanceof AbstractNode) {
					var childDepth = this.depth(childBoundable);
					if (childDepth > maxChildDepth) maxChildDepth = childDepth;
				}
			}
			return maxChildDepth + 1;
		}
	},
	createParentBoundables: function (childBoundables, newLevel) {
		Assert.isTrue(!childBoundables.isEmpty());
		var parentBoundables = new ArrayList();
		parentBoundables.add(this.createNode(newLevel));
		var sortedChildBoundables = new ArrayList(childBoundables);
		Collections.sort(sortedChildBoundables, this.getComparator());
		for (var i = sortedChildBoundables.iterator(); i.hasNext(); ) {
			var childBoundable = i.next();
			if (this.lastNode(parentBoundables).getChildBoundables().size() === this.getNodeCapacity()) {
				parentBoundables.add(this.createNode(newLevel));
			}
			this.lastNode(parentBoundables).addChildBoundable(childBoundable);
		}
		return parentBoundables;
	},
	isEmpty: function () {
		if (!this.built) return this.itemBoundables.isEmpty();
		return this.root.isEmpty();
	},
	interfaces_: function () {
		return [Serializable];
	},
	getClass: function () {
		return AbstractSTRtree;
	}
});
AbstractSTRtree.compareDoubles = function (a, b) {
	return a > b ? 1 : a < b ? -1 : 0;
};
function IntersectsOp() {}
AbstractSTRtree.IntersectsOp = IntersectsOp;
AbstractSTRtree.serialVersionUID = -3886435814360241337;
AbstractSTRtree.DEFAULT_NODE_CAPACITY = 10;
