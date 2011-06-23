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
 * @augments OpenLayers.Geometry.Collection
 * @augments jsts.geom.Geometry
 */
jsts.geom.GeometryCollection = function() {
};

jsts.geom.GeometryCollection.prototype = new jsts.geom.Geometry();


/**
 * @return {boolean}
 */
jsts.geom.GeometryCollection.prototype.isEmpty = function() {
  for (var i = 0; i < this.geometries.length; i++) {
    var geometry = this.geometries[i];

    if (!geometry.isEmpty()) {
      return false;
    }
  }
  return true;
};


/**
 * @return {Coordinate}
 */
jsts.geom.GeometryCollection.prototype.getCoordinate = function() {
  if (this.isEmpty())
    return null;

  return this.geometries[0].getCoordinate();
};


/**
 * Collects all coordinates of all subgeometries into an Array.
 *
 * Note that while changes to the coordinate objects themselves may modify the
 * Geometries in place, the returned Array as such is only a temporary container
 * which is not synchronized back.
 *
 * @return {Coordinate[]} the collected coordinates.
 */
jsts.geom.GeometryCollection.prototype.getCoordinates = function() {
  var coordinates = [];
  var k = -1;
  for (var i = 0; i < this.geometries.length; i++) {
    var geometry = this.geometries[i];

    var childCoordinates = geometry.getCoordinates();
    for (var j = 0; j < childCoordinates.length; j++) {
      k++;
      coordinates[k] = childCoordinates[j];
    }
  }
  return coordinates;
};


/**
 * @return {int}
 */
jsts.geom.GeometryCollection.prototype.getNumGeometries = function() {
  return this.geometries.length;
};


/**
 * @param {int}
 *          n
 * @return {Geometry}
 */
jsts.geom.GeometryCollection.prototype.getGeometryN = function(n) {
  return this.geometries[n];
};


/**
 * @param {Geometry}
 *          other
 * @param {double}
 *          tolerance
 * @return {boolean}
 */
jsts.geom.GeometryCollection.prototype.equalsExact = function(other, tolerance) {
  if (!this.isEquivalentClass(other)) {
    return false;
  }
  if (this.geometries.length !== other.geometries.length) {
    return false;
  }
  for (var i = 0; i < this.geometries.length; i++) {
    var geometry = this.geometries[i];

    if (!geometry.equalsExact(other.geometries[i], tolerance)) {
      return false;
    }
  }
  return true;
};

jsts.geom.GeometryCollection.prototype.apply = function(filter) {
  filter.filter(this);
  for (var i = 0; i < this.geometries.length; i++) {
    this.geometries[i].apply(filter);
  }
};


jsts.geom.GeometryCollection.prototype.getDimension = function() {
  var dimension = jsts.geom.Dimension.FALSE;
  for (var i = 0; i < this.geometries.length; i++) {
    var geometry = this.geometries[i];
    dimension = Math.max(dimension, geometry.getDimension());
  }
  return dimension;
};


/**
 * @protected
 */
jsts.geom.GeometryCollection.prototype.computeEnvelopeInternal = function() {
  var envelope = new jsts.geom.Envelope();
  for (var i = 0; i < this.geometries.length; i++) {
    var geometry = this.geometries[i];
    envelope.expandToInclude(geometry.getEnvelopeInternal());
  }
  return envelope;
};

OpenLayers.Geometry.Collection = OpenLayers.Class(
    OpenLayers.Geometry.Collection, jsts.geom.GeometryCollection, {
      initialize: function(components) {
        OpenLayers.Geometry.prototype.initialize.apply(this, arguments);
        this.components = [];
        if (components != null) {
          this.addComponents(components);
        }
        this.geometries = [];

        // this is for multipoint type
        // TODO: not needed for non multipart collections, should be run conditionally
        for (var i = 0; i < this.components.length; i++) {
          var component = this.components[i];
          // NOTE: special handling since in JTS the parts would be Points.
          if (component instanceof jsts.geom.Coordinate) {
            this.geometries.push(new jsts.geom.Point(component));
          } else {
            this.geometries.push(component);
          }
        }
      }
    });
jsts.geom.GeometryCollection = OpenLayers.Geometry.Collection;

// TODO: port rest
