/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */



/**
 * Converts a geometry in Well-Known Text format to a {@link Geometry}.
 * <p>
 * <code>WKTReader</code> supports extracting <code>Geometry</code> objects
 * from either {@link Reader}s or {@link String}s. This allows it to function
 * as a parser to read <code>Geometry</code> objects from text blocks embedded
 * in other data formats (e.g. XML).
 * <P>
 * <p>
 * A <code>WKTReader</code> is parameterized by a <code>GeometryFactory</code>,
 * to allow it to create <code>Geometry</code> objects of the appropriate
 * implementation. In particular, the <code>GeometryFactory</code> determines
 * the <code>PrecisionModel</code> and <code>SRID</code> that is used.
 * <P>
 *
 * @constructor
 */
jsts.io.WKTReader = function(geometryFactory) {
  this.geometryFactory = geometryFactory || new jsts.geom.GeometryFactory();
  this.precisionModel = this.geometryFactory.getPrecisionModel();
};


/**
 * Reads a Well-Known Text representation of a {@link Geometry}
 *
 * NOTE: OL WKT format does not handle LINEARRING type.
 *
 * @param {string}
 *          wkt a <Geometry Tagged Text> string (see the OpenGIS Simple Features
 *          Specification).
 * @return {jsts.geom.Geometry} a <code>Geometry</code> read from
 *         <code>string.</code>
 */
jsts.io.WKTReader.prototype.read = function(wkt) {
  var geometry = OpenLayers.Geometry.fromWKT(wkt);

  // NOTE: need to convert plain coordinate to JSTS Point
  if (geometry instanceof jsts.geom.Coordinate) {
    geometry = new jsts.geom.Point(geometry, this.geometryFactory);
  }

  // NOTE: need to convert plain Collection as JSTS GeometryCollection
  if (geometry instanceof OpenLayers.Geometry.Collection &&
      !(geometry instanceof OpenLayers.Geometry.Point ||
          geometry instanceof OpenLayers.Geometry.LineString ||
          geometry instanceof OpenLayers.Geometry.Polygon ||
          geometry instanceof OpenLayers.Geometry.MultiPoint ||
          geometry instanceof OpenLayers.Geometry.MultiLineString || geometry instanceof OpenLayers.Geometry.MultiPolygon)) {
    geometry = new jsts.geom.GeometryCollection(geometry.components, this.geometryFactory);
  }

  if (geometry !== undefined && geometry.factory === undefined) {
    geometry.factory = this.geometryFactory;
  }

  // handle WKT empty inputs
  if (geometry === undefined) {
    var type = wkt.split(' ')[0].toLowerCase();
    switch (type) {
    case 'point':
      geometry = new jsts.geom.Point(null, this.geometryFactory);
      break;
    case 'multipoint':
      geometry = new jsts.geom.MultiPoint(null, this.geometryFactory);
      break;
    case 'linestring':
      geometry = new jsts.geom.LineString(null, this.geometryFactory);
      break;
    case 'multilinestring':
      geometry = new jsts.geom.MultiLineString(null, this.geometryFactory);
      break;
    case 'polygon':
      geometry = new jsts.geom.Polygon(null, this.geometryFactory);
      break;
    case 'multipolygon':
      geometry = new jsts.geom.MultiPolygon(null, this.geometryFactory);
      break;
    case 'geometrycollection':
      geometry = new jsts.geom.GeometryCollection(null, this.geometryFactory);
      break;
    }
  }

  if (this.precisionModel.getType() === jsts.geom.PrecisionModel.FIXED) {
    this.reducePrecision(geometry.components);
  }

  return geometry;
};

jsts.io.WKTReader.prototype.reducePrecision = function(components) {
  var i, component;

  if (!components) return;

  for (i = 0; i < components.length; i++) {
    component = components[i];
    if (component instanceof jsts.geom.Coordinate) {
      this.precisionModel.makePrecise(component);
    }
    this.reducePrecision(component);
  }
};
