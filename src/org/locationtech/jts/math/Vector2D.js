import Coordinate from '../geom/Coordinate';
import extend from '../../../../extend';
import Angle from '../algorithm/Angle';
import RobustDeterminant from '../algorithm/RobustDeterminant';
import Assert from '../util/Assert';
export default function Vector2D() {
	this.x = null;
	this.y = null;
	if (arguments.length === 0) {
		Vector2D.call(this, 0.0, 0.0);
	} else if (arguments.length === 1) {
		if (arguments[0] instanceof Vector2D) {
			let v = arguments[0];
			this.x = v.x;
			this.y = v.y;
		} else if (arguments[0] instanceof Coordinate) {
			let v = arguments[0];
			this.x = v.x;
			this.y = v.y;
		}
	} else if (arguments.length === 2) {
		if (typeof arguments[0] === "number" && typeof arguments[1] === "number") {
			let x = arguments[0], y = arguments[1];
			this.x = x;
			this.y = y;
		} else if (arguments[0] instanceof Coordinate && arguments[1] instanceof Coordinate) {
			let from = arguments[0], to = arguments[1];
			this.x = to.x - from.x;
			this.y = to.y - from.y;
		}
	}
}
extend(Vector2D.prototype, {
	dot: function (v) {
		return this.x * v.x + this.y * v.y;
	},
	isParallel: function (v) {
		return 0.0 === RobustDeterminant.signOfDet2x2(this.x, this.y, v.x, v.y);
	},
	getComponent: function (index) {
		if (index === 0) return this.x;
		return this.y;
	},
	subtract: function (v) {
		return Vector2D.create(this.x - v.x, this.y - v.y);
	},
	equals: function (o) {
		if (!(o instanceof Vector2D)) {
			return false;
		}
		var v = o;
		return this.x === v.x && this.y === v.y;
	},
	normalize: function () {
		var length = this.length();
		if (length > 0.0) return this.divide(length);
		return Vector2D.create(0.0, 0.0);
	},
	angle: function () {
		if (arguments.length === 0) {
			return Math.atan2(this.y, this.x);
		} else if (arguments.length === 1) {
			let v = arguments[0];
			return Angle.diff(v.angle(), this.angle());
		}
	},
	weightedSum: function (v, frac) {
		return Vector2D.create(frac * this.x + (1.0 - frac) * v.x, frac * this.y + (1.0 - frac) * v.y);
	},
	divide: function (d) {
		return Vector2D.create(this.x / d, this.y / d);
	},
	rotateByQuarterCircle: function (numQuarters) {
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
	},
	rotate: function (angle) {
		var cos = Math.cos(angle);
		var sin = Math.sin(angle);
		return Vector2D.create(this.x * cos - this.y * sin, this.x * sin + this.y * cos);
	},
	angleTo: function (v) {
		var a1 = this.angle();
		var a2 = v.angle();
		var angDel = a2 - a1;
		if (angDel <= -Math.PI) return angDel + Angle.PI_TIMES_2;
		if (angDel > Math.PI) return angDel - Angle.PI_TIMES_2;
		return angDel;
	},
	getX: function () {
		return this.x;
	},
	lengthSquared: function () {
		return this.x * this.x + this.y * this.y;
	},
	negate: function () {
		return Vector2D.create(-this.x, -this.y);
	},
	clone: function () {
		return new Vector2D(this);
	},
	toCoordinate: function () {
		return new Coordinate(this.x, this.y);
	},
	translate: function (coord) {
		return new Coordinate(this.x + coord.x, this.y + coord.y);
	},
	multiply: function (d) {
		return Vector2D.create(this.x * d, this.y * d);
	},
	toString: function () {
		return "[" + this.x + ", " + this.y + "]";
	},
	length: function () {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	},
	average: function (v) {
		return this.weightedSum(v, 0.5);
	},
	getY: function () {
		return this.y;
	},
	add: function (v) {
		return Vector2D.create(this.x + v.x, this.y + v.y);
	},
	distance: function (v) {
		var delx = v.x - this.x;
		var dely = v.y - this.y;
		return Math.sqrt(delx * delx + dely * dely);
	},
	hashCode: function () {
		var result = 17;
		result = 37 * result + Coordinate.hashCode(this.x);
		result = 37 * result + Coordinate.hashCode(this.y);
		return result;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return Vector2D;
	}
});
Vector2D.create = function () {
	if (arguments.length === 1) {
		if (arguments[0] instanceof Vector2D) {
			let v = arguments[0];
			return new Vector2D(v);
		} else if (arguments[0] instanceof Coordinate) {
			let coord = arguments[0];
			return new Vector2D(coord);
		}
	} else if (arguments.length === 2) {
		if (typeof arguments[0] === "number" && typeof arguments[1] === "number") {
			let x = arguments[0], y = arguments[1];
			return new Vector2D(x, y);
		} else if (arguments[0] instanceof Coordinate && arguments[1] instanceof Coordinate) {
			let from = arguments[0], to = arguments[1];
			return new Vector2D(from, to);
		}
	}
};
