import ItemBoundable from './ItemBoundable';
import PriorityQueue from '../../util/PriorityQueue';
import ItemVisitor from '../ItemVisitor';
import SpatialIndex from '../SpatialIndex';
import AbstractNode from './AbstractNode';
import Double from '../../../../../java/lang/Double';
import Collections from '../../../../../java/util/Collections';
import BoundablePair from './BoundablePair';
import ArrayList from '../../../../../java/util/ArrayList';
import Comparator from '../../../../../java/util/Comparator';
import Serializable from '../../../../../java/io/Serializable';
import Envelope from '../../geom/Envelope';
import Assert from '../../util/Assert';
import List from '../../../../../java/util/List';
import AbstractSTRtree from './AbstractSTRtree';
import ItemDistance from './ItemDistance';
export default class STRtree extends AbstractSTRtree {
	constructor(...args) {
		super();
		(() => {})();
		const overloads = (...args) => {
			switch (args.length) {
				case 0:
					return ((...args) => {
						let [] = args;
						overloads.call(this, STRtree.DEFAULT_NODE_CAPACITY);
					})(...args);
				case 1:
					return ((...args) => {
						let [nodeCapacity] = args;
						super(nodeCapacity);
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [SpatialIndex, Serializable];
	}
	static get STRtreeNode() {
		return STRtreeNode;
	}
	static centreX(e) {
		return STRtree.avg(e.getMinX(), e.getMaxX());
	}
	static avg(a, b) {
		return (a + b) / 2;
	}
	static centreY(e) {
		return STRtree.avg(e.getMinY(), e.getMaxY());
	}
	createParentBoundablesFromVerticalSlices(verticalSlices, newLevel) {
		Assert.isTrue(verticalSlices.length > 0);
		var parentBoundables = new ArrayList();
		for (var i = 0; i < verticalSlices.length; i++) {
			parentBoundables.addAll(this.createParentBoundablesFromVerticalSlice(verticalSlices[i], newLevel));
		}
		return parentBoundables;
	}
	createNode(level) {
		return new STRtreeNode(level);
	}
	size(...args) {
		if (args.length === 0) {
			let [] = args;
			return super.size();
		} else return super.size(...args);
	}
	insert(...args) {
		if (args.length === 2) {
			let [itemEnv, item] = args;
			if (itemEnv.isNull()) {
				return null;
			}
			super.insert(itemEnv, item);
		} else return super.insert(...args);
	}
	getIntersectsOp() {
		return STRtree.intersectsOp;
	}
	verticalSlices(childBoundables, sliceCount) {
		var sliceCapacity = Math.trunc(Math.ceil(childBoundables.size() / sliceCount));
		var slices = new Array(sliceCount);
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
	}
	query(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [searchEnv] = args;
						return super.query(searchEnv);
					})(...args);
				case 2:
					return ((...args) => {
						let [searchEnv, visitor] = args;
						super.query(searchEnv, visitor);
					})(...args);
				case 3:
					if (args[2].interfaces_ && args[2].interfaces_.indexOf(List) > -1 && (args[0] instanceof Object && args[1] instanceof AbstractNode)) {
						return ((...args) => {
							let [searchBounds, node, matches] = args;
							super.query(searchBounds, node, matches);
						})(...args);
					} else if (args[2].interfaces_ && args[2].interfaces_.indexOf(ItemVisitor) > -1 && (args[0] instanceof Object && args[1] instanceof AbstractNode)) {
						return ((...args) => {
							let [searchBounds, node, visitor] = args;
							super.query(searchBounds, node, visitor);
						})(...args);
					}
			}
		};
		return overloads.apply(this, args);
	}
	getComparator() {
		return STRtree.yComparator;
	}
	createParentBoundablesFromVerticalSlice(childBoundables, newLevel) {
		return super.createParentBoundables(childBoundables, newLevel);
	}
	remove(...args) {
		if (args.length === 2) {
			let [itemEnv, item] = args;
			return super.remove(itemEnv, item);
		} else return super.remove(...args);
	}
	depth(...args) {
		if (args.length === 0) {
			let [] = args;
			return super.depth();
		} else return super.depth(...args);
	}
	createParentBoundables(childBoundables, newLevel) {
		Assert.isTrue(!childBoundables.isEmpty());
		var minLeafCount = Math.trunc(Math.ceil(childBoundables.size() / this.getNodeCapacity()));
		var sortedChildBoundables = new ArrayList(childBoundables);
		Collections.sort(sortedChildBoundables, STRtree.xComparator);
		var verticalSlices = this.verticalSlices(sortedChildBoundables, Math.trunc(Math.ceil(Math.sqrt(minLeafCount))));
		return this.createParentBoundablesFromVerticalSlices(verticalSlices, newLevel);
	}
	nearestNeighbour(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					if (args[0] instanceof BoundablePair) {
						return ((...args) => {
							let [initBndPair] = args;
							return this.nearestNeighbour(initBndPair, Double.POSITIVE_INFINITY);
						})(...args);
					} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(ItemDistance) > -1) {
						return ((...args) => {
							let [itemDist] = args;
							var bp = new BoundablePair(this.getRoot(), this.getRoot(), itemDist);
							return this.nearestNeighbour(bp);
						})(...args);
					}
				case 2:
					if (args[0] instanceof BoundablePair && typeof args[1] === "number") {
						return ((...args) => {
							let [initBndPair, maxDistance] = args;
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
						})(...args);
					} else if (args[0] instanceof STRtree && (args[1].interfaces_ && args[1].interfaces_.indexOf(ItemDistance) > -1)) {
						return ((...args) => {
							let [tree, itemDist] = args;
							var bp = new BoundablePair(this.getRoot(), tree.getRoot(), itemDist);
							return this.nearestNeighbour(bp);
						})(...args);
					}
				case 3:
					return ((...args) => {
						let [env, item, itemDist] = args;
						var bnd = new ItemBoundable(env, item);
						var bp = new BoundablePair(this.getRoot(), bnd, itemDist);
						return this.nearestNeighbour(bp)[0];
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	getClass() {
		return STRtree;
	}
}
class STRtreeNode extends AbstractNode {
	constructor(...args) {
		super();
		(() => {})();
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [level] = args;
						super(level);
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	computeBounds() {
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
	}
	getClass() {
		return STRtreeNode;
	}
}
STRtree.serialVersionUID = 259274702368956900;
STRtree.xComparator = new (class {
	compare(o1, o2) {
		return STRtree.compareDoubles(STRtree.centreX(o1.getBounds()), STRtree.centreX(o2.getBounds()));
	}
	get interfaces_() {
		return [Comparator];
	}
})();
STRtree.yComparator = new (class {
	compare(o1, o2) {
		return STRtree.compareDoubles(STRtree.centreY(o1.getBounds()), STRtree.centreY(o2.getBounds()));
	}
	get interfaces_() {
		return [Comparator];
	}
})();
STRtree.intersectsOp = new (class {
	intersects(aBounds, bBounds) {
		return aBounds.intersects(bBounds);
	}
	get interfaces_() {
		return [IntersectsOp];
	}
})();
STRtree.DEFAULT_NODE_CAPACITY = 10;

