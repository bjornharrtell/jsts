/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */


/**
 * @requires jsts/geom/GeometryCollection.js
 */



/**
 * @constructor
 * @augments OpenLayers.Geometry.MultiPolygon
 * @augments jsts.geom.GeometryCollection
 */
jsts.geom.MultiPolygon = function() {

};
jsts.geom.MultiPolygon = OpenLayers.Class(jsts.geom.GeometryCollection);


/**
 * @param {Geometry} other
 * @param {double} tolerance
 * @return {boolean}
 */
jsts.geom.MultiPolygon.prototype.equalsExact = function(other, tolerance) {
  if (!this.isEquivalentClass(other)) {
    return false;
  }
  return jsts.geom.GeometryCollection.prototype.equalsExact.call(this, other, tolerance);
};

OpenLayers.Geometry.MultiPolygon = OpenLayers.Class(
    OpenLayers.Geometry.MultiPolygon, jsts.geom.MultiPolygon);
jsts.geom.MultiPolygon = OpenLayers.Geometry.MultiPolygon;
