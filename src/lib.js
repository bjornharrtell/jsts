import Coordinate from './org/locationtech/jts/geom/Coordinate'
import GeometryFactory from './org/locationtech/jts/geom/GeometryFactory'
import Geometry from './org/locationtech/jts/geom/Geometry'
import Point from './org/locationtech/jts/geom/Point'
import LineString from './org/locationtech/jts/geom/LineString'
import Polygon from './org/locationtech/jts/geom/MultiPolygon'
import GeometryCollection from './org/locationtech/jts/geom/GeometryCollection'
import MultiPoint from './org/locationtech/jts/geom/MultiPoint'
import MultiLineString from './org/locationtech/jts/geom/MultiLineString'
import MultiPolygon from './org/locationtech/jts/geom/MultiPolygon'
import GeoJSONReader from './org/locationtech/jts/io/GeoJSONReader'
import GeoJSONWriter from './org/locationtech/jts/io/GeoJSONWriter'
import WKTReader from './org/locationtech/jts/io/WKTReader'
import WKTWriter from './org/locationtech/jts/io/WKTWriter'
import olParser from './org/locationtech/jts/io/olParser'
import patch from './org/locationtech/jts/monkey'

(function () {
  patch()

  global.jsts = {
    geom: {
      Coordinate,
      GeometryFactory,
      Geometry,
      Point,
      LineString,
      Polygon,
      GeometryCollection,
      MultiPoint,
      MultiLineString,
      MultiPolygon
    },
    io: {
      GeoJSONReader,
      GeoJSONWriter,
      WKTReader,
      WKTWriter,
      olParser
    }
  }
})()
