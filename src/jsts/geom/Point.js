/* Copyright (c) 2011 by Björn Harrtell.
 * Published under the GNU Lesser GPL 2.1 license.
 * See https://github.com/bjornharrtell/jsts/blob/master/license.txt for the
 * full text of the license.
 */



/**
 * Basic implementation of <code>Point</code>.
 *
 * @param {Coordinate}
 *          coordinate contains the single coordinate on which to base this
 *          <code>Point</code> , or <code>null</code> to create the empty
 *          geometry.
 * @param {GeometryFactory}
 *          factory that will create the geometry.
 *
 * @constructor
 * @extends {jsts.geom.Geometry}
 */
jsts.geom.Point = function(coordinate, factory) {
  jsts.geom.Geometry.prototype.constructor.call(this, factory);
  this.coordinate = coordinate;
};

jsts.inherit(jsts.geom.Point, jsts.geom.Geometry);

jsts.geom.Point.prototype.coordinate = null;

jsts.geom.Point.prototype.getCoordinates = function() {
  return this.isEmpty() ? [] : [this.coordinate];
};

jsts.geom.Point.prototype.getNumPoints = function() {
  return this.isEmpty() ? 0 : 1;
};

jsts.geom.Point.prototype.isEmpty = function() {
  return this.coordinate === null;
};

jsts.geom.Point.prototype.isSimple = function() {
  return true;
};


/**
 * A Point is valid iff:
 * <ul>
 * <li>the coordinate which defines it is a valid coordinate (i.e does not have
 * an NaN X or Y ordinate)
 * </ul>
 *
 * @return {boolean} true iff the Point is valid.
 */
jsts.geom.Point.prototype.isValid = function() {
  if (!IsValidOp.isValid(getCoordinate())) {
    return false;
  }
  return true;
};

jsts.geom.Point.prototype.getDimension = function() {
  return 0;
};

jsts.geom.Point.prototype.getBoundaryDimension = function() {
  return Dimension.FALSE;
};

jsts.geom.Point.prototype.getX = function() {
  return this.coordinate.x;
};

jsts.geom.Point.prototype.getY = function() {
  return this.coordinate.y;
};

jsts.geom.Point.prototype.getCoordinate = function() {
  return this.coordinate;
};

jsts.geom.Point.prototype.getGeometryType = function() {
  return 'Point';
};


/**
 * Gets the boundary of this geometry. Zero-dimensional geometries have no
 * boundary by definition, so an empty GeometryCollection is returned.
 *
 * @return {GeometryCollection} an empty GeometryCollection.
 * @see Geometry#getBoundary
 */
jsts.geom.Point.prototype.getBoundary = function() {
  return this.factory.createGeometryCollection(null);
};

jsts.geom.Point.prototype.computeEnvelopeInternal = function() {
  if (this.isEmpty()) {
    return new jsts.geom.Envelope();
  }
  return new jsts.geom.Envelope(this.coordinate);
};

jsts.geom.Point.prototype.equalsExact = function(other, tolerance) {
  if (!(this instanceof other.constructor)) {
    return false;
  }
  if (this.isEmpty() && other.isEmpty()) {
    return true;
  }
  return this.equal(other.coordinate, this.coordinate, tolerance);
};


/**
 * Creates and returns a full copy of this {@link Point} object. (including all
 * coordinates contained by it).
 *
 * @return {Point} a clone of this instance.
 */
jsts.geom.Point.prototype.clone = function() {
  return this.factory.createPoint(this.coordinate.clone());
};

jsts.geom.Point.prototype.reverse = function() {
  return this.clone();
};

jsts.geom.Point.prototype.normalize = function() {
  // a Point is always in normalized form
};

jsts.geom.Point.prototype.compareToSameClass = function(point) {
  return this.coordinate.compareTo(point.getCoordinate());
};
