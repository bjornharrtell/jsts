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
  // TODO: fix this by overriding constructor
  this.geometries = this.components;

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
  //TODO: fix this by overriding constructor
  this.geometries = this.components;

  return this.geometries.length;
};


/**
 * @param {int} n
 * @return {Geometry}
 */
jsts.geom.GeometryCollection.prototype.getGeometryN = function(n) {
  //TODO: fix this by overriding constructor
  this.geometries = this.components;

  return this.geometries[n];
};

// TODO: port rest
