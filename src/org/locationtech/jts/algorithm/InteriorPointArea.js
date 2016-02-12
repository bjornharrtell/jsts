import Geometry from '../geom/Geometry';
import Coordinate from '../geom/Coordinate';
import Polygon from '../geom/Polygon';
import Double from '../../../../java/lang/Double';
import GeometryCollection from '../geom/GeometryCollection';
export default class InteriorPointArea {
	constructor(...args) {
		this.factory = null;
		this.interiorPoint = null;
		this.maxWidth = 0.0;
		if (args.length === 1) {
			let [g] = args;
			this.factory = g.getFactory();
			this.add(g);
		}
	}
	get interfaces_() {
		return [];
	}
	static get SafeBisectorFinder() {
		return SafeBisectorFinder;
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
		var width = 0;
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
		if (this.interiorPoint === null || width > this.maxWidth) {
			this.interiorPoint = intPt;
			this.maxWidth = width;
		}
	}
	getInteriorPoint() {
		return this.interiorPoint;
	}
	widestGeometry(...args) {
		if (args.length === 1) {
			if (args[0] instanceof GeometryCollection) {
				let [gc] = args;
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
			} else if (args[0] instanceof Geometry) {
				let [geometry] = args;
				if (!(geometry instanceof GeometryCollection)) {
					return geometry;
				}
				return this.widestGeometry(geometry);
			}
		}
	}
	horizontalBisector(geometry) {
		var envelope = geometry.getEnvelopeInternal();
		var bisectY = SafeBisectorFinder.getBisectorY(geometry);
		return this.factory.createLineString([new Coordinate(envelope.getMinX(), bisectY), new Coordinate(envelope.getMaxX(), bisectY)]);
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
}
class SafeBisectorFinder {
	constructor(...args) {
		this.poly = null;
		this.centreY = null;
		this.hiY = Double.MAX_VALUE;
		this.loY = -Double.MAX_VALUE;
		if (args.length === 1) {
			let [poly] = args;
			this.poly = poly;
			this.hiY = poly.getEnvelopeInternal().getMaxY();
			this.loY = poly.getEnvelopeInternal().getMinY();
			this.centreY = SafeBisectorFinder.avg(this.loY, this.hiY);
		}
	}
	get interfaces_() {
		return [];
	}
	static getBisectorY(poly) {
		var finder = new SafeBisectorFinder(poly);
		return finder.getBisectorY();
	}
	updateInterval(y) {
		if (y <= this.centreY) {
			if (y > this.loY) this.loY = y;
		} else if (y > this.centreY) {
			if (y < this.hiY) {
				this.hiY = y;
			}
		}
	}
	getBisectorY() {
		this.process(this.poly.getExteriorRing());
		for (var i = 0; i < this.poly.getNumInteriorRing(); i++) {
			this.process(this.poly.getInteriorRingN(i));
		}
		var bisectY = SafeBisectorFinder.avg(this.hiY, this.loY);
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
}

