import LineString from '../geom/LineString';
import CGAlgorithms from './CGAlgorithms';
import Geometry from '../geom/Geometry';
import Coordinate from '../geom/Coordinate';
import Point from '../geom/Point';
import Polygon from '../geom/Polygon';
import extend from '../../../../extend';
import GeometryCollection from '../geom/GeometryCollection';
export default function Centroid() {
	this.areaBasePt = null;
	this.triangleCent3 = new Coordinate();
	this.areasum2 = 0;
	this.cg3 = new Coordinate();
	this.lineCentSum = new Coordinate();
	this.totalLength = 0.0;
	this.ptCount = 0;
	this.ptCentSum = new Coordinate();
	let geom = arguments[0];
	this.areaBasePt = null;
	this.add(geom);
}
extend(Centroid.prototype, {
	addPoint: function (pt) {
		this.ptCount += 1;
		this.ptCentSum.x += pt.x;
		this.ptCentSum.y += pt.y;
	},
	setBasePoint: function (basePt) {
		if (this.areaBasePt === null) this.areaBasePt = basePt;
	},
	addLineSegments: function (pts) {
		var lineLen = 0.0;
		for (var i = 0; i < pts.length - 1; i++) {
			var segmentLen = pts[i].distance(pts[i + 1]);
			if (segmentLen === 0.0) continue;
			lineLen += segmentLen;
			var midx = (pts[i].x + pts[i + 1].x) / 2;
			this.lineCentSum.x += segmentLen * midx;
			var midy = (pts[i].y + pts[i + 1].y) / 2;
			this.lineCentSum.y += segmentLen * midy;
		}
		this.totalLength += lineLen;
		if (lineLen === 0.0 && pts.length > 0) this.addPoint(pts[0]);
	},
	addHole: function (pts) {
		var isPositiveArea = CGAlgorithms.isCCW(pts);
		for (var i = 0; i < pts.length - 1; i++) {
			this.addTriangle(this.areaBasePt, pts[i], pts[i + 1], isPositiveArea);
		}
		this.addLineSegments(pts);
	},
	getCentroid: function () {
		var cent = new Coordinate();
		if (Math.abs(this.areasum2) > 0.0) {
			cent.x = this.cg3.x / 3 / this.areasum2;
			cent.y = this.cg3.y / 3 / this.areasum2;
		} else if (this.totalLength > 0.0) {
			cent.x = this.lineCentSum.x / this.totalLength;
			cent.y = this.lineCentSum.y / this.totalLength;
		} else if (this.ptCount > 0) {
			cent.x = this.ptCentSum.x / this.ptCount;
			cent.y = this.ptCentSum.y / this.ptCount;
		} else {
			return null;
		}
		return cent;
	},
	addShell: function (pts) {
		if (pts.length > 0) this.setBasePoint(pts[0]);
		var isPositiveArea = !CGAlgorithms.isCCW(pts);
		for (var i = 0; i < pts.length - 1; i++) {
			this.addTriangle(this.areaBasePt, pts[i], pts[i + 1], isPositiveArea);
		}
		this.addLineSegments(pts);
	},
	addTriangle: function (p0, p1, p2, isPositiveArea) {
		var sign = isPositiveArea ? 1.0 : -1.0;
		Centroid.centroid3(p0, p1, p2, this.triangleCent3);
		var area2 = Centroid.area2(p0, p1, p2);
		this.cg3.x += sign * area2 * this.triangleCent3.x;
		this.cg3.y += sign * area2 * this.triangleCent3.y;
		this.areasum2 += sign * area2;
	},
	add: function () {
		if (arguments[0] instanceof Polygon) {
			let poly = arguments[0];
			this.addShell(poly.getExteriorRing().getCoordinates());
			for (var i = 0; i < poly.getNumInteriorRing(); i++) {
				this.addHole(poly.getInteriorRingN(i).getCoordinates());
			}
		} else if (arguments[0] instanceof Geometry) {
			let geom = arguments[0];
			if (geom.isEmpty()) return null;
			if (geom instanceof Point) {
				this.addPoint(geom.getCoordinate());
			} else if (geom instanceof LineString) {
				this.addLineSegments(geom.getCoordinates());
			} else if (geom instanceof Polygon) {
				var poly = geom;
				this.add(poly);
			} else if (geom instanceof GeometryCollection) {
				var gc = geom;
				for (var i = 0; i < gc.getNumGeometries(); i++) {
					this.add(gc.getGeometryN(i));
				}
			}
		}
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return Centroid;
	}
});
Centroid.area2 = function (p1, p2, p3) {
	return (p2.x - p1.x) * (p3.y - p1.y) - (p3.x - p1.x) * (p2.y - p1.y);
};
Centroid.centroid3 = function (p1, p2, p3, c) {
	c.x = p1.x + p2.x + p3.x;
	c.y = p1.y + p2.y + p3.y;
	return null;
};
Centroid.getCentroid = function (geom) {
	var cent = new Centroid(geom);
	return cent.getCentroid();
};

