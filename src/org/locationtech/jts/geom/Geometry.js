import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException';
import GeometryComponentFilter from './GeometryComponentFilter';
import Comparable from '../../../../java/lang/Comparable';
import Cloneable from '../../../../java/lang/Cloneable';
import Serializable from '../../../../java/io/Serializable';
import Envelope from './Envelope';
export default class Geometry {
	constructor() {
		Geometry.constructor_.apply(this, arguments);
	}
	isGeometryCollection() {
		return this.getTypeCode() === Geometry.TYPECODE_GEOMETRYCOLLECTION;
	}
	getFactory() {
		return this._factory;
	}
	getGeometryN(n) {
		return this;
	}
	getArea() {
		return 0.0;
	}
	isRectangle() {
		return false;
	}
	equals() {
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
	equalsExact(other) {
		return this === other || this.equalsExact(other, 0);
	}
	geometryChanged() {
		this.apply(Geometry.geometryChangedFilter);
	}
	geometryChangedAction() {
		this._envelope = null;
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
	compareTo() {
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
	}
	getUserData() {
		return this._userData;
	}
	getSRID() {
		return this._SRID;
	}
	getEnvelope() {
		return this.getFactory().toGeometry(this.getEnvelopeInternal());
	}
	checkNotGeometryCollection(g) {
		if (g.getTypeCode() === Geometry.TYPECODE_GEOMETRYCOLLECTION) {
			throw new IllegalArgumentException("This method does not support GeometryCollection arguments");
		}
	}
	equal(a, b, tolerance) {
		if (tolerance === 0) {
			return a.equals(b);
		}
		return a.distance(b) <= tolerance;
	}
	norm() {
		var copy = this.copy();
		copy.normalize();
		return copy;
	}
	getPrecisionModel() {
		return this._factory.getPrecisionModel();
	}
	getEnvelopeInternal() {
		if (this._envelope === null) {
			this._envelope = this.computeEnvelopeInternal();
		}
		return new Envelope(this._envelope);
	}
	setSRID(SRID) {
		this._SRID = SRID;
	}
	setUserData(userData) {
		this._userData = userData;
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
	hashCode() {
		return this.getEnvelopeInternal().hashCode();
	}
	isGeometryCollectionOrDerived() {
		if (this.getTypeCode() === Geometry.TYPECODE_GEOMETRYCOLLECTION || this.getTypeCode() === Geometry.TYPECODE_MULTIPOINT || this.getTypeCode() === Geometry.TYPECODE_MULTILINESTRING || this.getTypeCode() === Geometry.TYPECODE_MULTIPOLYGON) {
			return true;
		}
		return false;
	}
	get interfaces_() {
		return [Cloneable, Comparable, Serializable];
	}
	getClass() {
		return Geometry;
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
};
Geometry.constructor_ = function (factory) {
	if (!factory)
		return;
	this._envelope = null;
	this._userData = null;
	this._factory = factory;
	this._SRID = factory.getSRID();
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
	get interfaces_() {
		return [GeometryComponentFilter];
	},
	filter(geom) {
		geom.geometryChangedAction();
	}
};
