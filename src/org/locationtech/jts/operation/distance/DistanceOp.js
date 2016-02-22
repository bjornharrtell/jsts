import PointLocator from '../../algorithm/PointLocator';
import PolygonExtracter from '../../geom/util/PolygonExtracter';
import Location from '../../geom/Location';
import LineString from '../../geom/LineString';
import CGAlgorithms from '../../algorithm/CGAlgorithms';
import hasInterface from '../../../../../hasInterface';
import IllegalArgumentException from '../../../../../java/lang/IllegalArgumentException';
import Point from '../../geom/Point';
import Polygon from '../../geom/Polygon';
import GeometryLocation from './GeometryLocation';
import Double from '../../../../../java/lang/Double';
import PointExtracter from '../../geom/util/PointExtracter';
import extend from '../../../../../extend';
import ConnectedElementLocationFilter from './ConnectedElementLocationFilter';
import LineSegment from '../../geom/LineSegment';
import LinearComponentExtracter from '../../geom/util/LinearComponentExtracter';
import List from '../../../../../java/util/List';
export default function DistanceOp() {
	this.geom = null;
	this.terminateDistance = 0.0;
	this.ptLocator = new PointLocator();
	this.minDistanceLocation = null;
	this.minDistance = Double.MAX_VALUE;
	if (arguments.length === 2) {
		let g0 = arguments[0], g1 = arguments[1];
		DistanceOp.call(this, g0, g1, 0.0);
	} else if (arguments.length === 3) {
		let g0 = arguments[0], g1 = arguments[1], terminateDistance = arguments[2];
		this.geom = new Array(2).fill(null);
		this.geom[0] = g0;
		this.geom[1] = g1;
		this.terminateDistance = terminateDistance;
	}
}
extend(DistanceOp.prototype, {
	computeContainmentDistance: function () {
		if (arguments.length === 0) {
			var locPtPoly = new Array(2).fill(null);
			this.computeContainmentDistance(0, locPtPoly);
			if (this.minDistance <= this.terminateDistance) return null;
			this.computeContainmentDistance(1, locPtPoly);
		} else if (arguments.length === 2) {
			let polyGeomIndex = arguments[0], locPtPoly = arguments[1];
			var locationsIndex = 1 - polyGeomIndex;
			var polys = PolygonExtracter.getPolygons(this.geom[polyGeomIndex]);
			if (polys.size() > 0) {
				var insideLocs = ConnectedElementLocationFilter.getLocations(this.geom[locationsIndex]);
				this.computeContainmentDistance(insideLocs, polys, locPtPoly);
				if (this.minDistance <= this.terminateDistance) {
					this.minDistanceLocation[locationsIndex] = locPtPoly[0];
					this.minDistanceLocation[polyGeomIndex] = locPtPoly[1];
					return null;
				}
			}
		} else if (arguments.length === 3) {
			if (arguments[2] instanceof Array && (hasInterface(arguments[0], List) && hasInterface(arguments[1], List))) {
				let locs = arguments[0], polys = arguments[1], locPtPoly = arguments[2];
				for (var i = 0; i < locs.size(); i++) {
					var loc = locs.get(i);
					for (var j = 0; j < polys.size(); j++) {
						this.computeContainmentDistance(loc, polys.get(j), locPtPoly);
						if (this.minDistance <= this.terminateDistance) return null;
					}
				}
			} else if (arguments[2] instanceof Array && (arguments[0] instanceof GeometryLocation && arguments[1] instanceof Polygon)) {
				let ptLoc = arguments[0], poly = arguments[1], locPtPoly = arguments[2];
				var pt = ptLoc.getCoordinate();
				if (Location.EXTERIOR !== this.ptLocator.locate(pt, poly)) {
					this.minDistance = 0.0;
					locPtPoly[0] = ptLoc;
					locPtPoly[1] = new GeometryLocation(poly, pt);
					;
					return null;
				}
			}
		}
	},
	computeMinDistanceLinesPoints: function (lines, points, locGeom) {
		for (var i = 0; i < lines.size(); i++) {
			var line = lines.get(i);
			for (var j = 0; j < points.size(); j++) {
				var pt = points.get(j);
				this.computeMinDistance(line, pt, locGeom);
				if (this.minDistance <= this.terminateDistance) return null;
			}
		}
	},
	computeFacetDistance: function () {
		var locGeom = new Array(2).fill(null);
		var lines0 = LinearComponentExtracter.getLines(this.geom[0]);
		var lines1 = LinearComponentExtracter.getLines(this.geom[1]);
		var pts0 = PointExtracter.getPoints(this.geom[0]);
		var pts1 = PointExtracter.getPoints(this.geom[1]);
		this.computeMinDistanceLines(lines0, lines1, locGeom);
		this.updateMinDistance(locGeom, false);
		if (this.minDistance <= this.terminateDistance) return null;
		locGeom[0] = null;
		locGeom[1] = null;
		this.computeMinDistanceLinesPoints(lines0, pts1, locGeom);
		this.updateMinDistance(locGeom, false);
		if (this.minDistance <= this.terminateDistance) return null;
		locGeom[0] = null;
		locGeom[1] = null;
		this.computeMinDistanceLinesPoints(lines1, pts0, locGeom);
		this.updateMinDistance(locGeom, true);
		if (this.minDistance <= this.terminateDistance) return null;
		locGeom[0] = null;
		locGeom[1] = null;
		this.computeMinDistancePoints(pts0, pts1, locGeom);
		this.updateMinDistance(locGeom, false);
	},
	nearestLocations: function () {
		this.computeMinDistance();
		return this.minDistanceLocation;
	},
	updateMinDistance: function (locGeom, flip) {
		if (locGeom[0] === null) return null;
		if (flip) {
			this.minDistanceLocation[0] = locGeom[1];
			this.minDistanceLocation[1] = locGeom[0];
		} else {
			this.minDistanceLocation[0] = locGeom[0];
			this.minDistanceLocation[1] = locGeom[1];
		}
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
			this.computeContainmentDistance();
			if (this.minDistance <= this.terminateDistance) return null;
			this.computeFacetDistance();
		} else if (arguments.length === 3) {
			if (arguments[2] instanceof Array && (arguments[0] instanceof LineString && arguments[1] instanceof Point)) {
				let line = arguments[0], pt = arguments[1], locGeom = arguments[2];
				if (line.getEnvelopeInternal().distance(pt.getEnvelopeInternal()) > this.minDistance) return null;
				var coord0 = line.getCoordinates();
				var coord = pt.getCoordinate();
				for (var i = 0; i < coord0.length - 1; i++) {
					var dist = CGAlgorithms.distancePointLine(coord, coord0[i], coord0[i + 1]);
					if (dist < this.minDistance) {
						this.minDistance = dist;
						var seg = new LineSegment(coord0[i], coord0[i + 1]);
						var segClosestPoint = seg.closestPoint(coord);
						locGeom[0] = new GeometryLocation(line, i, segClosestPoint);
						locGeom[1] = new GeometryLocation(pt, 0, coord);
					}
					if (this.minDistance <= this.terminateDistance) return null;
				}
			} else if (arguments[2] instanceof Array && (arguments[0] instanceof LineString && arguments[1] instanceof LineString)) {
				let line0 = arguments[0], line1 = arguments[1], locGeom = arguments[2];
				if (line0.getEnvelopeInternal().distance(line1.getEnvelopeInternal()) > this.minDistance) return null;
				var coord0 = line0.getCoordinates();
				var coord1 = line1.getCoordinates();
				for (var i = 0; i < coord0.length - 1; i++) {
					for (var j = 0; j < coord1.length - 1; j++) {
						var dist = CGAlgorithms.distanceLineLine(coord0[i], coord0[i + 1], coord1[j], coord1[j + 1]);
						if (dist < this.minDistance) {
							this.minDistance = dist;
							var seg0 = new LineSegment(coord0[i], coord0[i + 1]);
							var seg1 = new LineSegment(coord1[j], coord1[j + 1]);
							var closestPt = seg0.closestPoints(seg1);
							locGeom[0] = new GeometryLocation(line0, i, closestPt[0]);
							locGeom[1] = new GeometryLocation(line1, j, closestPt[1]);
						}
						if (this.minDistance <= this.terminateDistance) return null;
					}
				}
			}
		}
	},
	computeMinDistancePoints: function (points0, points1, locGeom) {
		for (var i = 0; i < points0.size(); i++) {
			var pt0 = points0.get(i);
			for (var j = 0; j < points1.size(); j++) {
				var pt1 = points1.get(j);
				var dist = pt0.getCoordinate().distance(pt1.getCoordinate());
				if (dist < this.minDistance) {
					this.minDistance = dist;
					locGeom[0] = new GeometryLocation(pt0, 0, pt0.getCoordinate());
					locGeom[1] = new GeometryLocation(pt1, 0, pt1.getCoordinate());
				}
				if (this.minDistance <= this.terminateDistance) return null;
			}
		}
	},
	distance: function () {
		if (this.geom[0] === null || this.geom[1] === null) throw new IllegalArgumentException("null geometries are not supported");
		if (this.geom[0].isEmpty() || this.geom[1].isEmpty()) return 0.0;
		this.computeMinDistance();
		return this.minDistance;
	},
	computeMinDistanceLines: function (lines0, lines1, locGeom) {
		for (var i = 0; i < lines0.size(); i++) {
			var line0 = lines0.get(i);
			for (var j = 0; j < lines1.size(); j++) {
				var line1 = lines1.get(j);
				this.computeMinDistance(line0, line1, locGeom);
				if (this.minDistance <= this.terminateDistance) return null;
			}
		}
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return DistanceOp;
	}
});
DistanceOp.distance = function (g0, g1) {
	var distOp = new DistanceOp(g0, g1);
	return distOp.distance();
};
DistanceOp.isWithinDistance = function (g0, g1, distance) {
	var distOp = new DistanceOp(g0, g1, distance);
	return distOp.distance() <= distance;
};
DistanceOp.nearestPoints = function (g0, g1) {
	var distOp = new DistanceOp(g0, g1);
	return distOp.nearestPoints();
};

