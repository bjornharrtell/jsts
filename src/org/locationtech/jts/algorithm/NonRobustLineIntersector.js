import extend from '../../../../extend';
import inherits from '../../../../inherits';
import LineIntersector from './LineIntersector';
export default function NonRobustLineIntersector() {
	LineIntersector.apply(this);
}
inherits(NonRobustLineIntersector, LineIntersector);
extend(NonRobustLineIntersector.prototype, {
	computeIntersection: function () {
		if (arguments.length === 3) {
			let p = arguments[0], p1 = arguments[1], p2 = arguments[2];
			var a1 = null;
			var b1 = null;
			var c1 = null;
			var r = null;
			this._isProper = false;
			a1 = p2.y - p1.y;
			b1 = p1.x - p2.x;
			c1 = p2.x * p1.y - p1.x * p2.y;
			r = a1 * p.x + b1 * p.y + c1;
			if (r !== 0) {
				this.result = LineIntersector.NO_INTERSECTION;
				return null;
			}
			var dist = this.rParameter(p1, p2, p);
			if (dist < 0.0 || dist > 1.0) {
				this.result = LineIntersector.NO_INTERSECTION;
				return null;
			}
			this._isProper = true;
			if (p.equals(p1) || p.equals(p2)) {
				this._isProper = false;
			}
			this.result = LineIntersector.POINT_INTERSECTION;
		} else return LineIntersector.prototype.computeIntersection.apply(this, arguments);
	},
	computeCollinearIntersection: function (p1, p2, p3, p4) {
		var r1 = null;
		var r2 = null;
		var r3 = null;
		var r4 = null;
		var q3 = null;
		var q4 = null;
		var t3 = null;
		var t4 = null;
		r1 = 0;
		r2 = 1;
		r3 = this.rParameter(p1, p2, p3);
		r4 = this.rParameter(p1, p2, p4);
		if (r3 < r4) {
			q3 = p3;
			t3 = r3;
			q4 = p4;
			t4 = r4;
		} else {
			q3 = p4;
			t3 = r4;
			q4 = p3;
			t4 = r3;
		}
		if (t3 > r2 || t4 < r1) {
			return LineIntersector.NO_INTERSECTION;
		}
		if (q4 === p1) {
			this.pa.setCoordinate(p1);
			return LineIntersector.POINT_INTERSECTION;
		}
		if (q3 === p2) {
			this.pa.setCoordinate(p2);
			return LineIntersector.POINT_INTERSECTION;
		}
		this.pa.setCoordinate(p1);
		if (t3 > r1) {
			this.pa.setCoordinate(q3);
		}
		this.pb.setCoordinate(p2);
		if (t4 < r2) {
			this.pb.setCoordinate(q4);
		}
		return LineIntersector.COLLINEAR_INTERSECTION;
	},
	rParameter: function (p1, p2, p) {
		var r = null;
		var dx = Math.abs(p2.x - p1.x);
		var dy = Math.abs(p2.y - p1.y);
		if (dx > dy) {
			r = (p.x - p1.x) / (p2.x - p1.x);
		} else {
			r = (p.y - p1.y) / (p2.y - p1.y);
		}
		return r;
	},
	computeIntersect: function (p1, p2, p3, p4) {
		var a1 = null;
		var b1 = null;
		var c1 = null;
		var a2 = null;
		var b2 = null;
		var c2 = null;
		var r1 = null;
		var r2 = null;
		var r3 = null;
		var r4 = null;
		this._isProper = false;
		a1 = p2.y - p1.y;
		b1 = p1.x - p2.x;
		c1 = p2.x * p1.y - p1.x * p2.y;
		r3 = a1 * p3.x + b1 * p3.y + c1;
		r4 = a1 * p4.x + b1 * p4.y + c1;
		if (r3 !== 0 && r4 !== 0 && NonRobustLineIntersector.isSameSignAndNonZero(r3, r4)) {
			return LineIntersector.NO_INTERSECTION;
		}
		a2 = p4.y - p3.y;
		b2 = p3.x - p4.x;
		c2 = p4.x * p3.y - p3.x * p4.y;
		r1 = a2 * p1.x + b2 * p1.y + c2;
		r2 = a2 * p2.x + b2 * p2.y + c2;
		if (r1 !== 0 && r2 !== 0 && NonRobustLineIntersector.isSameSignAndNonZero(r1, r2)) {
			return LineIntersector.NO_INTERSECTION;
		}
		var denom = a1 * b2 - a2 * b1;
		if (denom === 0) {
			return this.computeCollinearIntersection(p1, p2, p3, p4);
		}
		var numX = b1 * c2 - b2 * c1;
		this.pa.x = numX / denom;
		var numY = a2 * c1 - a1 * c2;
		this.pa.y = numY / denom;
		this._isProper = true;
		if (this.pa.equals(p1) || this.pa.equals(p2) || this.pa.equals(p3) || this.pa.equals(p4)) {
			this._isProper = false;
		}
		if (this.precisionModel !== null) {
			this.precisionModel.makePrecise(this.pa);
		}
		return LineIntersector.POINT_INTERSECTION;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return NonRobustLineIntersector;
	}
});
NonRobustLineIntersector.isSameSignAndNonZero = function (a, b) {
	if (a === 0 || b === 0) {
		return false;
	}
	return a < 0 && b < 0 || a > 0 && b > 0;
};
