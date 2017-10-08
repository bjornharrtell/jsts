import Coordinate from '../geom/Coordinate';
import extend from '../../../../extend';
export default function Vector3D() {
	this._x = null;
	this._y = null;
	this._z = null;
	if (arguments.length === 1) {
		let v = arguments[0];
		this._x = v.x;
		this._y = v.y;
		this._z = v.z;
	} else if (arguments.length === 2) {
		let from = arguments[0], to = arguments[1];
		this._x = to.x - from.x;
		this._y = to.y - from.y;
		this._z = to.z - from.z;
	} else if (arguments.length === 3) {
		let x = arguments[0], y = arguments[1], z = arguments[2];
		this._x = x;
		this._y = y;
		this._z = z;
	}
}
extend(Vector3D.prototype, {
	dot: function (v) {
		return this._x * v._x + this._y * v._y + this._z * v._z;
	},
	getZ: function () {
		return this._z;
	},
	normalize: function () {
		var length = this.length();
		if (length > 0.0) return this.divide(this.length());
		return Vector3D.create(0.0, 0.0, 0.0);
	},
	divide: function (d) {
		return Vector3D.create(this._x / d, this._y / d, this._z / d);
	},
	getX: function () {
		return this._x;
	},
	toString: function () {
		return "[" + this._x + ", " + this._y + ", " + this._z + "]";
	},
	length: function () {
		return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z);
	},
	getY: function () {
		return this._y;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return Vector3D;
	}
});
Vector3D.length = function (v) {
	return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
};
Vector3D.dot = function () {
	if (arguments.length === 2) {
		let v1 = arguments[0], v2 = arguments[1];
		return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
	} else if (arguments.length === 4) {
		let A = arguments[0], B = arguments[1], C = arguments[2], D = arguments[3];
		var ABx = B.x - A.x;
		var ABy = B.y - A.y;
		var ABz = B.z - A.z;
		var CDx = D.x - C.x;
		var CDy = D.y - C.y;
		var CDz = D.z - C.z;
		return ABx * CDx + ABy * CDy + ABz * CDz;
	}
};
Vector3D.normalize = function (v) {
	var len = Vector3D.length(v);
	return new Coordinate(v.x / len, v.y / len, v.z / len);
};
Vector3D.create = function () {
	if (arguments.length === 1) {
		let coord = arguments[0];
		return new Vector3D(coord);
	} else if (arguments.length === 3) {
		let x = arguments[0], y = arguments[1], z = arguments[2];
		return new Vector3D(x, y, z);
	}
};
