/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/**
 * Simplifies a {@link Geometry} using the Douglas-Peucker algorithm.
 * Ensures that any polygonal geometries returned are valid.
 * Simple lines are not guaranteed to remain simple after simplification.
 * All geometry types are handled.
 * Empty and point geometries are returned unchanged.
 * Empty geometry components are deleted.
 * <p>
 * Note that in general D-P does not preserve topology -
 * e.g. polygons can be split, collapse to lines or disappear
 * holes can be created or disappear,
 * and lines can cross.
 * To simplify geometry while preserving topology use {@link TopologyPreservingSimplifier}.
 * (However, using D-P is significantly faster).
 * 
 * Creates a simplifier for a given geometry.
 * 
 * @constructor
 * @param {jsts.geom.Geometry}
 */
jsts.simplify.DouglasPeuckerSimplifier = function(
	inputGeom) {
  this.inputGeom = inputGeom;
  this.isEnsureValidTopology = true;
};

/**
 * @type {jsts.geom.Geometry} 
 */
jsts.simplify.DouglasPeuckerSimplifier.prototype.inputGeom = null;

/**
 * @type {double} 
 */
jsts.simplify.DouglasPeuckerSimplifier.prototype.distanceTolerance = null;

/**
 * @type {boolean} 
 */
jsts.simplify.DouglasPeuckerSimplifier.prototype.isEnsureValidTopology = null;

/**
 * Simplifies a geometry using a given tolerance.
 * @param {jsts.geom.Geometry}
 *          geom
 * @param {double}
 *          distanceTolerance
 * @return {jsts.geom.Geometry} 
 */
jsts.simplify.DouglasPeuckerSimplifier.simplify = function(
    geom, distanceTolerance) {
  var tss = new jsts.simplify.DouglasPeuckerSimplifier(geom);
  tss.setDistanceTolerance(distanceTolerance);
  return tss.getResultGeometry();
};

/**
 * Sets the distance tolerance for the simplification.
 * All vertices in the simplified geometry will be within this
 * distance of the original geometry.
 * The tolerance value must be non-negative.
 * @param {double}
 *          distanceTolerance 
 */
jsts.simplify.DouglasPeuckerSimplifier.prototype.setDistanceTolerance = function(
	distanceTolerance) {
  if (distanceTolerance < 0.0) {
  	throw "Tolerance must be non-negative";
  }
  this.distanceTolerance = distanceTolerance;
};

/**
 * Controls whether simplified polygons will be "fixed"
 * to have valid topology.
 * The caller may choose to disable this because:
 * <ul>
 * <li>valid topology is not required
 * <li>fixing topology is a relative expensive operation
 * <li>in some pathological cases the topology fixing operation may either fail or run for too long
 * </ul>
 * 
 * The default is to fix polygon topology.
 * 
 * @param {boolean}
 *          isEnsureValidTopology 
 */
jsts.simplify.DouglasPeuckerSimplifier.prototype.setEnsureValid = function(
	isEnsureValidTopology) {
  this.isEnsureValidTopology = isEnsureValidTopology;
};

/**
 * Gets the simplified geometry.
 * 
 * @return {jsts.geom.Geometry} 
 */
jsts.simplify.DouglasPeuckerSimplifier.prototype.getResultGeometry = function() {
  // empty input produces an empty result
  if (this.inputGeom.isEmpty()) {
    return this.inputGeom.clone();
  }
  return (new jsts.simplify.DPTransformer(this.distanceTolerance, this.isEnsureValidTopology)).transform(this.inputGeom);
};