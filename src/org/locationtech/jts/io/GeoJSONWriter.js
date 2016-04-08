/**
 * @module GeoJSONWriter
 */

import GeoJSONParser from './GeoJSONParser'
import extend from '../../../../extend'

/**
 * Writes the GeoJSON representation of a {@link Geometry}. The
 * The GeoJSON format is defined <A
 * HREF="http://geojson.org/geojson-spec.html">here</A>.
 */

/**
 * The <code>GeoJSONWriter</code> outputs coordinates rounded to the precision
 * model. Only the maximum number of decimal places necessary to represent the
 * ordinates to the required precision will be output.
 *
 * @param {GeometryFactory} geometryFactory
 * @constructor
 */
export default function GeoJSONWriter () {
  this.parser = new GeoJSONParser(this.geometryFactory)
}

extend(GeoJSONWriter.prototype, {
  /**
   * Converts a <code>Geometry</code> to its GeoJSON representation.
   *
   * @param {Geometry}
   *          geometry a <code>Geometry</code> to process.
   * @return {Object} The GeoJSON representation of the Geometry.
   * @memberof GeoJSONWriter
   */
  write (geometry) {
    return this.parser.write(geometry)
  }
})
