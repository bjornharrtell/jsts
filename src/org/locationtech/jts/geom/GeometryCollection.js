import TreeSet from '../../../../java/util/TreeSet';
import Geometry from './Geometry';
import Arrays from '../../../../java/util/Arrays';
import CoordinateFilter from './CoordinateFilter';
import hasInterface from '../../../../hasInterface';
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException';
import extend from '../../../../extend';
import GeometryComponentFilter from './GeometryComponentFilter';
import Dimension from './Dimension';
import GeometryFilter from './GeometryFilter';
import CoordinateSequenceFilter from './CoordinateSequenceFilter';
import Envelope from './Envelope';
import Assert from '../util/Assert';
import inherits from '../../../../inherits';
export default function GeometryCollection() {
	this._geometries = null;
	let geometries = arguments[0], factory = arguments[1];
	Geometry.call(this, factory);
	if (geometries === null) {
		geometries = [];
	}
	if (Geometry.hasNullElements(geometries)) {
		throw new IllegalArgumentException("geometries must not contain null elements");
	}
	this._geometries = geometries;
}
inherits(GeometryCollection, Geometry);
extend(GeometryCollection.prototype, {
	computeEnvelopeInternal: function () {
		var envelope = new Envelope();
		for (var i = 0; i < this._geometries.length; i++) {
			envelope.expandToInclude(this._geometries[i].getEnvelopeInternal());
		}
		return envelope;
	},
	getGeometryN: function (n) {
		return this._geometries[n];
	},
	getCoordinates: function () {
		var coordinates = new Array(this.getNumPoints()).fill(null);
		var k = -1;
		for (var i = 0; i < this._geometries.length; i++) {
			var childCoordinates = this._geometries[i].getCoordinates();
			for (var j = 0; j < childCoordinates.length; j++) {
				k++;
				coordinates[k] = childCoordinates[j];
			}
		}
		return coordinates;
	},
	getArea: function () {
		var area = 0.0;
		for (var i = 0; i < this._geometries.length; i++) {
			area += this._geometries[i].getArea();
		}
		return area;
	},
	equalsExact: function () {
		if (arguments.length === 2 && (typeof arguments[1] === "number" && arguments[0] instanceof Geometry)) {
			let other = arguments[0], tolerance = arguments[1];
			if (!this.isEquivalentClass(other)) {
				return false;
			}
			var otherCollection = other;
			if (this._geometries.length !== otherCollection._geometries.length) {
				return false;
			}
			for (var i = 0; i < this._geometries.length; i++) {
				if (!this._geometries[i].equalsExact(otherCollection._geometries[i], tolerance)) {
					return false;
				}
			}
			return true;
		} else return Geometry.prototype.equalsExact.apply(this, arguments);
	},
	normalize: function () {
		for (var i = 0; i < this._geometries.length; i++) {
			this._geometries[i].normalize();
		}
		Arrays.sort(this._geometries);
	},
	getCoordinate: function () {
		if (this.isEmpty()) return null;
		return this._geometries[0].getCoordinate();
	},
	getBoundaryDimension: function () {
		var dimension = Dimension.FALSE;
		for (var i = 0; i < this._geometries.length; i++) {
			dimension = Math.max(dimension, this._geometries[i].getBoundaryDimension());
		}
		return dimension;
	},
	getTypeCode: function () {
		return Geometry.TYPECODE_GEOMETRYCOLLECTION;
	},
	getDimension: function () {
		var dimension = Dimension.FALSE;
		for (var i = 0; i < this._geometries.length; i++) {
			dimension = Math.max(dimension, this._geometries[i].getDimension());
		}
		return dimension;
	},
	getLength: function () {
		var sum = 0.0;
		for (var i = 0; i < this._geometries.length; i++) {
			sum += this._geometries[i].getLength();
		}
		return sum;
	},
	getNumPoints: function () {
		var numPoints = 0;
		for (var i = 0; i < this._geometries.length; i++) {
			numPoints += this._geometries[i].getNumPoints();
		}
		return numPoints;
	},
	getNumGeometries: function () {
		return this._geometries.length;
	},
	reverse: function () {
		var n = this._geometries.length;
		var revGeoms = new Array(n).fill(null);
		for (var i = 0; i < this._geometries.length; i++) {
			revGeoms[i] = this._geometries[i].reverse();
		}
		return this.getFactory().createGeometryCollection(revGeoms);
	},
	compareToSameClass: function () {
		if (arguments.length === 1) {
			let o = arguments[0];
			var theseElements = new TreeSet(Arrays.asList(this._geometries));
			var otherElements = new TreeSet(Arrays.asList(o._geometries));
			return this.compare(theseElements, otherElements);
		} else if (arguments.length === 2) {
			let o = arguments[0], comp = arguments[1];
			var gc = o;
			var n1 = this.getNumGeometries();
			var n2 = gc.getNumGeometries();
			var i = 0;
			while (i < n1 && i < n2) {
				var thisGeom = this.getGeometryN(i);
				var otherGeom = gc.getGeometryN(i);
				var holeComp = thisGeom.compareToSameClass(otherGeom, comp);
				if (holeComp !== 0) return holeComp;
				i++;
			}
			if (i < n1) return 1;
			if (i < n2) return -1;
			return 0;
		}
	},
	apply: function () {
		if (hasInterface(arguments[0], CoordinateFilter)) {
			let filter = arguments[0];
			for (var i = 0; i < this._geometries.length; i++) {
				this._geometries[i].apply(filter);
			}
		} else if (hasInterface(arguments[0], CoordinateSequenceFilter)) {
			let filter = arguments[0];
			if (this._geometries.length === 0) return null;
			for (var i = 0; i < this._geometries.length; i++) {
				this._geometries[i].apply(filter);
				if (filter.isDone()) {
					break;
				}
			}
			if (filter.isGeometryChanged()) this.geometryChanged();
		} else if (hasInterface(arguments[0], GeometryFilter)) {
			let filter = arguments[0];
			filter.filter(this);
			for (var i = 0; i < this._geometries.length; i++) {
				this._geometries[i].apply(filter);
			}
		} else if (hasInterface(arguments[0], GeometryComponentFilter)) {
			let filter = arguments[0];
			filter.filter(this);
			for (var i = 0; i < this._geometries.length; i++) {
				this._geometries[i].apply(filter);
			}
		}
	},
	getBoundary: function () {
		this.checkNotGeometryCollection(this);
		Assert.shouldNeverReachHere();
		return null;
	},
	getGeometryType: function () {
		return Geometry.TYPENAME_GEOMETRYCOLLECTION;
	},
	copy: function () {
		var geometries = new Array(this._geometries.length).fill(null);
		for (var i = 0; i < geometries.length; i++) {
			geometries[i] = this._geometries[i].copy();
		}
		return new GeometryCollection(geometries, this._factory);
	},
	isEmpty: function () {
		for (var i = 0; i < this._geometries.length; i++) {
			if (!this._geometries[i].isEmpty()) {
				return false;
			}
		}
		return true;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return GeometryCollection;
	}
});
GeometryCollection.serialVersionUID = -5694727726395021467;
