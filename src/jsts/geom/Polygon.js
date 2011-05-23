/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/**
 * Represents a linear polygon, which may include holes.
 * The shell and holes of the polygon are represented by {@link LinearRing}s.
 * In a valid polygon, holes may touch the shell or other holes at a single
 * point. However, no sequence of touching holes may split the polygon into
 * two pieces. The orientation of the rings in the polygon does not matter.
 *
 * The shell and holes must conform to the assertions specified in the <A
 * HREF="http://www.opengis.org/techno/specs.htm">OpenGIS Simple Features
 * Specification for SQL</A>.
 */



/**
 * @augments OpenLayers.Geometry.MultiPolygon
 * @augments jsts.geom.Geometry
 * @constructor
 */
jsts.geom.Polygon = function() {

};

jsts.geom.Polygon = OpenLayers.Class(jsts.geom.Geometry);


jsts.geom.Polygon.prototype.getCoordinate = function() {
  return this.components[0].getCoordinate();
};


/**
 * @return {boolean}
 */
jsts.geom.Polygon.prototype.isEmpty = function() {
  for (var i = 0; i < this.geometries.length; i++) {
    if (!this.geometries[i].isEmpty()) {
      return false;
    }
  }
  return true;
};


jsts.geom.Polygon.prototype.getExteriorRing = function() {
  return this.components[0];
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
    return this.getFactory().createLinearRing(rings[0].getCoordinateSequence());
  return this.getFactory().createMultiLineString(rings);
};


/**
 * @param {Geometry} other
 * @param {double} tolerance
 * @return {boolean}
 */
jsts.geom.Polygon.prototype.equalsExact = function(other, tolerance) {
  if (!this.isEquivalentClass(other)) {
    return false;
  }
  if (this.isEmpty() && other.isEmpty()) {
    return true;
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

jsts.geom.Polygon.prototype.apply = function(filter) {
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

OpenLayers.Geometry.Polygon = OpenLayers.Class(OpenLayers.Geometry.Polygon,
    jsts.geom.Polygon);
jsts.geom.Polygon = OpenLayers.Geometry.Polygon;
