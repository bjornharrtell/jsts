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
 * @augments OpenLayers.Geometry.LineString
 * @augments jsts.geom.Geometry
 */
jsts.geom.MultiPoint = function() {

};
jsts.geom.MultiPoint = OpenLayers.Class(jsts.geom.GeometryCollection);


/**
 * @param {Geometry} other
 * @param {double} tolerance
 * @return {boolean}
 */
jsts.geom.MultiPoint.prototype.equalsExact = function(other, tolerance) {
  if (!this.isEquivalentClass(other)) {
    return false;
  }
  return jsts.geom.GeometryCollection.prototype.equalsExact.call(this, other, tolerance);
};

OpenLayers.Geometry.MultiPoint = OpenLayers.Class(
    OpenLayers.Geometry.MultiPoint, jsts.geom.MultiPoint);
jsts.geom.MultiPoint = OpenLayers.Geometry.MultiPoint;
