import './Array'
import './Number'
import './Math'

import * as geom from './org/locationtech/jts/geom'
import * as algorithm from './org/locationtech/jts/algorithm'
import * as densify from './org/locationtech/jts/densify'
import * as dissolve from './org/locationtech/jts/dissolve'
import * as geomgraph from './org/locationtech/jts/geomgraph'
import * as index from './org/locationtech/jts/index'
import * as io from './org/locationtech/jts/io'
import * as noding from './org/locationtech/jts/noding'
import * as operation from './org/locationtech/jts/operation'
import * as precision from './org/locationtech/jts/precision'
import * as simplify from './org/locationtech/jts/simplify'
import * as triangulate from './org/locationtech/jts/triangulate'
import * as linearref from './org/locationtech/jts/linearref'

import './org/locationtech/jts/monkey'

const version = 'npm_package_version (git_hash)'
export {
  version,
  algorithm,
  densify,
  dissolve,
  geom,
  geomgraph,
  index,
  io,
  noding,
  operation,
  precision,
  simplify,
  triangulate,
  linearref
}

// Additional named exports
export {
  Coordinate,
  CoordinateArrays,
  CoordinateFilter,
  CoordinateList,
  CoordinateSequence,
  CoordinateSequenceComparator,
  CoordinateSequenceFactory,
  CoordinateSequenceFilter,
  CoordinateSequences,
  Dimension,
  Envelope,
  Geometry,
  GeometryCollection,
  GeometryCollectionIterator,
  GeometryComponentFilter,
  GeometryFactory,
  GeometryFilter,
  IntersectionMatrix,
  LineSegment,
  LineString,
  Lineal,
  LinearRing,
  Location,
  MultiLineString,
  MultiPoint,
  MultiPolygon,
  OctagonalEnvelope,
  Point,
  Polygon,
  Polygonal,
  PrecisionModel,
  Puntal,
  TopologyException,
  Triangle,
} from './org/locationtech/jts/geom';
export {
  Centroid,
  CGAlgorithms,
  ConvexHull,
  InteriorPointArea,
  InteriorPointLine,
  InteriorPointPoint,
  RobustLineIntersector,
  MCPointInRing,
  MinimumBoundingCircle,
  MinimumDiameter,
  DiscreteHausdorffDistance,
  DistanceToPoint,
  PointPairDistance,
} from './org/locationtech/jts/algorithm';
export { Densifier } from './org/locationtech/jts/densify'
export { LineDissolver } from './org/locationtech/jts/dissolve'
export { GeometryGraph } from './org/locationtech/jts/geomgraph'
export { quadtree, strtree, Quadtree, STRtree } from './org/locationtech/jts/index'
export { GeoJSONReader, GeoJSONWriter, WKTReader, WKTWriter, OL3Parser} from './org/locationtech/jts/io'
export { MCIndexNoder, ScaledNoder, SegmentString} from './org/locationtech/jts/noding'
export {
  overlay,
  relate,
  BoundaryOp,
  IsSimpleOp,
  distance,
  linemerge,
  polygonize,
  union,
  valid
} from './org/locationtech/jts/operation'
export { GeometryPrecisionReducer } from './org/locationtech/jts/precision'
export { DouglasPeuckerSimplifier, TopologyPreservingSimplifier} from './org/locationtech/jts/simplify'
export {
  ConformingDelaunayTriangulationBuilder,
  DelaunayTriangulationBuilder,
  VoronoiDiagramBuilder,
  quadedge
} from './org/locationtech/jts/triangulate'
export {
  LengthIndexedLine,
  LengthLocationMap,
  LinearGeometryBuilder,
  LinearIterator,
  LinearLocation,
  LocationIndexedLine,
} from './org/locationtech/jts/linearref'
export {
  BufferBuilder,
  BufferInputLineSimplifier,
  BufferOp,
  BufferParameters,
  BufferSubgraph,
  OffsetCurveBuilder,
  OffsetCurveSetBuilder,
  OffsetSegmentGenerator,
  OffsetSegmentString,
  RightmostEdgeFinder,
  SubgraphDepthLocater,
  ConnectedElementLocationFilter,
  ConnectedElementPointFilter,
  DistanceOp,
  FacetSequence,
  FacetSequenceTreeBuilder,
  GeometryLocation,
  IndexedFacetDistance,
  AxisPlaneCoordinateSequence,
  Distance3DOp,
  PlanarPolygon3D,
  EdgeString,
  LineMergeDirectedEdge,
  LineMergeEdge,
  LineMergeGraph,
  LineMerger,
  LineSequencer,
  ConsistentPolygonRingChecker,
  EdgeSetNoder,
  LineBuilder,
  MaximalEdgeRing,
  MinimalEdgeRing,
  OverlayNodeFactory,
  OverlayOp,
  PointBuilder,
  PolygonBuilder,
  EdgeRing,
  PolygonizeDirectedEdge,
  PolygonizeEdge,
  PolygonizeGraph,
  Polygonizer,
  RectangleContains,
  RectangleIntersects,
  EdgeEndBuilder,
  EdgeEndBundle,
  EdgeEndBundleStar,
  RelateComputer,
  RelateNode,
  RelateNodeFactory,
  RelateNodeGraph,
  RelateOp,
  CascadedPolygonUnion,
  PointGeometryUnion,
  UnaryUnionOp,
  UnionInteracting,
  UnionOp,
  ConnectedInteriorTester,
  ConsistentAreaTester,
  IndexedNestedRingTester,
  IsValidOp,
  QuadtreeNestedRingTester,
  RepeatedPointTester,
  SimpleNestedRingTester,
  SweeplineNestedRingTester,
  TopologyValidationError,
} from './org/locationtech/jts/operation'
