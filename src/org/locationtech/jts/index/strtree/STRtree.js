import ItemBoundable from './ItemBoundable';
import PriorityQueue from '../../util/PriorityQueue';
import hasInterface from '../../../../../hasInterface';
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
		if (arguments.length === 2 && (arguments[1] instanceof Object && arguments[0] instanceof Envelope)) {
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
		}
	},
	getComparator: function () {
		return STRtree.yComparator;
	},
	createParentBoundablesFromVerticalSlice: function (childBoundables, newLevel) {
		return AbstractSTRtree.prototype.createParentBoundables.call(this, childBoundables, newLevel);
	},
	remove: function () {
		if (arguments.length === 2 && (arguments[1] instanceof Object && arguments[0] instanceof Envelope)) {
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
			} else if (arguments[0] instanceof BoundablePair && Number.isInteger(arguments[1])) {
				let initBndPair = arguments[0], k = arguments[1];
				return this.nearestNeighbour(initBndPair, Double.POSITIVE_INFINITY, k);
			}
		} else if (arguments.length === 3) {
			if (hasInterface(arguments[2], ItemDistance) && (arguments[0] instanceof Envelope && arguments[1] instanceof Object)) {
				let env = arguments[0], item = arguments[1], itemDist = arguments[2];
				var bnd = new ItemBoundable(env, item);
				var bp = new BoundablePair(this.getRoot(), bnd, itemDist);
				return this.nearestNeighbour(bp)[0];
			} else if (Number.isInteger(arguments[2]) && (arguments[0] instanceof BoundablePair && typeof arguments[1] === "number")) {
				let initBndPair = arguments[0], maxDistance = arguments[1], k = arguments[2];
				var distanceLowerBound = maxDistance;
				var priQ = new PriorityQueue();
				priQ.add(initBndPair);
				var kNearestNeighbors = new PriorityQueue();
				while (!priQ.isEmpty() && distanceLowerBound >= 0.0) {
					var bndPair = priQ.poll();
					var currentDistance = bndPair.getDistance();
					if (currentDistance >= distanceLowerBound) {
						break;
					}
					if (bndPair.isLeaves()) {
						if (kNearestNeighbors.size() < k) {
							kNearestNeighbors.add(bndPair);
						} else {
							var bp1 = kNearestNeighbors.peek();
							if (bp1.getDistance() > currentDistance) {
								kNearestNeighbors.poll();
								kNearestNeighbors.add(bndPair);
							}
							var bp2 = kNearestNeighbors.peek();
							distanceLowerBound = bp2.getDistance();
						}
					} else {
						bndPair.expandToQueue(priQ, distanceLowerBound);
					}
				}
				return STRtree.getItems(kNearestNeighbors);
			}
		} else if (arguments.length === 4) {
			let env = arguments[0], item = arguments[1], itemDist = arguments[2], k = arguments[3];
			var bnd = new ItemBoundable(env, item);
			var bp = new BoundablePair(this.getRoot(), bnd, itemDist);
			return this.nearestNeighbour(bp, k);
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
STRtree.getItems = function (kNearestNeighbors) {
	var items = new Array(kNearestNeighbors.size()).fill(null);
	var count = 0;
	while (!kNearestNeighbors.isEmpty()) {
		var bp = kNearestNeighbors.poll();
		items[count] = bp.getBoundable(0).getItem();
		count++;
	}
	return items;
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
