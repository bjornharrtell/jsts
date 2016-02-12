import CoordinateSequenceFactory from './CoordinateSequenceFactory';
import LineString from './LineString';
import Coordinate from './Coordinate';
import Point from './Point';
import Polygon from './Polygon';
import MultiPoint from './MultiPoint';
import GeometryEditor from './util/GeometryEditor';
import LinearRing from './LinearRing';
import CoordinateArraySequenceFactory from './impl/CoordinateArraySequenceFactory';
import MultiPolygon from './MultiPolygon';
import CoordinateSequences from './CoordinateSequences';
import CoordinateSequence from './CoordinateSequence';
import GeometryCollection from './GeometryCollection';
import PrecisionModel from './PrecisionModel';
import Serializable from '../../../../java/io/Serializable';
import Assert from '../util/Assert';
import MultiLineString from './MultiLineString';
export default class GeometryFactory {
	constructor(...args) {
		this.precisionModel = null;
		this.coordinateSequenceFactory = null;
		this.SRID = null;
		const overloaded = (...args) => {
			if (args.length === 0) {
				return ((...args) => {
					let [] = args;
					overloaded.call(this, new PrecisionModel(), 0);
				})(...args);
			} else if (args.length === 1) {
				if (args[0].interfaces_ && args[0].interfaces_.indexOf(CoordinateSequenceFactory) > -1) {
					return ((...args) => {
						let [coordinateSequenceFactory] = args;
						overloaded.call(this, new PrecisionModel(), 0, coordinateSequenceFactory);
					})(...args);
				} else if (args[0] instanceof PrecisionModel) {
					return ((...args) => {
						let [precisionModel] = args;
						overloaded.call(this, precisionModel, 0, GeometryFactory.getDefaultCoordinateSequenceFactory());
					})(...args);
				}
			} else if (args.length === 2) {
				return ((...args) => {
					let [precisionModel, SRID] = args;
					overloaded.call(this, precisionModel, SRID, GeometryFactory.getDefaultCoordinateSequenceFactory());
				})(...args);
			} else if (args.length === 3) {
				return ((...args) => {
					let [precisionModel, SRID, coordinateSequenceFactory] = args;
					this.precisionModel = precisionModel;
					this.coordinateSequenceFactory = coordinateSequenceFactory;
					this.SRID = SRID;
				})(...args);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [Serializable];
	}
	static toMultiPolygonArray(multiPolygons) {
		var multiPolygonArray = new Array(multiPolygons.size());
		return multiPolygons.toArray(multiPolygonArray);
	}
	static toGeometryArray(geometries) {
		if (geometries === null) return null;
		var geometryArray = new Array(geometries.size());
		return geometries.toArray(geometryArray);
	}
	static getDefaultCoordinateSequenceFactory() {
		return CoordinateArraySequenceFactory.instance();
	}
	static toMultiLineStringArray(multiLineStrings) {
		var multiLineStringArray = new Array(multiLineStrings.size());
		return multiLineStrings.toArray(multiLineStringArray);
	}
	static toLineStringArray(lineStrings) {
		var lineStringArray = new Array(lineStrings.size());
		return lineStrings.toArray(lineStringArray);
	}
	static toMultiPointArray(multiPoints) {
		var multiPointArray = new Array(multiPoints.size());
		return multiPoints.toArray(multiPointArray);
	}
	static toLinearRingArray(linearRings) {
		var linearRingArray = new Array(linearRings.size());
		return linearRings.toArray(linearRingArray);
	}
	static toPointArray(points) {
		var pointArray = new Array(points.size());
		return points.toArray(pointArray);
	}
	static toPolygonArray(polygons) {
		var polygonArray = new Array(polygons.size());
		return polygons.toArray(polygonArray);
	}
	static createPointFromInternalCoord(coord, exemplar) {
		exemplar.getPrecisionModel().makePrecise(coord);
		return exemplar.getFactory().createPoint(coord);
	}
	toGeometry(envelope) {
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
	}
	createLineString(...args) {
		if (args.length === 0) {
			let [] = args;
			return this.createLineString(this.getCoordinateSequenceFactory().create([]));
		} else if (args.length === 1) {
			if (args[0] instanceof Array) {
				let [coordinates] = args;
				return this.createLineString(coordinates !== null ? this.getCoordinateSequenceFactory().create(coordinates) : null);
			} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(CoordinateSequence) > -1) {
				let [coordinates] = args;
				return new LineString(coordinates, this);
			}
		}
	}
	createMultiLineString(...args) {
		if (args.length === 0) {
			let [] = args;
			return new MultiLineString(null, this);
		} else if (args.length === 1) {
			let [lineStrings] = args;
			return new MultiLineString(lineStrings, this);
		}
	}
	buildGeometry(geomList) {
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
	}
	createMultiPointFromCoords(coordinates) {
		return this.createMultiPoint(coordinates !== null ? this.getCoordinateSequenceFactory().create(coordinates) : null);
	}
	createPoint(...args) {
		if (args.length === 0) {
			let [] = args;
			return this.createPoint(this.getCoordinateSequenceFactory().create([]));
		} else if (args.length === 1) {
			if (args[0] instanceof Coordinate) {
				let [coordinate] = args;
				return this.createPoint(coordinate !== null ? this.getCoordinateSequenceFactory().create([coordinate]) : null);
			} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(CoordinateSequence) > -1) {
				let [coordinates] = args;
				return new Point(coordinates, this);
			}
		}
	}
	getCoordinateSequenceFactory() {
		return this.coordinateSequenceFactory;
	}
	createPolygon(...args) {
		if (args.length === 0) {
			let [] = args;
			return new Polygon(null, null, this);
		} else if (args.length === 1) {
			if (args[0].interfaces_ && args[0].interfaces_.indexOf(CoordinateSequence) > -1) {
				let [coordinates] = args;
				return this.createPolygon(this.createLinearRing(coordinates));
			} else if (args[0] instanceof Array) {
				let [coordinates] = args;
				return this.createPolygon(this.createLinearRing(coordinates));
			} else if (args[0] instanceof LinearRing) {
				let [shell] = args;
				return this.createPolygon(shell, null);
			}
		} else if (args.length === 2) {
			let [shell, holes] = args;
			return new Polygon(shell, holes, this);
		}
	}
	getSRID() {
		return this.SRID;
	}
	createGeometryCollection(...args) {
		if (args.length === 0) {
			let [] = args;
			return new GeometryCollection(null, this);
		} else if (args.length === 1) {
			let [geometries] = args;
			return new GeometryCollection(geometries, this);
		}
	}
	createGeometry(g) {
		var editor = new GeometryEditor(this);
		return editor.edit(g, new (class extends CoordinateSequenceOperation {
			edit(...args) {
				if (args.length === 2) {
					let [coordSeq, geometry] = args;
					return this.coordinateSequenceFactory.create(coordSeq);
				} else return super.edit(...args);
			}
		})());
	}
	getPrecisionModel() {
		return this.precisionModel;
	}
	createLinearRing(...args) {
		if (args.length === 0) {
			let [] = args;
			return this.createLinearRing(this.getCoordinateSequenceFactory().create([]));
		} else if (args.length === 1) {
			if (args[0] instanceof Array) {
				let [coordinates] = args;
				return this.createLinearRing(coordinates !== null ? this.getCoordinateSequenceFactory().create(coordinates) : null);
			} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(CoordinateSequence) > -1) {
				let [coordinates] = args;
				return new LinearRing(coordinates, this);
			}
		}
	}
	createMultiPolygon(...args) {
		if (args.length === 0) {
			let [] = args;
			return new MultiPolygon(null, this);
		} else if (args.length === 1) {
			let [polygons] = args;
			return new MultiPolygon(polygons, this);
		}
	}
	createMultiPoint(...args) {
		if (args.length === 0) {
			let [] = args;
			return new MultiPoint(null, this);
		} else if (args.length === 1) {
			if (args[0] instanceof Array) {
				let [point] = args;
				return new MultiPoint(point, this);
			} else if (args[0] instanceof Array) {
				let [coordinates] = args;
				return this.createMultiPoint(coordinates !== null ? this.getCoordinateSequenceFactory().create(coordinates) : null);
			} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(CoordinateSequence) > -1) {
				let [coordinates] = args;
				if (coordinates === null) {
					return this.createMultiPoint(new Array(0));
				}
				var points = new Array(coordinates.size());
				for (var i = 0; i < coordinates.size(); i++) {
					var ptSeq = this.getCoordinateSequenceFactory().create(1, coordinates.getDimension());
					CoordinateSequences.copy(coordinates, i, ptSeq, 0, 1);
					points[i] = this.createPoint(ptSeq);
				}
				return this.createMultiPoint(points);
			}
		}
	}
	getClass() {
		return GeometryFactory;
	}
}
GeometryFactory.serialVersionUID = -6820524753094095635;

