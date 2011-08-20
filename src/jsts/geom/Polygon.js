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
  jsts.geom.Polygon = function() {
    OpenLayers.Geometry.Collection.prototype.initialize.apply(this, arguments);
  };

  for (key in OpenLayers.Geometry.Polygon) {
    jsts.geom.Polygon[key] = OpenLayers.Geometry.Polygon[key];
  }

  jsts.geom.Polygon.prototype = OpenLayers.Geometry.Polygon.prototype;

  for (key in jsts.geom.Geometry.prototype) {
    if (key != 'intersects') {
      jsts.geom.Polygon.prototype[key] = jsts.geom.Geometry.prototype[key];
    }
  }


  jsts.geom.Polygon.prototype.getCoordinate = function() {
    return this.components[0].getCoordinate();
  };


  /**
   * @return {boolean}
   */
  jsts.geom.Polygon.prototype.isEmpty = function() {
    for (var i = 0; i < this.components.length; i++) {
      if (!this.components[i].isEmpty()) {
        return false;
      }
    }
    return true;
  };


  jsts.geom.Polygon.prototype.getExteriorRing = function() {
    return this.components[0];
  };

  jsts.geom.Polygon.prototype.getInteriorRingN = function(n) {
    var holes = this.components.slice(1);
    return holes[n];
  };

  jsts.geom.Polygon.prototype.getNumInteriorRing = function() {
    return this.components.slice(1).length;
  };


  /**
   * Computes the boundary of this geometry
   *
   * @return {Geometry} a lineal geometry (which may be empty).
   * @see Geometry#getBoundary
   */
  jsts.geom.Polygon.prototype.getBoundary = function() {
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

  jsts.geom.Polygon.prototype.computeEnvelopeInternal = function() {
    var shell = this.components[0];

    return shell.getEnvelopeInternal();
  };

  jsts.geom.Polygon.prototype.getDimension = function() {
    return 2;
  };

  jsts.geom.Polygon.prototype.getBoundaryDimension = function() {
    return 1;
  };


  /**
   * @param {Geometry}
   *          other
   * @param {number}
   *          tolerance
   * @return {boolean}
   */
  jsts.geom.Polygon.prototype.equalsExact = function(other, tolerance) {
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
    var otherPolygonShell = other.components[0];
    var otherPolygonHoles = other.components.slice(1);
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

  jsts.geom.Polygon.prototype.compareToSameClass = function(o) {
    var thisShell = this.components[0];
    var otherShell = o.components[0];
    return thisShell.compareToSameClass(otherShell);
  };

  jsts.geom.Polygon.prototype.apply = function(filter) {
    if (filter instanceof jsts.geom.GeometryComponentFilter) {
      filter.filter(this);
      var shell = this.components[0];
      shell.apply(filter);
      var holes = this.components.slice(1);
      for (var i = 0; i < holes.length; i++) {
        holes[i].apply(filter);
      }
    }
    else if (filter instanceof jsts.geom.GeometryFilter) {
      filter.filter(this);
    }
    else if (filter instanceof jsts.geom.CoordinateFilter) {
      var shell = this.components[0];
      shell.apply(filter);
      var holes = this.components.slice(1);
      for (var i = 0; i < holes.length; i++) {
        holes[i].apply(filter);
      }
    }
  };

  OpenLayers.Geometry.Polygon = jsts.geom.Polygon;

})();
