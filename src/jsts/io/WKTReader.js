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
  var geometryOpenLayers = OpenLayers.Geometry.fromWKT(wkt);
  var geometry;

  //handle WKT empty inputs and linearring
  if (geometryOpenLayers === undefined) {
    if (wkt.search('LINEARRING') >= 0) {
      geometry = this.read(wkt.replace('LINEARRING', 'LINESTRING'));

      geometry = this.geometryFactory.createLinearRing(geometry.points);

      return geometry;
    }

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
      geometry = new jsts.geom.Polygon(null, null, this.geometryFactory);
      break;
    case 'multipolygon':
      geometry = new jsts.geom.MultiPolygon(null, this.geometryFactory);
      break;
    case 'geometrycollection':
      geometry = new jsts.geom.GeometryCollection(null, this.geometryFactory);
      break;
    }
    return geometry;
  }

  var converter = new jsts.geom.OpenLayersConverter(this.geometryFactory);
  geometry = converter.convertFrom(geometryOpenLayers);

  // TODO: port and use GeometryPrecisionReducer
  // NOTE: this is a hack
  if (this.precisionModel.getType() === jsts.geom.PrecisionModel.FIXED) {
    this.reducePrecision(geometry);
  }

  return geometry;
};

//NOTE: this is a hack
jsts.io.WKTReader.prototype.reducePrecision = function(geometry) {
  var i;

  if (geometry.coordinate) {
    this.precisionModel.makePrecise(geometry.coordinate);
  } else if (geometry.points) {
    for (i = 0; i < geometry.points.length; i++) {
      this.precisionModel.makePrecise(geometry.points[i]);
    }
  } else if (geometry.geometries) {
    for (i = 0; i < geometry.geometries.length; i++) {
      this.reducePrecision(geometry.geometries[i]);
    }
  }
};
