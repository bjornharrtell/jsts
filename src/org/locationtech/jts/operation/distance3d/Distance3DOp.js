import LineString from '../../geom/LineString';
import Geometry from '../../geom/Geometry';
import Coordinate from '../../geom/Coordinate';
import IllegalArgumentException from '../../../../../java/lang/IllegalArgumentException';
import Point from '../../geom/Point';
import PlanarPolygon3D from './PlanarPolygon3D';
import Polygon from '../../geom/Polygon';
import GeometryLocation from '../distance/GeometryLocation';
import Double from '../../../../../java/lang/Double';
import extend from '../../../../../extend';
import LineSegment from '../../geom/LineSegment';
import GeometryCollection from '../../geom/GeometryCollection';
import CGAlgorithms3D from '../../algorithm/CGAlgorithms3D';
export default function Distance3DOp() {
	this.geom = null;
	this.terminateDistance = 0.0;
	this.minDistanceLocation = null;
	this.minDistance = Double.MAX_VALUE;
	this.isDone = false;
	if (arguments.length === 2) {
		let g0 = arguments[0], g1 = arguments[1];
		Distance3DOp.call(this, g0, g1, 0.0);
	} else if (arguments.length === 3) {
		let g0 = arguments[0], g1 = arguments[1], terminateDistance = arguments[2];
		this.geom = new Array(2).fill(null);
		this.geom[0] = g0;
		this.geom[1] = g1;
		this.terminateDistance = terminateDistance;
	}
}
extend(Distance3DOp.prototype, {
	computeMinDistancePolygonPoint: function (polyPlane, point, flip) {
		var pt = point.getCoordinate();
		var shell = polyPlane.getPolygon().getExteriorRing();
		if (polyPlane.intersects(pt, shell)) {
			var nHole = polyPlane.getPolygon().getNumInteriorRing();
			for (var i = 0; i < nHole; i++) {
				var hole = polyPlane.getPolygon().getInteriorRingN(i);
				if (polyPlane.intersects(pt, hole)) {
					this.computeMinDistanceLinePoint(hole, point, flip);
					return null;
				}
			}
			var dist = Math.abs(polyPlane.getPlane().orientedDistance(pt));
			this.updateDistance(dist, new GeometryLocation(polyPlane.getPolygon(), 0, pt), new GeometryLocation(point, 0, pt), flip);
		}
		this.computeMinDistanceLinePoint(shell, point, flip);
	},
	intersection: function (poly, line) {
		var seq = line.getCoordinateSequence();
		if (seq.size() === 0) return null;
		var p0 = new Coordinate();
		seq.getCoordinate(0, p0);
		var d0 = poly.getPlane().orientedDistance(p0);
		var p1 = new Coordinate();
		for (var i = 0; i < seq.size() - 1; i++) {
			seq.getCoordinate(i, p0);
			seq.getCoordinate(i + 1, p1);
			var d1 = poly.getPlane().orientedDistance(p1);
			if (d0 * d1 > 0) continue;
			var intPt = Distance3DOp.segmentPoint(p0, p1, d0, d1);
			if (poly.intersects(intPt)) {
				return intPt;
			}
			d0 = d1;
		}
		return null;
	},
	computeMinDistancePolygonPolygon: function (poly0, poly1, flip) {
		this.computeMinDistancePolygonRings(poly0, poly1, flip);
		if (this.isDone) return null;
		var polyPlane1 = new PlanarPolygon3D(poly1);
		this.computeMinDistancePolygonRings(polyPlane1, poly0.getPolygon(), flip);
	},
	computeMinDistancePointPoint: function (point0, point1, flip) {
		var dist = CGAlgorithms3D.distance(point0.getCoordinate(), point1.getCoordinate());
		if (dist < this.minDistance) {
			this.updateDistance(dist, new GeometryLocation(point0, 0, point0.getCoordinate()), new GeometryLocation(point1, 0, point1.getCoordinate()), flip);
		}
	},
	computeMinDistanceMultiMulti: function (g0, g1, flip) {
		if (g0 instanceof GeometryCollection) {
			var n = g0.getNumGeometries();
			for (var i = 0; i < n; i++) {
				var g = g0.getGeometryN(i);
				this.computeMinDistanceMultiMulti(g, g1, flip);
				if (this.isDone) return null;
			}
		} else {
			if (g0.isEmpty()) return null;
			if (g0 instanceof Polygon) {
				this.computeMinDistanceOneMulti(Distance3DOp.polyPlane(g0), g1, flip);
			} else this.computeMinDistanceOneMulti(g0, g1, flip);
		}
	},
	computeMinDistanceOneMulti: function () {
		if (typeof arguments[2] === "boolean" && (arguments[0] instanceof Geometry && arguments[1] instanceof Geometry)) {
			let g0 = arguments[0], g1 = arguments[1], flip = arguments[2];
			if (g1 instanceof GeometryCollection) {
				var n = g1.getNumGeometries();
				for (var i = 0; i < n; i++) {
					var g = g1.getGeometryN(i);
					this.computeMinDistanceOneMulti(g0, g, flip);
					if (this.isDone) return null;
				}
			} else {
				this.computeMinDistance(g0, g1, flip);
			}
		} else if (typeof arguments[2] === "boolean" && (arguments[0] instanceof PlanarPolygon3D && arguments[1] instanceof Geometry)) {
			let poly = arguments[0], geom = arguments[1], flip = arguments[2];
			if (geom instanceof GeometryCollection) {
				var n = geom.getNumGeometries();
				for (var i = 0; i < n; i++) {
					var g = geom.getGeometryN(i);
					this.computeMinDistanceOneMulti(poly, g, flip);
					if (this.isDone) return null;
				}
			} else {
				if (geom instanceof Point) {
					this.computeMinDistancePolygonPoint(poly, geom, flip);
					return null;
				}
				if (geom instanceof LineString) {
					this.computeMinDistancePolygonLine(poly, geom, flip);
					return null;
				}
				if (geom instanceof Polygon) {
					this.computeMinDistancePolygonPolygon(poly, geom, flip);
					return null;
				}
			}
		}
	},
	computeMinDistanceLinePoint: function (line, point, flip) {
		var lineCoord = line.getCoordinates();
		var coord = point.getCoordinate();
		for (var i = 0; i < lineCoord.length - 1; i++) {
			var dist = CGAlgorithms3D.distancePointSegment(coord, lineCoord[i], lineCoord[i + 1]);
			if (dist < this.minDistance) {
				var seg = new LineSegment(lineCoord[i], lineCoord[i + 1]);
				var segClosestPoint = seg.closestPoint(coord);
				this.updateDistance(dist, new GeometryLocation(line, i, segClosestPoint), new GeometryLocation(point, 0, coord), flip);
			}
			if (this.isDone) return null;
		}
	},
	nearestLocations: function () {
		this.computeMinDistance();
		return this.minDistanceLocation;
	},
	nearestPoints: function () {
		this.computeMinDistance();
		var nearestPts = [this.minDistanceLocation[0].getCoordinate(), this.minDistanceLocation[1].getCoordinate()];
		return nearestPts;
	},
	computeMinDistance: function () {
		if (arguments.length === 0) {
			if (this.minDistanceLocation !== null) return null;
			this.minDistanceLocation = new Array(2).fill(null);
			var geomIndex = this.mostPolygonalIndex();
			var flip = geomIndex === 0;
			this.computeMinDistanceMultiMulti(this.geom[geomIndex], this.geom[1 - geomIndex], flip);
		} else if (arguments.length === 3) {
			let g0 = arguments[0], g1 = arguments[1], flip = arguments[2];
			if (g0 instanceof Point) {
				if (g1 instanceof Point) {
					this.computeMinDistancePointPoint(g0, g1, flip);
					return null;
				}
				if (g1 instanceof LineString) {
					this.computeMinDistanceLinePoint(g1, g0, !flip);
					return null;
				}
				if (g1 instanceof Polygon) {
					this.computeMinDistancePolygonPoint(Distance3DOp.polyPlane(g1), g0, !flip);
					return null;
				}
			}
			if (g0 instanceof LineString) {
				if (g1 instanceof Point) {
					this.computeMinDistanceLinePoint(g0, g1, flip);
					return null;
				}
				if (g1 instanceof LineString) {
					this.computeMinDistanceLineLine(g0, g1, flip);
					return null;
				}
				if (g1 instanceof Polygon) {
					this.computeMinDistancePolygonLine(Distance3DOp.polyPlane(g1), g0, !flip);
					return null;
				}
			}
			if (g0 instanceof Polygon) {
				if (g1 instanceof Point) {
					this.computeMinDistancePolygonPoint(Distance3DOp.polyPlane(g0), g1, flip);
					return null;
				}
				if (g1 instanceof LineString) {
					this.computeMinDistancePolygonLine(Distance3DOp.polyPlane(g0), g1, flip);
					return null;
				}
				if (g1 instanceof Polygon) {
					this.computeMinDistancePolygonPolygon(Distance3DOp.polyPlane(g0), g1, flip);
					return null;
				}
			}
		}
	},
	computeMinDistanceLineLine: function (line0, line1, flip) {
		var coord0 = line0.getCoordinates();
		var coord1 = line1.getCoordinates();
		for (var i = 0; i < coord0.length - 1; i++) {
			for (var j = 0; j < coord1.length - 1; j++) {
				var dist = CGAlgorithms3D.distanceSegmentSegment(coord0[i], coord0[i + 1], coord1[j], coord1[j + 1]);
				if (dist < this.minDistance) {
					this.minDistance = dist;
					var seg0 = new LineSegment(coord0[i], coord0[i + 1]);
					var seg1 = new LineSegment(coord1[j], coord1[j + 1]);
					var closestPt = seg0.closestPoints(seg1);
					this.updateDistance(dist, new GeometryLocation(line0, i, closestPt[0]), new GeometryLocation(line1, j, closestPt[1]), flip);
				}
				if (this.isDone) return null;
			}
		}
	},
	computeMinDistancePolygonLine: function (poly, line, flip) {
		var intPt = this.intersection(poly, line);
		if (intPt !== null) {
			this.updateDistance(0, new GeometryLocation(poly.getPolygon(), 0, intPt), new GeometryLocation(line, 0, intPt), flip);
			return null;
		}
		this.computeMinDistanceLineLine(poly.getPolygon().getExteriorRing(), line, flip);
		if (this.isDone) return null;
		var nHole = poly.getPolygon().getNumInteriorRing();
		for (var i = 0; i < nHole; i++) {
			this.computeMinDistanceLineLine(poly.getPolygon().getInteriorRingN(i), line, flip);
			if (this.isDone) return null;
		}
	},
	distance: function () {
		if (this.geom[0] === null || this.geom[1] === null) throw new IllegalArgumentException("null geometries are not supported");
		if (this.geom[0].isEmpty() || this.geom[1].isEmpty()) return 0.0;
		this.computeMinDistance();
		return this.minDistance;
	},
	mostPolygonalIndex: function () {
		var dim0 = this.geom[0].getDimension();
		var dim1 = this.geom[1].getDimension();
		if (dim0 >= 2 && dim1 >= 2) {
			if (this.geom[0].getNumPoints() > this.geom[1].getNumPoints()) return 0;
			return 1;
		}
		if (dim0 >= 2) return 0;
		if (dim1 >= 2) return 1;
		return 0;
	},
	computeMinDistancePolygonRings: function (poly, ringPoly, flip) {
		this.computeMinDistancePolygonLine(poly, ringPoly.getExteriorRing(), flip);
		if (this.isDone) return null;
		var nHole = ringPoly.getNumInteriorRing();
		for (var i = 0; i < nHole; i++) {
			this.computeMinDistancePolygonLine(poly, ringPoly.getInteriorRingN(i), flip);
			if (this.isDone) return null;
		}
	},
	updateDistance: function (dist, loc0, loc1, flip) {
		this.minDistance = dist;
		var index = flip ? 1 : 0;
		this.minDistanceLocation[index] = loc0;
		this.minDistanceLocation[1 - index] = loc1;
		if (this.minDistance < this.terminateDistance) this.isDone = true;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return Distance3DOp;
	}
});
Distance3DOp.segmentPoint = function (p0, p1, d0, d1) {
	if (d0 <= 0) return new Coordinate(p0);
	if (d1 <= 0) return new Coordinate(p1);
	var f = Math.abs(d0) / (Math.abs(d0) + Math.abs(d1));
	var intx = p0.x + f * (p1.x - p0.x);
	var inty = p0.y + f * (p1.y - p0.y);
	var intz = p0.z + f * (p1.z - p0.z);
	return new Coordinate(intx, inty, intz);
};
Distance3DOp.nearestPoints = function (g0, g1) {
	var distOp = new Distance3DOp(g0, g1);
	return distOp.nearestPoints();
};
Distance3DOp.polyPlane = function (poly) {
	return new PlanarPolygon3D(poly);
};
Distance3DOp.isWithinDistance = function (g0, g1, distance) {
	var distOp = new Distance3DOp(g0, g1, distance);
	return distOp.distance() <= distance;
};
Distance3DOp.distance = function (g0, g1) {
	var distOp = new Distance3DOp(g0, g1);
	return distOp.distance();
};
