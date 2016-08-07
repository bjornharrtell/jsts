import LineString from '../LineString';
import Point from '../Point';
import Polygon from '../Polygon';
import MultiPoint from '../MultiPoint';
import LinearRing from '../LinearRing';
import extend from '../../../../../extend';
import MultiPolygon from '../MultiPolygon';
import GeometryCollection from '../GeometryCollection';
import ArrayList from '../../../../../java/util/ArrayList';
import Assert from '../../util/Assert';
import MultiLineString from '../MultiLineString';
export default function GeometryEditor() {
	this.factory = null;
	this.isUserDataCopied = false;
	if (arguments.length === 0) {} else if (arguments.length === 1) {
		let factory = arguments[0];
		this.factory = factory;
	}
}
extend(GeometryEditor.prototype, {
	setCopyUserData: function (isUserDataCopied) {
		this.isUserDataCopied = isUserDataCopied;
	},
	edit: function (geometry, operation) {
		if (geometry === null) return null;
		var result = this.editInternal(geometry, operation);
		if (this.isUserDataCopied) {
			result.setUserData(geometry.getUserData());
		}
		return result;
	},
	editInternal: function (geometry, operation) {
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
	},
	editGeometryCollection: function (collection, operation) {
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
	},
	editPolygon: function (polygon, operation) {
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
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return GeometryEditor;
	}
});
function GeometryEditorOperation() {}
GeometryEditor.GeometryEditorOperation = GeometryEditorOperation;
function NoOpGeometryOperation() {}
extend(NoOpGeometryOperation.prototype, {
	edit: function (geometry, factory) {
		return geometry;
	},
	interfaces_: function () {
		return [GeometryEditorOperation];
	},
	getClass: function () {
		return NoOpGeometryOperation;
	}
});
function CoordinateOperation() {}
extend(CoordinateOperation.prototype, {
	edit: function (geometry, factory) {
		var coords = this.editCoordinates(geometry.getCoordinates(), geometry);
		if (coords === null) return geometry;
		if (geometry instanceof LinearRing) {
			return factory.createLinearRing(coords);
		}
		if (geometry instanceof LineString) {
			return factory.createLineString(coords);
		}
		if (geometry instanceof Point) {
			if (coords.length > 0) {
				return factory.createPoint(coords[0]);
			} else {
				return factory.createPoint();
			}
		}
		return geometry;
	},
	interfaces_: function () {
		return [GeometryEditorOperation];
	},
	getClass: function () {
		return CoordinateOperation;
	}
});
function CoordinateSequenceOperation() {}
extend(CoordinateSequenceOperation.prototype, {
	edit: function (geometry, factory) {
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
	},
	interfaces_: function () {
		return [GeometryEditorOperation];
	},
	getClass: function () {
		return CoordinateSequenceOperation;
	}
});
GeometryEditor.NoOpGeometryOperation = NoOpGeometryOperation;
GeometryEditor.CoordinateOperation = CoordinateOperation;
GeometryEditor.CoordinateSequenceOperation = CoordinateSequenceOperation;
