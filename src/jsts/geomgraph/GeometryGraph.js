/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */


/**
 * A GeometryGraph is a graph that models a given Geometry
 *
 * @param {int}
 *          argIndex
 * @param {Geometry}
 *          parentGeom
 * @param {BoundaryNodeRule}
 *          boundaryNodeRule
 * @augments jsts.planargraph.PlanarGraph
 */
jsts.geomgraph.GeometryGraph = function(argIndex, parentGeom, boundaryNodeRule) {
  this.lineEdgeMap = {};
  this.ptLocator = new jsts.algorithm.PointLocator();

  this.argIndex = argIndex;
  this.parentGeom = parentGeom;
  this.boundaryNodeRule = boundaryNodeRule ? boundaryNodeRule
      : jsts.algorithm.BoundaryNodeRule.OGC_SFS_BOUNDARY_RULE;
  if (parentGeom != null) {
    this.add(parentGeom);
  }
};

jsts.geomgraph.GeometryGraph.prototype = new jsts.geomgraph.PlanarGraph();


/**
 * @param {BoundaryNodeRule}
 *          boundaryNodeRule
 * @param {int}
 *          boundaryCount
 * @return {int}
 */
jsts.geomgraph.GeometryGraph.determineBoundary = function(boundaryNodeRule,
    boundaryCount) {
  return boundaryNodeRule.isInBoundary(boundaryCount) ? Location.BOUNDARY
      : Location.INTERIOR;
};


/**
 * @type {Geometry}
 */
jsts.geomgraph.GeometryGraph.prototype.parentGeom = null;


/**
 * The lineEdgeMap is a map of the linestring components of the parentGeometry
 * to the edges which are derived from them. This is used to efficiently perform
 * findEdge queries
 *
 * @type {Map}
 * @private
 */
jsts.geomgraph.GeometryGraph.prototype.lineEdgeMap = null;


/**
 * @type {BoundaryNodeRule}
 */
jsts.geomgraph.GeometryGraph.prototype.boundaryNodeRule = null;


/**
 * If this flag is true, the Boundary Determination Rule will used when deciding
 * whether nodes are in the boundary or not
 */
/**
 * @type {boolean}
 * @private
 */
jsts.geomgraph.GeometryGraph.prototype.useBoundaryDeterminationRule = true;


/**
 * @type {int}
 * @private
 */
jsts.geomgraph.GeometryGraph.prototype.argIndex; // the index of this geometry
// as an argument to a
// spatial function (used for
// labelling)


/**
 * @type {Collection}
 * @private
 */
jsts.geomgraph.GeometryGraph.prototype.boundaryNodes;


/**
 * @type {Coordinate}
 * @private
 */
jsts.geomgraph.GeometryGraph.prototype.hasTooFewPoints = false;


/**
 * @type {Coordinate}
 * @private
 */
jsts.geomgraph.GeometryGraph.prototype.invalidPoint = null;


/**
 * @type {PointOnGeometryLocator}
 * @private
 */
jsts.geomgraph.GeometryGraph.prototype.areaPtLocator = null;


/**
 * // for use if geometry is not Polygonal
 *
 * @type {PointLocator}
 * @private
 */
jsts.geomgraph.GeometryGraph.prototype.ptLocator = null;


/**
 * @return {EdgeSetIntersector}
 * @private
 */
jsts.geomgraph.GeometryGraph.prototype.createEdgeSetIntersector = function() {
  return new jsts.geomgraph.index.SimpleMCSweepLineIntersector();
};


/**
 * @param {Geometry}
 *          g
 */
jsts.geomgraph.GeometryGraph.prototype.add = function(g) {
  if (g.isEmpty())
    return;

  // TODO: port rest of method
};


/**
 * Compute self-nodes, taking advantage of the Geometry type to minimize the
 * number of intersection tests. (E.g. rings are not tested for
 * self-intersection, since they are assumed to be valid).
 *
 * @param {LineIntersector}
 *          li the LineIntersector to use.
 * @param {boolean}
 *          computeRingSelfNodes if <false>, intersection checks are optimized
 *          to not test rings for self-intersection.
 * @return {SegmentIntersector} the SegmentIntersector used, containing
 *         information about the intersections found.
 */
jsts.geomgraph.GeometryGraph.prototype.computeSelfNodes = function(li,
    computeRingSelfNodes) {
  var si = new jsts.geomgraph.index.SegmentIntersector(li, true, false);
  var esi = this.createEdgeSetIntersector();
  // optimized test for Polygons and Rings
  if (!computeRingSelfNodes &&
      (parentGeom instanceof LinearRing || parentGeom instanceof Polygon || parentGeom instanceof MultiPolygon)) {
    esi.computeIntersections(edges, si, false);
  } else {
    esi.computeIntersections(edges, si, true);
  }
  this.addSelfIntersectionNodes(argIndex);
  return si;
};

// TODO: port rest of class
