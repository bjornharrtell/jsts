import Comparable from '../../../../java/lang/Comparable';
import Cloneable from '../../../../java/lang/Cloneable';
import Serializable from '../../../../java/io/Serializable';
import Envelope from './Envelope';
import Assert from '../util/Assert';
export default class Geometry {
	constructor(...args) {
		(() => {
			this.envelope = null;
			this.factory = null;
			this.SRID = null;
			this.userData = null;
		})();
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [factory] = args;
						this.factory = factory;
						this.SRID = factory.getSRID();
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [Cloneable, Comparable, Serializable];
	}
	static hasNonEmptyElements(geometries) {
		for (var i = 0; i < geometries.length; i++) {
			if (!geometries[i].isEmpty()) {
				return true;
			}
		}
		return false;
	}
	static hasNullElements(array) {
		for (var i = 0; i < array.length; i++) {
			if (array[i] === null) {
				return true;
			}
		}
		return false;
	}
	isGeometryCollection() {
		return this.getSortIndex() === Geometry.SORTINDEX_GEOMETRYCOLLECTION;
	}
	getFactory() {
		return this.factory;
	}
	getGeometryN(n) {
		return this;
	}
	getArea() {
		return 0.0;
	}
	union(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 0:
					return ((...args) => {
						let [] = args;
						return UnaryUnionOp.union(this);
					})(...args);
				case 1:
					return ((...args) => {
						let [other] = args;
						if (this.isEmpty() || other.isEmpty()) {
							if (this.isEmpty() && other.isEmpty()) return OverlayOp.createEmptyResult(OverlayOp.UNION, this, other, this.factory);
							if (this.isEmpty()) return other.copy();
							if (other.isEmpty()) return this.copy();
						}
						this.checkNotGeometryCollection(this);
						this.checkNotGeometryCollection(other);
						return SnapIfNeededOverlayOp.overlayOp(this, other, OverlayOp.UNION);
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	isValid() {
		return IsValidOp.isValid(this);
	}
	isRectangle() {
		return false;
	}
	equals(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					if (args[0] instanceof Geometry) {
						return ((...args) => {
							let [g] = args;
							if (g === null) return false;
							return this.equalsTopo(g);
						})(...args);
					} else if (args[0] instanceof Object) {
						return ((...args) => {
							let [o] = args;
							if (!(o instanceof Geometry)) return false;
							var g = o;
							return this.equalsExact(g);
						})(...args);
					}
			}
		};
		return overloads.apply(this, args);
	}
	equalsExact(other) {
		return this === other || this.equalsExact(other, 0);
	}
	intersection(other) {
		if (this.isEmpty() || other.isEmpty()) return OverlayOp.createEmptyResult(OverlayOp.INTERSECTION, this, other, this.factory);
		if (this.isGeometryCollection()) {
			var g2 = other;
			return GeometryCollectionMapper.map(this, new (class {
				map(g) {
					return g.intersection(g2);
				}
			})());
		}
		this.checkNotGeometryCollection(this);
		this.checkNotGeometryCollection(other);
		return SnapIfNeededOverlayOp.overlayOp(this, other, OverlayOp.INTERSECTION);
	}
	covers(g) {
		if (!this.getEnvelopeInternal().covers(g.getEnvelopeInternal())) return false;
		if (this.isRectangle()) {
			return true;
		}
		return this.relate(g).isCovers();
	}
	intersects(g) {
		if (!this.getEnvelopeInternal().intersects(g.getEnvelopeInternal())) return false;
		if (this.isRectangle()) {
			return RectangleIntersects.intersects(this, g);
		}
		if (g.isRectangle()) {
			return RectangleIntersects.intersects(g, this);
		}
		return this.relate(g).isIntersects();
	}
	touches(g) {
		if (!this.getEnvelopeInternal().intersects(g.getEnvelopeInternal())) return false;
		return this.relate(g).isTouches(this.getDimension(), g.getDimension());
	}
	geometryChanged() {
		this.apply(Geometry.geometryChangedFilter);
	}
	within(g) {
		return g.contains(this);
	}
	geometryChangedAction() {
		this.envelope = null;
	}
	buffer(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [distance] = args;
						return BufferOp.bufferOp(this, distance);
					})(...args);
				case 2:
					return ((...args) => {
						let [distance, quadrantSegments] = args;
						return BufferOp.bufferOp(this, distance, quadrantSegments);
					})(...args);
				case 3:
					return ((...args) => {
						let [distance, quadrantSegments, endCapStyle] = args;
						return BufferOp.bufferOp(this, distance, quadrantSegments, endCapStyle);
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	equalsNorm(g) {
		if (g === null) return false;
		return this.norm().equalsExact(g.norm());
	}
	getLength() {
		return 0.0;
	}
	getNumGeometries() {
		return 1;
	}
	compareTo(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
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
					})(...args);
				case 2:
					return ((...args) => {
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
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	convexHull() {
		return new ConvexHull(this).getConvexHull();
	}
	equalsTopo(g) {
		if (!this.getEnvelopeInternal().equals(g.getEnvelopeInternal())) return false;
		return this.relate(g).isEquals(this.getDimension(), g.getDimension());
	}
	coveredBy(g) {
		return g.covers(this);
	}
	getUserData() {
		return this.userData;
	}
	getSRID() {
		return this.SRID;
	}
	getEnvelope() {
		return this.getFactory().toGeometry(this.getEnvelopeInternal());
	}
	checkNotGeometryCollection(g) {
		if (this.getSortIndex() === Geometry.SORTINDEX_GEOMETRYCOLLECTION) {
			throw new IllegalArgumentException("This method does not support GeometryCollection arguments");
		}
	}
	equal(a, b, tolerance) {
		if (tolerance === 0) {
			return a.equals(b);
		}
		return a.distance(b) <= tolerance;
	}
	relate(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [g] = args;
						this.checkNotGeometryCollection(this);
						this.checkNotGeometryCollection(g);
						return RelateOp.relate(this, g);
					})(...args);
				case 2:
					return ((...args) => {
						let [g, intersectionPattern] = args;
						return this.relate(g).matches(intersectionPattern);
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	overlaps(g) {
		if (!this.getEnvelopeInternal().intersects(g.getEnvelopeInternal())) return false;
		return this.relate(g).isOverlaps(this.getDimension(), g.getDimension());
	}
	norm() {
		var copy = this.copy();
		copy.normalize();
		return copy;
	}
	getPrecisionModel() {
		return this.factory.getPrecisionModel();
	}
	getCentroid() {
		if (this.isEmpty()) return this.factory.createPoint();
		var centPt = Centroid.getCentroid(this);
		return this.createPointFromInternalCoord(centPt, this);
	}
	getEnvelopeInternal() {
		if (this.envelope === null) {
			this.envelope = this.computeEnvelopeInternal();
		}
		return new Envelope(this.envelope);
	}
	isEquivalentClass(other) {
		return this.name === other.getClass().getName();
	}
	clone() {
		try {
			var clone = super.clone();
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
	}
	setSRID(SRID) {
		this.SRID = SRID;
	}
	getInteriorPoint() {
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
	}
	symDifference(other) {
		if (this.isEmpty() || other.isEmpty()) {
			if (this.isEmpty() && other.isEmpty()) return OverlayOp.createEmptyResult(OverlayOp.SYMDIFFERENCE, this, other, this.factory);
			if (this.isEmpty()) return other.copy();
			if (other.isEmpty()) return this.copy();
		}
		this.checkNotGeometryCollection(this);
		this.checkNotGeometryCollection(other);
		return SnapIfNeededOverlayOp.overlayOp(this, other, OverlayOp.SYMDIFFERENCE);
	}
	setUserData(userData) {
		this.userData = userData;
	}
	toString() {
		return this.toText();
	}
	createPointFromInternalCoord(coord, exemplar) {
		exemplar.getPrecisionModel().makePrecise(coord);
		return exemplar.getFactory().createPoint(coord);
	}
	disjoint(g) {
		return !this.intersects(g);
	}
	toText() {
		var writer = new WKTWriter();
		return writer.write(this);
	}
	crosses(g) {
		if (!this.getEnvelopeInternal().intersects(g.getEnvelopeInternal())) return false;
		return this.relate(g).isCrosses(this.getDimension(), g.getDimension());
	}
	contains(g) {
		if (!this.getEnvelopeInternal().contains(g.getEnvelopeInternal())) return false;
		if (this.isRectangle()) {
			return RectangleContains.contains(this, g);
		}
		return this.relate(g).isContains();
	}
	difference(other) {
		if (this.isEmpty()) return OverlayOp.createEmptyResult(OverlayOp.DIFFERENCE, this, other, this.factory);
		if (other.isEmpty()) return this.copy();
		this.checkNotGeometryCollection(this);
		this.checkNotGeometryCollection(other);
		return SnapIfNeededOverlayOp.overlayOp(this, other, OverlayOp.DIFFERENCE);
	}
	isSimple() {
		var op = new IsSimpleOp(this);
		return op.isSimple();
	}
	compare(a, b) {
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
	}
	isWithinDistance(geom, distance) {
		var envDist = this.getEnvelopeInternal().distance(geom.getEnvelopeInternal());
		if (envDist > distance) return false;
		return DistanceOp.isWithinDistance(this, geom, distance);
	}
	distance(g) {
		return DistanceOp.distance(this, g);
	}
	hashCode() {
		return this.getEnvelopeInternal().hashCode();
	}
	isGeometryCollectionOrDerived() {
		if (this.getSortIndex() === Geometry.SORTINDEX_GEOMETRYCOLLECTION || this.getSortIndex() === Geometry.SORTINDEX_MULTIPOINT || this.getSortIndex() === Geometry.SORTINDEX_MULTILINESTRING || this.getSortIndex() === Geometry.SORTINDEX_MULTIPOLYGON) {
			return true;
		}
		return false;
	}
	getClass() {
		return Geometry;
	}
}
Geometry.serialVersionUID = 8763622679187376702;
Geometry.SORTINDEX_POINT = 0;
Geometry.SORTINDEX_MULTIPOINT = 1;
Geometry.SORTINDEX_LINESTRING = 2;
Geometry.SORTINDEX_LINEARRING = 3;
Geometry.SORTINDEX_MULTILINESTRING = 4;
Geometry.SORTINDEX_POLYGON = 5;
Geometry.SORTINDEX_MULTIPOLYGON = 6;
Geometry.SORTINDEX_GEOMETRYCOLLECTION = 7;
Geometry.geometryChangedFilter = new (class {
	filter(geom) {
		geom.geometryChangedAction();
	}
})();
