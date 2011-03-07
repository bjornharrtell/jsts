/* Copyright (c) 2011 by Björn Harrtell.
 * Published under the MIT license.
 * See https://github.com/bjornharrtell/jsts/blob/master/license.txt for the
 * full text of the license.
 */

/**
 * Models an OGC SFS <code>LinearRing</code>.
 * A LinearRing is a LineString which is both closed and simple.
 * In other words,
 * the first and last coordinate in the ring must be equal,
 * and the interior of the ring must not self-intersect.
 * Either orientation of the ring is allowed.
 * <p>
 * A ring must have either 0 or 4 or more points.
 * The first and last points must be equal (in 2D).
 * If these conditions are not met, the constructors throw
 * an {@link IllegalArgumentException}
 */



/**
 * @constructor
 * @extends {OpenLayers.Geometry.LinearRing}
 * @extends {jsts.geom.Geometry}
 */
jsts.geom.LinearRing = function() {
};
jsts.geom.LinearRing = OpenLayers.Class(jsts.geom.LineString);


/**
 * Returns <code>Dimension.FALSE</code>, since by definition LinearRings do
 * not have a boundary.
 *
 * @return {int} Dimension.FALSE.
 */
jsts.geom.LinearRing.prototype.getBoundaryDimension = function() {
  return Dimension.FALSE;
};


/**
 * Returns <code>true</code>, since by definition LinearRings are always
 * simple.
 *
 * @return {Boolean} <code>true.</code>
 *
 * @see Geometry#isSimple
 */
jsts.geom.LinearRing.prototype.isSimple = function() {
  return true;
};


/**
 * @return {String} String representation of LinearRing type.
 */
jsts.geom.LinearRing.prototype.getGeometryType = function() {
  return 'LinearRing';
};
