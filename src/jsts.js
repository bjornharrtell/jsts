/**
 * Copyright (c) 2016 by Björn Harrtell.
 * License: https://github.com/bjornharrtell/jsts/blob/master/LICENSE_BHARRTELL_BSD3.txt
 * @module
 */

import 'es6-collections'

if (![].fill) {
  Array.prototype.fill = function (value) {
    var O = Object(this)
    var len = parseInt(O.length, 10)
    var start = arguments[1]
    var relativeStart = parseInt(start, 10) || 0
    var k = relativeStart < 0
      ? Math.max(len + relativeStart, 0)
      : Math.min(relativeStart, len)
    var end = arguments[2]
    var relativeEnd = end === undefined
      ? len
      : (parseInt(end, 10) || 0)
    var final = relativeEnd < 0
      ? Math.max(len + relativeEnd, 0)
      : Math.min(relativeEnd, len)
    for (; k < final; k++) {
      O[k] = value
    }
    return O
  }
}

import Coordinate from './org/locationtech/jts/geom/Coordinate'
import Envelope from './org/locationtech/jts/geom/Envelope'
import LineSegment from './org/locationtech/jts/geom/LineSegment'
import GeometryFactory from './org/locationtech/jts/geom/GeometryFactory'
import Geometry from './org/locationtech/jts/geom/Geometry'
import Point from './org/locationtech/jts/geom/Point'
import LineString from './org/locationtech/jts/geom/LineString'
import LinearRing from './org/locationtech/jts/geom/LinearRing'
import Polygon from './org/locationtech/jts/geom/Polygon'
import GeometryCollection from './org/locationtech/jts/geom/GeometryCollection'
import MultiPoint from './org/locationtech/jts/geom/MultiPoint'
import MultiLineString from './org/locationtech/jts/geom/MultiLineString'
import MultiPolygon from './org/locationtech/jts/geom/MultiPolygon'
import Dimension from './org/locationtech/jts/geom/Dimension'
import IntersectionMatrix from './org/locationtech/jts/geom/IntersectionMatrix'

import Centroid from './org/locationtech/jts/algorithm/Centroid'
import CGAlgorithms from './org/locationtech/jts/algorithm/CGAlgorithms'
import ConvexHull from './org/locationtech/jts/algorithm/ConvexHull'
import InteriorPointArea from './org/locationtech/jts/algorithm/InteriorPointArea'
import InteriorPointLine from './org/locationtech/jts/algorithm/InteriorPointLine'
import InteriorPointPoint from './org/locationtech/jts/algorithm/InteriorPointPoint'
import RobustLineIntersector from './org/locationtech/jts/algorithm/RobustLineIntersector'
import MinimumBoundingCircle from './org/locationtech/jts/algorithm/MinimumBoundingCircle'
import MinimumDiameter from './org/locationtech/jts/algorithm/MinimumDiameter'

import Densifier from './org/locationtech/jts/densify/Densifier'
import LineDissolver from './org/locationtech/jts/dissolve/LineDissolver'

import Quadtree from './org/locationtech/jts/index/quadtree/Quadtree'
import STRtree from './org/locationtech/jts/index/strtree/STRtree'

import io from './org/locationtech/jts/io'

import MCIndexNoder from './org/locationtech/jts/noding/MCIndexNoder'
import ScaledNoder from './org/locationtech/jts/noding/ScaledNoder'
import SegmentString from './org/locationtech/jts/noding/SegmentString'

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

import GeometryPrecisionReducer from './org/locationtech/jts/precision/GeometryPrecisionReducer'

import DouglasPeuckerSimplifier from './org/locationtech/jts/simplify/DouglasPeuckerSimplifier'
import TopologyPreservingSimplifier from './org/locationtech/jts/simplify/TopologyPreservingSimplifier'

import ConformingDelaunayTriangulationBuilder from './org/locationtech/jts/triangulate/ConformingDelaunayTriangulationBuilder'
import DelaunayTriangulationBuilder from './org/locationtech/jts/triangulate/DelaunayTriangulationBuilder'
import VoronoiDiagramBuilder from './org/locationtech/jts/triangulate/VoronoiDiagramBuilder'

import patch from './org/locationtech/jts/monkey'

(function () {
  patch()
})()

/** @module */
export default {
  version: `${process.env.npm_package_version} (${process.env.GITHASH})`,
  algorithm: {
    Centroid,
    CGAlgorithms,
    ConvexHull,
    InteriorPointArea,
    InteriorPointLine,
    InteriorPointPoint,
    RobustLineIntersector,
    MinimumBoundingCircle,
    MinimumDiameter
  },
  densify: {
    Densifier
  },
  dissolve: {
    LineDissolver
  },
  geom: {
    Coordinate,
    Envelope,
    LineSegment,
    GeometryFactory,
    Geometry,
    Point,
    LineString,
    LinearRing,
    Polygon,
    GeometryCollection,
    MultiPoint,
    MultiLineString,
    MultiPolygon,
    Dimension,
    IntersectionMatrix
  },
  index: {
    quadtree: {
      Quadtree
    },
    strtree: {
      STRtree
    }
  },
  /**
   * @memberof module:jsts
   */
  io: io,
  noding: {
    MCIndexNoder,
    ScaledNoder,
    SegmentString
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
  precision: {
    GeometryPrecisionReducer
  },
  simplify: {
    DouglasPeuckerSimplifier,
    TopologyPreservingSimplifier
  },
  triangulate: {
    ConformingDelaunayTriangulationBuilder,
    DelaunayTriangulationBuilder,
    VoronoiDiagramBuilder
  }
}
