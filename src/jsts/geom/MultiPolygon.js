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
  jsts.geom.MultiPolygon = function() {
    OpenLayers.Geometry.Collection.prototype.initialize.apply(this,
        arguments);
    this.geometries = this.components;
  };
  jsts.geom.MultiPolygon.prototype = OpenLayers.Geometry.MultiPolygon.prototype;

  for (key in jsts.geom.GeometryCollection.prototype) {
    jsts.geom.MultiPolygon.prototype[key] = jsts.geom.MultiPolygon.prototype[key] ? jsts.geom.MultiPolygon.prototype[key] : jsts.geom.GeometryCollection.prototype[key];
    // overrides
    jsts.geom.MultiPolygon.prototype.getCentroid = jsts.geom.GeometryCollection.prototype.getCentroid;
  }

  /**
   * Computes the boundary of this geometry
   *
   * @return {Geometry} a lineal geometry (which may be empty).
   * @see Geometry#getBoundary
   */
  jsts.geom.MultiPolygon.prototype.getBoundary = function() {
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
  jsts.geom.MultiPolygon.prototype.equalsExact = function(other, tolerance) {
    if (!this.isEquivalentClass(other)) {
      return false;
    }
    return jsts.geom.GeometryCollection.prototype.equalsExact.call(this, other,
        tolerance);
  };

  OpenLayers.Geometry.MultiPolygon = jsts.geom.MultiPolygon;

})();
