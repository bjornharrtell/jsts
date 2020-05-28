/**
 * @module org/locationtech/jts/io/GeoJSONReader
 */

import GeometryFactory from '../geom/GeometryFactory'
import GeoJSONParser from './GeoJSONParser'

/**
 * Converts a geometry in GeoJSON to a {@link Geometry}.
 */
export default class GeoJSONReader {
  /**
   * A <code>GeoJSONReader</code> is parameterized by a <code>GeometryFactory</code>,
   * to allow it to create <code>Geometry</code> objects of the appropriate
   * implementation. In particular, the <code>GeometryFactory</code> determines
   * the <code>PrecisionModel</code> and <code>SRID</code> that is used.
   *
   * @param {GeometryFactory} geometryFactory
   */
  constructor(geometryFactory) {
    this.parser = new GeoJSONParser(geometryFactory || new GeometryFactory())
  }

  /**
   * Reads a GeoJSON representation of a {@link Geometry}
   *
   * Will also parse GeoJSON Features/FeatureCollections as custom objects.
   *
   * @param {Object|String} geoJson a GeoJSON Object or String.
   * @return {Geometry|Object} a <code>Geometry or Feature/FeatureCollection representation.</code>
   * @memberof module:org/locationtech/jts/io/GeoJSONReader#
   */
  read(geoJson) {
    const geometry = this.parser.read(geoJson)
    return geometry
  }
}
