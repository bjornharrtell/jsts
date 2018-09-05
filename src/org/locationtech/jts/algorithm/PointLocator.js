import Location from '../geom/Location';
import LineString from '../geom/LineString';
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException';
import Point from '../geom/Point';
import Polygon from '../geom/Polygon';
import PointLocation from './PointLocation';
import BoundaryNodeRule from './BoundaryNodeRule';
import MultiPolygon from '../geom/MultiPolygon';
import GeometryCollectionIterator from '../geom/GeometryCollectionIterator';
import GeometryCollection from '../geom/GeometryCollection';
import MultiLineString from '../geom/MultiLineString';
export default class PointLocator {
	constructor() {
		PointLocator.constructor_.apply(this, arguments);
	}
	locateInPolygonRing(p, ring) {
		if (!ring.getEnvelopeInternal().intersects(p)) return Location.EXTERIOR;
		return PointLocation.locateInRing(p, ring.getCoordinates());
	}
	intersects(p, geom) {
		return this.locate(p, geom) !== Location.EXTERIOR;
	}
	updateLocationInfo(loc) {
		if (loc === Location.INTERIOR) this._isIn = true;
		if (loc === Location.BOUNDARY) this._numBoundaries++;
	}
	computeLocation(p, geom) {
		if (geom instanceof Point) {
			this.updateLocationInfo(this.locateOnPoint(p, geom));
		}
		if (geom instanceof LineString) {
			this.updateLocationInfo(this.locateOnLineString(p, geom));
		} else if (geom instanceof Polygon) {
			this.updateLocationInfo(this.locateInPolygon(p, geom));
		} else if (geom instanceof MultiLineString) {
			var ml = geom;
			for (var i = 0; i < ml.getNumGeometries(); i++) {
				var l = ml.getGeometryN(i);
				this.updateLocationInfo(this.locateOnLineString(p, l));
			}
		} else if (geom instanceof MultiPolygon) {
			var mpoly = geom;
			for (var i = 0; i < mpoly.getNumGeometries(); i++) {
				var poly = mpoly.getGeometryN(i);
				this.updateLocationInfo(this.locateInPolygon(p, poly));
			}
		} else if (geom instanceof GeometryCollection) {
			var geomi = new GeometryCollectionIterator(geom);
			while (geomi.hasNext()) {
				var g2 = geomi.next();
				if (g2 !== geom) this.computeLocation(p, g2);
			}
		}
	}
	locateOnPoint(p, pt) {
		var ptCoord = pt.getCoordinate();
		if (ptCoord.equals2D(p)) return Location.INTERIOR;
		return Location.EXTERIOR;
	}
	locateOnLineString(p, l) {
		if (!l.getEnvelopeInternal().intersects(p)) return Location.EXTERIOR;
		var seq = l.getCoordinateSequence();
		if (!l.isClosed()) {
			if (p.equals(seq.getCoordinate(0)) || p.equals(seq.getCoordinate(seq.size() - 1))) {
				return Location.BOUNDARY;
			}
		}
		if (PointLocation.isOnLine(p, seq)) {
			return Location.INTERIOR;
		}
		return Location.EXTERIOR;
	}
	locateInPolygon(p, poly) {
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
	}
	locate(p, geom) {
		if (geom.isEmpty()) return Location.EXTERIOR;
		if (geom instanceof LineString) {
			return this.locateOnLineString(p, geom);
		} else if (geom instanceof Polygon) {
			return this.locateInPolygon(p, geom);
		}
		this._isIn = false;
		this._numBoundaries = 0;
		this.computeLocation(p, geom);
		if (this._boundaryRule.isInBoundary(this._numBoundaries)) return Location.BOUNDARY;
		if (this._numBoundaries > 0 || this._isIn) return Location.INTERIOR;
		return Location.EXTERIOR;
	}
	getClass() {
		return PointLocator;
	}
	get interfaces_() {
		return [];
	}
}
PointLocator.constructor_ = function () {
	this._boundaryRule = BoundaryNodeRule.OGC_SFS_BOUNDARY_RULE;
	this._isIn = null;
	this._numBoundaries = null;
	if (arguments.length === 0) {} else if (arguments.length === 1) {
		let boundaryRule = arguments[0];
		if (boundaryRule === null) throw new IllegalArgumentException("Rule must be non-null");
		this._boundaryRule = boundaryRule;
	}
};
