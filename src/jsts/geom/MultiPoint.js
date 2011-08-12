/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/**
 * @requires jsts/geom/GeometryCollection.js
 */

(function() {

  /**
   * @constructor
   * @augments OpenLayers.Geometry.LineString
   * @augments jsts.geom.Geometry
   */
  var MultiPoint = function() {
    OpenLayers.Geometry.Collection.prototype.initialize.apply(this, arguments);

    this.geometries = [];

    for (var i = 0; i < this.components.length; i++) {
      var component = this.components[i];
      // NOTE: special handling since in JSTS the parts should be Points.
      if (component instanceof jsts.geom.Coordinate) {
        this.geometries.push(new jsts.geom.Point(component));
      } else {
        this.geometries.push(component);
      }
    }
  };
  MultiPoint.prototype = OpenLayers.Geometry.MultiPoint.prototype;

  for (key in jsts.geom.GeometryCollection.prototype) {
    MultiPoint.prototype[key] = MultiPoint.prototype[key] ? MultiPoint.prototype[key] : jsts.geom.GeometryCollection.prototype[key];
    // overrides
    MultiPoint.prototype.getCentroid = jsts.geom.GeometryCollection.prototype.getCentroid;
  }


  /**
   * Gets the boundary of this geometry. Zero-dimensional geometries have no
   * boundary by definition, so an empty GeometryCollection is returned.
   *
   * @return {Geometry} an empty GeometryCollection.
   * @see Geometry#getBoundary
   */
  MultiPoint.prototype.getBoundary = function() {
    return this.getFactory().createGeometryCollection(null);
  };

  MultiPoint.prototype.getGeometryN = function(n) {
    return this.geometries[n];
  };


  /**
   * @param {Geometry}
   *          other
   * @param {double}
   *          tolerance
   * @return {boolean}
   */
  MultiPoint.prototype.equalsExact = function(other, tolerance) {
    if (!this.isEquivalentClass(other)) {
      return false;
    }
    return jsts.geom.GeometryCollection.prototype.equalsExact.call(this, other,
        tolerance);
  };

  jsts.geom.MultiPoint = MultiPoint;
  OpenLayers.Geometry.MultiPoint = MultiPoint;

})();
