import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException';
import extend from '../../../../extend';
import GeometryComponentFilter from './GeometryComponentFilter';
import Comparable from '../../../../java/lang/Comparable';
import Cloneable from '../../../../java/lang/Cloneable';
import Serializable from '../../../../java/io/Serializable';
import Envelope from './Envelope';
import Assert from '../util/Assert';
export default function Geometry() {
	this._envelope = null;
	this._factory = null;
	this._SRID = null;
	this._userData = null;
	let factory = arguments[0];
	this._factory = factory;
	this._SRID = factory.getSRID();
}
extend(Geometry.prototype, {
	isGeometryCollection: function () {
		return this.getTypeCode() === Geometry.TYPECODE_GEOMETRYCOLLECTION;
	},
	getFactory: function () {
		return this._factory;
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
	},
	equalsExact: function (other) {
		return this === other || this.equalsExact(other, 0);
	},
	geometryChanged: function () {
		this.apply(Geometry.geometryChangedFilter);
	},
	geometryChangedAction: function () {
		this._envelope = null;
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
			if (this.getTypeCode() !== other.getTypeCode()) {
				return this.getTypeCode() - other.getTypeCode();
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
			if (this.getTypeCode() !== other.getTypeCode()) {
				return this.getTypeCode() - other.getTypeCode();
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
	getUserData: function () {
		return this._userData;
	},
	getSRID: function () {
		return this._SRID;
	},
	getEnvelope: function () {
		return this.getFactory().toGeometry(this.getEnvelopeInternal());
	},
	checkNotGeometryCollection: function (g) {
		if (g.getTypeCode() === Geometry.TYPECODE_GEOMETRYCOLLECTION) {
			throw new IllegalArgumentException("This method does not support GeometryCollection arguments");
		}
	},
	equal: function (a, b, tolerance) {
		if (tolerance === 0) {
			return a.equals(b);
		}
		return a.distance(b) <= tolerance;
	},
	norm: function () {
		var copy = this.copy();
		copy.normalize();
		return copy;
	},
	getPrecisionModel: function () {
		return this._factory.getPrecisionModel();
	},
	getEnvelopeInternal: function () {
		if (this._envelope === null) {
			this._envelope = this.computeEnvelopeInternal();
		}
		return new Envelope(this._envelope);
	},
	setSRID: function (SRID) {
		this._SRID = SRID;
	},
	setUserData: function (userData) {
		this._userData = userData;
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
		if (this.getTypeCode() === Geometry.TYPECODE_GEOMETRYCOLLECTION || this.getTypeCode() === Geometry.TYPECODE_MULTIPOINT || this.getTypeCode() === Geometry.TYPECODE_MULTILINESTRING || this.getTypeCode() === Geometry.TYPECODE_MULTIPOLYGON) {
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
Geometry.TYPECODE_POINT = 0;
Geometry.TYPECODE_MULTIPOINT = 1;
Geometry.TYPECODE_LINESTRING = 2;
Geometry.TYPECODE_LINEARRING = 3;
Geometry.TYPECODE_MULTILINESTRING = 4;
Geometry.TYPECODE_POLYGON = 5;
Geometry.TYPECODE_MULTIPOLYGON = 6;
Geometry.TYPECODE_GEOMETRYCOLLECTION = 7;
Geometry.TYPENAME_POINT = "Point";
Geometry.TYPENAME_MULTIPOINT = "MultiPoint";
Geometry.TYPENAME_LINESTRING = "LineString";
Geometry.TYPENAME_LINEARRING = "LinearRing";
Geometry.TYPENAME_MULTILINESTRING = "MultiLineString";
Geometry.TYPENAME_POLYGON = "Polygon";
Geometry.TYPENAME_MULTIPOLYGON = "MultiPolygon";
Geometry.TYPENAME_GEOMETRYCOLLECTION = "GeometryCollection";
Geometry.geometryChangedFilter = {
	interfaces_: function () {
		return [GeometryComponentFilter];
	},
	filter: function (geom) {
		geom.geometryChangedAction();
	}
};
