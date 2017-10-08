import Coordinate from './Coordinate';
import extend from '../../../../extend';
import Comparable from '../../../../java/lang/Comparable';
import Serializable from '../../../../java/io/Serializable';
export default function Envelope() {
	this._minx = null;
	this._maxx = null;
	this._miny = null;
	this._maxy = null;
	if (arguments.length === 0) {
		this.init();
	} else if (arguments.length === 1) {
		if (arguments[0] instanceof Coordinate) {
			let p = arguments[0];
			this.init(p.x, p.x, p.y, p.y);
		} else if (arguments[0] instanceof Envelope) {
			let env = arguments[0];
			this.init(env);
		}
	} else if (arguments.length === 2) {
		let p1 = arguments[0], p2 = arguments[1];
		this.init(p1.x, p2.x, p1.y, p2.y);
	} else if (arguments.length === 4) {
		let x1 = arguments[0], x2 = arguments[1], y1 = arguments[2], y2 = arguments[3];
		this.init(x1, x2, y1, y2);
	}
}
extend(Envelope.prototype, {
	getArea: function () {
		return this.getWidth() * this.getHeight();
	},
	equals: function (other) {
		if (!(other instanceof Envelope)) {
			return false;
		}
		var otherEnvelope = other;
		if (this.isNull()) {
			return otherEnvelope.isNull();
		}
		return this._maxx === otherEnvelope.getMaxX() && this._maxy === otherEnvelope.getMaxY() && this._minx === otherEnvelope.getMinX() && this._miny === otherEnvelope.getMinY();
	},
	intersection: function (env) {
		if (this.isNull() || env.isNull() || !this.intersects(env)) return new Envelope();
		var intMinX = this._minx > env._minx ? this._minx : env._minx;
		var intMinY = this._miny > env._miny ? this._miny : env._miny;
		var intMaxX = this._maxx < env._maxx ? this._maxx : env._maxx;
		var intMaxY = this._maxy < env._maxy ? this._maxy : env._maxy;
		return new Envelope(intMinX, intMaxX, intMinY, intMaxY);
	},
	isNull: function () {
		return this._maxx < this._minx;
	},
	getMaxX: function () {
		return this._maxx;
	},
	covers: function () {
		if (arguments.length === 1) {
			if (arguments[0] instanceof Coordinate) {
				let p = arguments[0];
				return this.covers(p.x, p.y);
			} else if (arguments[0] instanceof Envelope) {
				let other = arguments[0];
				if (this.isNull() || other.isNull()) {
					return false;
				}
				return other.getMinX() >= this._minx && other.getMaxX() <= this._maxx && other.getMinY() >= this._miny && other.getMaxY() <= this._maxy;
			}
		} else if (arguments.length === 2) {
			let x = arguments[0], y = arguments[1];
			if (this.isNull()) return false;
			return x >= this._minx && x <= this._maxx && y >= this._miny && y <= this._maxy;
		}
	},
	intersects: function () {
		if (arguments.length === 1) {
			if (arguments[0] instanceof Envelope) {
				let other = arguments[0];
				if (this.isNull() || other.isNull()) {
					return false;
				}
				return !(other._minx > this._maxx || other._maxx < this._minx || other._miny > this._maxy || other._maxy < this._miny);
			} else if (arguments[0] instanceof Coordinate) {
				let p = arguments[0];
				return this.intersects(p.x, p.y);
			}
		} else if (arguments.length === 2) {
			let x = arguments[0], y = arguments[1];
			if (this.isNull()) return false;
			return !(x > this._maxx || x < this._minx || y > this._maxy || y < this._miny);
		}
	},
	getMinY: function () {
		return this._miny;
	},
	getMinX: function () {
		return this._minx;
	},
	expandToInclude: function () {
		if (arguments.length === 1) {
			if (arguments[0] instanceof Coordinate) {
				let p = arguments[0];
				this.expandToInclude(p.x, p.y);
			} else if (arguments[0] instanceof Envelope) {
				let other = arguments[0];
				if (other.isNull()) {
					return null;
				}
				if (this.isNull()) {
					this._minx = other.getMinX();
					this._maxx = other.getMaxX();
					this._miny = other.getMinY();
					this._maxy = other.getMaxY();
				} else {
					if (other._minx < this._minx) {
						this._minx = other._minx;
					}
					if (other._maxx > this._maxx) {
						this._maxx = other._maxx;
					}
					if (other._miny < this._miny) {
						this._miny = other._miny;
					}
					if (other._maxy > this._maxy) {
						this._maxy = other._maxy;
					}
				}
			}
		} else if (arguments.length === 2) {
			let x = arguments[0], y = arguments[1];
			if (this.isNull()) {
				this._minx = x;
				this._maxx = x;
				this._miny = y;
				this._maxy = y;
			} else {
				if (x < this._minx) {
					this._minx = x;
				}
				if (x > this._maxx) {
					this._maxx = x;
				}
				if (y < this._miny) {
					this._miny = y;
				}
				if (y > this._maxy) {
					this._maxy = y;
				}
			}
		}
	},
	minExtent: function () {
		if (this.isNull()) return 0.0;
		var w = this.getWidth();
		var h = this.getHeight();
		if (w < h) return w;
		return h;
	},
	getWidth: function () {
		if (this.isNull()) {
			return 0;
		}
		return this._maxx - this._minx;
	},
	compareTo: function (o) {
		var env = o;
		if (this.isNull()) {
			if (env.isNull()) return 0;
			return -1;
		} else {
			if (env.isNull()) return 1;
		}
		if (this._minx < env._minx) return -1;
		if (this._minx > env._minx) return 1;
		if (this._miny < env._miny) return -1;
		if (this._miny > env._miny) return 1;
		if (this._maxx < env._maxx) return -1;
		if (this._maxx > env._maxx) return 1;
		if (this._maxy < env._maxy) return -1;
		if (this._maxy > env._maxy) return 1;
		return 0;
	},
	translate: function (transX, transY) {
		if (this.isNull()) {
			return null;
		}
		this.init(this.getMinX() + transX, this.getMaxX() + transX, this.getMinY() + transY, this.getMaxY() + transY);
	},
	toString: function () {
		return "Env[" + this._minx + " : " + this._maxx + ", " + this._miny + " : " + this._maxy + "]";
	},
	setToNull: function () {
		this._minx = 0;
		this._maxx = -1;
		this._miny = 0;
		this._maxy = -1;
	},
	getHeight: function () {
		if (this.isNull()) {
			return 0;
		}
		return this._maxy - this._miny;
	},
	maxExtent: function () {
		if (this.isNull()) return 0.0;
		var w = this.getWidth();
		var h = this.getHeight();
		if (w > h) return w;
		return h;
	},
	expandBy: function () {
		if (arguments.length === 1) {
			let distance = arguments[0];
			this.expandBy(distance, distance);
		} else if (arguments.length === 2) {
			let deltaX = arguments[0], deltaY = arguments[1];
			if (this.isNull()) return null;
			this._minx -= deltaX;
			this._maxx += deltaX;
			this._miny -= deltaY;
			this._maxy += deltaY;
			if (this._minx > this._maxx || this._miny > this._maxy) this.setToNull();
		}
	},
	contains: function () {
		if (arguments.length === 1) {
			if (arguments[0] instanceof Envelope) {
				let other = arguments[0];
				return this.covers(other);
			} else if (arguments[0] instanceof Coordinate) {
				let p = arguments[0];
				return this.covers(p);
			}
		} else if (arguments.length === 2) {
			let x = arguments[0], y = arguments[1];
			return this.covers(x, y);
		}
	},
	centre: function () {
		if (this.isNull()) return null;
		return new Coordinate((this.getMinX() + this.getMaxX()) / 2.0, (this.getMinY() + this.getMaxY()) / 2.0);
	},
	init: function () {
		if (arguments.length === 0) {
			this.setToNull();
		} else if (arguments.length === 1) {
			if (arguments[0] instanceof Coordinate) {
				let p = arguments[0];
				this.init(p.x, p.x, p.y, p.y);
			} else if (arguments[0] instanceof Envelope) {
				let env = arguments[0];
				this._minx = env._minx;
				this._maxx = env._maxx;
				this._miny = env._miny;
				this._maxy = env._maxy;
			}
		} else if (arguments.length === 2) {
			let p1 = arguments[0], p2 = arguments[1];
			this.init(p1.x, p2.x, p1.y, p2.y);
		} else if (arguments.length === 4) {
			let x1 = arguments[0], x2 = arguments[1], y1 = arguments[2], y2 = arguments[3];
			if (x1 < x2) {
				this._minx = x1;
				this._maxx = x2;
			} else {
				this._minx = x2;
				this._maxx = x1;
			}
			if (y1 < y2) {
				this._miny = y1;
				this._maxy = y2;
			} else {
				this._miny = y2;
				this._maxy = y1;
			}
		}
	},
	getMaxY: function () {
		return this._maxy;
	},
	distance: function (env) {
		if (this.intersects(env)) return 0;
		var dx = 0.0;
		if (this._maxx < env._minx) dx = env._minx - this._maxx; else if (this._minx > env._maxx) dx = this._minx - env._maxx;
		var dy = 0.0;
		if (this._maxy < env._miny) dy = env._miny - this._maxy; else if (this._miny > env._maxy) dy = this._miny - env._maxy;
		if (dx === 0.0) return dy;
		if (dy === 0.0) return dx;
		return Math.sqrt(dx * dx + dy * dy);
	},
	hashCode: function () {
		var result = 17;
		result = 37 * result + Coordinate.hashCode(this._minx);
		result = 37 * result + Coordinate.hashCode(this._maxx);
		result = 37 * result + Coordinate.hashCode(this._miny);
		result = 37 * result + Coordinate.hashCode(this._maxy);
		return result;
	},
	interfaces_: function () {
		return [Comparable, Serializable];
	},
	getClass: function () {
		return Envelope;
	}
});
Envelope.intersects = function () {
	if (arguments.length === 3) {
		let p1 = arguments[0], p2 = arguments[1], q = arguments[2];
		if (q.x >= (p1.x < p2.x ? p1.x : p2.x) && q.x <= (p1.x > p2.x ? p1.x : p2.x) && (q.y >= (p1.y < p2.y ? p1.y : p2.y) && q.y <= (p1.y > p2.y ? p1.y : p2.y))) {
			return true;
		}
		return false;
	} else if (arguments.length === 4) {
		let p1 = arguments[0], p2 = arguments[1], q1 = arguments[2], q2 = arguments[3];
		var minq = Math.min(q1.x, q2.x);
		var maxq = Math.max(q1.x, q2.x);
		var minp = Math.min(p1.x, p2.x);
		var maxp = Math.max(p1.x, p2.x);
		if (minp > maxq) return false;
		if (maxp < minq) return false;
		minq = Math.min(q1.y, q2.y);
		maxq = Math.max(q1.y, q2.y);
		minp = Math.min(p1.y, p2.y);
		maxp = Math.max(p1.y, p2.y);
		if (minp > maxq) return false;
		if (maxp < minq) return false;
		return true;
	}
};
Envelope.serialVersionUID = 5873921885273102420;
