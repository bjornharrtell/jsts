/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/**
 * Tests whether a <code>Geometry</code> is simple.
 * In general, the SFS specification of simplicity
 * follows the rule:
 * <ul>
 *  <li>A Geometry is simple if and only if the only self-intersections are at
 *  boundary points.</li>
 * </ul>
 * This definition relies on the definition of boundary points.
 * The SFS uses the Mod-2 rule to determine which points are on the boundary of
 * lineal geometries, but this class supports
 * using other {@link BoundaryNodeRule}s as well.
 * <p>
 * Simplicity is defined for each {@link Geometry} subclass as follows:
 * <ul>
 * <li>Valid polygonal geometries are simple by definition, so
 * <code>isSimple</code> trivially returns true.
 * (Hint: in order to check if a polygonal geometry has self-intersections,
 * use {@link Geometry#isValid}).
 * <li>Linear geometries are simple iff they do not self-intersect at points
 * other than boundary points.
 * (Using the Mod-2 rule, this means that closed linestrings
 * cannot be touched at their endpoints, since these are
 * interior points, not boundary points).
 * <li>Zero-dimensional geometries (points) are simple iff they have no
 * repeated points.
 * <li>Empty <code>Geometry</code>s are always simple
 * </ul>
 *
 * @see BoundaryNodeRule
 */



/**
 * Creates a simplicity checker using the default SFS Mod-2 Boundary Node Rule
 *
 * @param {Geometry}
 *          geom the geometry to test.
 * @constructor
 */
jsts.operation.IsSimpleOp = function(geom) {
  this.geom = geom;
};


/**
 * @type {jsts.geom.Geometry}
 */
jsts.operation.IsSimpleOp.prototype.geom = null;


/**
 * @type {boolean}
 */
jsts.operation.IsSimpleOp.prototype.isClosedEndpointsInInterior = true;


/**
 * @type {jsts.geom.Coordinate}
 */
jsts.operation.IsSimpleOp.prototype.nonSimpleLocation = null;


/**
 * Creates a simplicity checker using the default SFS Mod-2 Boundary Node Rule
 *
 * @param {Geometry}
 *          geom the geometry to test.
 */
jsts.operation.IsSimpleOp.prototype.IsSimpleOp = function(geom) {
  this.geom = geom;
};


/**
 * Tests whether the geometry is simple.
 *
 * @return {boolean} true if the geometry is simple.
 */
jsts.operation.IsSimpleOp.prototype.isSimple = function() {
  this.nonSimpleLocation = null;
  if (this.geom instanceof jsts.geom.LineString) {
    return this.isSimpleLinearGeometry(this.geom);
  }
  if (this.geom instanceof jsts.geom.MultiLineString) {
    return this.isSimpleLinearGeometry(this.geom);
  }
  if (this.geom instanceof jsts.geom.MultiPoint) {
    return this.isSimpleMultiPoint(this.geom);
  }
  // all other geometry types are simple by definition
  return true;
};


/**
 * @param {Geometry} geom input geometry.
 * @return {boolean} true if the geometry is simple.
 */
jsts.operation.IsSimpleOp.prototype.isSimpleLinearGeometry = function(geom) {
  if (geom.isEmpty()) return true;
  var graph = new jsts.geomgraph.GeometryGraph(0, geom);
  var li = new jsts.algorithm.RobustLineIntersector();
  var si = graph.computeSelfNodes(li, true);
  // if no self-intersection, must be simple
  if (! si.hasIntersection()) return true;
  if (si.hasProperIntersection()) {
    nonSimpleLocation = si.getProperIntersectionPoint();
    return false;
  }
  if (this.hasNonEndpointIntersection(graph)) return false;
  if (this.isClosedEndpointsInInterior) {
    if (this.hasClosedEndpointIntersection(graph)) return false;
  }
  return true;
};

// TODO: port rest of class
