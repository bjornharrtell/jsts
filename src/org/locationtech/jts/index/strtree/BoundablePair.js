import IllegalArgumentException from '../../../../../java/lang/IllegalArgumentException';
import AbstractNode from './AbstractNode';
import extend from '../../../../../extend';
import Comparable from '../../../../../java/lang/Comparable';
export default function BoundablePair() {
	this.boundable1 = null;
	this.boundable2 = null;
	this._distance = null;
	this.itemDistance = null;
	let boundable1 = arguments[0], boundable2 = arguments[1], itemDistance = arguments[2];
	this.boundable1 = boundable1;
	this.boundable2 = boundable2;
	this.itemDistance = itemDistance;
	this._distance = this.distance();
}
extend(BoundablePair.prototype, {
	expandToQueue: function (priQ, minDistance) {
		var isComp1 = BoundablePair.isComposite(this.boundable1);
		var isComp2 = BoundablePair.isComposite(this.boundable2);
		if (isComp1 && isComp2) {
			if (BoundablePair.area(this.boundable1) > BoundablePair.area(this.boundable2)) {
				this.expand(this.boundable1, this.boundable2, priQ, minDistance);
				return null;
			} else {
				this.expand(this.boundable2, this.boundable1, priQ, minDistance);
				return null;
			}
		} else if (isComp1) {
			this.expand(this.boundable1, this.boundable2, priQ, minDistance);
			return null;
		} else if (isComp2) {
			this.expand(this.boundable2, this.boundable1, priQ, minDistance);
			return null;
		}
		throw new IllegalArgumentException("neither boundable is composite");
	},
	isLeaves: function () {
		return !(BoundablePair.isComposite(this.boundable1) || BoundablePair.isComposite(this.boundable2));
	},
	compareTo: function (o) {
		var nd = o;
		if (this._distance < nd._distance) return -1;
		if (this._distance > nd._distance) return 1;
		return 0;
	},
	expand: function (bndComposite, bndOther, priQ, minDistance) {
		var children = bndComposite.getChildBoundables();
		for (var i = children.iterator(); i.hasNext(); ) {
			var child = i.next();
			var bp = new BoundablePair(child, bndOther, this.itemDistance);
			if (bp.getDistance() < minDistance) {
				priQ.add(bp);
			}
		}
	},
	getBoundable: function (i) {
		if (i === 0) return this.boundable1;
		return this.boundable2;
	},
	getDistance: function () {
		return this._distance;
	},
	distance: function () {
		if (this.isLeaves()) {
			return this.itemDistance.distance(this.boundable1, this.boundable2);
		}
		return this.boundable1.getBounds().distance(this.boundable2.getBounds());
	},
	interfaces_: function () {
		return [Comparable];
	},
	getClass: function () {
		return BoundablePair;
	}
});
BoundablePair.area = function (b) {
	return b.getBounds().getArea();
};
BoundablePair.isComposite = function (item) {
	return item instanceof AbstractNode;
};

