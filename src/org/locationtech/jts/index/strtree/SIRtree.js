import ItemVisitor from '../ItemVisitor';
import AbstractNode from './AbstractNode';
import Interval from './Interval';
import List from '../../../../../java/util/List';
import AbstractSTRtree from './AbstractSTRtree';
export default class SIRtree extends AbstractSTRtree {
	constructor(...args) {
		super();
		(() => {
			this.comparator = new (class {
				compare(o1, o2) {
					return SIRtree.compareDoubles(o1.getBounds().getCentre(), o2.getBounds().getCentre());
				}
			})();
			this.intersectsOp = new (class {
				intersects(aBounds, bBounds) {
					return aBounds.intersects(bBounds);
				}
			})();
		})();
		const overloads = (...args) => {
			switch (args.length) {
				case 0:
					return ((...args) => {
						let [] = args;
						overloads.call(this, 10);
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
		return [];
	}
	createNode(level) {
		return new (class {
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
		const overloads = (...args) => {
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
		return this.comparator;
	}
	getClass() {
		return SIRtree;
	}
}

