/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */



/**
 * Writes the Well-Known Text representation of a {@link Geometry}. The
 * Well-Known Text format is defined in the <A
 * HREF="http://www.opengis.org/techno/specs.htm"> OGC Simple Features
 * Specification for SQL</A>.
 * <p>
 * The <code>WKTWriter</code> outputs coordinates rounded to the precision
 * model. Only the maximum number of decimal places necessary to represent the
 * ordinates to the required precision will be output.
 * <p>
 * The SFS WKT spec does not define a special tag for {@link LinearRing}s.
 * Under the spec, rings are output as <code>LINESTRING</code>s.
 *
 * @see WKTReader
 * @constructor
 */
jsts.io.WKTWriter = function() {
};


/**
 * Converts a <code>Geometry</code> to its Well-known Text representation.
 *
 * @param {jsts.geom.Geometry}
 *          geometry a <code>Geometry</code> to process.
 * @return {string} a <Geometry Tagged Text> string (see the OpenGIS Simple
 *         Features Specification).
 */
jsts.io.WKTWriter.prototype.write = function(geometry) {
  var format = new OpenLayers.Format.WKT();
  var feature = new OpenLayers.Feature.Vector(geometry);
  var wkt = format.write(feature);

  return wkt;
};
