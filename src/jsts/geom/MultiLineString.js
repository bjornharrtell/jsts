/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

(function() {


  /**
   * @requires jsts/geom/GeometryCollection.js
   */



  /**
   * @constructor
   * @augments OpenLayers.Geometry.LineString
   * @augments jsts.geom.Geometry
   */
  var MultiLineString = function() {
    OpenLayers.Geometry.Collection.prototype.initialize.apply(this, arguments);
    this.geometries = this.components;
  };
  MultiLineString.prototype = OpenLayers.Geometry.MultiLineString.prototype;

  for (key in jsts.geom.GeometryCollection.prototype) {
    MultiLineString.prototype[key] = MultiLineString.prototype[key] ? MultiLineString.prototype[key]
        : jsts.geom.GeometryCollection.prototype[key];
  }

  MultiLineString.prototype.getBoundary = function() {
    return (new jsts.operation.BoundaryOp(this)).getBoundary();
  };


  /**
   * @param {Geometry}
   *          other
   * @param {double}
   *          tolerance
   * @return {boolean}
   */
  MultiLineString.prototype.equalsExact = function(other, tolerance) {
    if (!this.isEquivalentClass(other)) {
      return false;
    }
    return jsts.geom.GeometryCollection.prototype.equalsExact.call(this, other,
        tolerance);
  };

  jsts.geom.MultiLineString = MultiLineString;
  OpenLayers.Geometry.MultiLineString = MultiLineString;

})();
