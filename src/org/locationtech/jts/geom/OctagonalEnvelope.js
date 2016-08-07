import LineString from './LineString';
import CoordinateList from './CoordinateList';
import Geometry from './Geometry';
import hasInterface from '../../../../hasInterface';
import Coordinate from './Coordinate';
import Point from './Point';
import Double from '../../../../java/lang/Double';
import extend from '../../../../extend';
import GeometryComponentFilter from './GeometryComponentFilter';
import CoordinateSequence from './CoordinateSequence';
import Envelope from './Envelope';
export default function OctagonalEnvelope() {
	this.minX = Double.NaN;
	this.maxX = null;
	this.minY = null;
	this.maxY = null;
	this.minA = null;
	this.maxA = null;
	this.minB = null;
	this.maxB = null;
	if (arguments.length === 0) {} else if (arguments.length === 1) {
		if (arguments[0] instanceof Coordinate) {
			let p = arguments[0];
			this.expandToInclude(p);
		} else if (arguments[0] instanceof Envelope) {
			let env = arguments[0];
			this.expandToInclude(env);
		} else if (arguments[0] instanceof OctagonalEnvelope) {
			let oct = arguments[0];
			this.expandToInclude(oct);
		} else if (arguments[0] instanceof Geometry) {
			let geom = arguments[0];
			this.expandToInclude(geom);
		}
	} else if (arguments.length === 2) {
		let p0 = arguments[0], p1 = arguments[1];
		this.expandToInclude(p0);
		this.expandToInclude(p1);
	}
}
extend(OctagonalEnvelope.prototype, {
	toGeometry: function (geomFactory) {
		if (this.isNull()) {
			return geomFactory.createPoint(null);
		}
		var px00 = new Coordinate(this.minX, this.minA - this.minX);
		var px01 = new Coordinate(this.minX, this.minX - this.minB);
		var px10 = new Coordinate(this.maxX, this.maxX - this.maxB);
		var px11 = new Coordinate(this.maxX, this.maxA - this.maxX);
		var py00 = new Coordinate(this.minA - this.minY, this.minY);
		var py01 = new Coordinate(this.minY + this.maxB, this.minY);
		var py10 = new Coordinate(this.maxY + this.minB, this.maxY);
		var py11 = new Coordinate(this.maxA - this.maxY, this.maxY);
		var pm = geomFactory.getPrecisionModel();
		pm.makePrecise(px00);
		pm.makePrecise(px01);
		pm.makePrecise(px10);
		pm.makePrecise(px11);
		pm.makePrecise(py00);
		pm.makePrecise(py01);
		pm.makePrecise(py10);
		pm.makePrecise(py11);
		var coordList = new CoordinateList();
		coordList.add(px00, false);
		coordList.add(px01, false);
		coordList.add(py10, false);
		coordList.add(py11, false);
		coordList.add(px11, false);
		coordList.add(px10, false);
		coordList.add(py01, false);
		coordList.add(py00, false);
		if (coordList.size() === 1) {
			return geomFactory.createPoint(px00);
		}
		if (coordList.size() === 2) {
			var pts = coordList.toCoordinateArray();
			return geomFactory.createLineString(pts);
		}
		coordList.add(px00, false);
		var pts = coordList.toCoordinateArray();
		return geomFactory.createPolygon(geomFactory.createLinearRing(pts), null);
	},
	getMinA: function () {
		return this.minA;
	},
	getMaxB: function () {
		return this.maxB;
	},
	isValid: function () {
		if (this.isNull()) return true;
		return this.minX <= this.maxX && this.minY <= this.maxY && this.minA <= this.maxA && this.minB <= this.maxB;
	},
	isNull: function () {
		return Double.isNaN(this.minX);
	},
	getMaxX: function () {
		return this.maxX;
	},
	intersects: function () {
		if (arguments[0] instanceof OctagonalEnvelope) {
			let other = arguments[0];
			if (this.isNull() || other.isNull()) {
				return false;
			}
			if (this.minX > other.maxX) return false;
			if (this.maxX < other.minX) return false;
			if (this.minY > other.maxY) return false;
			if (this.maxY < other.minY) return false;
			if (this.minA > other.maxA) return false;
			if (this.maxA < other.minA) return false;
			if (this.minB > other.maxB) return false;
			if (this.maxB < other.minB) return false;
			return true;
		} else if (arguments[0] instanceof Coordinate) {
			let p = arguments[0];
			if (this.minX > p.x) return false;
			if (this.maxX < p.x) return false;
			if (this.minY > p.y) return false;
			if (this.maxY < p.y) return false;
			var A = OctagonalEnvelope.computeA(p.x, p.y);
			var B = OctagonalEnvelope.computeB(p.x, p.y);
			if (this.minA > A) return false;
			if (this.maxA < A) return false;
			if (this.minB > B) return false;
			if (this.maxB < B) return false;
			return true;
		}
	},
	getMinY: function () {
		return this.minY;
	},
	getMinX: function () {
		return this.minX;
	},
	expandToInclude: function () {
		if (arguments.length === 1) {
			if (arguments[0] instanceof Geometry) {
				let g = arguments[0];
				g.apply(new BoundingOctagonComponentFilter(this));
			} else if (hasInterface(arguments[0], CoordinateSequence)) {
				let seq = arguments[0];
				for (var i = 0; i < seq.size(); i++) {
					var x = seq.getX(i);
					var y = seq.getY(i);
					this.expandToInclude(x, y);
				}
				return this;
			} else if (arguments[0] instanceof OctagonalEnvelope) {
				let oct = arguments[0];
				if (oct.isNull()) return this;
				if (this.isNull()) {
					this.minX = oct.minX;
					this.maxX = oct.maxX;
					this.minY = oct.minY;
					this.maxY = oct.maxY;
					this.minA = oct.minA;
					this.maxA = oct.maxA;
					this.minB = oct.minB;
					this.maxB = oct.maxB;
					return this;
				}
				if (oct.minX < this.minX) this.minX = oct.minX;
				if (oct.maxX > this.maxX) this.maxX = oct.maxX;
				if (oct.minY < this.minY) this.minY = oct.minY;
				if (oct.maxY > this.maxY) this.maxY = oct.maxY;
				if (oct.minA < this.minA) this.minA = oct.minA;
				if (oct.maxA > this.maxA) this.maxA = oct.maxA;
				if (oct.minB < this.minB) this.minB = oct.minB;
				if (oct.maxB > this.maxB) this.maxB = oct.maxB;
				return this;
			} else if (arguments[0] instanceof Coordinate) {
				let p = arguments[0];
				this.expandToInclude(p.x, p.y);
				return this;
			} else if (arguments[0] instanceof Envelope) {
				let env = arguments[0];
				this.expandToInclude(env.getMinX(), env.getMinY());
				this.expandToInclude(env.getMinX(), env.getMaxY());
				this.expandToInclude(env.getMaxX(), env.getMinY());
				this.expandToInclude(env.getMaxX(), env.getMaxY());
				return this;
			}
		} else if (arguments.length === 2) {
			let x = arguments[0], y = arguments[1];
			var A = OctagonalEnvelope.computeA(x, y);
			var B = OctagonalEnvelope.computeB(x, y);
			if (this.isNull()) {
				this.minX = x;
				this.maxX = x;
				this.minY = y;
				this.maxY = y;
				this.minA = A;
				this.maxA = A;
				this.minB = B;
				this.maxB = B;
			} else {
				if (x < this.minX) this.minX = x;
				if (x > this.maxX) this.maxX = x;
				if (y < this.minY) this.minY = y;
				if (y > this.maxY) this.maxY = y;
				if (A < this.minA) this.minA = A;
				if (A > this.maxA) this.maxA = A;
				if (B < this.minB) this.minB = B;
				if (B > this.maxB) this.maxB = B;
			}
			return this;
		}
	},
	getMinB: function () {
		return this.minB;
	},
	setToNull: function () {
		this.minX = Double.NaN;
	},
	expandBy: function (distance) {
		if (this.isNull()) return null;
		var diagonalDistance = OctagonalEnvelope.SQRT2 * distance;
		this.minX -= distance;
		this.maxX += distance;
		this.minY -= distance;
		this.maxY += distance;
		this.minA -= diagonalDistance;
		this.maxA += diagonalDistance;
		this.minB -= diagonalDistance;
		this.maxB += diagonalDistance;
		if (!this.isValid()) this.setToNull();
	},
	getMaxA: function () {
		return this.maxA;
	},
	contains: function (other) {
		if (this.isNull() || other.isNull()) {
			return false;
		}
		return other.minX >= this.minX && other.maxX <= this.maxX && other.minY >= this.minY && other.maxY <= this.maxY && other.minA >= this.minA && other.maxA <= this.maxA && other.minB >= this.minB && other.maxB <= this.maxB;
	},
	getMaxY: function () {
		return this.maxY;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return OctagonalEnvelope;
	}
});
OctagonalEnvelope.octagonalEnvelope = function (geom) {
	return new OctagonalEnvelope(geom).toGeometry(geom.getFactory());
};
OctagonalEnvelope.computeB = function (x, y) {
	return x - y;
};
OctagonalEnvelope.computeA = function (x, y) {
	return x + y;
};
function BoundingOctagonComponentFilter() {
	this.oe = null;
	let oe = arguments[0];
	this.oe = oe;
}
extend(BoundingOctagonComponentFilter.prototype, {
	filter: function (geom) {
		if (geom instanceof LineString) {
			this.oe.expandToInclude(geom.getCoordinateSequence());
		} else if (geom instanceof Point) {
			this.oe.expandToInclude(geom.getCoordinateSequence());
		}
	},
	interfaces_: function () {
		return [GeometryComponentFilter];
	},
	getClass: function () {
		return BoundingOctagonComponentFilter;
	}
});
OctagonalEnvelope.BoundingOctagonComponentFilter = BoundingOctagonComponentFilter;
OctagonalEnvelope.SQRT2 = Math.sqrt(2.0);
