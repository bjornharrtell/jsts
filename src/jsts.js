
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

import Densifier from './org/locationtech/jts/densify/Densifier'
import LineDissolver from './org/locationtech/jts/dissolve/LineDissolver'

import GeoJSONReader from './org/locationtech/jts/io/GeoJSONReader'
import GeoJSONWriter from './org/locationtech/jts/io/GeoJSONWriter'
import WKTReader from './org/locationtech/jts/io/WKTReader'
import WKTWriter from './org/locationtech/jts/io/WKTWriter'
import olParser from './org/locationtech/jts/io/olParser'

import BoundaryOp from './org/locationtech/jts/operation/BoundaryOp'
import IsSimpleOp from './org/locationtech/jts/operation/IsSimpleOp'
import BufferOp from './org/locationtech/jts/operation/buffer/BufferOp'
import DistanceOp from './org/locationtech/jts/operation/distance/DistanceOp'
import LineMerger from './org/locationtech/jts/operation/linemerge/LineMerger'
import OverlayOp from './org/locationtech/jts/operation/overlay/OverlayOp'
import Polygonizer from './org/locationtech/jts/operation/polygonize/Polygonizer'
import RelateOp from './org/locationtech/jts/operation/relate/RelateOp'
import CascadedPolygonUnion from './org/locationtech/jts/operation/union/CascadedPolygonUnion'
import UnaryUnionOp from './org/locationtech/jts/operation/union/UnaryUnionOp'
import IsValidOp from './org/locationtech/jts/operation/valid/IsValidOp'

// import GeometryPrecisionReducer from './org/locationtech/jts/precision/GeometryPrecisionReducer'

import DouglasPeuckerSimplifier from './org/locationtech/jts/simplify/DouglasPeuckerSimplifier'
import TopologyPreservingSimplifier from './org/locationtech/jts/simplify/TopologyPreservingSimplifier'

import patch from './org/locationtech/jts/monkey'

(function () {
  patch()
})()

export default {
  densify: {
    Densifier
  },
  dissolve: {
    LineDissolver
  },
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
  },
  operation: {
    BoundaryOp,
    IsSimpleOp,
    buffer: {
      BufferOp
    },
    distance: {
      DistanceOp
    },
    linemerge: {
      LineMerger
    },
    overlay: {
      OverlayOp
    },
    polygonize: {
      Polygonizer
    },
    relate: {
      RelateOp
    },
    union: {
      CascadedPolygonUnion,
      UnaryUnionOp
    },
    valid: {
      IsValidOp
    }
  },
/*
  precision: {
    GeometryPrecisionReducer
  },
*/
  simplify: {
    DouglasPeuckerSimplifier,
    TopologyPreservingSimplifier
  }
}
