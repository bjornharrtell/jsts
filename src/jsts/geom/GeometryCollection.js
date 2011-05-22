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

jsts.geom.GeometryCollection = OpenLayers.Class(jsts.geom.Geometry);


/**
 * @return {boolean}
 */
jsts.geom.GeometryCollection.prototype.isEmpty = function() {
  for (var i = 0; i < this.geometries.length; i++) {
    if (!this.geometries[i].isEmpty()) {
      return false;
    }
  }
  return true;
};


/**
 * @return {int}
 */
jsts.geom.GeometryCollection.prototype.getNumGeometries = function() {
  return this.geometries.length;
};


/**
 * @param {int} n
 * @return {Geometry}
 */
jsts.geom.GeometryCollection.prototype.getGeometryN = function(n) {
  return this.geometries[n];
};


/**
 * @param {Geometry} other
 * @param {double} tolerance
 * @return {boolean}
 */
jsts.geom.GeometryCollection.prototype.equalsExact = function(other,  tolerance) {
  if (!this.isEquivalentClass(other)) {
    return false;
  }
  if (this.geometries.length !== other.geometries.length) {
    return false;
  }
  for (var i = 0; i < this.geometries.length; i++) {
    if (!(this.geometries[i]).equalsExact(other.geometries[i], tolerance)) {
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

OpenLayers.Geometry.Collection = OpenLayers.Class(
    OpenLayers.Geometry.Collection, jsts.geom.GeometryCollection, {
      initialize: function(components) {
        OpenLayers.Geometry.prototype.initialize.apply(this, arguments);
        this.components = [];
        if (components != null) {
          this.addComponents(components);
        }
        this.geometries = this.components;
      }
    });
jsts.geom.GeometryCollection = OpenLayers.Geometry.Collection;

// TODO: port rest
