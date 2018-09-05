import IllegalArgumentException from '../../../../../java/lang/IllegalArgumentException';
import AbstractNode from './AbstractNode';
import Comparable from '../../../../../java/lang/Comparable';
export default class BoundablePair {
	constructor() {
		BoundablePair.constructor_.apply(this, arguments);
	}
	static area(b) {
		return b.getBounds().getArea();
	}
	static isComposite(item) {
		return item instanceof AbstractNode;
	}
	expandToQueue(priQ, minDistance) {
		var isComp1 = BoundablePair.isComposite(this._boundable1);
		var isComp2 = BoundablePair.isComposite(this._boundable2);
		if (isComp1 && isComp2) {
			if (BoundablePair.area(this._boundable1) > BoundablePair.area(this._boundable2)) {
				this.expand(this._boundable1, this._boundable2, priQ, minDistance);
				return null;
			} else {
				this.expand(this._boundable2, this._boundable1, priQ, minDistance);
				return null;
			}
		} else if (isComp1) {
			this.expand(this._boundable1, this._boundable2, priQ, minDistance);
			return null;
		} else if (isComp2) {
			this.expand(this._boundable2, this._boundable1, priQ, minDistance);
			return null;
		}
		throw new IllegalArgumentException("neither boundable is composite");
	}
	isLeaves() {
		return !(BoundablePair.isComposite(this._boundable1) || BoundablePair.isComposite(this._boundable2));
	}
	compareTo(o) {
		var nd = o;
		if (this._distance < nd._distance) return -1;
		if (this._distance > nd._distance) return 1;
		return 0;
	}
	expand(bndComposite, bndOther, priQ, minDistance) {
		var children = bndComposite.getChildBoundables();
		for (var i = children.iterator(); i.hasNext(); ) {
			var child = i.next();
			var bp = new BoundablePair(child, bndOther, this._itemDistance);
			if (bp.getDistance() < minDistance) {
				priQ.add(bp);
			}
		}
	}
	getBoundable(i) {
		if (i === 0) return this._boundable1;
		return this._boundable2;
	}
	getDistance() {
		return this._distance;
	}
	distance() {
		if (this.isLeaves()) {
			return this._itemDistance.distance(this._boundable1, this._boundable2);
		}
		return this._boundable1.getBounds().distance(this._boundable2.getBounds());
	}
	getClass() {
		return BoundablePair;
	}
	get interfaces_() {
		return [Comparable];
	}
}
BoundablePair.constructor_ = function () {
	this._boundable1 = null;
	this._boundable2 = null;
	this._distance = null;
	this._itemDistance = null;
	let boundable1 = arguments[0], boundable2 = arguments[1], itemDistance = arguments[2];
	this._boundable1 = boundable1;
	this._boundable2 = boundable2;
	this._itemDistance = itemDistance;
	this._distance = this.distance();
};
