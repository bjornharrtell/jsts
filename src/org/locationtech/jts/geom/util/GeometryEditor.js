import LineString from '../LineString';
import Point from '../Point';
import Polygon from '../Polygon';
import MultiPoint from '../MultiPoint';
import LinearRing from '../LinearRing';
import MultiPolygon from '../MultiPolygon';
import GeometryCollection from '../GeometryCollection';
import ArrayList from '../../../../../java/util/ArrayList';
import Assert from '../../util/Assert';
import MultiLineString from '../MultiLineString';
export default class GeometryEditor {
	constructor(...args) {
		this.factory = null;
		this.isUserDataCopied = false;
		const overloaded = (...args) => {
			if (args.length === 0) {
				return ((...args) => {
					let [] = args;
				})(...args);
			} else if (args.length === 1) {
				return ((...args) => {
					let [factory] = args;
					this.factory = factory;
				})(...args);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static get NoOpGeometryOperation() {
		return NoOpGeometryOperation;
	}
	static get CoordinateOperation() {
		return CoordinateOperation;
	}
	static get CoordinateSequenceOperation() {
		return CoordinateSequenceOperation;
	}
	setCopyUserData(isUserDataCopied) {
		this.isUserDataCopied = isUserDataCopied;
	}
	edit(geometry, operation) {
		if (geometry === null) return null;
		var result = this.editInternal(geometry, operation);
		if (this.isUserDataCopied) {
			result.setUserData(geometry.getUserData());
		}
		return result;
	}
	editInternal(geometry, operation) {
		if (this.factory === null) this.factory = geometry.getFactory();
		if (geometry instanceof GeometryCollection) {
			return this.editGeometryCollection(geometry, operation);
		}
		if (geometry instanceof Polygon) {
			return this.editPolygon(geometry, operation);
		}
		if (geometry instanceof Point) {
			return operation.edit(geometry, this.factory);
		}
		if (geometry instanceof LineString) {
			return operation.edit(geometry, this.factory);
		}
		Assert.shouldNeverReachHere("Unsupported Geometry class: " + geometry.getClass().getName());
		return null;
	}
	editGeometryCollection(collection, operation) {
		var collectionForType = operation.edit(collection, this.factory);
		var geometries = new ArrayList();
		for (var i = 0; i < collectionForType.getNumGeometries(); i++) {
			var geometry = this.edit(collectionForType.getGeometryN(i), operation);
			if (geometry === null || geometry.isEmpty()) {
				continue;
			}
			geometries.add(geometry);
		}
		if (collectionForType.getClass() === MultiPoint) {
			return this.factory.createMultiPoint(geometries.toArray([]));
		}
		if (collectionForType.getClass() === MultiLineString) {
			return this.factory.createMultiLineString(geometries.toArray([]));
		}
		if (collectionForType.getClass() === MultiPolygon) {
			return this.factory.createMultiPolygon(geometries.toArray([]));
		}
		return this.factory.createGeometryCollection(geometries.toArray([]));
	}
	editPolygon(polygon, operation) {
		var newPolygon = operation.edit(polygon, this.factory);
		if (newPolygon === null) newPolygon = this.factory.createPolygon(null);
		if (newPolygon.isEmpty()) {
			return newPolygon;
		}
		var shell = this.edit(newPolygon.getExteriorRing(), operation);
		if (shell === null || shell.isEmpty()) {
			return this.factory.createPolygon();
		}
		var holes = new ArrayList();
		for (var i = 0; i < newPolygon.getNumInteriorRing(); i++) {
			var hole = this.edit(newPolygon.getInteriorRingN(i), operation);
			if (hole === null || hole.isEmpty()) {
				continue;
			}
			holes.add(hole);
		}
		return this.factory.createPolygon(shell, holes.toArray([]));
	}
	getClass() {
		return GeometryEditor;
	}
}
class NoOpGeometryOperation {
	get interfaces_() {
		return [GeometryEditorOperation];
	}
	edit(geometry, factory) {
		return geometry;
	}
	getClass() {
		return NoOpGeometryOperation;
	}
}
class CoordinateOperation {
	get interfaces_() {
		return [GeometryEditorOperation];
	}
	edit(geometry, factory) {
		if (geometry instanceof LinearRing) {
			return factory.createLinearRing(this.edit(geometry.getCoordinates(), geometry));
		}
		if (geometry instanceof LineString) {
			return factory.createLineString(this.edit(geometry.getCoordinates(), geometry));
		}
		if (geometry instanceof Point) {
			var newCoordinates = this.edit(geometry.getCoordinates(), geometry);
			if (newCoordinates.length > 0) {
				return factory.createPoint(newCoordinates[0]);
			} else {
				return factory.createPoint();
			}
		}
		return geometry;
	}
	getClass() {
		return CoordinateOperation;
	}
}
class CoordinateSequenceOperation {
	get interfaces_() {
		return [GeometryEditorOperation];
	}
	edit(geometry, factory) {
		if (geometry instanceof LinearRing) {
			return factory.createLinearRing(this.edit(geometry.getCoordinateSequence(), geometry));
		}
		if (geometry instanceof LineString) {
			return factory.createLineString(this.edit(geometry.getCoordinateSequence(), geometry));
		}
		if (geometry instanceof Point) {
			return factory.createPoint(this.edit(geometry.getCoordinateSequence(), geometry));
		}
		return geometry;
	}
	getClass() {
		return CoordinateSequenceOperation;
	}
}

