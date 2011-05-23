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
jsts.geom.MultiLineString = function() {

};
jsts.geom.MultiLineString = OpenLayers.Class(jsts.geom.GeometryCollection);

jsts.geom.MultiLineString.prototype.getBoundary = function() {
  return (new jsts.operation.BoundaryOp(this)).getBoundary();
};


/**
 * @param {Geometry} other
 * @param {double} tolerance
 * @return {boolean}
 */
jsts.geom.MultiLineString.prototype.equalsExact = function(other, tolerance) {
  if (!this.isEquivalentClass(other)) {
    return false;
  }
  return jsts.geom.GeometryCollection.prototype.equalsExact.call(this, other, tolerance);
};

OpenLayers.Geometry.MultiLineString = OpenLayers.Class(
    OpenLayers.Geometry.MultiLineString, jsts.geom.MultiLineString);
jsts.geom.MultiLineString = OpenLayers.Geometry.MultiLineString;
