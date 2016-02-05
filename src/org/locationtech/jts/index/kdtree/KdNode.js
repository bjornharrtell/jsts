import Coordinate from '../../geom/Coordinate';
export default class KdNode {
	constructor(...args) {
		(() => {
			this.p = null;
			this.data = null;
			this.left = null;
			this.right = null;
			this.count = null;
		})();
		const overloads = (...args) => {
			switch (args.length) {
				case 2:
					return ((...args) => {
						let [p, data] = args;
						this.p = new Coordinate(p);
						this.left = null;
						this.right = null;
						this.count = 1;
						this.data = data;
					})(...args);
				case 3:
					return ((...args) => {
						let [_x, _y, data] = args;
						this.p = new Coordinate(_x, _y);
						this.left = null;
						this.right = null;
						this.count = 1;
						this.data = data;
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	isRepeated() {
		return this.count > 1;
	}
	getRight() {
		return this.right;
	}
	getCoordinate() {
		return this.p;
	}
	setLeft(_left) {
		this.left = _left;
	}
	getX() {
		return this.p.x;
	}
	getData() {
		return this.data;
	}
	getCount() {
		return this.count;
	}
	getLeft() {
		return this.left;
	}
	getY() {
		return this.p.y;
	}
	increment() {
		this.count = this.count + 1;
	}
	setRight(_right) {
		this.right = _right;
	}
	getClass() {
		return KdNode;
	}
}

