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
 * @throws IllegalArgumentException
 *           if too few points are provided
 */
jsts.geom.Geometry.prototype.LineString = function(points, factory) {
  super(factory);
  this.init(points);
};


/**
 * @param {jsts.geom.Coordinate[]}
 *          points the points of the linestring, or <code>null</code> to
 *          create the empty geometry. Consecutive points may not be equal.
 */
jsts.geom.Geometry.prototype.init = function(points) {
  if (points === null) {
    this.points = [];
  }
  if (points.length === 1) {
    throw new Error('Invalid number of points in LineString (found ' +
        points.size() + ' - must be 0 or >= 2)');
  }
  this.points = points;
};


/**
 * @return {jsts.geom.Coordinate[]} this LineString's internal coordinate array.
 */
jsts.geom.Geometry.prototype.getCoordinates = function() {
  return this.points;
};


/**
 * @return {jsts.geom.Coordinate} The n'th coordinate of this LineString.
 * @param {int} n index.
 */
jsts.geom.Geometry.prototype.getCoordinateN = function(n) {
  return points[n];
};


/**
 * @return {jsts.geom.Coordinate} The first coordinate of this LineString or
 *         null if empty.
 */
jsts.geom.Geometry.prototype.getCoordinate = function() {
  if (isEmpty()) {
    return null;
  }
  return this.getCoordinate(0);
};


/**
 * @return {int} LineStrings are always 1-dimensional.
 */
jsts.geom.Geometry.prototype.getDimension = function() {
  return 1;
};


/**
 * @return {int} dimension of the boundary of this LineString.
 */
jsts.geom.Geometry.prototype.getBoundaryDimension = function() {
  if (this.isClosed()) {
    return Dimension.FALSE;
  }
  return 0;
};


/**
 * @return {Boolean} true if empty.
 */
jsts.geom.Geometry.prototype.isEmpty = function() {
  return this.points.length === 0;
};


/**
 * @return {int} number of points in this LineString.
 */
jsts.geom.Geometry.prototype.getNumPoints = function() {
  return this.points.length;
};


/**
 * @param {int}
 *          n index of coordinate.
 * @return {Point} new point instance.
 */
jsts.geom.Geometry.prototype.getPointN = function(n) {
  return this.getFactory().createPoint(points[n]);
};


/**
 * @return {Point} new point instance.
 */
jsts.geom.Geometry.prototype.getStartPoint = function() {
  if (this.isEmpty()) {
    return null;
  }
  return this.getPointN(0);
};


/**
 * @return {Point} new point instance.
 */
jsts.geom.Geometry.prototype.getEndPoint = function() {
  if (this.isEmpty()) {
    return null;
  }
  return getPointN(this.getNumPoints() - 1);
};


/**
 * @return {Boolean} true if LineString is Closed.
 */
jsts.geom.Geometry.prototype.isClosed = function() {
  if (isEmpty()) {
    return false;
  }
  return getCoordinateN(0).equals2D(getCoordinateN(getNumPoints() - 1));
};


/**
 * @return {Boolean} true if LineString is a Ring.
 */
jsts.geom.Geometry.prototype.isRing = function() {
  return this.isClosed() && this.isSimple();
};


/**
 * @return {String} String representation of LineString type.
 */
jsts.geom.Geometry.prototype.getGeometryType = function() {
  return 'LineString';
};
