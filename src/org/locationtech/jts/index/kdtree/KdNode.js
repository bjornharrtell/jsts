import Coordinate from '../../geom/Coordinate';
import extend from '../../../../../extend';
export default function KdNode() {
	this.p = null;
	this.data = null;
	this.left = null;
	this.right = null;
	this.count = null;
	if (arguments.length === 2) {
		let p = arguments[0], data = arguments[1];
		this.p = new Coordinate(p);
		this.left = null;
		this.right = null;
		this.count = 1;
		this.data = data;
	} else if (arguments.length === 3) {
		let _x = arguments[0], _y = arguments[1], data = arguments[2];
		this.p = new Coordinate(_x, _y);
		this.left = null;
		this.right = null;
		this.count = 1;
		this.data = data;
	}
}
extend(KdNode.prototype, {
	isRepeated: function () {
		return this.count > 1;
	},
	getRight: function () {
		return this.right;
	},
	getCoordinate: function () {
		return this.p;
	},
	setLeft: function (_left) {
		this.left = _left;
	},
	getX: function () {
		return this.p.x;
	},
	getData: function () {
		return this.data;
	},
	getCount: function () {
		return this.count;
	},
	getLeft: function () {
		return this.left;
	},
	getY: function () {
		return this.p.y;
	},
	increment: function () {
		this.count = this.count + 1;
	},
	setRight: function (_right) {
		this.right = _right;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return KdNode;
	}
});
