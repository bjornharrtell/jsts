import NotRepresentableException from './NotRepresentableException';
import Coordinate from '../geom/Coordinate';
import Double from '../../../../java/lang/Double';
export default class HCoordinate {
	constructor(...args) {
		this.x = null;
		this.y = null;
		this.w = null;
		const overloaded = (...args) => {
			if (args.length === 0) {
				let [] = args;
				this.x = 0.0;
				this.y = 0.0;
				this.w = 1.0;
			} else if (args.length === 1) {
				let [p] = args;
				this.x = p.x;
				this.y = p.y;
				this.w = 1.0;
			} else if (args.length === 2) {
				if (typeof args[0] === "number" && typeof args[1] === "number") {
					let [_x, _y] = args;
					this.x = _x;
					this.y = _y;
					this.w = 1.0;
				} else if (args[0] instanceof HCoordinate && args[1] instanceof HCoordinate) {
					let [p1, p2] = args;
					this.x = p1.y * p2.w - p2.y * p1.w;
					this.y = p2.x * p1.w - p1.x * p2.w;
					this.w = p1.x * p2.y - p2.x * p1.y;
				} else if (args[0] instanceof Coordinate && args[1] instanceof Coordinate) {
					let [p1, p2] = args;
					this.x = p1.y - p2.y;
					this.y = p2.x - p1.x;
					this.w = p1.x * p2.y - p2.x * p1.y;
				}
			} else if (args.length === 3) {
				let [_x, _y, _w] = args;
				this.x = _x;
				this.y = _y;
				this.w = _w;
			} else if (args.length === 4) {
				let [p1, p2, q1, q2] = args;
				var px = p1.y - p2.y;
				var py = p2.x - p1.x;
				var pw = p1.x * p2.y - p2.x * p1.y;
				var qx = q1.y - q2.y;
				var qy = q2.x - q1.x;
				var qw = q1.x * q2.y - q2.x * q1.y;
				this.x = py * qw - qy * pw;
				this.y = qx * pw - px * qw;
				this.w = px * qy - qx * py;
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static intersection(p1, p2, q1, q2) {
		var px = p1.y - p2.y;
		var py = p2.x - p1.x;
		var pw = p1.x * p2.y - p2.x * p1.y;
		var qx = q1.y - q2.y;
		var qy = q2.x - q1.x;
		var qw = q1.x * q2.y - q2.x * q1.y;
		var x = py * qw - qy * pw;
		var y = qx * pw - px * qw;
		var w = px * qy - qx * py;
		var xInt = x / w;
		var yInt = y / w;
		if (Double.isNaN(xInt) || (Double.isInfinite(xInt) || Double.isNaN(yInt)) || Double.isInfinite(yInt)) {
			throw new NotRepresentableException();
		}
		return new Coordinate(xInt, yInt);
	}
	getY() {
		var a = this.y / this.w;
		if (Double.isNaN(a) || Double.isInfinite(a)) {
			throw new NotRepresentableException();
		}
		return a;
	}
	getX() {
		var a = this.x / this.w;
		if (Double.isNaN(a) || Double.isInfinite(a)) {
			throw new NotRepresentableException();
		}
		return a;
	}
	getCoordinate() {
		var p = new Coordinate();
		p.x = this.getX();
		p.y = this.getY();
		return p;
	}
	getClass() {
		return HCoordinate;
	}
}

