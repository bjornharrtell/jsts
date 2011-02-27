/* Copyright (c) 2011 by Björn Harrtell.
 * Published under the GNU Lesser GPL 2.1 license.
 * See https://github.com/bjornharrtell/jsts/blob/master/license.txt for the
 * full text of the license.
 */



/**
 * Constructs a <code>LineString</code> with the given points.
 *
 * @param {jsts.geom.Coordinate[]}
 *          points the points of the linestring, or <code>null</code> to
 *          create the empty geometry. Consecutive points may not be equal.
 * @param {GeometryFactory}
 *          factory GeometryFactory used to create the geometry.
 * @throws jsts.IllegalArgumentError
 *           if too few points are provided
 * @constructor
 */
jsts.geom.LineString = function(points, factory) {
  jsts.geom.Geometry.prototype.constructor.call(this, factory);
  this.init(points);
};

jsts.inherit(jsts.geom.LineString, jsts.geom.Geometry);


/**
 * @param {jsts.geom.Coordinate[]}
 *          points the points of the linestring, or <code>null</code> to
 *          create the empty geometry. Consecutive points may not be equal.
 */
jsts.geom.LineString.prototype.init = function(points) {
  if (points === null) {
    points = [];
  }
  if (points.length === 1) {
    throw new jsts.IllegalArgumentError(
        'Invalid number of points in LineString (found ' + points.length +
            ' - must be 0 or >= 2)');
  }
  this.points = points;
};


/**
 * @return {jsts.geom.Coordinate[]} this LineString's internal coordinate array.
 */
jsts.geom.LineString.prototype.getCoordinates = function() {
  return this.points;
};


/**
 * @return {jsts.geom.Coordinate} The n'th coordinate of this LineString.
 * @param {int}
 *          n index.
 */
jsts.geom.LineString.prototype.getCoordinateN = function(n) {
  return points[n];
};


/**
 * @return {jsts.geom.Coordinate} The first coordinate of this LineString or
 *         null if empty.
 */
jsts.geom.LineString.prototype.getCoordinate = function() {
  if (this.isEmpty()) {
    return null;
  }
  return this.getCoordinate(0);
};


/**
 * @return {int} LineStrings are always 1-dimensional.
 */
jsts.geom.LineString.prototype.getDimension = function() {
  return 1;
};


/**
 * @return {int} dimension of the boundary of this LineString.
 */
jsts.geom.LineString.prototype.getBoundaryDimension = function() {
  if (this.isClosed()) {
    return Dimension.FALSE;
  }
  return 0;
};


/**
 * @return {Boolean} true if empty.
 */
jsts.geom.LineString.prototype.isEmpty = function() {
  return this.points.length === 0;
};


/**
 * @return {int} number of points in this LineString.
 */
jsts.geom.LineString.prototype.getNumPoints = function() {
  return this.points.length;
};


/**
 * @param {int}
 *          n index of coordinate.
 * @return {Point} new point instance.
 */
jsts.geom.LineString.prototype.getPointN = function(n) {
  return this.getFactory().createPoint(points[n]);
};


/**
 * @return {Point} new point instance.
 */
jsts.geom.LineString.prototype.getStartPoint = function() {
  if (this.isEmpty()) {
    return null;
  }
  return this.getPointN(0);
};


/**
 * @return {Point} new point instance.
 */
jsts.geom.LineString.prototype.getEndPoint = function() {
  if (this.isEmpty()) {
    return null;
  }
  return this.getPointN(this.getNumPoints() - 1);
};


/**
 * @return {Boolean} true if LineString is Closed.
 */
jsts.geom.LineString.prototype.isClosed = function() {
  if (this.isEmpty()) {
    return false;
  }
  return this.getCoordinateN(0).equals2D(getCoordinateN(getNumPoints() - 1));
};


/**
 * @return {Boolean} true if LineString is a Ring.
 */
jsts.geom.LineString.prototype.isRing = function() {
  return this.isClosed() && this.isSimple();
};


/**
 * @return {String} String representation of LineString type.
 */
jsts.geom.LineString.prototype.getGeometryType = function() {
  return 'LineString';
};
