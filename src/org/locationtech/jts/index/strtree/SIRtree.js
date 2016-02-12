import ItemVisitor from '../ItemVisitor';
import AbstractNode from './AbstractNode';
import Interval from './Interval';
import Comparator from '../../../../../java/util/Comparator';
import List from '../../../../../java/util/List';
import AbstractSTRtree from './AbstractSTRtree';
export default class SIRtree extends AbstractSTRtree {
	constructor(...args) {
		super();
		this.comparator = new (class {
			compare(o1, o2) {
				return SIRtree.compareDoubles(o1.getBounds().getCentre(), o2.getBounds().getCentre());
			}
			get interfaces_() {
				return [Comparator];
			}
		})();
		this.intersectsOp = new (class {
			intersects(aBounds, bBounds) {
				return aBounds.intersects(bBounds);
			}
			get interfaces_() {
				return [IntersectsOp];
			}
		})();
		const overloaded = (...args) => {
			switch (args.length) {
				case 0:
					return ((...args) => {
						let [] = args;
						overloaded.call(this, 10);
					})(...args);
				case 1:
					return ((...args) => {
						let [nodeCapacity] = args;
						super(nodeCapacity);
					})(...args);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	createNode(level) {
		return new (class extends AbstractNode {
			computeBounds() {
				var bounds = null;
				for (var i = this.getChildBoundables().iterator(); i.hasNext(); ) {
					var childBoundable = i.next();
					if (bounds === null) {
						bounds = new Interval(childBoundable.getBounds());
					} else {
						bounds.expandToInclude(childBoundable.getBounds());
					}
				}
				return bounds;
			}
		})();
	}
	insert(...args) {
		if (args.length === 3) {
			let [x1, x2, item] = args;
			super.insert(new Interval(Math.min(x1, x2), Math.max(x1, x2)), item);
		} else return super.insert(...args);
	}
	getIntersectsOp() {
		return this.intersectsOp;
	}
	query(...args) {
		switch (args.length) {
			case 1:
				return ((...args) => {
					let [x] = args;
					return this.query(x, x);
				})(...args);
			case 2:
				return ((...args) => {
					let [x1, x2] = args;
					return super.query(new Interval(Math.min(x1, x2), Math.max(x1, x2)));
				})(...args);
			case 3:
				if (args[2].interfaces_ && args[2].interfaces_.indexOf(ItemVisitor) > -1 && (args[0] instanceof Object && args[1] instanceof AbstractNode)) {
					return ((...args) => {
						let [searchBounds, node, visitor] = args;
						super.query(searchBounds, node, visitor);
					})(...args);
				} else if (args[2].interfaces_ && args[2].interfaces_.indexOf(List) > -1 && (args[0] instanceof Object && args[1] instanceof AbstractNode)) {
					return ((...args) => {
						let [searchBounds, node, matches] = args;
						super.query(searchBounds, node, matches);
					})(...args);
				}
		}
	}
	getComparator() {
		return this.comparator;
	}
	getClass() {
		return SIRtree;
	}
}

