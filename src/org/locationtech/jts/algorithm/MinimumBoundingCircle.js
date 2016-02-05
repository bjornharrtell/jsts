import Coordinate from '../geom/Coordinate';
import Double from '../../../../java/lang/Double';
import CoordinateArrays from '../geom/CoordinateArrays';
import Angle from './Angle';
import Assert from '../util/Assert';
import Triangle from '../geom/Triangle';
export default class MinimumBoundingCircle {
	constructor(...args) {
		(() => {
			this.input = null;
			this.extremalPts = null;
			this.centre = null;
			this.radius = 0.0;
		})();
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [geom] = args;
						this.input = geom;
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static pointWitMinAngleWithX(pts, P) {
		var minSin = Double.MAX_VALUE;
		var minAngPt = null;
		for (var i = 0; i < pts.length; i++) {
			var p = pts[i];
			if (p === P) continue;
			var dx = p.x - P.x;
			var dy = p.y - P.y;
			if (dy < 0) dy = -dy;
			var len = Math.sqrt(dx * dx + dy * dy);
			var sin = dy / len;
			if (sin < minSin) {
				minSin = sin;
				minAngPt = p;
			}
		}
		return minAngPt;
	}
	static lowestPoint(pts) {
		var min = pts[0];
		for (var i = 1; i < pts.length; i++) {
			if (pts[i].y < min.y) min = pts[i];
		}
		return min;
	}
	static pointWithMinAngleWithSegment(pts, P, Q) {
		var minAng = Double.MAX_VALUE;
		var minAngPt = null;
		for (var i = 0; i < pts.length; i++) {
			var p = pts[i];
			if (p === P) continue;
			if (p === Q) continue;
			var ang = Angle.angleBetween(P, p, Q);
			if (ang < minAng) {
				minAng = ang;
				minAngPt = p;
			}
		}
		return minAngPt;
	}
	getRadius() {
		this.compute();
		return this.radius;
	}
	getDiameter() {
		this.compute();
		switch (this.extremalPts.length) {
			case 0:
				return this.input.getFactory().createLineString();
			case 1:
				return this.input.getFactory().createPoint(this.centre);
		}
		var p0 = this.extremalPts[0];
		var p1 = this.extremalPts[1];
		return this.input.getFactory().createLineString([p0, p1]);
	}
	getExtremalPoints() {
		this.compute();
		return this.extremalPts;
	}
	computeCirclePoints() {
		if (this.input.isEmpty()) {
			this.extremalPts = new Array(0);
			return null;
		}
		if (this.input.getNumPoints() === 1) {
			var pts = this.input.getCoordinates();
			this.extremalPts = [new Coordinate(pts[0])];
			return null;
		}
		var convexHull = this.input.convexHull();
		var hullPts = convexHull.getCoordinates();
		var pts = hullPts;
		if (hullPts[0].equals2D(hullPts[hullPts.length - 1])) {
			pts = new Array(hullPts.length - 1);
			CoordinateArrays.copyDeep(hullPts, 0, pts, 0, hullPts.length - 1);
		}
		if (pts.length <= 2) {
			this.extremalPts = CoordinateArrays.copyDeep(pts);
			return null;
		}
		var P = MinimumBoundingCircle.lowestPoint(pts);
		var Q = MinimumBoundingCircle.pointWitMinAngleWithX(pts, P);
		for (var i = 0; i < pts.length; i++) {
			var R = MinimumBoundingCircle.pointWithMinAngleWithSegment(pts, P, Q);
			if (Angle.isObtuse(P, R, Q)) {
				this.extremalPts = [new Coordinate(P), new Coordinate(Q)];
				return null;
			}
			if (Angle.isObtuse(R, P, Q)) {
				P = R;
				continue;
			}
			if (Angle.isObtuse(R, Q, P)) {
				Q = R;
				continue;
			}
			this.extremalPts = [new Coordinate(P), new Coordinate(Q), new Coordinate(R)];
			return null;
		}
		Assert.shouldNeverReachHere("Logic failure in Minimum Bounding Circle algorithm!");
	}
	compute() {
		if (this.extremalPts !== null) return null;
		this.computeCirclePoints();
		this.computeCentre();
		if (this.centre !== null) this.radius = this.centre.distance(this.extremalPts[0]);
	}
	getFarthestPoints() {
		this.compute();
		switch (this.extremalPts.length) {
			case 0:
				return this.input.getFactory().createLineString();
			case 1:
				return this.input.getFactory().createPoint(this.centre);
		}
		var p0 = this.extremalPts[0];
		var p1 = this.extremalPts[this.extremalPts.length - 1];
		return this.input.getFactory().createLineString([p0, p1]);
	}
	getCircle() {
		this.compute();
		if (this.centre === null) return this.input.getFactory().createPolygon();
		var centrePoint = this.input.getFactory().createPoint(this.centre);
		if (this.radius === 0.0) return centrePoint;
		return centrePoint.buffer(this.radius);
	}
	getCentre() {
		this.compute();
		return this.centre;
	}
	computeCentre() {
		switch (this.extremalPts.length) {
			case 0:
				this.centre = null;
				break;
			case 1:
				this.centre = this.extremalPts[0];
				break;
			case 2:
				this.centre = new Coordinate((this.extremalPts[0].x + this.extremalPts[1].x) / 2.0, (this.extremalPts[0].y + this.extremalPts[1].y) / 2.0);
				break;
			case 3:
				this.centre = Triangle.circumcentre(this.extremalPts[0], this.extremalPts[1], this.extremalPts[2]);
				break;
		}
	}
	getClass() {
		return MinimumBoundingCircle;
	}
}

