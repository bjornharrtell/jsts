/**
 * @module org/locationtech/jts/io/WKTWriter
 */

import WKTParser from './WKTParser'

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
 */
export default class WKTWriter {
  /**
   * @param {GeometryFactory} geometryFactory
   */
  constructor(geometryFactory) {
    this.parser = new WKTParser(geometryFactory)
  }

  /**
   * Converts a <code>Geometry</code> to its Well-known Text representation.
   *
   * @param {Geometry} geometry a <code>Geometry</code> to process.
   * @return {string} a <Geometry Tagged Text> string (see the OpenGIS Simple
   *         Features Specification).
   * @memberof module:org/locationtech/jts/io/WKTWriter#
   */
  write(geometry) {
    return this.parser.write(geometry)
  }

  /**
   * Generates the WKT for a <tt>LINESTRING</tt> specified by two
   * {@link Coordinate}s.
   *
   * @param p0 the first coordinate.
   * @param p1 the second coordinate.
   *
   * @return the WKT.
   * @private
   */
  static toLineString(p0, p1) {
    if (arguments.length !== 2) throw new Error('Not implemented')

    return 'LINESTRING ( ' + p0.x + ' ' + p0.y + ', ' + p1.x + ' ' + p1.y + ' )'
  }
}
