/**
 * @module org/locationtech/jts/io/GeoJSONWriter
 */

import GeoJSONParser from './GeoJSONParser'

/**
 * Writes the GeoJSON representation of a {@link Geometry}. The
 * The GeoJSON format is defined <A
 * HREF="http://geojson.org/geojson-spec.html">here</A>.
 */
export default class GeoJSONWriter {
  /**
   * The <code>GeoJSONWriter</code> outputs coordinates rounded to the precision
   * model. Only the maximum number of decimal places necessary to represent the
   * ordinates to the required precision will be output.
   *
   * @param {GeometryFactory} geometryFactory
   * @constructor
   */
  constructor() {
    this.parser = new GeoJSONParser(this.geometryFactory)
  }

  /**
   * Converts a <code>Geometry</code> to its GeoJSON representation.
   *
   * @param {Geometry}
   *          geometry a <code>Geometry</code> to process.
   * @return {Object} The GeoJSON representation of the Geometry.
   * @memberof module:org/locationtech/jts/io/GeoJSONWriter#
   */
  write(geometry) {
    return this.parser.write(geometry)
  }
}
