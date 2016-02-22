import CoordinateSequenceFactory from './CoordinateSequenceFactory';
import LineString from './LineString';
import hasInterface from '../../../../hasInterface';
import Coordinate from './Coordinate';
import Point from './Point';
import Polygon from './Polygon';
import MultiPoint from './MultiPoint';
import GeometryEditor from './util/GeometryEditor';
import LinearRing from './LinearRing';
import extend from '../../../../extend';
import CoordinateArraySequenceFactory from './impl/CoordinateArraySequenceFactory';
import MultiPolygon from './MultiPolygon';
import CoordinateSequences from './CoordinateSequences';
import CoordinateSequence from './CoordinateSequence';
import GeometryCollection from './GeometryCollection';
import PrecisionModel from './PrecisionModel';
import Serializable from '../../../../java/io/Serializable';
import Assert from '../util/Assert';
import MultiLineString from './MultiLineString';
export default function GeometryFactory() {
	this.precisionModel = null;
	this.coordinateSequenceFactory = null;
	this.SRID = null;
	if (arguments.length === 0) {
		GeometryFactory.call(this, new PrecisionModel(), 0);
	} else if (arguments.length === 1) {
		if (hasInterface(arguments[0], CoordinateSequenceFactory)) {
			let coordinateSequenceFactory = arguments[0];
			GeometryFactory.call(this, new PrecisionModel(), 0, coordinateSequenceFactory);
		} else if (arguments[0] instanceof PrecisionModel) {
			let precisionModel = arguments[0];
			GeometryFactory.call(this, precisionModel, 0, GeometryFactory.getDefaultCoordinateSequenceFactory());
		}
	} else if (arguments.length === 2) {
		let precisionModel = arguments[0], SRID = arguments[1];
		GeometryFactory.call(this, precisionModel, SRID, GeometryFactory.getDefaultCoordinateSequenceFactory());
	} else if (arguments.length === 3) {
		let precisionModel = arguments[0], SRID = arguments[1], coordinateSequenceFactory = arguments[2];
		this.precisionModel = precisionModel;
		this.coordinateSequenceFactory = coordinateSequenceFactory;
		this.SRID = SRID;
	}
}
extend(GeometryFactory.prototype, {
	toGeometry: function (envelope) {
		if (envelope.isNull()) {
			return this.createPoint(null);
		}
		if (envelope.getMinX() === envelope.getMaxX() && envelope.getMinY() === envelope.getMaxY()) {
			return this.createPoint(new Coordinate(envelope.getMinX(), envelope.getMinY()));
		}
		if (envelope.getMinX() === envelope.getMaxX() || envelope.getMinY() === envelope.getMaxY()) {
			return this.createLineString([new Coordinate(envelope.getMinX(), envelope.getMinY()), new Coordinate(envelope.getMaxX(), envelope.getMaxY())]);
		}
		return this.createPolygon(this.createLinearRing([new Coordinate(envelope.getMinX(), envelope.getMinY()), new Coordinate(envelope.getMinX(), envelope.getMaxY()), new Coordinate(envelope.getMaxX(), envelope.getMaxY()), new Coordinate(envelope.getMaxX(), envelope.getMinY()), new Coordinate(envelope.getMinX(), envelope.getMinY())]), null);
	},
	createLineString: function () {
		if (arguments.length === 0) {
			return this.createLineString(this.getCoordinateSequenceFactory().create([]));
		} else if (arguments.length === 1) {
			if (arguments[0] instanceof Array) {
				let coordinates = arguments[0];
				return this.createLineString(coordinates !== null ? this.getCoordinateSequenceFactory().create(coordinates) : null);
			} else if (hasInterface(arguments[0], CoordinateSequence)) {
				let coordinates = arguments[0];
				return new LineString(coordinates, this);
			}
		}
	},
	createMultiLineString: function () {
		if (arguments.length === 0) {
			return new MultiLineString(null, this);
		} else if (arguments.length === 1) {
			let lineStrings = arguments[0];
			return new MultiLineString(lineStrings, this);
		}
	},
	buildGeometry: function (geomList) {
		var geomClass = null;
		var isHeterogeneous = false;
		var hasGeometryCollection = false;
		for (var i = geomList.iterator(); i.hasNext(); ) {
			var geom = i.next();
			var partClass = geom.getClass();
			if (geomClass === null) {
				geomClass = partClass;
			}
			if (partClass !== geomClass) {
				isHeterogeneous = true;
			}
			if (geom.isGeometryCollectionOrDerived()) hasGeometryCollection = true;
		}
		if (geomClass === null) {
			return this.createGeometryCollection();
		}
		if (isHeterogeneous || hasGeometryCollection) {
			return this.createGeometryCollection(GeometryFactory.toGeometryArray(geomList));
		}
		var geom0 = geomList.iterator().next();
		var isCollection = geomList.size() > 1;
		if (isCollection) {
			if (geom0 instanceof Polygon) {
				return this.createMultiPolygon(GeometryFactory.toPolygonArray(geomList));
			} else if (geom0 instanceof LineString) {
				return this.createMultiLineString(GeometryFactory.toLineStringArray(geomList));
			} else if (geom0 instanceof Point) {
				return this.createMultiPoint(GeometryFactory.toPointArray(geomList));
			}
			Assert.shouldNeverReachHere("Unhandled class: " + geom0.getClass().getName());
		}
		return geom0;
	},
	createMultiPointFromCoords: function (coordinates) {
		return this.createMultiPoint(coordinates !== null ? this.getCoordinateSequenceFactory().create(coordinates) : null);
	},
	createPoint: function () {
		if (arguments.length === 0) {
			return this.createPoint(this.getCoordinateSequenceFactory().create([]));
		} else if (arguments.length === 1) {
			if (arguments[0] instanceof Coordinate) {
				let coordinate = arguments[0];
				return this.createPoint(coordinate !== null ? this.getCoordinateSequenceFactory().create([coordinate]) : null);
			} else if (hasInterface(arguments[0], CoordinateSequence)) {
				let coordinates = arguments[0];
				return new Point(coordinates, this);
			}
		}
	},
	getCoordinateSequenceFactory: function () {
		return this.coordinateSequenceFactory;
	},
	createPolygon: function () {
		if (arguments.length === 0) {
			return new Polygon(null, null, this);
		} else if (arguments.length === 1) {
			if (hasInterface(arguments[0], CoordinateSequence)) {
				let coordinates = arguments[0];
				return this.createPolygon(this.createLinearRing(coordinates));
			} else if (arguments[0] instanceof Array) {
				let coordinates = arguments[0];
				return this.createPolygon(this.createLinearRing(coordinates));
			} else if (arguments[0] instanceof LinearRing) {
				let shell = arguments[0];
				return this.createPolygon(shell, null);
			}
		} else if (arguments.length === 2) {
			let shell = arguments[0], holes = arguments[1];
			return new Polygon(shell, holes, this);
		}
	},
	getSRID: function () {
		return this.SRID;
	},
	createGeometryCollection: function () {
		if (arguments.length === 0) {
			return new GeometryCollection(null, this);
		} else if (arguments.length === 1) {
			let geometries = arguments[0];
			return new GeometryCollection(geometries, this);
		}
	},
	createGeometry: function (g) {
		var editor = new GeometryEditor(this);
		return editor.edit(g, {
			edit: function () {
				if (arguments.length === 2) {
					let coordSeq = arguments[0], geometry = arguments[1];
					return this.coordinateSequenceFactory.create(coordSeq);
				}
			}
		});
	},
	getPrecisionModel: function () {
		return this.precisionModel;
	},
	createLinearRing: function () {
		if (arguments.length === 0) {
			return this.createLinearRing(this.getCoordinateSequenceFactory().create([]));
		} else if (arguments.length === 1) {
			if (arguments[0] instanceof Array) {
				let coordinates = arguments[0];
				return this.createLinearRing(coordinates !== null ? this.getCoordinateSequenceFactory().create(coordinates) : null);
			} else if (hasInterface(arguments[0], CoordinateSequence)) {
				let coordinates = arguments[0];
				return new LinearRing(coordinates, this);
			}
		}
	},
	createMultiPolygon: function () {
		if (arguments.length === 0) {
			return new MultiPolygon(null, this);
		} else if (arguments.length === 1) {
			let polygons = arguments[0];
			return new MultiPolygon(polygons, this);
		}
	},
	createMultiPoint: function () {
		if (arguments.length === 0) {
			return new MultiPoint(null, this);
		} else if (arguments.length === 1) {
			if (arguments[0] instanceof Array) {
				let point = arguments[0];
				return new MultiPoint(point, this);
			} else if (arguments[0] instanceof Array) {
				let coordinates = arguments[0];
				return this.createMultiPoint(coordinates !== null ? this.getCoordinateSequenceFactory().create(coordinates) : null);
			} else if (hasInterface(arguments[0], CoordinateSequence)) {
				let coordinates = arguments[0];
				if (coordinates === null) {
					return this.createMultiPoint(new Array(0).fill(null));
				}
				var points = new Array(coordinates.size()).fill(null);
				for (var i = 0; i < coordinates.size(); i++) {
					var ptSeq = this.getCoordinateSequenceFactory().create(1, coordinates.getDimension());
					CoordinateSequences.copy(coordinates, i, ptSeq, 0, 1);
					points[i] = this.createPoint(ptSeq);
				}
				return this.createMultiPoint(points);
			}
		}
	},
	interfaces_: function () {
		return [Serializable];
	},
	getClass: function () {
		return GeometryFactory;
	}
});
GeometryFactory.toMultiPolygonArray = function (multiPolygons) {
	var multiPolygonArray = new Array(multiPolygons.size()).fill(null);
	return multiPolygons.toArray(multiPolygonArray);
};
GeometryFactory.toGeometryArray = function (geometries) {
	if (geometries === null) return null;
	var geometryArray = new Array(geometries.size()).fill(null);
	return geometries.toArray(geometryArray);
};
GeometryFactory.getDefaultCoordinateSequenceFactory = function () {
	return CoordinateArraySequenceFactory.instance();
};
GeometryFactory.toMultiLineStringArray = function (multiLineStrings) {
	var multiLineStringArray = new Array(multiLineStrings.size()).fill(null);
	return multiLineStrings.toArray(multiLineStringArray);
};
GeometryFactory.toLineStringArray = function (lineStrings) {
	var lineStringArray = new Array(lineStrings.size()).fill(null);
	return lineStrings.toArray(lineStringArray);
};
GeometryFactory.toMultiPointArray = function (multiPoints) {
	var multiPointArray = new Array(multiPoints.size()).fill(null);
	return multiPoints.toArray(multiPointArray);
};
GeometryFactory.toLinearRingArray = function (linearRings) {
	var linearRingArray = new Array(linearRings.size()).fill(null);
	return linearRings.toArray(linearRingArray);
};
GeometryFactory.toPointArray = function (points) {
	var pointArray = new Array(points.size()).fill(null);
	return points.toArray(pointArray);
};
GeometryFactory.toPolygonArray = function (polygons) {
	var polygonArray = new Array(polygons.size()).fill(null);
	return polygons.toArray(polygonArray);
};
GeometryFactory.createPointFromInternalCoord = function (coord, exemplar) {
	exemplar.getPrecisionModel().makePrecise(coord);
	return exemplar.getFactory().createPoint(coord);
};
GeometryFactory.serialVersionUID = -6820524753094095635;

