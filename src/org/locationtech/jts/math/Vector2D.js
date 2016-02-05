import Coordinate from '../geom/Coordinate';
import Angle from '../algorithm/Angle';
import RobustDeterminant from '../algorithm/RobustDeterminant';
import Assert from '../util/Assert';
export default class Vector2D {
	constructor(...args) {
		(() => {
			this.x = null;
			this.y = null;
		})();
		const overloads = (...args) => {
			switch (args.length) {
				case 0:
					return ((...args) => {
						let [] = args;
						overloads.call(this, 0.0, 0.0);
					})(...args);
				case 1:
					if (args[0] instanceof Coordinate) {
						return ((...args) => {
							let [v] = args;
							this.x = v.x;
							this.y = v.y;
						})(...args);
					} else if (args[0] instanceof Vector2D) {
						return ((...args) => {
							let [v] = args;
							this.x = v.x;
							this.y = v.y;
						})(...args);
					}
				case 2:
					if (args[0] instanceof Coordinate && args[1] instanceof Coordinate) {
						return ((...args) => {
							let [from, to] = args;
							this.x = to.x - from.x;
							this.y = to.y - from.y;
						})(...args);
					} else if (typeof args[0] === "number" && typeof args[1] === "number") {
						return ((...args) => {
							let [x, y] = args;
							this.x = x;
							this.y = y;
						})(...args);
					}
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static create(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					if (args[0] instanceof Coordinate) {
						return ((...args) => {
							let [coord] = args;
							return new Vector2D(coord);
						})(...args);
					} else if (args[0] instanceof Vector2D) {
						return ((...args) => {
							let [v] = args;
							return new Vector2D(v);
						})(...args);
					}
				case 2:
					if (args[0] instanceof Coordinate && args[1] instanceof Coordinate) {
						return ((...args) => {
							let [from, to] = args;
							return new Vector2D(from, to);
						})(...args);
					} else if (typeof args[0] === "number" && typeof args[1] === "number") {
						return ((...args) => {
							let [x, y] = args;
							return new Vector2D(x, y);
						})(...args);
					}
			}
		};
		return overloads.apply(this, args);
	}
	dot(v) {
		return this.x * v.x + this.y * v.y;
	}
	isParallel(v) {
		return 0.0 === RobustDeterminant.signOfDet2x2(this.x, this.y, v.x, v.y);
	}
	getComponent(index) {
		if (index === 0) return this.x;
		return this.y;
	}
	subtract(v) {
		return Vector2D.create(this.x - v.x, this.y - v.y);
	}
	equals(o) {
		if (!(o instanceof Vector2D)) {
			return false;
		}
		var v = o;
		return this.x === v.x && this.y === v.y;
	}
	normalize() {
		var length = this.length();
		if (length > 0.0) return this.divide(length);
		return Vector2D.create(0.0, 0.0);
	}
	angle(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 0:
					return ((...args) => {
						let [] = args;
						return Math.atan2(this.y, this.x);
					})(...args);
				case 1:
					return ((...args) => {
						let [v] = args;
						return Angle.diff(v.angle(), this.angle());
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	weightedSum(v, frac) {
		return Vector2D.create(frac * this.x + (1.0 - frac) * v.x, frac * this.y + (1.0 - frac) * v.y);
	}
	divide(d) {
		return Vector2D.create(this.x / d, this.y / d);
	}
	rotateByQuarterCircle(numQuarters) {
		var nQuad = numQuarters % 4;
		if (numQuarters < 0 && nQuad !== 0) {
			nQuad = nQuad + 4;
		}
		switch (nQuad) {
			case 0:
				return Vector2D.create(this.x, this.y);
			case 1:
				return Vector2D.create(-this.y, this.x);
			case 2:
				return Vector2D.create(-this.x, -this.y);
			case 3:
				return Vector2D.create(this.y, -this.x);
		}
		Assert.shouldNeverReachHere();
		return null;
	}
	rotate(angle) {
		var cos = Math.cos(angle);
		var sin = Math.sin(angle);
		return Vector2D.create(this.x * cos - this.y * sin, this.x * sin + this.y * cos);
	}
	angleTo(v) {
		var a1 = this.angle();
		var a2 = v.angle();
		var angDel = a2 - a1;
		if (angDel <= -Math.PI) return angDel + Angle.PI_TIMES_2;
		if (angDel > Math.PI) return angDel - Angle.PI_TIMES_2;
		return angDel;
	}
	getX() {
		return this.x;
	}
	lengthSquared() {
		return this.x * this.x + this.y * this.y;
	}
	negate() {
		return Vector2D.create(-this.x, -this.y);
	}
	clone() {
		return new Vector2D(this);
	}
	toCoordinate() {
		return new Coordinate(this.x, this.y);
	}
	translate(coord) {
		return new Coordinate(this.x + coord.x, this.y + coord.y);
	}
	multiply(d) {
		return Vector2D.create(this.x * d, this.y * d);
	}
	toString() {
		return "[" + this.x + ", " + this.y + "]";
	}
	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	average(v) {
		return this.weightedSum(v, 0.5);
	}
	getY() {
		return this.y;
	}
	add(v) {
		return Vector2D.create(this.x + v.x, this.y + v.y);
	}
	distance(v) {
		var delx = v.x - this.x;
		var dely = v.y - this.y;
		return Math.sqrt(delx * delx + dely * dely);
	}
	hashCode() {
		var result = 17;
		result = 37 * result + Coordinate.hashCode(this.x);
		result = 37 * result + Coordinate.hashCode(this.y);
		return result;
	}
	getClass() {
		return Vector2D;
	}
}

