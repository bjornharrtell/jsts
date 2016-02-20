import Comparable from '../../../../java/lang/Comparable';
import Cloneable from '../../../../java/lang/Cloneable';
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException';
import Serializable from '../../../../java/io/Serializable';
import Envelope from './Envelope';
import Assert from '../util/Assert';
import extend from '../../../../extend';
import inherits from '../../../../inherits';
export default function Geometry(...args) {
	this.envelope = null;
	this.factory = null;
	this.SRID = null;
	this.userData = null;
	if (args.length === 1) {
		let [factory] = args;
		this.factory = factory;
		this.SRID = factory.getSRID();
	}
}
inherits(Geometry, Serializable);
inherits(Geometry, Comparable);
inherits(Geometry, Cloneable);
extend(Geometry.prototype, {
	isGeometryCollection: function () {
		return this.getSortIndex() === Geometry.SORTINDEX_GEOMETRYCOLLECTION;
	},
	getFactory: function () {
		return this.factory;
	},
	getGeometryN: function (n) {
		return this;
	},
	getArea: function () {
		return 0.0;
	},
	union: function (...args) {
		if (args.length === 0) {
			let [] = args;
			return UnaryUnionOp.union(this);
		} else if (args.length === 1) {
			let [other] = args;
			if (this.isEmpty() || other.isEmpty()) {
				if (this.isEmpty() && other.isEmpty()) return OverlayOp.createEmptyResult(OverlayOp.UNION, this, other, this.factory);
				if (this.isEmpty()) return other.copy();
				if (other.isEmpty()) return this.copy();
			}
			this.checkNotGeometryCollection(this);
			this.checkNotGeometryCollection(other);
			return SnapIfNeededOverlayOp.overlayOp(this, other, OverlayOp.UNION);
		}
	},
	isValid: function () {
		return IsValidOp.isValid(this);
	},
	isRectangle: function () {
		return false;
	},
	equals: function (...args) {
		if (args.length === 1) {
			if (args[0] instanceof Geometry) {
				let [g] = args;
				if (g === null) return false;
				return this.equalsTopo(g);
			} else if (args[0] instanceof Object) {
				let [o] = args;
				if (!(o instanceof Geometry)) return false;
				var g = o;
				return this.equalsExact(g);
			}
		}
	},
	equalsExact: function (other) {
		return this === other || this.equalsExact(other, 0);
	},
	intersection: function (other) {
		if (this.isEmpty() || other.isEmpty()) return OverlayOp.createEmptyResult(OverlayOp.INTERSECTION, this, other, this.factory);
		if (this.isGeometryCollection()) {
			var g2 = other;
			return GeometryCollectionMapper.map(this, {
				interfaces_: function () {
					return [MapOp];
				},
				map: function (g) {
					return g.intersection(g2);
				}
			});
		}
		this.checkNotGeometryCollection(this);
		this.checkNotGeometryCollection(other);
		return SnapIfNeededOverlayOp.overlayOp(this, other, OverlayOp.INTERSECTION);
	},
	covers: function (g) {
		if (!this.getEnvelopeInternal().covers(g.getEnvelopeInternal())) return false;
		if (this.isRectangle()) {
			return true;
		}
		return this.relate(g).isCovers();
	},
	intersects: function (g) {
		if (!this.getEnvelopeInternal().intersects(g.getEnvelopeInternal())) return false;
		if (this.isRectangle()) {
			return RectangleIntersects.intersects(this, g);
		}
		if (g.isRectangle()) {
			return RectangleIntersects.intersects(g, this);
		}
		return this.relate(g).isIntersects();
	},
	touches: function (g) {
		if (!this.getEnvelopeInternal().intersects(g.getEnvelopeInternal())) return false;
		return this.relate(g).isTouches(this.getDimension(), g.getDimension());
	},
	geometryChanged: function () {
		this.apply(Geometry.geometryChangedFilter);
	},
	within: function (g) {
		return g.contains(this);
	},
	geometryChangedAction: function () {
		this.envelope = null;
	},
	buffer: function (...args) {
		if (args.length === 1) {
			let [distance] = args;
			return BufferOp.bufferOp(this, distance);
		} else if (args.length === 2) {
			let [distance, quadrantSegments] = args;
			return BufferOp.bufferOp(this, distance, quadrantSegments);
		} else if (args.length === 3) {
			let [distance, quadrantSegments, endCapStyle] = args;
			return BufferOp.bufferOp(this, distance, quadrantSegments, endCapStyle);
		}
	},
	equalsNorm: function (g) {
		if (g === null) return false;
		return this.norm().equalsExact(g.norm());
	},
	getLength: function () {
		return 0.0;
	},
	getNumGeometries: function () {
		return 1;
	},
	compareTo: function (...args) {
		if (args.length === 1) {
			let [o] = args;
			var other = o;
			if (this.getSortIndex() !== other.getSortIndex()) {
				return this.getSortIndex() - other.getSortIndex();
			}
			if (this.isEmpty() && other.isEmpty()) {
				return 0;
			}
			if (this.isEmpty()) {
				return -1;
			}
			if (other.isEmpty()) {
				return 1;
			}
			return this.compareToSameClass(o);
		} else if (args.length === 2) {
			let [o, comp] = args;
			var other = o;
			if (this.getSortIndex() !== other.getSortIndex()) {
				return this.getSortIndex() - other.getSortIndex();
			}
			if (this.isEmpty() && other.isEmpty()) {
				return 0;
			}
			if (this.isEmpty()) {
				return -1;
			}
			if (other.isEmpty()) {
				return 1;
			}
			return this.compareToSameClass(o, comp);
		}
	},
	convexHull: function () {
		return new ConvexHull(this).getConvexHull();
	},
	equalsTopo: function (g) {
		if (!this.getEnvelopeInternal().equals(g.getEnvelopeInternal())) return false;
		return this.relate(g).isEquals(this.getDimension(), g.getDimension());
	},
	coveredBy: function (g) {
		return g.covers(this);
	},
	getUserData: function () {
		return this.userData;
	},
	getSRID: function () {
		return this.SRID;
	},
	getEnvelope: function () {
		return this.getFactory().toGeometry(this.getEnvelopeInternal());
	},
	checkNotGeometryCollection: function (g) {
		if (this.getSortIndex() === Geometry.SORTINDEX_GEOMETRYCOLLECTION) {
			throw new IllegalArgumentException("This method does not support GeometryCollection arguments");
		}
	},
	equal: function (a, b, tolerance) {
		if (tolerance === 0) {
			return a.equals(b);
		}
		return a.distance(b) <= tolerance;
	},
	relate: function (...args) {
		if (args.length === 1) {
			let [g] = args;
			this.checkNotGeometryCollection(this);
			this.checkNotGeometryCollection(g);
			return RelateOp.relate(this, g);
		} else if (args.length === 2) {
			let [g, intersectionPattern] = args;
			return this.relate(g).matches(intersectionPattern);
		}
	},
	overlaps: function (g) {
		if (!this.getEnvelopeInternal().intersects(g.getEnvelopeInternal())) return false;
		return this.relate(g).isOverlaps(this.getDimension(), g.getDimension());
	},
	norm: function () {
		var copy = this.copy();
		copy.normalize();
		return copy;
	},
	getPrecisionModel: function () {
		return this.factory.getPrecisionModel();
	},
	getCentroid: function () {
		if (this.isEmpty()) return this.factory.createPoint();
		var centPt = Centroid.getCentroid(this);
		return this.createPointFromInternalCoord(centPt, this);
	},
	getEnvelopeInternal: function () {
		if (this.envelope === null) {
			this.envelope = this.computeEnvelopeInternal();
		}
		return new Envelope(this.envelope);
	},
	isEquivalentClass: function (other) {
		return this.name === other.getClass().getName();
	},
	clone: function () {
		try {
			var clone = null;
			if (clone.envelope !== null) {
				clone.envelope = new Envelope(clone.envelope);
			}
			return clone;
		} catch (e) {
			if (e instanceof CloneNotSupportedException) {
				Assert.shouldNeverReachHere();
				return null;
			} else throw e;
		} finally {}
	},
	setSRID: function (SRID) {
		this.SRID = SRID;
	},
	getInteriorPoint: function () {
		if (this.isEmpty()) return this.factory.createPoint();
		var interiorPt = null;
		var dim = this.getDimension();
		if (dim === 0) {
			var intPt = new InteriorPointPoint(this);
			interiorPt = intPt.getInteriorPoint();
		} else if (dim === 1) {
			var intPt = new InteriorPointLine(this);
			interiorPt = intPt.getInteriorPoint();
		} else {
			var intPt = new InteriorPointArea(this);
			interiorPt = intPt.getInteriorPoint();
		}
		return this.createPointFromInternalCoord(interiorPt, this);
	},
	symDifference: function (other) {
		if (this.isEmpty() || other.isEmpty()) {
			if (this.isEmpty() && other.isEmpty()) return OverlayOp.createEmptyResult(OverlayOp.SYMDIFFERENCE, this, other, this.factory);
			if (this.isEmpty()) return other.copy();
			if (other.isEmpty()) return this.copy();
		}
		this.checkNotGeometryCollection(this);
		this.checkNotGeometryCollection(other);
		return SnapIfNeededOverlayOp.overlayOp(this, other, OverlayOp.SYMDIFFERENCE);
	},
	setUserData: function (userData) {
		this.userData = userData;
	},
	toString: function () {
		return this.toText();
	},
	createPointFromInternalCoord: function (coord, exemplar) {
		exemplar.getPrecisionModel().makePrecise(coord);
		return exemplar.getFactory().createPoint(coord);
	},
	disjoint: function (g) {
		return !this.intersects(g);
	},
	toText: function () {
		var writer = new WKTWriter();
		return writer.write(this);
	},
	crosses: function (g) {
		if (!this.getEnvelopeInternal().intersects(g.getEnvelopeInternal())) return false;
		return this.relate(g).isCrosses(this.getDimension(), g.getDimension());
	},
	contains: function (g) {
		if (!this.getEnvelopeInternal().contains(g.getEnvelopeInternal())) return false;
		if (this.isRectangle()) {
			return RectangleContains.contains(this, g);
		}
		return this.relate(g).isContains();
	},
	difference: function (other) {
		if (this.isEmpty()) return OverlayOp.createEmptyResult(OverlayOp.DIFFERENCE, this, other, this.factory);
		if (other.isEmpty()) return this.copy();
		this.checkNotGeometryCollection(this);
		this.checkNotGeometryCollection(other);
		return SnapIfNeededOverlayOp.overlayOp(this, other, OverlayOp.DIFFERENCE);
	},
	isSimple: function () {
		var op = new IsSimpleOp(this);
		return op.isSimple();
	},
	compare: function (a, b) {
		var i = a.iterator();
		var j = b.iterator();
		while (i.hasNext() && j.hasNext()) {
			var aElement = i.next();
			var bElement = j.next();
			var comparison = aElement.compareTo(bElement);
			if (comparison !== 0) {
				return comparison;
			}
		}
		if (i.hasNext()) {
			return 1;
		}
		if (j.hasNext()) {
			return -1;
		}
		return 0;
	},
	isWithinDistance: function (geom, distance) {
		var envDist = this.getEnvelopeInternal().distance(geom.getEnvelopeInternal());
		if (envDist > distance) return false;
		return DistanceOp.isWithinDistance(this, geom, distance);
	},
	distance: function (g) {
		return DistanceOp.distance(this, g);
	},
	hashCode: function () {
		return this.getEnvelopeInternal().hashCode();
	},
	isGeometryCollectionOrDerived: function () {
		if (this.getSortIndex() === Geometry.SORTINDEX_GEOMETRYCOLLECTION || this.getSortIndex() === Geometry.SORTINDEX_MULTIPOINT || this.getSortIndex() === Geometry.SORTINDEX_MULTILINESTRING || this.getSortIndex() === Geometry.SORTINDEX_MULTIPOLYGON) {
			return true;
		}
		return false;
	},
	getClass: function () {
		return Geometry;
	}
});
Geometry.hasNonEmptyElements = function (geometries) {
	for (var i = 0; i < geometries.length; i++) {
		if (!geometries[i].isEmpty()) {
			return true;
		}
	}
	return false;
};
Geometry.hasNullElements = function (array) {
	for (var i = 0; i < array.length; i++) {
		if (array[i] === null) {
			return true;
		}
	}
	return false;
};
Geometry.serialVersionUID = 8763622679187376702;
Geometry.SORTINDEX_POINT = 0;
Geometry.SORTINDEX_MULTIPOINT = 1;
Geometry.SORTINDEX_LINESTRING = 2;
Geometry.SORTINDEX_LINEARRING = 3;
Geometry.SORTINDEX_MULTILINESTRING = 4;
Geometry.SORTINDEX_POLYGON = 5;
Geometry.SORTINDEX_MULTIPOLYGON = 6;
Geometry.SORTINDEX_GEOMETRYCOLLECTION = 7;
Geometry.geometryChangedFilter = {
	interfaces_: function () {
		return [GeometryComponentFilter];
	},
	filter: function (geom) {
		geom.geometryChangedAction();
	}
};
