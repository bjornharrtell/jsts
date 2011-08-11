/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

(function() {

  /**
   * Represents a linear polygon, which may include holes. The shell and holes
   * of the polygon are represented by {@link LinearRing}s. In a valid polygon,
   * holes may touch the shell or other holes at a single point. However, no
   * sequence of touching holes may split the polygon into two pieces. The
   * orientation of the rings in the polygon does not matter.
   *
   * The shell and holes must conform to the assertions specified in the <A
   * HREF="http://www.opengis.org/techno/specs.htm">OpenGIS Simple Features
   * Specification for SQL</A>.
   */



  /**
   * @extends {jsts.geom.Geometry}
   * @constructor
   */
  var Polygon = function() {
    OpenLayers.Geometry.Collection.prototype.initialize.apply(this, arguments);
  };

  Polygon.prototype = OpenLayers.Geometry.Polygon.prototype;

  for (key in jsts.geom.Geometry.prototype) {
    Polygon.prototype[key] = jsts.geom.Geometry.prototype[key];
  }


  Polygon.prototype.getCoordinate = function() {
    return this.components[0].getCoordinate();
  };


  /**
   * @return {boolean}
   */
  Polygon.prototype.isEmpty = function() {
    for (var i = 0; i < this.components.length; i++) {
      if (!this.components[i].isEmpty()) {
        return false;
      }
    }
    return true;
  };


  Polygon.prototype.getExteriorRing = function() {
    return this.components[0];
  };

  Polygon.prototype.getInteriorRingN = function(n) {
    var holes = this.components.slice(1);
    return holes[n];
  };

  Polygon.prototype.getNumInteriorRing = function() {
    return this.components.slice(1).length;
  };


  /**
   * Computes the boundary of this geometry
   *
   * @return {Geometry} a lineal geometry (which may be empty).
   * @see Geometry#getBoundary
   */
  Polygon.prototype.getBoundary = function() {
    if (this.isEmpty()) {
      return this.getFactory().createMultiLineString(null);
    }
    var rings = [];
    var shell = this.components[0];
    rings[0] = shell;
    var holes = this.components.slice(1);
    for (var i = 0; i < holes.length; i++) {
      rings[i + 1] = holes[i];
    }
    // create LineString or MultiLineString as appropriate
    if (rings.length <= 1)
      return this.getFactory().createLinearRing(rings[0].components);
    return this.getFactory().createMultiLineString(rings);
  };

  Polygon.prototype.computeEnvelopeInternal = function() {
    var shell = this.components[0];

    return shell.getEnvelopeInternal();
  };

  Polygon.prototype.getDimension = function() {
    return 2;
  };

  Polygon.prototype.getBoundaryDimension = function() {
    return 1;
  };


  /**
   * @param {Geometry}
   *          other
   * @param {number}
   *          tolerance
   * @return {boolean}
   */
  Polygon.prototype.equalsExact = function(other, tolerance) {
    if (!this.isEquivalentClass(other)) {
      return false;
    }
    if (this.isEmpty() && other.isEmpty()) {
      return true;
    }
    if (this.isEmpty() !== other.isEmpty()) {
      return false;
    }

    var holes = this.components.slice(1);
    var otherPolygon = other;
    var thisShell = this.components[0];
    var otherPolygonShell = otherPolygon.components[0];
    var otherPolygonHoles = otherPolygon.components.slice(1);
    if (!thisShell.equalsExact(otherPolygonShell, tolerance)) {
      return false;
    }
    if (holes.length !== otherPolygonHoles.length) {
      return false;
    }
    if (holes.length !== otherPolygonHoles.length) {
      return false;
    }
    for (var i = 0; i < holes.length; i++) {
      if (!(holes[i]).equalsExact(otherPolygonHoles[i], tolerance)) {
        return false;
      }
    }
    return true;
  };

  Polygon.prototype.apply = function(filter) {
    filter.filter(this);
    if (filter instanceof jsts.geom.GeometryComponentFilter) {
      var shell = this.components[0];
      shell.apply(filter);
      var holes = this.components.slice(1);
      for (var i = 0; i < holes.length; i++) {
        holes[i].apply(filter);
      }
    }
  };

  jsts.geom.Polygon = Polygon;
  OpenLayers.Geometry.Polygon = Polygon;

})();
