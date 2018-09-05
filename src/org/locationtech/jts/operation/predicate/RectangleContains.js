import LineString from '../../geom/LineString';
import Coordinate from '../../geom/Coordinate';
import Point from '../../geom/Point';
import Polygon from '../../geom/Polygon';
export default class RectangleContains {
	constructor() {
		RectangleContains.constructor_.apply(this, arguments);
	}
	static contains(rectangle, b) {
		var rc = new RectangleContains(rectangle);
		return rc.contains(b);
	}
	isContainedInBoundary(geom) {
		if (geom instanceof Polygon) return false;
		if (geom instanceof Point) return this.isPointContainedInBoundary(geom);
		if (geom instanceof LineString) return this.isLineStringContainedInBoundary(geom);
		for (var i = 0; i < geom.getNumGeometries(); i++) {
			var comp = geom.getGeometryN(i);
			if (!this.isContainedInBoundary(comp)) return false;
		}
		return true;
	}
	isLineSegmentContainedInBoundary(p0, p1) {
		if (p0.equals(p1)) return this.isPointContainedInBoundary(p0);
		if (p0.x === p1.x) {
			if (p0.x === this._rectEnv.getMinX() || p0.x === this._rectEnv.getMaxX()) return true;
		} else if (p0.y === p1.y) {
			if (p0.y === this._rectEnv.getMinY() || p0.y === this._rectEnv.getMaxY()) return true;
		}
		return false;
	}
	isLineStringContainedInBoundary(line) {
		var seq = line.getCoordinateSequence();
		var p0 = new Coordinate();
		var p1 = new Coordinate();
		for (var i = 0; i < seq.size() - 1; i++) {
			seq.getCoordinate(i, p0);
			seq.getCoordinate(i + 1, p1);
			if (!this.isLineSegmentContainedInBoundary(p0, p1)) return false;
		}
		return true;
	}
	isPointContainedInBoundary() {
		if (arguments[0] instanceof Point) {
			let point = arguments[0];
			return this.isPointContainedInBoundary(point.getCoordinate());
		} else if (arguments[0] instanceof Coordinate) {
			let pt = arguments[0];
			return pt.x === this._rectEnv.getMinX() || pt.x === this._rectEnv.getMaxX() || pt.y === this._rectEnv.getMinY() || pt.y === this._rectEnv.getMaxY();
		}
	}
	contains(geom) {
		if (!this._rectEnv.contains(geom.getEnvelopeInternal())) return false;
		if (this.isContainedInBoundary(geom)) return false;
		return true;
	}
	getClass() {
		return RectangleContains;
	}
	get interfaces_() {
		return [];
	}
}
RectangleContains.constructor_ = function () {
	this._rectEnv = null;
	let rectangle = arguments[0];
	this._rectEnv = rectangle.getEnvelopeInternal();
};
