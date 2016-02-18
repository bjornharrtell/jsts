/**
 * Copyright (c) 2016 by Björn Harrtell.
 * License: https://github.com/bjornharrtell/jsts/blob/master/LICENSE_BHARRTELL_BSD3.txt
 * @module
 */

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
