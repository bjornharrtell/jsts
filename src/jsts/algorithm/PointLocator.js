/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */



/**
 * Computes the topological ({@link Location}) of a single point to a
 * {@link Geometry}. A {@link BoundaryNodeRule} may be specified to control
 * the evaluation of whether the point lies on the boundary or not The default
 * rule is to use the the <i>SFS Boundary Determination Rule</i>
 * <p>
 * Notes:
 * <ul>
 * <li>{@link LinearRing}s do not enclose any area - points inside the ring
 * are still in the EXTERIOR of the ring.
 * </ul>
 * Instances of this class are not reentrant.
 *
 * @constructor
 */
jsts.algorithm.PointLocator = function(boundaryRule) {
  this.boundaryRule = boundaryRule ? boundaryRule
      : jsts.algorithm.BoundaryNodeRule.OGC_SFS_BOUNDARY_RULE;
};


/**
 * default is to use OGC SFS rule
 *
 * @type {BoundaryNodeRule}
 * @private
 */
jsts.algorithm.PointLocator.prototype.boundaryRule = null;


/**
 * true if the point lies in or on any Geometry element
 *
 * @type {boolean}
 * @private
 */
jsts.algorithm.PointLocator.prototype.isIn = null;


/**
 * the number of sub-elements whose boundaries the point lies in
 *
 * @type {int}
 * @private
 */
jsts.algorithm.PointLocator.prototype.numBoundaries = null;

// TODO: port rest of class
