import Coordinate from '../geom/Coordinate';
export default class Vector3D {
	constructor(...args) {
		this.x = null;
		this.y = null;
		this.z = null;
		const overloaded = (...args) => {
			if (args.length === 1) {
				return ((...args) => {
					let [v] = args;
					this.x = v.x;
					this.y = v.y;
					this.z = v.z;
				})(...args);
			} else if (args.length === 2) {
				return ((...args) => {
					let [from, to] = args;
					this.x = to.x - from.x;
					this.y = to.y - from.y;
					this.z = to.z - from.z;
				})(...args);
			} else if (args.length === 3) {
				return ((...args) => {
					let [x, y, z] = args;
					this.x = x;
					this.y = y;
					this.z = z;
				})(...args);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static length(v) {
		return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
	}
	static dot(...args) {
		if (args.length === 2) {
			let [v1, v2] = args;
			return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
		} else if (args.length === 4) {
			let [A, B, C, D] = args;
			var ABx = B.x - A.x;
			var ABy = B.y - A.y;
			var ABz = B.z - A.z;
			var CDx = D.x - C.x;
			var CDy = D.y - C.y;
			var CDz = D.z - C.z;
			return ABx * CDx + ABy * CDy + ABz * CDz;
		}
	}
	static normalize(v) {
		var len = Vector3D.length(v);
		return new Coordinate(v.x / len, v.y / len, v.z / len);
	}
	static create(...args) {
		if (args.length === 1) {
			let [coord] = args;
			return new Vector3D(coord);
		} else if (args.length === 3) {
			let [x, y, z] = args;
			return new Vector3D(x, y, z);
		}
	}
	dot(v) {
		return this.x * v.x + this.y * v.y + this.z * v.z;
	}
	getZ() {
		return this.z;
	}
	normalize() {
		var length = this.length();
		if (length > 0.0) return this.divide(this.length());
		return Vector3D.create(0.0, 0.0, 0.0);
	}
	divide(d) {
		return Vector3D.create(this.x / d, this.y / d, this.z / d);
	}
	getX() {
		return this.x;
	}
	toString() {
		return "[" + this.x + ", " + this.y + ", " + this.z + "]";
	}
	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}
	getY() {
		return this.y;
	}
	getClass() {
		return Vector3D;
	}
}

