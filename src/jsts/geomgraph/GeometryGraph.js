/**
 * A GeometryGraph is a graph that models a given Geometry
 *
 * @param {int}
 *          argIndex
 * @param {Geometry}
 *          parentGeom
 * @param {BoundaryNodeRule}
 *          boundaryNodeRule
 * @augments {PlanarGraph}
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

// extends PlanarGraph


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
jsts.geomgraph.GeometryGraph.prototype.parentGeom;


/**
 * The lineEdgeMap is a map of the linestring components of the parentGeometry
 * to the edges which are derived from them. This is used to efficiently
 * perform findEdge queries
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
 * If this flag is true, the Boundary Determination Rule will used when
 * deciding whether nodes are in the boundary or not
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
  return new SimpleMCSweepLineIntersector();
};

// TODO: port rest of class
