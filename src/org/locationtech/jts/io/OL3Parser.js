/*eslint-disable no-undef */

import Coordinate from '../geom/Coordinate'
import GeometryFactory from '../geom/GeometryFactory'
import extend from '../../../../extend'

function p2c (p) { return [p.x, p.y] }

/**
 * OpenLayers 3 Geometry parser and writer
 * @param {GeometryFactory} geometryFactory
 * @param {ol} olReference
 * @constructor
 */
export default function OL3Parser (geometryFactory, olReference) {
  this.geometryFactory = geometryFactory || new GeometryFactory()
  this.ol = olReference || (typeof ol !== 'undefined' && ol)
}

extend(OL3Parser.prototype, {
  /**
   * @param geometry {ol.geom.Geometry}
   * @return {Geometry}
   * @memberof OL3Parser
   */
  read (geometry) {
    const ol = this.ol
    if (geometry instanceof ol.geom.Point) {
      return this.convertFromPoint(geometry)
    } else if (geometry instanceof ol.geom.LineString) {
      return this.convertFromLineString(geometry)
    } else if (geometry instanceof ol.geom.LinearRing) {
      return this.convertFromLinearRing(geometry)
    } else if (geometry instanceof ol.geom.Polygon) {
      return this.convertFromPolygon(geometry)
    } else if (geometry instanceof ol.geom.MultiPoint) {
      return this.convertFromMultiPoint(geometry)
    } else if (geometry instanceof ol.geom.MultiLineString) {
      return this.convertFromMultiLineString(geometry)
    } else if (geometry instanceof ol.geom.MultiPolygon) {
      return this.convertFromMultiPolygon(geometry)
    } else if (geometry instanceof ol.geom.GeometryCollection) {
      return this.convertFromCollection(geometry)
    }
  },

  convertFromPoint (point) {
    const coordinates = point.getCoordinates()
    return this.geometryFactory.createPoint(new Coordinate(coordinates[0], coordinates[1]))
  },

  convertFromLineString (lineString) {
    return this.geometryFactory.createLineString(lineString.getCoordinates().map(function (coordinates) {
      return new Coordinate(coordinates[0], coordinates[1])
    }))
  },

  convertFromLinearRing (linearRing) {
    return this.geometryFactory.createLinearRing(linearRing.getCoordinates().map(function (coordinates) {
      return new Coordinate(coordinates[0], coordinates[1])
    }))
  },

  convertFromPolygon (polygon) {
    const linearRings = polygon.getLinearRings()
    var shell = null
    var holes = []
    for (let i = 0; i < linearRings.length; i++) {
      const linearRing = this.convertFromLinearRing(linearRings[i])
      if (i === 0) {
        shell = linearRing
      } else {
        holes.push(linearRing)
      }
    }
    return this.geometryFactory.createPolygon(shell, holes)
  },

  convertFromMultiPoint (multiPoint) {
    const points = multiPoint.getPoints().map(function (point) {
      return this.convertFromPoint(point)
    }, this)
    return this.geometryFactory.createMultiPoint(points)
  },

  convertFromMultiLineString (multiLineString) {
    const lineStrings = multiLineString.getLineStrings().map(function (lineString) {
      return this.convertFromLineString(lineString)
    }, this)
    return this.geometryFactory.createMultiLineString(lineStrings)
  },

  convertFromMultiPolygon (multiPolygon) {
    const polygons = multiPolygon.getPolygons().map(function (polygon) {
      return this.convertFromPolygon(polygon)
    }, this)
    return this.geometryFactory.createMultiPolygon(polygons)
  },

  convertFromCollection (collection) {
    const geometries = collection.getGeometries().map(function (geometry) {
      return this.read(geometry)
    }, this)
    return this.geometryFactory.createGeometryCollection(geometries)
  },

  /**
   * @param geometry
   *          {Geometry}
   * @return {ol.geom.Geometry}
   * @memberof! OL3Parser
   */
  write (geometry) {
    if (geometry.getGeometryType() === 'Point') {
      return this.convertToPoint(geometry.getCoordinate())
    } else if (geometry.getGeometryType() === 'LineString') {
      return this.convertToLineString(geometry)
    } else if (geometry.getGeometryType() === 'LinearRing') {
      return this.convertToLinearRing(geometry)
    } else if (geometry.getGeometryType() === 'Polygon') {
      return this.convertToPolygon(geometry)
    } else if (geometry.getGeometryType() === 'MultiPoint') {
      return this.convertToMultiPoint(geometry)
    } else if (geometry.getGeometryType() === 'MultiLineString') {
      return this.convertToMultiLineString(geometry)
    } else if (geometry.getGeometryType() === 'MultiPolygon') {
      return this.convertToMultiPolygon(geometry)
    } else if (geometry.getGeometryType() === 'GeometryCollection') {
      return this.convertToCollection(geometry)
    }
  },

  convertToPoint (coordinate) {
    return new this.ol.geom.Point([coordinate.x, coordinate.y])
  },

  convertToLineString (lineString) {
    var points = lineString.points.coordinates.map(p2c)
    return new this.ol.geom.LineString(points)
  },

  convertToLinearRing (linearRing) {
    var points = linearRing.points.coordinates.map(p2c)
    return new this.ol.geom.LinearRing(points)
  },

  convertToPolygon (polygon) {
    var rings = [polygon.shell.points.coordinates.map(p2c)]
    for (let i = 0; i < polygon.holes.length; i++) {
      rings.push(polygon.holes[i].points.coordinates.map(p2c))
    }
    return new this.ol.geom.Polygon(rings)
  },

  convertToMultiPoint (multiPoint) {
    return new this.ol.geom.MultiPoint(multiPoint.getCoordinates().map(p2c))
  },

  convertToMultiLineString (multiLineString) {
    var lineStrings = []
    for (let i = 0; i < multiLineString.geometries.length; i++) {
      lineStrings.push(this.convertToLineString(multiLineString.geometries[i]).getCoordinates())
    }
    return new this.ol.geom.MultiLineString(lineStrings)
  },

  convertToMultiPolygon (multiPolygon) {
    var polygons = []
    for (let i = 0; i < multiPolygon.geometries.length; i++) {
      polygons.push(this.convertToPolygon(multiPolygon.geometries[i]).getCoordinates())
    }
    return new this.ol.geom.MultiPolygon(polygons)
  },

  convertToCollection (geometryCollection) {
    var geometries = []
    for (let i = 0; i < geometryCollection.geometries.length; i++) {
      var geometry = geometryCollection.geometries[i]
      geometries.push(this.write(geometry))
    }
    return new this.ol.geom.GeometryCollection(geometries)
  }
})
