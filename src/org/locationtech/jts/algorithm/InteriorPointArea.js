import Geometry from '../geom/Geometry';
import Coordinate from '../geom/Coordinate';
import Polygon from '../geom/Polygon';
import Double from '../../../../java/lang/Double';
import GeometryCollection from '../geom/GeometryCollection';
export default class InteriorPointArea {
	constructor() {
		InteriorPointArea.constructor_.apply(this, arguments);
	}
	static centre(envelope) {
		return new Coordinate(InteriorPointArea.avg(envelope.getMinX(), envelope.getMaxX()), InteriorPointArea.avg(envelope.getMinY(), envelope.getMaxY()));
	}
	static avg(a, b) {
		return (a + b) / 2.0;
	}
	addPolygon(geometry) {
		if (geometry.isEmpty()) return null;
		var intPt = null;
		var width = null;
		var bisector = this.horizontalBisector(geometry);
		if (bisector.getLength() === 0.0) {
			width = 0;
			intPt = bisector.getCoordinate();
		} else {
			var intersections = bisector.intersection(geometry);
			var widestIntersection = this.widestGeometry(intersections);
			width = widestIntersection.getEnvelopeInternal().getWidth();
			intPt = InteriorPointArea.centre(widestIntersection.getEnvelopeInternal());
		}
		if (this._interiorPoint === null || width > this._maxWidth) {
			this._interiorPoint = intPt;
			this._maxWidth = width;
		}
	}
	getInteriorPoint() {
		return this._interiorPoint;
	}
	widestGeometry() {
		if (arguments[0] instanceof GeometryCollection) {
			let gc = arguments[0];
			if (gc.isEmpty()) {
				return gc;
			}
			var widestGeometry = gc.getGeometryN(0);
			for (var i = 1; i < gc.getNumGeometries(); i++) {
				if (gc.getGeometryN(i).getEnvelopeInternal().getWidth() > widestGeometry.getEnvelopeInternal().getWidth()) {
					widestGeometry = gc.getGeometryN(i);
				}
			}
			return widestGeometry;
		} else if (arguments[0] instanceof Geometry) {
			let geometry = arguments[0];
			if (!(geometry instanceof GeometryCollection)) {
				return geometry;
			}
			return this.widestGeometry(geometry);
		}
	}
	horizontalBisector(geometry) {
		var envelope = geometry.getEnvelopeInternal();
		var bisectY = SafeBisectorFinder.getBisectorY(geometry);
		return this._factory.createLineString([new Coordinate(envelope.getMinX(), bisectY), new Coordinate(envelope.getMaxX(), bisectY)]);
	}
	add(geom) {
		if (geom instanceof Polygon) {
			this.addPolygon(geom);
		} else if (geom instanceof GeometryCollection) {
			var gc = geom;
			for (var i = 0; i < gc.getNumGeometries(); i++) {
				this.add(gc.getGeometryN(i));
			}
		}
	}
	getClass() {
		return InteriorPointArea;
	}
	get interfaces_() {
		return [];
	}
}
class SafeBisectorFinder {
	constructor() {
		SafeBisectorFinder.constructor_.apply(this, arguments);
	}
	static getBisectorY(poly) {
		var finder = new SafeBisectorFinder(poly);
		return finder.getBisectorY();
	}
	updateInterval(y) {
		if (y <= this._centreY) {
			if (y > this._loY) this._loY = y;
		} else if (y > this._centreY) {
			if (y < this._hiY) {
				this._hiY = y;
			}
		}
	}
	getBisectorY() {
		this.process(this._poly.getExteriorRing());
		for (var i = 0; i < this._poly.getNumInteriorRing(); i++) {
			this.process(this._poly.getInteriorRingN(i));
		}
		var bisectY = InteriorPointArea.avg(this._hiY, this._loY);
		return bisectY;
	}
	process(line) {
		var seq = line.getCoordinateSequence();
		for (var i = 0; i < seq.size(); i++) {
			var y = seq.getY(i);
			this.updateInterval(y);
		}
	}
	getClass() {
		return SafeBisectorFinder;
	}
	get interfaces_() {
		return [];
	}
}
SafeBisectorFinder.constructor_ = function () {
	this._poly = null;
	this._centreY = null;
	this._hiY = Double.MAX_VALUE;
	this._loY = -Double.MAX_VALUE;
	let poly = arguments[0];
	this._poly = poly;
	this._hiY = poly.getEnvelopeInternal().getMaxY();
	this._loY = poly.getEnvelopeInternal().getMinY();
	this._centreY = InteriorPointArea.avg(this._loY, this._hiY);
};
InteriorPointArea.SafeBisectorFinder = SafeBisectorFinder;
InteriorPointArea.constructor_ = function () {
	this._factory = null;
	this._interiorPoint = null;
	this._maxWidth = 0.0;
	let g = arguments[0];
	this._factory = g.getFactory();
	this.add(g);
};
