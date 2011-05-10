/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */



/**
 * Specifies the precision model of the {@link Coordinate}s in a
 * {@link Geometry}. In other words, specifies the grid of allowable points for
 * all <code>Geometry</code>s.
 * <p>
 * The {@link makePrecise} method allows rounding a coordinate to a "precise"
 * value; that is, one whose precision is known exactly.
 * <p>
 * Coordinates are assumed to be precise in geometries. That is, the coordinates
 * are assumed to be rounded to the precision model given for the geometry. JTS
 * input routines automatically round coordinates to the precision model before
 * creating Geometries. All internal operations assume that coordinates are
 * rounded to the precision model. Constructive methods (such as boolean
 * operations) always round computed coordinates to the appropriate precision
 * model.
 * <p>
 * Currently one type of precision model are supported:
 * <ul>
 * <li>FLOATING - represents full double precision floating point.
 * <p>
 * Coordinates are represented internally as Java double-precision values. Since
 * Java uses the IEEE-754 floating point standard, this provides 53 bits of
 * precision.
 * <p>
 * JSTS methods currently do not handle inputs with different precision models.
 *
 * @constructor
 */
jsts.geom.PrecisionModel = function() {
  jsts.geom.PrecisionModel.prototype.init.apply(this, arguments);
};


/**
 * @type {int}
 */
jsts.geom.PrecisionModel.FLOATING = 0;


/**
 * @type {int}
 */
jsts.geom.PrecisionModel.FIXED = 1;


/**
 * @return {boolean} always true.
 */
jsts.geom.PrecisionModel.prototype.isFloating = function() {
  return true;
};


/**
 * @return {int} always jsts.geom.PrecisionModel.FLOATING.
 */
jsts.geom.PrecisionModel.prototype.getType = function() {
  return jsts.geom.PrecisionModel.FLOATING;
};
