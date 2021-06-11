import Coordinate from '../geom/Coordinate'
import GeometryFactory from '../geom/GeometryFactory'

const geometryTypes = ['Point', 'MultiPoint', 'LineString', 'MultiLineString', 'Polygon', 'MultiPolygon']

/**
 * Class for reading and writing Well-Known Text.Create a new parser for GeoJSON
 * NOTE: Adapted from OpenLayers 2.11 implementation.
 */

/**
 * Create a new parser for GeoJSON
 *
 * @param {GeometryFactory} geometryFactory
 * @return An instance of GeoJsonParser.
 * @constructor
 * @private
 */
export default class GeoJSONParser {
  constructor(geometryFactory) {
    this.geometryFactory = geometryFactory || new GeometryFactory()
  }

  /**
   * Deserialize a GeoJSON object and return the Geometry or Feature(Collection) with JSTS Geometries
   *
   * @param {}
   *          A GeoJSON object.
   * @return {} A Geometry instance or object representing a Feature(Collection) with Geometry instances.
   * @private
   */
  read(json) {
    let obj
    if (typeof json === 'string')
      obj = JSON.parse(json)
    else obj = json

    const type = obj.type

    if (!parse[type]) throw new Error('Unknown GeoJSON type: ' + obj.type)

    if (geometryTypes.indexOf(type) !== -1)
      return parse[type].call(this, obj.coordinates)
    else if (type === 'GeometryCollection') return parse[type].call(this, obj.geometries)

    // feature or feature collection
    return parse[type].call(this, obj)
  }

  /**
   * Serialize a Geometry object into GeoJSON
   *
   * @param {Geometry}
   *          geometry A Geometry or array of Geometries.
   * @return {Object} A GeoJSON object represting the input Geometry/Geometries.
   * @private
   */
  write(geometry) {
    const type = geometry.getGeometryType()

    if (!extract[type]) throw new Error('Geometry is not supported')

    return extract[type].call(this, geometry)
  }
}

const parse = {
  /**
   * Parse a GeoJSON Feature object
   *
   * @param {Object}
   *          obj Object to parse.
   *
   * @return {Object} Feature with geometry/bbox converted to JSTS Geometries.
   */
  Feature: function(obj) {
    const feature = {}

    for (const key in obj) feature[key] = obj[key]

    if (obj.geometry) {
      const type = obj.geometry.type
      if (!parse[type]) throw new Error('Unknown GeoJSON type: ' + obj.type)
      feature.geometry = this.read(obj.geometry)
    }

    if (obj.bbox) feature.bbox = parse.bbox.call(this, obj.bbox)

    return feature
  },

  /**
   * Parse a GeoJSON FeatureCollection object
   *
   * @param {Object}
   *          obj Object to parse.
   *
   * @return {Object} FeatureCollection with geometry/bbox converted to JSTS Geometries.
   */
  FeatureCollection: function(obj) {
    const featureCollection = {}

    if (obj.features) {
      featureCollection.features = []

      for (let i = 0; i < obj.features.length; ++i) featureCollection.features.push(this.read(obj.features[i]))
    }

    if (obj.bbox) featureCollection.bbox = this.parse.bbox.call(this, obj.bbox)

    return featureCollection
  },

  /**
   * Convert the ordinates in an array to an array of Coordinates
   *
   * @param {Array}
   *          array Array with {Number}s.
   *
   * @return {Array} Array with Coordinates.
   */
  coordinates: function(array) {
    const coordinates = []
    for (let i = 0; i < array.length; ++i) {
      const sub = array[i]
      coordinates.push(new Coordinate(...sub))
    }
    return coordinates
  },

  /**
   * Convert the bbox to a LinearRing
   *
   * @param {Array}
   *          array Array with [xMin, yMin, xMax, yMax].
   *
   * @return {Array} Array with Coordinates.
   */
  bbox: function(array) {
    return this.geometryFactory.createLinearRing([
      new Coordinate(array[0], array[1]),
      new Coordinate(array[2], array[1]),
      new Coordinate(array[2], array[3]),
      new Coordinate(array[0], array[3]),
      new Coordinate(array[0], array[1])
    ])
  },

  /**
   * Convert an Array with ordinates to a Point
   *
   * @param {Array}
   *          array Array with ordinates.
   *
   * @return {Point} Point.
   */
  Point: function(array) {
    const coordinate = new Coordinate(...array)
    return this.geometryFactory.createPoint(coordinate)
  },

  /**
   * Convert an Array with coordinates to a MultiPoint
   *
   * @param {Array}
   *          array Array with coordinates.
   *
   * @return {MultiPoint} MultiPoint.
   */
  MultiPoint: function(array) {
    const points = []
    for (let i = 0; i < array.length; ++i) points.push(parse.Point.call(this, array[i]))
    return this.geometryFactory.createMultiPoint(points)
  },

  /**
   * Convert an Array with coordinates to a LineString
   *
   * @param {Array}
   *          array Array with coordinates.
   *
   * @return {LineString} LineString.
   */
  LineString: function(array) {
    const coordinates = parse.coordinates.call(this, array)
    return this.geometryFactory.createLineString(coordinates)
  },

  /**
   * Convert an Array with coordinates to a MultiLineString
   *
   * @param {Array}
   *          array Array with coordinates.
   *
   * @return {MultiLineString} MultiLineString.
   */
  MultiLineString: function(array) {
    const lineStrings = []
    for (let i = 0; i < array.length; ++i) lineStrings.push(parse.LineString.call(this, array[i]))
    return this.geometryFactory.createMultiLineString(lineStrings)
  },

  /**
   * Convert an Array to a Polygon
   *
   * @param {Array}
   *          array Array with shell and holes.
   *
   * @return {Polygon} Polygon.
   */
  Polygon: function(array) {
    const shellCoordinates = parse.coordinates.call(this, array[0])
    const shell = this.geometryFactory.createLinearRing(shellCoordinates)
    const holes = []
    for (let i = 1; i < array.length; ++i) {
      const hole = array[i]
      const coordinates = parse.coordinates.call(this, hole)
      const linearRing = this.geometryFactory.createLinearRing(coordinates)
      holes.push(linearRing)
    }
    return this.geometryFactory.createPolygon(shell, holes)
  },

  /**
   * Convert an Array to a MultiPolygon
   *
   * @param {Array}
   *          array Array of arrays with shell and rings.
   *
   * @return {MultiPolygon} MultiPolygon.
   */
  MultiPolygon: function(array) {
    const polygons = []
    for (let i = 0; i < array.length; ++i) {
      const polygon = array[i]
      polygons.push(parse.Polygon.call(this, polygon))
    }
    return this.geometryFactory.createMultiPolygon(polygons)
  },

  /**
   * Convert an Array to a GeometryCollection
   *
   * @param {Array}
   *          array Array of GeoJSON geometries.
   *
   * @return {GeometryCollection} GeometryCollection.
   */
  GeometryCollection: function(array) {
    const geometries = []
    for (let i = 0; i < array.length; ++i) {
      const geometry = array[i]
      geometries.push(this.read(geometry))
    }
    return this.geometryFactory.createGeometryCollection(geometries)
  }
}

const extract = {
  /**
   * Convert a Coordinate to an Array
   *
   * @param {Coordinate}
   *          coordinate Coordinate to convert.
   *
   * @return {Array} Array of ordinates.
   */
  coordinate: function(coordinate) {
    const a = [coordinate.x, coordinate.y]
    if (coordinate.z)
      a.push(coordinate.z)
    if (coordinate.m)
      a.push(coordinate.m)
    return a
  },

  /**
   * Convert a Point to a GeoJSON object
   *
   * @param {Point}
   *          point Point to convert.
   *
   * @return {Array} Array of 2 ordinates (paired to a coordinate).
   */
  Point: function(point) {
    const array = extract.coordinate.call(this, point.getCoordinate())
    return {
      type: 'Point',
      coordinates: array
    }
  },

  /**
   * Convert a MultiPoint to a GeoJSON object
   *
   * @param {MultiPoint}
   *          multipoint MultiPoint to convert.
   *
   * @return {Array} Array of coordinates.
   */
  MultiPoint: function(multipoint) {
    const array = []
    for (let i = 0; i < multipoint._geometries.length; ++i) {
      const point = multipoint._geometries[i]
      const geoJson = extract.Point.call(this, point)
      array.push(geoJson.coordinates)
    }
    return {
      type: 'MultiPoint',
      coordinates: array
    }
  },

  /**
   * Convert a LineString to a GeoJSON object
   *
   * @param {LineString}
   *          linestring LineString to convert.
   *
   * @return {Array} Array of coordinates.
   */
  LineString: function(linestring) {
    const array = []
    const coordinates = linestring.getCoordinates()
    for (let i = 0; i < coordinates.length; ++i) {
      const coordinate = coordinates[i]
      array.push(extract.coordinate.call(this, coordinate))
    }
    return {
      type: 'LineString',
      coordinates: array
    }
  },

  /**
   * Convert a MultiLineString to a GeoJSON object
   *
   * @param {MultiLineString}
   *          multilinestring MultiLineString to convert.
   *
   * @return {Array} Array of Array of coordinates.
   */
  MultiLineString: function(multilinestring) {
    const array = []
    for (let i = 0; i < multilinestring._geometries.length; ++i) {
      const linestring = multilinestring._geometries[i]
      const geoJson = extract.LineString.call(this, linestring)
      array.push(geoJson.coordinates)
    }
    return {
      type: 'MultiLineString',
      coordinates: array
    }
  },

  /**
   * Convert a Polygon to a GeoJSON object
   *
   * @param {Polygon}
   *          polygon Polygon to convert.
   *
   * @return {Array} Array with shell, holes.
   */
  Polygon: function(polygon) {
    const array = []
    const shellGeoJson = extract.LineString.call(this, polygon._shell)
    array.push(shellGeoJson.coordinates)
    for (let i = 0; i < polygon._holes.length; ++i) {
      const hole = polygon._holes[i]
      const holeGeoJson = extract.LineString.call(this, hole)
      array.push(holeGeoJson.coordinates)
    }
    return {
      type: 'Polygon',
      coordinates: array
    }
  },

  /**
   * Convert a MultiPolygon to a GeoJSON object
   *
   * @param {MultiPolygon}
   *          multipolygon MultiPolygon to convert.
   *
   * @return {Array} Array of polygons.
   */
  MultiPolygon: function(multipolygon) {
    const array = []
    for (let i = 0; i < multipolygon._geometries.length; ++i) {
      const polygon = multipolygon._geometries[i]
      const geoJson = extract.Polygon.call(this, polygon)
      array.push(geoJson.coordinates)
    }
    return {
      type: 'MultiPolygon',
      coordinates: array
    }
  },

  /**
   * Convert a GeometryCollection to a GeoJSON object
   *
   * @param {GeometryCollection}
   *          collection GeometryCollection to convert.
   *
   * @return {Array} Array of geometries.
   */
  GeometryCollection: function(collection) {
    const array = []
    for (let i = 0; i < collection._geometries.length; ++i) {
      const geometry = collection._geometries[i]
      const type = geometry.getGeometryType()
      array.push(extract[type].call(this, geometry))
    }
    return {
      type: 'GeometryCollection',
      geometries: array
    }
  }
}
