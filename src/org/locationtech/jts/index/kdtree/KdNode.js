import Coordinate from '../../geom/Coordinate';
import extend from '../../../../../extend';
export default function KdNode() {
	this._p = null;
	this._data = null;
	this._left = null;
	this._right = null;
	this._count = null;
	if (arguments.length === 2) {
		let p = arguments[0], data = arguments[1];
		this._p = new Coordinate(p);
		this._left = null;
		this._right = null;
		this._count = 1;
		this._data = data;
	} else if (arguments.length === 3) {
		let _x = arguments[0], _y = arguments[1], data = arguments[2];
		this._p = new Coordinate(_x, _y);
		this._left = null;
		this._right = null;
		this._count = 1;
		this._data = data;
	}
}
extend(KdNode.prototype, {
	isRepeated: function () {
		return this._count > 1;
	},
	getRight: function () {
		return this._right;
	},
	getCoordinate: function () {
		return this._p;
	},
	setLeft: function (_left) {
		this._left = _left;
	},
	getX: function () {
		return this._p.x;
	},
	getData: function () {
		return this._data;
	},
	getCount: function () {
		return this._count;
	},
	getLeft: function () {
		return this._left;
	},
	getY: function () {
		return this._p.y;
	},
	increment: function () {
		this._count = this._count + 1;
	},
	setRight: function (_right) {
		this._right = _right;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return KdNode;
	}
});
