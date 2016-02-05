import IllegalArgumentException from '../../../../../java/lang/IllegalArgumentException';
import AbstractNode from './AbstractNode';
import Comparable from '../../../../../java/lang/Comparable';
export default class BoundablePair {
	constructor(...args) {
		(() => {
			this.boundable1 = null;
			this.boundable2 = null;
			this._distance = null;
			this.itemDistance = null;
		})();
		const overloads = (...args) => {
			switch (args.length) {
				case 3:
					return ((...args) => {
						let [boundable1, boundable2, itemDistance] = args;
						this.boundable1 = boundable1;
						this.boundable2 = boundable2;
						this.itemDistance = itemDistance;
						this._distance = this.distance();
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [Comparable];
	}
	static area(b) {
		return b.getBounds().getArea();
	}
	static isComposite(item) {
		return item instanceof AbstractNode;
	}
	expandToQueue(priQ, minDistance) {
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
	}
	isLeaves() {
		return !(BoundablePair.isComposite(this.boundable1) || BoundablePair.isComposite(this.boundable2));
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
			var bp = new BoundablePair(child, bndOther, this.itemDistance);
			if (bp.getDistance() < minDistance) {
				priQ.add(bp);
			}
		}
	}
	getBoundable(i) {
		if (i === 0) return this.boundable1;
		return this.boundable2;
	}
	getDistance() {
		return this._distance;
	}
	distance() {
		if (this.isLeaves()) {
			return this.itemDistance.distance(this.boundable1, this.boundable2);
		}
		return this.boundable1.getBounds().distance(this.boundable2.getBounds());
	}
	getClass() {
		return BoundablePair;
	}
}

