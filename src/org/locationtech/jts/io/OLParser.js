 

/**
 * @module org/locationtech/jts/io/OL3Parser
 */

import LinearRing from 'ol/geom/LinearRing.js'
import Coordinate from '../geom/Coordinate.js'
import GeometryFactory from '../geom/GeometryFactory.js'
import LineString from 'ol/geom/LineString.js'
import MultiLineString from 'ol/geom/MultiLineString.js'
import MultiPoint from 'ol/geom/MultiPoint.js'
import MultiPolygon from 'ol/geom/MultiPolygon.js'
import Point from 'ol/geom/Point.js'
import Polygon from 'ol/geom/Polygon.js'
import SimpleGeometry from 'ol/geom/SimpleGeometry.js'
import GeometryCollection from 'ol/geom/GeometryCollection.js'

export default class OL3Parser {
  /**
   * OpenLayers Geometry parser and writer
   * @param {GeometryFactory} geometryFactory
   */
  constructor(geometryFactory, geometryLayout) {
    this.geometryFactory = geometryFactory || new GeometryFactory()
    this.geometryLayout = geometryLayout || 'XY'
    if (this.geometryLayout === 'XY') {
      this.p2c = p => [p.x, p.y]
      this.olp2c = c => new Coordinate(c[0], c[1])
    } else if (this.geometryLayout === 'XYZ') {
      this.p2c = p => [p.x, p.y, p.z]
      this.olp2c = c => new Coordinate(c[0], c[1], c[2])
    } else {
      throw new Error('Unsupported geometry layout: ' + this.geometryLayout)
    }
  }

  /**
   * @param geometry {SimpleGeometry}
   * @memberof module:org/locationtech/jts/io/OL3Parser#
   */
  read(geometry) {
    if (geometry instanceof Point)
      return this.convertFromPoint(geometry)
    else if (geometry instanceof LineString)
      return this.convertFromLineString(geometry)
    else if (geometry instanceof LinearRing)
      return this.convertFromLinearRing(geometry)
    else if (geometry instanceof Polygon)
      return this.convertFromPolygon(geometry)
    else if (geometry instanceof MultiPoint)
      return this.convertFromMultiPoint(geometry)
    else if (geometry instanceof MultiLineString)
      return this.convertFromMultiLineString(geometry)
    else if (geometry instanceof MultiPolygon)
      return this.convertFromMultiPolygon(geometry)
    else if (geometry instanceof GeometryCollection)
      return this.convertFromCollection(geometry)
  }

  convertFromPoint(point) {
    const coordinates = point.getCoordinates()
    return this.geometryFactory.createPoint(this.olp2c(coordinates))
  }

  convertFromLineString(lineString) {
    return this.geometryFactory.createLineString(lineString.getCoordinates().map(this.olp2c))
  }

  convertFromLinearRing(linearRing) {
    return this.geometryFactory.createLinearRing(linearRing.getCoordinates().map(this.olp2c))
  }

  convertFromPolygon(polygon) {
    const linearRings = polygon.getLinearRings()
    let shell = null
    const holes = []
    for (let i = 0; i < linearRings.length; i++) {
      const linearRing = this.convertFromLinearRing(linearRings[i])
      if (i === 0)
        shell = linearRing
      else holes.push(linearRing)
    }
    return this.geometryFactory.createPolygon(shell, holes)
  }

  convertFromMultiPoint(multiPoint) {
    const points = multiPoint.getPoints().map(function(point) {
      return this.convertFromPoint(point)
    }, this)
    return this.geometryFactory.createMultiPoint(points)
  }

  convertFromMultiLineString(multiLineString) {
    const lineStrings = multiLineString.getLineStrings().map(function(lineString) {
      return this.convertFromLineString(lineString)
    }, this)
    return this.geometryFactory.createMultiLineString(lineStrings)
  }

  convertFromMultiPolygon(multiPolygon) {
    const polygons = multiPolygon.getPolygons().map(function(polygon) {
      return this.convertFromPolygon(polygon)
    }, this)
    return this.geometryFactory.createMultiPolygon(polygons)
  }

  convertFromCollection(collection) {
    const geometries = collection.getGeometries().map(function(geometry) {
      return this.read(geometry)
    }, this)
    return this.geometryFactory.createGeometryCollection(geometries)
  }

  /**
   * @param geometry
   *          {Geometry}
   * @return {SimpleGeometry}
   * @memberof module:org/locationtech/jts/io/OL3Parser#
   */
  write(geometry) {
    if (geometry.getGeometryType() === 'Point')
      return this.convertToPoint(geometry.getCoordinate())
    else if (geometry.getGeometryType() === 'LineString')
      return this.convertToLineString(geometry)
    else if (geometry.getGeometryType() === 'LinearRing')
      return this.convertToLinearRing(geometry)
    else if (geometry.getGeometryType() === 'Polygon')
      return this.convertToPolygon(geometry)
    else if (geometry.getGeometryType() === 'MultiPoint')
      return this.convertToMultiPoint(geometry)
    else if (geometry.getGeometryType() === 'MultiLineString')
      return this.convertToMultiLineString(geometry)
    else if (geometry.getGeometryType() === 'MultiPolygon')
      return this.convertToMultiPolygon(geometry)
    else if (geometry.getGeometryType() === 'GeometryCollection') return this.convertToCollection(geometry)
  }

  convertToPoint(coordinate) {
    return new Point(this.p2c(coordinate), this.geometryLayout)
  }

  convertToLineString(lineString) {
    const points = lineString._points._coordinates.map(this.p2c)
    return new LineString(points)
  }

  convertToLinearRing(linearRing) {
    const points = linearRing._points._coordinates.map(this.p2c)
    return new LinearRing(points)
  }

  convertToPolygon(polygon) {
    const rings = [polygon._shell._points._coordinates.map(this.p2c)]
    for (let i = 0; i < polygon._holes.length; i++) rings.push(polygon._holes[i]._points._coordinates.map(this.p2c))

    return new Polygon(rings)
  }

  convertToMultiPoint(multiPoint) {
    return new MultiPoint(multiPoint.getCoordinates().map(this.p2c))
  }

  convertToMultiLineString(multiLineString) {
    const lineStrings = []
    for (let i = 0; i < multiLineString._geometries.length; i++) lineStrings.push(this.convertToLineString(multiLineString._geometries[i]).getCoordinates())

    return new MultiLineString(lineStrings)
  }

  convertToMultiPolygon(multiPolygon) {
    const polygons = []
    for (let i = 0; i < multiPolygon._geometries.length; i++) polygons.push(this.convertToPolygon(multiPolygon._geometries[i]).getCoordinates())

    return new MultiPolygon(polygons)
  }

  convertToCollection(geometryCollection) {
    const geometries = []
    for (let i = 0; i < geometryCollection._geometries.length; i++) {
      const geometry = geometryCollection._geometries[i]
      geometries.push(this.write(geometry))
    }
    return new GeometryCollection(geometries)
  }
}
