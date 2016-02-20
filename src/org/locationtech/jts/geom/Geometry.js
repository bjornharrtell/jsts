import Comparable from '../../../../java/lang/Comparable';
import Cloneable from '../../../../java/lang/Cloneable';
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException';
import Serializable from '../../../../java/io/Serializable';
import Envelope from './Envelope';
import Assert from '../util/Assert';
import extend from '../../../../extend';
import inherits from '../../../../inherits';
export default function Geometry() {
	this.envelope = null;
	this.factory = null;
	this.SRID = null;
	this.userData = null;
	if (arguments.length === 1) {
		let factory = arguments[0];
		this.factory = factory;
		this.SRID = factory.getSRID();
	}
}
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
	isRectangle: function () {
		return false;
	},
	equals: function () {
		if (arguments.length === 1) {
			if (arguments[0] instanceof Geometry) {
				let g = arguments[0];
				if (g === null) return false;
				return this.equalsTopo(g);
			} else if (arguments[0] instanceof Object) {
				let o = arguments[0];
				if (!(o instanceof Geometry)) return false;
				var g = o;
				return this.equalsExact(g);
			}
		}
	},
	equalsExact: function (other) {
		return this === other || this.equalsExact(other, 0);
	},
	covers: function (g) {
		if (!this.getEnvelopeInternal().covers(g.getEnvelopeInternal())) return false;
		if (this.isRectangle()) {
			return true;
		}
		return this.relate(g).isCovers();
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
	compareTo: function () {
		if (arguments.length === 1) {
			let o = arguments[0];
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
		} else if (arguments.length === 2) {
			let o = arguments[0], comp = arguments[1];
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
	relate: function () {
		if (arguments.length === 1) {
			let g = arguments[0];
			this.checkNotGeometryCollection(this);
			this.checkNotGeometryCollection(g);
			return RelateOp.relate(this, g);
		} else if (arguments.length === 2) {
			let g = arguments[0], intersectionPattern = arguments[1];
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
	getEnvelopeInternal: function () {
		if (this.envelope === null) {
			this.envelope = this.computeEnvelopeInternal();
		}
		return new Envelope(this.envelope);
	},
	setSRID: function (SRID) {
		this.SRID = SRID;
	},
	setUserData: function (userData) {
		this.userData = userData;
	},
	toString: function () {
		return this.toText();
	},
	disjoint: function (g) {
		return !this.intersects(g);
	},
	crosses: function (g) {
		if (!this.getEnvelopeInternal().intersects(g.getEnvelopeInternal())) return false;
		return this.relate(g).isCrosses(this.getDimension(), g.getDimension());
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
	hashCode: function () {
		return this.getEnvelopeInternal().hashCode();
	},
	isGeometryCollectionOrDerived: function () {
		if (this.getSortIndex() === Geometry.SORTINDEX_GEOMETRYCOLLECTION || this.getSortIndex() === Geometry.SORTINDEX_MULTIPOINT || this.getSortIndex() === Geometry.SORTINDEX_MULTILINESTRING || this.getSortIndex() === Geometry.SORTINDEX_MULTIPOLYGON) {
			return true;
		}
		return false;
	},
	interfaces_: function () {
		return [Cloneable, Comparable, Serializable];
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
