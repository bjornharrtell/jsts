import CoordinateSequenceFactory from './CoordinateSequenceFactory'
import LineString from './LineString'
import hasInterface from '../../../../hasInterface'
import Coordinate from './Coordinate'
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException'
import Point from './Point'
import Polygon from './Polygon'
import MultiPoint from './MultiPoint'
import LinearRing from './LinearRing'
import CoordinateArraySequenceFactory from './impl/CoordinateArraySequenceFactory'
import MultiPolygon from './MultiPolygon'
import CoordinateSequences from './CoordinateSequences'
import CoordinateSequence from './CoordinateSequence'
import GeometryCollection from './GeometryCollection'
import PrecisionModel from './PrecisionModel'
import Serializable from '../../../../java/io/Serializable'
import Assert from '../util/Assert'
import MultiLineString from './MultiLineString'
export default class GeometryFactory {
  constructor() {
    GeometryFactory.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._precisionModel = null
    this._coordinateSequenceFactory = null
    this._SRID = null
    if (arguments.length === 0) {
      GeometryFactory.constructor_.call(this, new PrecisionModel(), 0)
    } else if (arguments.length === 1) {
      if (hasInterface(arguments[0], CoordinateSequenceFactory)) {
        const coordinateSequenceFactory = arguments[0]
        GeometryFactory.constructor_.call(this, new PrecisionModel(), 0, coordinateSequenceFactory)
      } else if (arguments[0] instanceof PrecisionModel) {
        const precisionModel = arguments[0]
        GeometryFactory.constructor_.call(this, precisionModel, 0, GeometryFactory.getDefaultCoordinateSequenceFactory())
      }
    } else if (arguments.length === 2) {
      const precisionModel = arguments[0], SRID = arguments[1]
      GeometryFactory.constructor_.call(this, precisionModel, SRID, GeometryFactory.getDefaultCoordinateSequenceFactory())
    } else if (arguments.length === 3) {
      const precisionModel = arguments[0], SRID = arguments[1], coordinateSequenceFactory = arguments[2]
      this._precisionModel = precisionModel
      this._coordinateSequenceFactory = coordinateSequenceFactory
      this._SRID = SRID
    }
  }
  static toMultiPolygonArray(multiPolygons) {
    const multiPolygonArray = new Array(multiPolygons.size()).fill(null)
    return multiPolygons.toArray(multiPolygonArray)
  }
  static toGeometryArray(geometries) {
    if (geometries === null) return null
    const geometryArray = new Array(geometries.size()).fill(null)
    return geometries.toArray(geometryArray)
  }
  static getDefaultCoordinateSequenceFactory() {
    return CoordinateArraySequenceFactory.instance()
  }
  static toMultiLineStringArray(multiLineStrings) {
    const multiLineStringArray = new Array(multiLineStrings.size()).fill(null)
    return multiLineStrings.toArray(multiLineStringArray)
  }
  static toLineStringArray(lineStrings) {
    const lineStringArray = new Array(lineStrings.size()).fill(null)
    return lineStrings.toArray(lineStringArray)
  }
  static toMultiPointArray(multiPoints) {
    const multiPointArray = new Array(multiPoints.size()).fill(null)
    return multiPoints.toArray(multiPointArray)
  }
  static toLinearRingArray(linearRings) {
    const linearRingArray = new Array(linearRings.size()).fill(null)
    return linearRings.toArray(linearRingArray)
  }
  static toPointArray(points) {
    const pointArray = new Array(points.size()).fill(null)
    return points.toArray(pointArray)
  }
  static toPolygonArray(polygons) {
    const polygonArray = new Array(polygons.size()).fill(null)
    return polygons.toArray(polygonArray)
  }
  static createPointFromInternalCoord(coord, exemplar) {
    exemplar.getPrecisionModel().makePrecise(coord)
    return exemplar.getFactory().createPoint(coord)
  }
  createEmpty(dimension) {
    switch (dimension) {
    case -1:
      return this.createGeometryCollection()
    case 0:
      return this.createPoint()
    case 1:
      return this.createLineString()
    case 2:
      return this.createPolygon()
    default:
      throw new IllegalArgumentException('Invalid dimension: ' + dimension)
    }
  }
  toGeometry(envelope) {
    if (envelope.isNull()) 
      return this.createPoint()
    
    if (envelope.getMinX() === envelope.getMaxX() && envelope.getMinY() === envelope.getMaxY()) 
      return this.createPoint(new Coordinate(envelope.getMinX(), envelope.getMinY()))
    
    if (envelope.getMinX() === envelope.getMaxX() || envelope.getMinY() === envelope.getMaxY()) 
      return this.createLineString([new Coordinate(envelope.getMinX(), envelope.getMinY()), new Coordinate(envelope.getMaxX(), envelope.getMaxY())])
    
    return this.createPolygon(this.createLinearRing([new Coordinate(envelope.getMinX(), envelope.getMinY()), new Coordinate(envelope.getMinX(), envelope.getMaxY()), new Coordinate(envelope.getMaxX(), envelope.getMaxY()), new Coordinate(envelope.getMaxX(), envelope.getMinY()), new Coordinate(envelope.getMinX(), envelope.getMinY())]), null)
  }
  createLineString() {
    if (arguments.length === 0) 
      return this.createLineString(this.getCoordinateSequenceFactory().create([]))
    else if (arguments.length === 1) 
      if (arguments[0] instanceof Array) {
        const coordinates = arguments[0]
        return this.createLineString(coordinates !== null ? this.getCoordinateSequenceFactory().create(coordinates) : null)
      } else if (hasInterface(arguments[0], CoordinateSequence)) {
        const coordinates = arguments[0]
        return new LineString(coordinates, this)
      }
    
  }
  createMultiLineString() {
    if (arguments.length === 0) {
      return new MultiLineString(null, this)
    } else if (arguments.length === 1) {
      const lineStrings = arguments[0]
      return new MultiLineString(lineStrings, this)
    }
  }
  buildGeometry(geomList) {
    let geomType = null
    let isHeterogeneous = false
    let hasGeometryCollection = false
    for (let i = geomList.iterator(); i.hasNext(); ) {
      const geom = i.next()
      const partType = geom.getTypeCode()
      if (geomType === null) 
        geomType = partType
      
      if (partType !== geomType) 
        isHeterogeneous = true
      
      if (geom instanceof GeometryCollection) hasGeometryCollection = true
    }
    if (geomType === null) 
      return this.createGeometryCollection()
    
    if (isHeterogeneous || hasGeometryCollection) 
      return this.createGeometryCollection(GeometryFactory.toGeometryArray(geomList))
    
    const geom0 = geomList.iterator().next()
    const isCollection = geomList.size() > 1
    if (isCollection) {
      if (geom0 instanceof Polygon) 
        return this.createMultiPolygon(GeometryFactory.toPolygonArray(geomList))
      else if (geom0 instanceof LineString) 
        return this.createMultiLineString(GeometryFactory.toLineStringArray(geomList))
      else if (geom0 instanceof Point) 
        return this.createMultiPoint(GeometryFactory.toPointArray(geomList))
      
      Assert.shouldNeverReachHere('Unhandled geometry type: ' + geom0.getGeometryType())
    }
    return geom0
  }
  createMultiPointFromCoords(coordinates) {
    return this.createMultiPoint(coordinates !== null ? this.getCoordinateSequenceFactory().create(coordinates) : null)
  }
  createPoint() {
    if (arguments.length === 0) 
      return this.createPoint(this.getCoordinateSequenceFactory().create([]))
    else if (arguments.length === 1) 
      if (arguments[0] instanceof Coordinate) {
        const coordinate = arguments[0]
        return this.createPoint(coordinate !== null ? this.getCoordinateSequenceFactory().create([coordinate]) : null)
      } else if (hasInterface(arguments[0], CoordinateSequence)) {
        const coordinates = arguments[0]
        return new Point(coordinates, this)
      }
    
  }
  getCoordinateSequenceFactory() {
    return this._coordinateSequenceFactory
  }
  createPolygon() {
    if (arguments.length === 0) {
      return this.createPolygon(null, null)
    } else if (arguments.length === 1) {
      if (hasInterface(arguments[0], CoordinateSequence)) {
        const shell = arguments[0]
        return this.createPolygon(this.createLinearRing(shell))
      } else if (arguments[0] instanceof Array) {
        const shell = arguments[0]
        return this.createPolygon(this.createLinearRing(shell))
      } else if (arguments[0] instanceof LinearRing) {
        const shell = arguments[0]
        return this.createPolygon(shell, null)
      }
    } else if (arguments.length === 2) {
      const shell = arguments[0], holes = arguments[1]
      return new Polygon(shell, holes, this)
    }
  }
  getSRID() {
    return this._SRID
  }
  createGeometryCollection() {
    if (arguments.length === 0) {
      return new GeometryCollection(null, this)
    } else if (arguments.length === 1) {
      const geometries = arguments[0]
      return new GeometryCollection(geometries, this)
    }
  }
  getPrecisionModel() {
    return this._precisionModel
  }
  createLinearRing() {
    if (arguments.length === 0) 
      return this.createLinearRing(this.getCoordinateSequenceFactory().create([]))
    else if (arguments.length === 1) 
      if (arguments[0] instanceof Array) {
        const coordinates = arguments[0]
        return this.createLinearRing(coordinates !== null ? this.getCoordinateSequenceFactory().create(coordinates) : null)
      } else if (hasInterface(arguments[0], CoordinateSequence)) {
        const coordinates = arguments[0]
        return new LinearRing(coordinates, this)
      }
    
  }
  createMultiPolygon() {
    if (arguments.length === 0) {
      return new MultiPolygon(null, this)
    } else if (arguments.length === 1) {
      const polygons = arguments[0]
      return new MultiPolygon(polygons, this)
    }
  }
  createMultiPoint() {
    if (arguments.length === 0) 
      return new MultiPoint(null, this)
    else if (arguments.length === 1) 
      if (arguments[0] instanceof Array) {
        const point = arguments[0]
        return new MultiPoint(point, this)
      } else if (hasInterface(arguments[0], CoordinateSequence)) {
        const coordinates = arguments[0]
        if (coordinates === null) 
          return this.createMultiPoint(new Array(0).fill(null))
        
        const points = new Array(coordinates.size()).fill(null)
        for (let i = 0; i < coordinates.size(); i++) {
          const ptSeq = this.getCoordinateSequenceFactory().create(1, coordinates.getDimension(), coordinates.getMeasures())
          CoordinateSequences.copy(coordinates, i, ptSeq, 0, 1)
          points[i] = this.createPoint(ptSeq)
        }
        return this.createMultiPoint(points)
      }
    
  }
  get interfaces_() {
    return [Serializable]
  }
}
