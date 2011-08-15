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
   * @extends jsts.geom.GeometryCollection
   */
  jsts.geom.MultiLineString = function() {
    if (arguments[0] instanceof Array) {
      // NOTE: need to support LinearRings as input (OL only supports
      // LineStrings
      var array = arguments[0];
      for (var i = 0; i < array.length; i++) {
        var e = array[i];
        if (e.CLASS_NAME === 'OpenLayers.Geometry.LinearRing') {
          array[i] = new jsts.geom.LineString(e.components);
        }
      }
    }

    OpenLayers.Geometry.Collection.prototype.initialize.apply(this, arguments);
    this.geometries = this.components;
  };
  jsts.geom.MultiLineString.prototype = OpenLayers.Geometry.MultiLineString.prototype;

  for (key in jsts.geom.GeometryCollection.prototype) {
    jsts.geom.MultiLineString.prototype[key] = jsts.geom.MultiLineString.prototype[key] ? jsts.geom.MultiLineString.prototype[key]
        : jsts.geom.GeometryCollection.prototype[key];

    // overrides
    jsts.geom.MultiLineString.prototype.getCentroid = jsts.geom.GeometryCollection.prototype.getCentroid;
  }

  jsts.geom.MultiLineString.prototype.getBoundary = function() {
    return (new jsts.operation.BoundaryOp(this)).getBoundary();
  };


  /**
   * @param {Geometry}
   *          other
   * @param {double}
   *          tolerance
   * @return {boolean}
   */
  jsts.geom.MultiLineString.prototype.equalsExact = function(other, tolerance) {
    if (!this.isEquivalentClass(other)) {
      return false;
    }
    return jsts.geom.GeometryCollection.prototype.equalsExact.call(this, other,
        tolerance);
  };

  OpenLayers.Geometry.MultiLineString = jsts.geom.MultiLineString;

})();
