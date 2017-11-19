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
	this._factory = null;
	this._isUserDataCopied = false;
	if (arguments.length === 0) {} else if (arguments.length === 1) {
		let factory = arguments[0];
		this._factory = factory;
	}
}
extend(GeometryEditor.prototype, {
	setCopyUserData: function (isUserDataCopied) {
		this._isUserDataCopied = isUserDataCopied;
	},
	edit: function (geometry, operation) {
		if (geometry === null) return null;
		var result = this.editInternal(geometry, operation);
		if (this._isUserDataCopied) {
			result.setUserData(geometry.getUserData());
		}
		return result;
	},
	editInternal: function (geometry, operation) {
		if (this._factory === null) this._factory = geometry.getFactory();
		if (geometry instanceof GeometryCollection) {
			return this.editGeometryCollection(geometry, operation);
		}
		if (geometry instanceof Polygon) {
			return this.editPolygon(geometry, operation);
		}
		if (geometry instanceof Point) {
			return operation.edit(geometry, this._factory);
		}
		if (geometry instanceof LineString) {
			return operation.edit(geometry, this._factory);
		}
		Assert.shouldNeverReachHere("Unsupported Geometry class: " + geometry.getClass().getName());
		return null;
	},
	editGeometryCollection: function (collection, operation) {
		var collectionForType = operation.edit(collection, this._factory);
		var geometries = new ArrayList();
		for (var i = 0; i < collectionForType.getNumGeometries(); i++) {
			var geometry = this.edit(collectionForType.getGeometryN(i), operation);
			if (geometry === null || geometry.isEmpty()) {
				continue;
			}
			geometries.add(geometry);
		}
		if (collectionForType.getClass() === MultiPoint) {
			return this._factory.createMultiPoint(geometries.toArray([]));
		}
		if (collectionForType.getClass() === MultiLineString) {
			return this._factory.createMultiLineString(geometries.toArray([]));
		}
		if (collectionForType.getClass() === MultiPolygon) {
			return this._factory.createMultiPolygon(geometries.toArray([]));
		}
		return this._factory.createGeometryCollection(geometries.toArray([]));
	},
	editPolygon: function (polygon, operation) {
		var newPolygon = operation.edit(polygon, this._factory);
		if (newPolygon === null) newPolygon = this._factory.createPolygon();
		if (newPolygon.isEmpty()) {
			return newPolygon;
		}
		var shell = this.edit(newPolygon.getExteriorRing(), operation);
		if (shell === null || shell.isEmpty()) {
			return this._factory.createPolygon();
		}
		var holes = new ArrayList();
		for (var i = 0; i < newPolygon.getNumInteriorRing(); i++) {
			var hole = this.edit(newPolygon.getInteriorRingN(i), operation);
			if (hole === null || hole.isEmpty()) {
				continue;
			}
			holes.add(hole);
		}
		return this._factory.createPolygon(shell, holes.toArray([]));
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
		var coordinates = this.edit(geometry.getCoordinates(), geometry);
		if (geometry instanceof LinearRing) {
			if (coordinates === null) return factory.createLinearRing(); else return factory.createLinearRing(coordinates);
		}
		if (geometry instanceof LineString) {
			if (coordinates === null) return factory.createLineString(); else return factory.createLineString(coordinates);
		}
		if (geometry instanceof Point) {
			if (coordinates === null || coordinates.length === 0) return factory.createPoint(); else return factory.createPoint(coordinates[0]);
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
