/* Copyright (c) 2011 by Björn Harrtell.
 * Published under the GNU Lesser GPL 2.1 license.
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
 * Constructs a <code>LinearRing</code> with the vertices specifed by the
 * given {@link CoordinateSequence}.
 *
 * @param {Coordinate[]}
 *          points a sequence points forming a closed and simple linestring, or
 *          <code>null</code> to create the empty geometry.
 * @param {GeometryFactory}
 *          factory
 *
 * @throws IllegalArgumentException
 *           if the ring is not closed, or has too few points
 *
 */
jsts.geom.Geometry.prototype.LinearRing = function(points, factory) {
  jsts.geom.Geometry.prototype.constructor.call(this, points, factory);
  this.validateConstruction();
};

jsts.inherit(jsts.geom.LinearRing, jsts.geom.LineString);
