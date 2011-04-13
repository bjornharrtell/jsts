/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/**
 * @requires jsts/planargraph/PlanarGraph.js
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
  jsts.geomgraph.GeometryGraph.prototype.constructor.call(this);

  this.lineEdgeMap = new jsts.Hashtable();
  this.ptLocator = new jsts.algorithm.PointLocator();

  this.argIndex = argIndex;
  this.parentGeom = parentGeom;
  this.boundaryNodeRule = boundaryNodeRule ? boundaryNodeRule
      : jsts.algorithm.BoundaryNodeRule.OGC_SFS_BOUNDARY_RULE;
  if (parentGeom != null) {
    this.add(parentGeom);
  }
};

jsts.geomgraph.GeometryGraph.prototype = new jsts.planargraph.PlanarGraph();


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
  return new jsts.geomgraph.index.SimpleEdgeSetIntersector();
  // TODO: use optimized version when ported
  // return new jsts.geomgraph.index.SimpleMCSweepLineIntersector();
};


/**
 * @param {Geometry}
 *          g
 */
jsts.geomgraph.GeometryGraph.prototype.add = function(g) {
  if (g.isEmpty()) {
    return;
  }

  // check if this Geometry should obey the Boundary Determination Rule
  // all collections except MultiPolygons obey the rule
  if (g instanceof jsts.geom.MultiPolygon)
    useBoundaryDeterminationRule = false;

  if (g instanceof jsts.geom.Polygon)
    this.addPolygon(g);
  // LineString also handles LinearRings
  else if (g instanceof jsts.geom.LineString)
    this.addLineString(g);
  else if (g instanceof jsts.geom.Point)
    this.addPoint(g);
  else if (g instanceof jsts.geom.MultiPoint)
    this.addCollection(g);
  else if (g instanceof jsts.geom.MultiLineString)
    this.addCollection(g);
  else if (g instanceof jsts.geom.MultiPolygon)
    this.addCollection(g);
  else if (g instanceof jsts.geom.GeometryCollection)
    this.addCollection(g);
  else
    throw new jsts.error.IllegalArgumentError('Geometry type not supported.');
};


/**
 * @param {LineString} line
 * @private
 */
jsts.geomgraph.GeometryGraph.prototype.addLineString = function(line) {
  var coords = CoordinateArrays.removeRepeatedPoints(line.getCoordinates());

  if (coords.length < 2) {
    hasTooFewPoints = true;
    invalidPoint = coord[0];
    return;
  }

  // add the edge for the LineString
  // line edges do not have locations for their left and right sides
  var e = new jsts.geomgraph.Edge(coords, new jsts.geomgraph.Label(argIndex, Location.INTERIOR));
  this.lineEdgeMap.put(line, e);
  this.insertEdge(e);
  /**
   * Add the boundary points of the LineString, if any.
   * Even if the LineString is closed, add both points as if they were endpoints.
   * This allows for the case that the node already exists and is a boundary point.
   */
  Assert.isTrue(coords.length >= 2, 'found LineString with single point');
  this.insertBoundaryPoint(argIndex, coords[0]);
  this.insertBoundaryPoint(argIndex, coords[coords.length - 1]);
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
    esi.computeIntersections(this.edges, si, false);
  } else {
    esi.computeIntersections(this.edges, si, true);
  }
  this.addSelfIntersectionNodes(this.argIndex);
  return si;
};

// TODO: port rest of class
