import LineString from './LineString';
import CoordinateList from './CoordinateList';
import Geometry from './Geometry';
import Coordinate from './Coordinate';
import Point from './Point';
import Double from '../../../../java/lang/Double';
import GeometryComponentFilter from './GeometryComponentFilter';
import CoordinateSequence from './CoordinateSequence';
import Envelope from './Envelope';
export default class OctagonalEnvelope {
	constructor(...args) {
		this.minX = Double.NaN;
		this.maxX = null;
		this.minY = null;
		this.maxY = null;
		this.minA = null;
		this.maxA = null;
		this.minB = null;
		this.maxB = null;
		const overloaded = (...args) => {
			if (args.length === 0) {
				let [] = args;
			} else if (args.length === 1) {
				if (args[0] instanceof Coordinate) {
					let [p] = args;
					this.expandToInclude(p);
				} else if (args[0] instanceof Envelope) {
					let [env] = args;
					this.expandToInclude(env);
				} else if (args[0] instanceof OctagonalEnvelope) {
					let [oct] = args;
					this.expandToInclude(oct);
				} else if (args[0] instanceof Geometry) {
					let [geom] = args;
					this.expandToInclude(geom);
				}
			} else if (args.length === 2) {
				let [p0, p1] = args;
				this.expandToInclude(p0);
				this.expandToInclude(p1);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static get BoundingOctagonComponentFilter() {
		return BoundingOctagonComponentFilter;
	}
	static octagonalEnvelope(geom) {
		return new OctagonalEnvelope(geom).toGeometry(geom.getFactory());
	}
	static computeB(x, y) {
		return x - y;
	}
	static computeA(x, y) {
		return x + y;
	}
	toGeometry(geomFactory) {
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
	}
	getMinA() {
		return this.minA;
	}
	getMaxB() {
		return this.maxB;
	}
	isValid() {
		if (this.isNull()) return true;
		return this.minX <= this.maxX && this.minY <= this.maxY && this.minA <= this.maxA && this.minB <= this.maxB;
	}
	isNull() {
		return Double.isNaN(this.minX);
	}
	getMaxX() {
		return this.maxX;
	}
	intersects(...args) {
		if (args.length === 1) {
			if (args[0] instanceof OctagonalEnvelope) {
				let [other] = args;
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
			} else if (args[0] instanceof Coordinate) {
				let [p] = args;
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
		}
	}
	getMinY() {
		return this.minY;
	}
	getMinX() {
		return this.minX;
	}
	expandToInclude(...args) {
		if (args.length === 1) {
			if (args[0] instanceof Geometry) {
				let [g] = args;
				g.apply(new BoundingOctagonComponentFilter(this));
			} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(CoordinateSequence) > -1) {
				let [seq] = args;
				for (var i = 0; i < seq.size(); i++) {
					var x = seq.getX(i);
					var y = seq.getY(i);
					this.expandToInclude(x, y);
				}
				return this;
			} else if (args[0] instanceof OctagonalEnvelope) {
				let [oct] = args;
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
			} else if (args[0] instanceof Coordinate) {
				let [p] = args;
				this.expandToInclude(p.x, p.y);
				return this;
			} else if (args[0] instanceof Envelope) {
				let [env] = args;
				this.expandToInclude(env.getMinX(), env.getMinY());
				this.expandToInclude(env.getMinX(), env.getMaxY());
				this.expandToInclude(env.getMaxX(), env.getMinY());
				this.expandToInclude(env.getMaxX(), env.getMaxY());
				return this;
			}
		} else if (args.length === 2) {
			let [x, y] = args;
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
	}
	getMinB() {
		return this.minB;
	}
	setToNull() {
		this.minX = Double.NaN;
	}
	expandBy(distance) {
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
	}
	getMaxA() {
		return this.maxA;
	}
	contains(other) {
		if (this.isNull() || other.isNull()) {
			return false;
		}
		return other.minX >= this.minX && other.maxX <= this.maxX && other.minY >= this.minY && other.maxY <= this.maxY && other.minA >= this.minA && other.maxA <= this.maxA && other.minB >= this.minB && other.maxB <= this.maxB;
	}
	getMaxY() {
		return this.maxY;
	}
	getClass() {
		return OctagonalEnvelope;
	}
}
class BoundingOctagonComponentFilter {
	constructor(...args) {
		this.oe = null;
		if (args.length === 1) {
			let [oe] = args;
			this.oe = oe;
		}
	}
	get interfaces_() {
		return [GeometryComponentFilter];
	}
	filter(geom) {
		if (geom instanceof LineString) {
			this.oe.expandToInclude(geom.getCoordinateSequence());
		} else if (geom instanceof Point) {
			this.oe.expandToInclude(geom.getCoordinateSequence());
		}
	}
	getClass() {
		return BoundingOctagonComponentFilter;
	}
}
OctagonalEnvelope.SQRT2 = Math.sqrt(2.0);

