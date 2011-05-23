/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/**
 * @requires jsts/geom/Geometry.js
 */



/**
 * @constructor
 * @augments OpenLayers.Geometry.LineString
 * @augments jsts.geom.Geometry
 */
jsts.geom.LineString = function() {

};
jsts.geom.LineString = OpenLayers.Class(jsts.geom.Geometry);


/**
 * @return {jsts.geom.Coordinate[]} this LineString's internal coordinate array.
 */
jsts.geom.LineString.prototype.getCoordinates = function() {
  return this.components;
};


/**
 * @return {jsts.geom.Coordinate} The n'th coordinate of this LineString.
 * @param {int}
 *          n index.
 */
jsts.geom.LineString.prototype.getCoordinateN = function(n) {
  return this.components[n];
};


/**
 * @return {jsts.geom.Coordinate} The first coordinate of this LineString or
 *         null if empty.
 */
jsts.geom.LineString.prototype.getCoordinate = function() {
  if (this.isEmpty()) {
    return null;
  }
  return this.getCoordinateN(0);
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
  return this.components.length === 0;
};


/**
 * @return {Boolean} true if LineString is Closed.
 */
jsts.geom.LineString.prototype.isClosed = function() {
  if (this.isEmpty()) {
    return false;
  }
  return this.getCoordinateN(0).equals2D(
      this.getCoordinateN(this.components.length - 1));
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


/**
 * Gets the boundary of this geometry.
 * The boundary of a lineal geometry is always a zero-dimensional geometry (which may be empty).
 *
 * @return {Geometry} the boundary geometry.
 * @see Geometry#getBoundary
 */
jsts.geom.LineString.prototype.getBoundary = function() {
  return (new jsts.operation.BoundaryOp(this)).getBoundary();
};


jsts.geom.LineString.prototype.computeEnvelopeInternal = function() {
  if (this.isEmpty()) {
    return new jsts.geom.Envelope();
  }

  var env = new jsts.geom.Envelope();
  for (var i = 0; i < this.components.length; i++) {
    var point = this.components[i];
    env.expandToInclude(point);
  }

  return env;
};


/**
 * @param {Geometry}
 *          other Geometry to compare this LineString to.
 * @param {double}
 *          tolerance Tolerance.
 * @return {Boolean} true if equal.
 */
jsts.geom.LineString.prototype.equalsExact = function(other, tolerance) {
  var i;

  if (!this.isEquivalentClass(other)) {
    return false;
  }
  if (this.components.length !== other.components.length) {
    return false;
  }
  for (i = 0; i < this.components.length; i++) {
    if (!jsts.geom.Geometry.prototype.equal(this.components[i], other.components[i],
        tolerance)) {
      return false;
    }
  }
  return true;
};


/**
 * Creates and returns a full copy of this {@link LineString} object. (including
 * all coordinates contained by it).
 *
 * @return {jsts.geom.LineString} a clone of this instance.
 */
jsts.geom.LineString.prototype.clone = function() {
  var key, coordinate;

  var points = [];
  for (key in this.components) {
    if (this.components.hasOwnProperty(key)) {
      coordinate = this.components[key];
      points.push(coordinate.clone());
    }
  }

  var clone = new jsts.geom.LineString(points);

  return clone;
};

jsts.geom.LineString.prototype.apply = function(filter) {
  filter.filter(this);
};
