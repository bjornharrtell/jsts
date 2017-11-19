import Interval from './Interval';
import extend from '../../../../../extend';
import Comparator from '../../../../../java/util/Comparator';
import inherits from '../../../../../inherits';
import AbstractSTRtree from './AbstractSTRtree';
export default function SIRtree() {
	this._comparator = {
		interfaces_: function () {
			return [Comparator];
		},
		compare: function (o1, o2) {
			return AbstractSTRtree.compareDoubles(o1.getBounds().getCentre(), o2.getBounds().getCentre());
		}
	};
	this._intersectsOp = {
		interfaces_: function () {
			return [IntersectsOp];
		},
		intersects: function (aBounds, bBounds) {
			return aBounds.intersects(bBounds);
		}
	};
	if (arguments.length === 0) {
		SIRtree.call(this, 10);
	} else if (arguments.length === 1) {
		let nodeCapacity = arguments[0];
		AbstractSTRtree.call(this, nodeCapacity);
	}
}
inherits(SIRtree, AbstractSTRtree);
extend(SIRtree.prototype, {
	createNode: function (level) {
		return {
			computeBounds: function () {
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
		};
	},
	insert: function () {
		if (arguments.length === 3) {
			let x1 = arguments[0], x2 = arguments[1], item = arguments[2];
			AbstractSTRtree.prototype.insert.call(this, new Interval(Math.min(x1, x2), Math.max(x1, x2)), item);
		} else return AbstractSTRtree.prototype.insert.apply(this, arguments);
	},
	getIntersectsOp: function () {
		return this._intersectsOp;
	},
	query: function () {
		if (arguments.length === 1) {
			let x = arguments[0];
			return this.query(x, x);
		} else if (arguments.length === 2) {
			let x1 = arguments[0], x2 = arguments[1];
			return AbstractSTRtree.prototype.query.call(this, new Interval(Math.min(x1, x2), Math.max(x1, x2)));
		}
	},
	getComparator: function () {
		return this._comparator;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return SIRtree;
	}
});
