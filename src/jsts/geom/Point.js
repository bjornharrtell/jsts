/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */


/**
 * @requires jsts/geom/Coordinate.js
 */



/**
 * @constructor
 * @augments jsts.geom.Coordinate
 */
jsts.geom.Point = function() {
};

jsts.geom.Point = OpenLayers.Class(jsts.geom.Geometry, {
  initialize: function(coordinate) {
    if (coordinate === undefined)
      return;

    this.coordinate = coordinate;
  }
});


jsts.geom.Point.prototype.coordinate = null;

jsts.geom.Point.prototype.getCoordinate = function() {
  return this.coordinate;
};

jsts.geom.Point.prototype.isEmpty = function() {
  return this.coordinate === null;
};

jsts.geom.Point.prototype.equalsExact = function(other, tolerance) {
  if (!this.isEquivalentClass(other)) {
    return false;
  }
  if (this.isEmpty() && other.isEmpty()) {
    return true;
  }
  return this.equal(other.getCoordinate(), this.getCoordinate(), tolerance);
};


/**
 * Gets the boundary of this geometry. Zero-dimensional geometries have no
 * boundary by definition, so an empty GeometryCollection is returned.
 *
 * @return {GeometryCollection} an empty GeometryCollection.
 * @see Geometry#getBoundary
 */
jsts.geom.Point.prototype.getBoundary = function() {
  return new jsts.geom.GeometryCollection(null);
};


/**
 * @return {Envelope} Envelope of this point.
 */
jsts.geom.Point.prototype.computeEnvelopeInternal = function() {
  if (this.isEmpty()) {
    return new jsts.geom.Envelope();
  }
  return new jsts.geom.Envelope(this);
};

jsts.geom.Point.prototype.apply = function(filter) {
  filter.filter(this);
};

jsts.geom.Point.prototype.clone = function() {
  return new jsts.geom.Point(this.coordinate.clone());
};


/**
 * @return {int} Always 0.
 */
jsts.geom.Point.prototype.getDimension = function() {
  return 0;
};


/**
 * @return {int} Always Dimension.FALSE.
 */
jsts.geom.Point.prototype.getBoundaryDimension = function() {
  return jsts.geom.Dimension.FALSE;
};


/**
 * @return {String} String representation of Point type.
 */
jsts.geom.Point.prototype.getGeometryType = function() {
  return 'Point';
};

jsts.geom.Point.prototype.hashCode = function() {
  return 'Point_' + this.coordinate.hashCode();
};
