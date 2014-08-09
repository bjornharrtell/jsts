/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/**
 * @constructor
 * 
 * @param {double}
 * 			distanceTolerance
 * @param {boolean}
 *          isEnsureValidTopology
 */
jsts.simplify.DPTransformer = function(
    distanceTolerance, isEnsureValidTopology) {
  this.distanceTolerance = distanceTolerance;
  this.isEnsureValidTopology = isEnsureValidTopology;
};

jsts.simplify.DPTransformer.prototype = new jsts.geom.util.GeometryTransformer();

/**
 * @type {double} 
 */
jsts.simplify.DPTransformer.prototype.distanceTolerance = null;

/**
 * @type {boolean} 
 */
jsts.simplify.DPTransformer.prototype.isEnsureValidTopology = null;

/**
 * @param {jsts.geom.CoordinateSequence}
 *          coords
 * @param {jsts.geom.Geometry}
 *          parent
 * @return {jsts.geom.CoordinateSequence} 
 */
jsts.simplify.DPTransformer.prototype.transformCoordinates = function(
    coords, parent) {
  var inputPts = coords;
  var newPts = null;
  if (inputPts.length == 0) {
    newPts = [];
  } else {
    newPts = jsts.simplify.DouglasPeuckerLineSimplifier.simplify(inputPts, this.distanceTolerance);
  }
  return newPts;
};

/**
 * Simplifies a polygon, fixing it if required.
 * @param {jsts.geom.Polygon}
 *          geom
 * @param {jsts.geom.Geometry}
 *          parent
 * @return {jsts.geom.Geometry} 
 */
jsts.simplify.DPTransformer.prototype.transformPolygon = function(
    geom, parent) {
  // empty geometries are simply removed
  if (geom.isEmpty()) {
    return null;
  }
  var rawGeom = jsts.geom.util.GeometryTransformer.prototype.transformPolygon.apply(this, arguments);
  if (parent instanceof jsts.geom.MultiPolygon) {
    return rawGeom;
  }
  return this.createValidArea(rawGeom);
};

/**
 * Simplifies a LinearRing. If the simplification results
 * in a degenerate ring, remove the component.
 * @param {jsts.geom.LinearRing}
 *          geom
 * @param {jsts.geom.Geometry}
 *          parent
 * @return {jsts.geom.Geometry} 
 */
jsts.simplify.DPTransformer.prototype.transformLinearRing = function(
    geom, parent) {
  var removeDegenerateRings = parent instanceof jsts.geom.Polygon;
  var simpResult = jsts.geom.util.GeometryTransformer.prototype.transformLinearRing.apply(this, arguments);
  if (removeDegenerateRings && !(simpResult instanceof jsts.geom.LinearRing)) {
    return null;
  }
  return simpResult;
};

/**
 * Simplifies a MultiPolygon, fixing it if required.
 * @param {jsts.geom.MultiPolygon}
 *          geom
 * @param {jsts.geom.Geometry}
 *          parent
 * @return {jsts.geom.Geometry} 
 */
jsts.simplify.DPTransformer.prototype.transformMultiPolygon = function(
    geom, parent) {
  var rawGeom = jsts.geom.util.GeometryTransformer.prototype.transformMultiPolygon.apply(this, arguments);
  return this.createValidArea(rawGeom);
};

/**
 * Creates a valid area geometry from one that possibly has
 * bad topology (i.e. self-intersections).
 * Since buffer can handle invalid topology, but always returns
 * valid geometry, constructing a 0-width buffer "corrects" the
 * topology.
 * Note this only works for area geometries, since buffer always returns
 * areas. This also may return empty geometries, if the input
 * has no actual area.
 * @param {jsts.geom.Geometry}
 *          rawAreaGeom
 * @return {jsts.geom.Geometry} 
 */
jsts.simplify.DPTransformer.prototype.createValidArea = function(
    rawAreaGeom) {
  if (this.isEnsureValidTopology) {
    return rawAreaGeom.buffer(0.0);
  }
  return rawAreaGeom;
};