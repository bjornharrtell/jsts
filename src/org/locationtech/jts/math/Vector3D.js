import Coordinate from '../geom/Coordinate';
import extend from '../../../../extend';
export default function Vector3D() {
	this.x = null;
	this.y = null;
	this.z = null;
	if (arguments.length === 1) {
		let v = arguments[0];
		this.x = v.x;
		this.y = v.y;
		this.z = v.z;
	} else if (arguments.length === 2) {
		let from = arguments[0], to = arguments[1];
		this.x = to.x - from.x;
		this.y = to.y - from.y;
		this.z = to.z - from.z;
	} else if (arguments.length === 3) {
		let x = arguments[0], y = arguments[1], z = arguments[2];
		this.x = x;
		this.y = y;
		this.z = z;
	}
}
extend(Vector3D.prototype, {
	dot: function (v) {
		return this.x * v.x + this.y * v.y + this.z * v.z;
	},
	getZ: function () {
		return this.z;
	},
	normalize: function () {
		var length = this.length();
		if (length > 0.0) return this.divide(this.length());
		return Vector3D.create(0.0, 0.0, 0.0);
	},
	divide: function (d) {
		return Vector3D.create(this.x / d, this.y / d, this.z / d);
	},
	getX: function () {
		return this.x;
	},
	toString: function () {
		return "[" + this.x + ", " + this.y + ", " + this.z + "]";
	},
	length: function () {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	},
	getY: function () {
		return this.y;
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

