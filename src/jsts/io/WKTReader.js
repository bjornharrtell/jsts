/* Copyright (c) 2011 by Björn Harrtell.
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
jsts.io.WKTReader = function() {
};


/**
 * Reads a Well-Known Text representation of a {@link Geometry}
 *
 * @param {string}
 *          wkt a <Geometry Tagged Text> string (see the OpenGIS Simple Features
 *          Specification).
 * @return {jsts.geom.Geometry} a <code>Geometry</code> read from
 *         <code>string.</code>
 */
jsts.io.WKTReader.prototype.read = function(wkt) {
  var geometry = OpenLayers.Geometry.fromWKT(wkt);

  return geometry;
};
