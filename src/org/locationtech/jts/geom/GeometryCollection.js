import TreeSet from '../../../../java/util/TreeSet';
import Geometry from './Geometry';
import Arrays from '../../../../java/util/Arrays';
import CoordinateFilter from './CoordinateFilter';
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException';
import GeometryComponentFilter from './GeometryComponentFilter';
import Dimension from './Dimension';
import GeometryFilter from './GeometryFilter';
import CoordinateSequenceFilter from './CoordinateSequenceFilter';
import Envelope from './Envelope';
import Assert from '../util/Assert';
export default class GeometryCollection extends Geometry {
	constructor(...args) {
		super();
		this.geometries = null;
		if (args.length === 2) {
			let [geometries, factory] = args;
			super(factory);
			if (geometries === null) {
				geometries = [];
			}
			if (GeometryCollection.hasNullElements(geometries)) {
				throw new IllegalArgumentException("geometries must not contain null elements");
			}
			this.geometries = geometries;
		}
	}
	get interfaces_() {
		return [];
	}
	computeEnvelopeInternal() {
		var envelope = new Envelope();
		for (var i = 0; i < this.geometries.length; i++) {
			envelope.expandToInclude(this.geometries[i].getEnvelopeInternal());
		}
		return envelope;
	}
	getGeometryN(n) {
		return this.geometries[n];
	}
	getSortIndex() {
		return Geometry.SORTINDEX_GEOMETRYCOLLECTION;
	}
	getCoordinates() {
		var coordinates = new Array(this.getNumPoints());
		var k = -1;
		for (var i = 0; i < this.geometries.length; i++) {
			var childCoordinates = this.geometries[i].getCoordinates();
			for (var j = 0; j < childCoordinates.length; j++) {
				k++;
				coordinates[k] = childCoordinates[j];
			}
		}
		return coordinates;
	}
	getArea() {
		var area = 0.0;
		for (var i = 0; i < this.geometries.length; i++) {
			area += this.geometries[i].getArea();
		}
		return area;
	}
	equalsExact(...args) {
		if (args.length === 2) {
			let [other, tolerance] = args;
			if (!this.isEquivalentClass(other)) {
				return false;
			}
			var otherCollection = other;
			if (this.geometries.length !== otherCollection.geometries.length) {
				return false;
			}
			for (var i = 0; i < this.geometries.length; i++) {
				if (!this.geometries[i].equalsExact(otherCollection.geometries[i], tolerance)) {
					return false;
				}
			}
			return true;
		} else return super.equalsExact(...args);
	}
	normalize() {
		for (var i = 0; i < this.geometries.length; i++) {
			this.geometries[i].normalize();
		}
		Arrays.sort(this.geometries);
	}
	getCoordinate() {
		if (this.isEmpty()) return null;
		return this.geometries[0].getCoordinate();
	}
	getBoundaryDimension() {
		var dimension = Dimension.FALSE;
		for (var i = 0; i < this.geometries.length; i++) {
			dimension = Math.max(dimension, this.geometries[i].getBoundaryDimension());
		}
		return dimension;
	}
	getDimension() {
		var dimension = Dimension.FALSE;
		for (var i = 0; i < this.geometries.length; i++) {
			dimension = Math.max(dimension, this.geometries[i].getDimension());
		}
		return dimension;
	}
	getLength() {
		var sum = 0.0;
		for (var i = 0; i < this.geometries.length; i++) {
			sum += this.geometries[i].getLength();
		}
		return sum;
	}
	getNumPoints() {
		var numPoints = 0;
		for (var i = 0; i < this.geometries.length; i++) {
			numPoints += this.geometries[i].getNumPoints();
		}
		return numPoints;
	}
	getNumGeometries() {
		return this.geometries.length;
	}
	reverse() {
		var n = this.geometries.length;
		var revGeoms = new Array(n);
		for (var i = 0; i < this.geometries.length; i++) {
			revGeoms[i] = this.geometries[i].reverse();
		}
		return this.getFactory().createGeometryCollection(revGeoms);
	}
	compareToSameClass(...args) {
		if (args.length === 1) {
			let [o] = args;
			var theseElements = new TreeSet(Arrays.asList(this.geometries));
			var otherElements = new TreeSet(Arrays.asList(o.geometries));
			return this.compare(theseElements, otherElements);
		} else if (args.length === 2) {
			let [o, comp] = args;
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
	}
	apply(...args) {
		if (args.length === 1) {
			if (args[0].interfaces_ && args[0].interfaces_.indexOf(CoordinateFilter) > -1) {
				let [filter] = args;
				for (var i = 0; i < this.geometries.length; i++) {
					this.geometries[i].apply(filter);
				}
			} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(CoordinateSequenceFilter) > -1) {
				let [filter] = args;
				if (this.geometries.length === 0) return null;
				for (var i = 0; i < this.geometries.length; i++) {
					this.geometries[i].apply(filter);
					if (filter.isDone()) {
						break;
					}
				}
				if (filter.isGeometryChanged()) this.geometryChanged();
			} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(GeometryFilter) > -1) {
				let [filter] = args;
				filter.filter(this);
				for (var i = 0; i < this.geometries.length; i++) {
					this.geometries[i].apply(filter);
				}
			} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(GeometryComponentFilter) > -1) {
				let [filter] = args;
				filter.filter(this);
				for (var i = 0; i < this.geometries.length; i++) {
					this.geometries[i].apply(filter);
				}
			}
		}
	}
	getBoundary() {
		this.checkNotGeometryCollection(this);
		Assert.shouldNeverReachHere();
		return null;
	}
	clone() {
		var gc = super.clone();
		gc.geometries = new Array(this.geometries.length);
		for (var i = 0; i < this.geometries.length; i++) {
			gc.geometries[i] = this.geometries[i].clone();
		}
		return gc;
	}
	getGeometryType() {
		return "GeometryCollection";
	}
	copy() {
		var geometries = new Array(this.geometries.length);
		for (var i = 0; i < geometries.length; i++) {
			geometries[i] = this.geometries[i].copy();
		}
		return new GeometryCollection(geometries, this.factory);
	}
	isEmpty() {
		for (var i = 0; i < this.geometries.length; i++) {
			if (!this.geometries[i].isEmpty()) {
				return false;
			}
		}
		return true;
	}
	getClass() {
		return GeometryCollection;
	}
}
GeometryCollection.serialVersionUID = -5694727726395021467;

