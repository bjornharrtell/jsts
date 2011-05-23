/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */



/**
 * Supplies a set of utility methods for building Geometry objects from lists
 * of Coordinates.
 *
 * Note that the factory constructor methods do <b>not</b> change the input
 * coordinates in any way.
 *
 * In particular, they are not rounded to the supplied <tt>PrecisionModel</tt>.
 * It is assumed that input Coordinates meet the given precision.
 *
 * Constructs a GeometryFactory that generates Geometries having a floating
 * PrecisionModel and a spatial-reference ID of 0.
 *
 * @constructor
 */
jsts.geom.GeometryFactory = function() {

};


/**
 * Creates a Point using the given Coordinate; a null Coordinate will create an
 * empty Geometry.
 *
 * @param {Coordinate}
 *          coordinate Coordinate to base this Point on.
 * @return {Point} A new Point.
 */
jsts.geom.GeometryFactory.prototype.createPoint = function(coordinate) {
  if (coordinate === null) {
    return new jsts.geom.Point();
  }
  return new jsts.geom.Point(coordinate);
};


/**
 * Creates a LineString using the given Coordinates; a null or empty array will
 * create an empty LineString. Consecutive points must not be equal.
 *
 * @param {Coordinate[]}
 *          coordinates an array without null elements, or an empty array, or
 *          null.
 * @return {LineString} A new LineString.
 */
jsts.geom.GeometryFactory.prototype.createLineString = function(coordinates) {
  return new jsts.geom.LineString(coordinates);
};


/**
 * Creates a LinearRing using the given Coordinates; a null or empty array will
 * create an empty LinearRing. The points must form a closed and simple
 * linestring. Consecutive points must not be equal.
 *
 * @param {Coordinate[]}
 *          coordinates an array without null elements, or an empty array, or
 *          null.
 * @return {LinearRing} A new LinearRing.
 */
jsts.geom.GeometryFactory.prototype.createLinearRing = function(coordinates) {
  return new jsts.geom.LinearRing(coordinates);
};


/**
 * Constructs a <code>Polygon</code> with the given exterior boundary and
 * interior boundaries.
 *
 * @param {LinearRing}
 *          shell the outer boundary of the new <code>Polygon</code>, or
 *          <code>null</code> or an empty <code>LinearRing</code> if the
 *          empty geometry is to be created.
 * @param {LinearRing[]}
 *          holes the inner boundaries of the new <code>Polygon</code>, or
 *          <code>null</code> or empty <code>LinearRing</code> s if the
 *          empty geometry is to be created.
 * @return {Polygon} A new Polygon.
 */
jsts.geom.GeometryFactory.prototype.createPolygon = function(shell, holes) {
  var rings = [shell];

  if (holes !== undefined) {
    rings = rings.concat(holes);
  }

  return new jsts.geom.Polygon(rings);
};

jsts.geom.GeometryFactory.prototype.createGeometryCollection = function() {
  return new jsts.geom.GeometryCollection();
};
