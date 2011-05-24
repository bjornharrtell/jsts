/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/**
 * @requires jsts/geomgraph/PlanarGraph.js
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
  this.boundaryNodeRule = boundaryNodeRule ||
      jsts.algorithm.BoundaryNodeRule.OGC_SFS_BOUNDARY_RULE;
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
  return boundaryNodeRule.isInBoundary(boundaryCount) ? jsts.geom.Location.BOUNDARY
      : jsts.geom.Location.INTERIOR;
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
 * the index of this geometry as an argument to a spatial function (used for
 * labelling)
 *
 * @type {int}
 * @private
 */
jsts.geomgraph.GeometryGraph.prototype.argIndex = null; //


/**
 * @type {Collection}
 * @private
 */
jsts.geomgraph.GeometryGraph.prototype.boundaryNodes = [];


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
 * for use if geometry is not Polygonal
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
    this.useBoundaryDeterminationRule = false;

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
 * Add a Point to the graph.
 */
jsts.geomgraph.GeometryGraph.prototype.addPoint = function(p) {
  var coord = p.getCoordinate();
  this.insertPoint(this.argIndex, coord, jsts.geom.Location.INTERIOR);
};


/**
 * @param {LineString}
 *          line
 * @private
 */
jsts.geomgraph.GeometryGraph.prototype.addLineString = function(line) {
  var coords = jsts.geom.CoordinateArrays.removeRepeatedPoints(line
      .getCoordinates());

  if (coords.length < 2) {
    this.hasTooFewPoints = true;
    this.invalidPoint = coords[0];
    return;
  }

  // add the edge for the LineString
  // line edges do not have locations for their left and right sides
  var e = new jsts.geomgraph.Edge(coords, new jsts.geomgraph.Label(
      this.argIndex, jsts.geom.Location.INTERIOR));
  this.lineEdgeMap.put(line, e);
  this.insertEdge(e);
  /**
   * Add the boundary points of the LineString, if any. Even if the LineString
   * is closed, add both points as if they were endpoints. This allows for the
   * case that the node already exists and is a boundary point.
   */
  if (coords.length >= 2 === false) {
    throw new jsts.error.IllegalArgumentError(
        'found LineString with single point');
  }

  this.insertBoundaryPoint(this.argIndex, coords[0]);
  this.insertBoundaryPoint(this.argIndex, coords[coords.length - 1]);
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
      (parentGeom instanceof jsts.geom.LinearRing ||
          parentGeom instanceof jsts.geom.Polygon || parentGeom instanceof jsts.geom.MultiPolygon)) {
    esi.computeIntersections(this.edges, si, false);
  } else {
    esi.computeIntersections(this.edges, si, true);
  }
  this.addSelfIntersectionNodes(this.argIndex);
  return si;
};


/**
 * @private
 */
jsts.geomgraph.GeometryGraph.prototype.insertPoint = function(argIndex, coord,
    onLocation) {
  var n = this.nodes.addNode(coord);
  var lbl = n.getLabel();
  if (lbl == null) {
    n.label = new jsts.geomgraph.Label(this.argIndex, this.onLocation);
  } else
    lbl.setLocation(this.argIndex, this.onLocation);
};


/**
 * Adds candidate boundary points using the current {@link BoundaryNodeRule}.
 * This is used to add the boundary points of dim-1 geometries
 * (Curves/MultiCurves).
 */
jsts.geomgraph.GeometryGraph.prototype.insertBoundaryPoint = function(argIndex,
    coord) {

  var n = this.nodes.addNode(coord);
  var lbl = n.getLabel();
  // the new point to insert is on a boundary
  var boundaryCount = 1;
  // determine the current location for the point (if any)
  var loc = jsts.geom.Location.NONE;
  if (lbl !== null)
    loc = lbl.getLocation(argIndex, jsts.geomgraph.Position.ON);
  if (loc === jsts.geom.Location.BOUNDARY)
    boundaryCount++;

  // determine the boundary status of the point according to the Boundary
  // Determination Rule
  var newLoc = jsts.geomgraph.GeometryGraph.determineBoundary(
      this.boundaryNodeRule, boundaryCount);
  lbl.setLocation(argIndex, newLoc);
};

jsts.geomgraph.GeometryGraph.prototype.addSelfIntersectionNodes = function(
    argIndex) {
  var i, e, eLoc, j, ei;
  for (i = 0; i < this.edges.length; i++) {
    e = this.edges[i];
    eLoc = e.getLabel().getLocation(argIndex);
    for (j = 0; j < e.eiList.length; j++) {
      ei = e.eiList[j];
      this.addSelfIntersectionNode(argIndex, ei.coord, eLoc);
    }
  }
};


/**
 * Add a node for a self-intersection. If the node is a potential boundary node
 * (e.g. came from an edge which is a boundary) then insert it as a potential
 * boundary node. Otherwise, just add it as a regular node.
 */
jsts.geomgraph.GeometryGraph.prototype.addSelfIntersectionNode = function(
    argIndex, coord, loc) {
  // if this node is already a boundary node, don't change it
  if (this.isBoundaryNode(argIndex, coord))
    return;
  if (loc === jsts.geom.Location.BOUNDARY && this.useBoundaryDeterminationRule)
    this.insertBoundaryPoint(argIndex, coord);
  else
    this.insertPoint(argIndex, coord, loc);
};

// TODO: port rest of class
