/**
 * @module org/locationtech/jts/io/WKTReader
 */

import GeometryFactory from '../geom/GeometryFactory'
import WKTParser from './WKTParser'

/**
 * Converts a geometry in Well-Known Text format to a {@link Geometry}.
 * <p>
 * <code>WKTReader</code> supports extracting <code>Geometry</code> objects
 * from either {@link Reader}s or {@link String}s. This allows it to function
 * as a parser to read <code>Geometry</code> objects from text blocks embedded
 * in other data formats (e.g. XML).
 */

export default class WKTReader {
  /**
   * A <code>WKTReader</code> is parameterized by a <code>GeometryFactory</code>,
   * to allow it to create <code>Geometry</code> objects of the appropriate
   * implementation. In particular, the <code>GeometryFactory</code> determines
   * the <code>PrecisionModel</code> and <code>SRID</code> that is used.
   * @param {GeometryFactory} geometryFactory
   */
  constructor(geometryFactory) {
    this.parser = new WKTParser(geometryFactory || new GeometryFactory())
  }

  /**
   * Reads a Well-Known Text representation of a {@link Geometry}
   *
   * @param {string}
   *          wkt a <Geometry Tagged Text> string (see the OpenGIS Simple Features
   *          Specification).
   * @return {Geometry} a <code>Geometry</code> read from
   *         <code>string.</code>
   * @memberof module:org/locationtech/jts/io/WKTReader#
   */
  read(wkt) {
    return this.parser.read(wkt)
  }
}
