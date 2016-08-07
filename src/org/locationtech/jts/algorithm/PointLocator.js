import Location from '../geom/Location';
import LineString from '../geom/LineString';
import CGAlgorithms from './CGAlgorithms';
import Coordinate from '../geom/Coordinate';
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException';
import Point from '../geom/Point';
import Polygon from '../geom/Polygon';
import BoundaryNodeRule from './BoundaryNodeRule';
import extend from '../../../../extend';
import MultiPolygon from '../geom/MultiPolygon';
import GeometryCollectionIterator from '../geom/GeometryCollectionIterator';
import GeometryCollection from '../geom/GeometryCollection';
import MultiLineString from '../geom/MultiLineString';
export default function PointLocator() {
	this.boundaryRule = BoundaryNodeRule.OGC_SFS_BOUNDARY_RULE;
	this.isIn = null;
	this.numBoundaries = null;
	if (arguments.length === 0) {} else if (arguments.length === 1) {
		let boundaryRule = arguments[0];
		if (boundaryRule === null) throw new IllegalArgumentException("Rule must be non-null");
		this.boundaryRule = boundaryRule;
	}
}
extend(PointLocator.prototype, {
	locateInternal: function () {
		if (arguments[0] instanceof Coordinate && arguments[1] instanceof Polygon) {
			let p = arguments[0], poly = arguments[1];
			if (poly.isEmpty()) return Location.EXTERIOR;
			var shell = poly.getExteriorRing();
			var shellLoc = this.locateInPolygonRing(p, shell);
			if (shellLoc === Location.EXTERIOR) return Location.EXTERIOR;
			if (shellLoc === Location.BOUNDARY) return Location.BOUNDARY;
			for (var i = 0; i < poly.getNumInteriorRing(); i++) {
				var hole = poly.getInteriorRingN(i);
				var holeLoc = this.locateInPolygonRing(p, hole);
				if (holeLoc === Location.INTERIOR) return Location.EXTERIOR;
				if (holeLoc === Location.BOUNDARY) return Location.BOUNDARY;
			}
			return Location.INTERIOR;
		} else if (arguments[0] instanceof Coordinate && arguments[1] instanceof LineString) {
			let p = arguments[0], l = arguments[1];
			if (!l.getEnvelopeInternal().intersects(p)) return Location.EXTERIOR;
			var pt = l.getCoordinates();
			if (!l.isClosed()) {
				if (p.equals(pt[0]) || p.equals(pt[pt.length - 1])) {
					return Location.BOUNDARY;
				}
			}
			if (CGAlgorithms.isOnLine(p, pt)) return Location.INTERIOR;
			return Location.EXTERIOR;
		} else if (arguments[0] instanceof Coordinate && arguments[1] instanceof Point) {
			let p = arguments[0], pt = arguments[1];
			var ptCoord = pt.getCoordinate();
			if (ptCoord.equals2D(p)) return Location.INTERIOR;
			return Location.EXTERIOR;
		}
	},
	locateInPolygonRing: function (p, ring) {
		if (!ring.getEnvelopeInternal().intersects(p)) return Location.EXTERIOR;
		return CGAlgorithms.locatePointInRing(p, ring.getCoordinates());
	},
	intersects: function (p, geom) {
		return this.locate(p, geom) !== Location.EXTERIOR;
	},
	updateLocationInfo: function (loc) {
		if (loc === Location.INTERIOR) this.isIn = true;
		if (loc === Location.BOUNDARY) this.numBoundaries++;
	},
	computeLocation: function (p, geom) {
		if (geom instanceof Point) {
			this.updateLocationInfo(this.locateInternal(p, geom));
		}
		if (geom instanceof LineString) {
			this.updateLocationInfo(this.locateInternal(p, geom));
		} else if (geom instanceof Polygon) {
			this.updateLocationInfo(this.locateInternal(p, geom));
		} else if (geom instanceof MultiLineString) {
			var ml = geom;
			for (var i = 0; i < ml.getNumGeometries(); i++) {
				var l = ml.getGeometryN(i);
				this.updateLocationInfo(this.locateInternal(p, l));
			}
		} else if (geom instanceof MultiPolygon) {
			var mpoly = geom;
			for (var i = 0; i < mpoly.getNumGeometries(); i++) {
				var poly = mpoly.getGeometryN(i);
				this.updateLocationInfo(this.locateInternal(p, poly));
			}
		} else if (geom instanceof GeometryCollection) {
			var geomi = new GeometryCollectionIterator(geom);
			while (geomi.hasNext()) {
				var g2 = geomi.next();
				if (g2 !== geom) this.computeLocation(p, g2);
			}
		}
	},
	locate: function (p, geom) {
		if (geom.isEmpty()) return Location.EXTERIOR;
		if (geom instanceof LineString) {
			return this.locateInternal(p, geom);
		} else if (geom instanceof Polygon) {
			return this.locateInternal(p, geom);
		}
		this.isIn = false;
		this.numBoundaries = 0;
		this.computeLocation(p, geom);
		if (this.boundaryRule.isInBoundary(this.numBoundaries)) return Location.BOUNDARY;
		if (this.numBoundaries > 0 || this.isIn) return Location.INTERIOR;
		return Location.EXTERIOR;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return PointLocator;
	}
});
