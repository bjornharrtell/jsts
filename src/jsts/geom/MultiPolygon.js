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
   * @augments OpenLayers.Geometry.MultiPolygon
   * @augments jsts.geom.GeometryCollection
   */
  var MultiPolygon = function() {
    OpenLayers.Geometry.Collection.prototype.initialize.apply(this,
        arguments);
    this.geometries = this.components;
  };
  MultiPolygon.prototype = OpenLayers.Geometry.MultiPolygon.prototype;

  for (key in jsts.geom.GeometryCollection.prototype) {
    MultiPolygon.prototype[key] = MultiPolygon.prototype[key] ? MultiPolygon.prototype[key] : jsts.geom.GeometryCollection.prototype[key];
  }

  /**
   * Computes the boundary of this geometry
   *
   * @return {Geometry} a lineal geometry (which may be empty).
   * @see Geometry#getBoundary
   */
  MultiPolygon.prototype.getBoundary = function() {
    if (this.isEmpty()) {
      return this.getFactory().createMultiLineString(null);
    }
    var allRings = [];
    for (var i = 0; i < this.geometries.length; i++) {
      var polygon = this.geometries[i];
      var rings = polygon.getBoundary();
      for (var j = 0; j < rings.getNumGeometries(); j++) {
        allRings.push(rings.getGeometryN(j));
      }
    }
    return this.getFactory().createMultiLineString(allRings);
  };


  /**
   * @param {Geometry}
   *          other
   * @param {double}
   *          tolerance
   * @return {boolean}
   */
  MultiPolygon.prototype.equalsExact = function(other, tolerance) {
    if (!this.isEquivalentClass(other)) {
      return false;
    }
    return jsts.geom.GeometryCollection.prototype.equalsExact.call(this, other,
        tolerance);
  };

  jsts.geom.MultiPolygon = MultiPolygon;
  OpenLayers.Geometry.MultiPolygon = MultiPolygon;

})();
