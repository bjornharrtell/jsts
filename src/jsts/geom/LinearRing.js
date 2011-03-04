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
 * Constructs a <code>LinearRing</code> with the vertices specifed by the
 * given {@link CoordinateSequence}.
 *
 * @param {Coordinate[]}
 *          points a sequence points forming a closed and simple linestring, or
 *          <code>null</code> to create the empty geometry.
 * @param {GeometryFactory}
 *          factory GeometryFactory used to create this LinearRing.
 *
 * @throws jsts.IllegalArgumentError
 *           if the ring is not closed, or has too few points
 * @constructor
 */
jsts.geom.LinearRing = function(points) {
  jsts.geom.LineString.prototype.init.call(this, points);
  this.validateConstruction();
};

jsts.inherit(jsts.geom.LinearRing, jsts.geom.LineString);


/**
 *
 */
jsts.geom.LinearRing.prototype.validateConstruction = function() {
  if (!this.isEmpty() && !jsts.geom.LineString.prototype.isClosed.call(this)) {
    throw new jsts.IllegalArgumentError(
        'Points of LinearRing do not form a closed linestring');
  }
  if (this.points.length >= 1 && this.points.length <= 3) {
    throw new jsts.IllegalArgumentError(
        'Invalid number of points in LinearRing (found ' + this.points.length +
            ' - must be 0 or >= 4)');
  }
};


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

//OL compat
jsts.geom.LineString.prototype.calculateBounds = function() {
  //TODO: calc real bounds
  this.bounds = new OpenLayers.Bounds(this.points[0].x, this.points[0].y,
      this.points[0].x, this.points[0].y);
};
jsts.geom.LineString.prototype.CLASS_NAME = 'OpenLayers.Geometry.LinearRing';
