import ItemBoundable from './ItemBoundable';
import PriorityQueue from '../../util/PriorityQueue';
import hasInterface from '../../../../../hasInterface';
import ItemVisitor from '../ItemVisitor';
import SpatialIndex from '../SpatialIndex';
import AbstractNode from './AbstractNode';
import Double from '../../../../../java/lang/Double';
import extend from '../../../../../extend';
import Collections from '../../../../../java/util/Collections';
import BoundablePair from './BoundablePair';
import ArrayList from '../../../../../java/util/ArrayList';
import Comparator from '../../../../../java/util/Comparator';
import Serializable from '../../../../../java/io/Serializable';
import Envelope from '../../geom/Envelope';
import Assert from '../../util/Assert';
import inherits from '../../../../../inherits';
import List from '../../../../../java/util/List';
import AbstractSTRtree from './AbstractSTRtree';
import ItemDistance from './ItemDistance';
export default function STRtree() {
	if (arguments.length === 0) {
		STRtree.call(this, STRtree.DEFAULT_NODE_CAPACITY);
	} else if (arguments.length === 1) {
		let nodeCapacity = arguments[0];
		AbstractSTRtree.call(this, nodeCapacity);
	}
}
inherits(STRtree, AbstractSTRtree);
extend(STRtree.prototype, {
	createParentBoundablesFromVerticalSlices: function (verticalSlices, newLevel) {
		Assert.isTrue(verticalSlices.length > 0);
		var parentBoundables = new ArrayList();
		for (var i = 0; i < verticalSlices.length; i++) {
			parentBoundables.addAll(this.createParentBoundablesFromVerticalSlice(verticalSlices[i], newLevel));
		}
		return parentBoundables;
	},
	createNode: function (level) {
		return new STRtreeNode(level);
	},
	size: function () {
		if (arguments.length === 0) {
			return AbstractSTRtree.prototype.size.call(this);
		} else return AbstractSTRtree.prototype.size.apply(this, arguments);
	},
	insert: function () {
		if (arguments.length === 2) {
			let itemEnv = arguments[0], item = arguments[1];
			if (itemEnv.isNull()) {
				return null;
			}
			AbstractSTRtree.prototype.insert.call(this, itemEnv, item);
		} else return AbstractSTRtree.prototype.insert.apply(this, arguments);
	},
	getIntersectsOp: function () {
		return STRtree.intersectsOp;
	},
	verticalSlices: function (childBoundables, sliceCount) {
		var sliceCapacity = Math.trunc(Math.ceil(childBoundables.size() / sliceCount));
		var slices = new Array(sliceCount).fill(null);
		var i = childBoundables.iterator();
		for (var j = 0; j < sliceCount; j++) {
			slices[j] = new ArrayList();
			var boundablesAddedToSlice = 0;
			while (i.hasNext() && boundablesAddedToSlice < sliceCapacity) {
				var childBoundable = i.next();
				slices[j].add(childBoundable);
				boundablesAddedToSlice++;
			}
		}
		return slices;
	},
	query: function () {
		if (arguments.length === 1) {
			let searchEnv = arguments[0];
			return AbstractSTRtree.prototype.query.call(this, searchEnv);
		} else if (arguments.length === 2) {
			let searchEnv = arguments[0], visitor = arguments[1];
			AbstractSTRtree.prototype.query.call(this, searchEnv, visitor);
		} else if (arguments.length === 3) {
			if (hasInterface(arguments[2], ItemVisitor) && (arguments[0] instanceof Object && arguments[1] instanceof AbstractNode)) {
				let searchBounds = arguments[0], node = arguments[1], visitor = arguments[2];
				AbstractSTRtree.prototype.query.call(this, searchBounds, node, visitor);
			} else if (hasInterface(arguments[2], List) && (arguments[0] instanceof Object && arguments[1] instanceof AbstractNode)) {
				let searchBounds = arguments[0], node = arguments[1], matches = arguments[2];
				AbstractSTRtree.prototype.query.call(this, searchBounds, node, matches);
			}
		}
	},
	getComparator: function () {
		return STRtree.yComparator;
	},
	createParentBoundablesFromVerticalSlice: function (childBoundables, newLevel) {
		return AbstractSTRtree.prototype.createParentBoundables.call(this, childBoundables, newLevel);
	},
	remove: function () {
		if (arguments.length === 2) {
			let itemEnv = arguments[0], item = arguments[1];
			return AbstractSTRtree.prototype.remove.call(this, itemEnv, item);
		} else return AbstractSTRtree.prototype.remove.apply(this, arguments);
	},
	depth: function () {
		if (arguments.length === 0) {
			return AbstractSTRtree.prototype.depth.call(this);
		} else return AbstractSTRtree.prototype.depth.apply(this, arguments);
	},
	createParentBoundables: function (childBoundables, newLevel) {
		Assert.isTrue(!childBoundables.isEmpty());
		var minLeafCount = Math.trunc(Math.ceil(childBoundables.size() / this.getNodeCapacity()));
		var sortedChildBoundables = new ArrayList(childBoundables);
		Collections.sort(sortedChildBoundables, STRtree.xComparator);
		var verticalSlices = this.verticalSlices(sortedChildBoundables, Math.trunc(Math.ceil(Math.sqrt(minLeafCount))));
		return this.createParentBoundablesFromVerticalSlices(verticalSlices, newLevel);
	},
	nearestNeighbour: function () {
		if (arguments.length === 1) {
			if (hasInterface(arguments[0], ItemDistance)) {
				let itemDist = arguments[0];
				var bp = new BoundablePair(this.getRoot(), this.getRoot(), itemDist);
				return this.nearestNeighbour(bp);
			} else if (arguments[0] instanceof BoundablePair) {
				let initBndPair = arguments[0];
				return this.nearestNeighbour(initBndPair, Double.POSITIVE_INFINITY);
			}
		} else if (arguments.length === 2) {
			if (arguments[0] instanceof STRtree && hasInterface(arguments[1], ItemDistance)) {
				let tree = arguments[0], itemDist = arguments[1];
				var bp = new BoundablePair(this.getRoot(), tree.getRoot(), itemDist);
				return this.nearestNeighbour(bp);
			} else if (arguments[0] instanceof BoundablePair && typeof arguments[1] === "number") {
				let initBndPair = arguments[0], maxDistance = arguments[1];
				var distanceLowerBound = maxDistance;
				var minPair = null;
				var priQ = new PriorityQueue();
				priQ.add(initBndPair);
				while (!priQ.isEmpty() && distanceLowerBound > 0.0) {
					var bndPair = priQ.poll();
					var currentDistance = bndPair.getDistance();
					if (currentDistance >= distanceLowerBound) break;
					if (bndPair.isLeaves()) {
						distanceLowerBound = currentDistance;
						minPair = bndPair;
					} else {
						bndPair.expandToQueue(priQ, distanceLowerBound);
					}
				}
				return [minPair.getBoundable(0).getItem(), minPair.getBoundable(1).getItem()];
			}
		} else if (arguments.length === 3) {
			let env = arguments[0], item = arguments[1], itemDist = arguments[2];
			var bnd = new ItemBoundable(env, item);
			var bp = new BoundablePair(this.getRoot(), bnd, itemDist);
			return this.nearestNeighbour(bp)[0];
		}
	},
	interfaces_: function () {
		return [SpatialIndex, Serializable];
	},
	getClass: function () {
		return STRtree;
	}
});
STRtree.centreX = function (e) {
	return STRtree.avg(e.getMinX(), e.getMaxX());
};
STRtree.avg = function (a, b) {
	return (a + b) / 2;
};
STRtree.centreY = function (e) {
	return STRtree.avg(e.getMinY(), e.getMaxY());
};
function STRtreeNode() {
	let level = arguments[0];
	AbstractNode.call(this, level);
}
inherits(STRtreeNode, AbstractNode);
extend(STRtreeNode.prototype, {
	computeBounds: function () {
		var bounds = null;
		for (var i = this.getChildBoundables().iterator(); i.hasNext(); ) {
			var childBoundable = i.next();
			if (bounds === null) {
				bounds = new Envelope(childBoundable.getBounds());
			} else {
				bounds.expandToInclude(childBoundable.getBounds());
			}
		}
		return bounds;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return STRtreeNode;
	}
});
STRtree.STRtreeNode = STRtreeNode;
STRtree.serialVersionUID = 259274702368956900;
STRtree.xComparator = {
	interfaces_: function () {
		return [Comparator];
	},
	compare: function (o1, o2) {
		return AbstractSTRtree.compareDoubles(STRtree.centreX(o1.getBounds()), STRtree.centreX(o2.getBounds()));
	}
};
STRtree.yComparator = {
	interfaces_: function () {
		return [Comparator];
	},
	compare: function (o1, o2) {
		return AbstractSTRtree.compareDoubles(STRtree.centreY(o1.getBounds()), STRtree.centreY(o2.getBounds()));
	}
};
STRtree.intersectsOp = {
	interfaces_: function () {
		return [IntersectsOp];
	},
	intersects: function (aBounds, bBounds) {
		return aBounds.intersects(bBounds);
	}
};
STRtree.DEFAULT_NODE_CAPACITY = 10;
