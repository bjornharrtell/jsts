/**
 * Copyright (c) 2016 by Björn Harrtell.
 * License: https://github.com/bjornharrtell/jsts/blob/master/LICENSE_BHARRTELL_BSD3.txt
 */

import GeometryFactory from '../geom/GeometryFactory'
import PrecisionModel from '../geom/PrecisionModel'
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
  constructor (geometryFactory) {
    this.geometryFactory = geometryFactory || new GeometryFactory()
    this.precisionModel = this.geometryFactory.getPrecisionModel()
    this.parser = new GeoJSONParser(this.geometryFactory)
  }

  /**
   * Reads a GeoJSON representation of a {@link Geometry}
   *
   * @param {Object|String} geoJson a GeoJSON Object or String.
   * @return {Geometry} a <code>Geometry.</code>
   */
  read (geoJson) {
    var geometry = this.parser.read(geoJson)

    if (this.precisionModel.getType() === PrecisionModel.FIXED) {
      this.reducePrecision(geometry)
    }

    return geometry
  }

  // NOTE: this is a hack
  reducePrecision (geometry) {
    var i, len

    if (geometry.coordinate) {
      this.precisionModel.makePrecise(geometry.coordinate)
    } else if (geometry.points) {
      for (i = 0, len = geometry.points.length; i < len; i++) {
        this.precisionModel.makePrecise(geometry.points[i])
      }
    } else if (geometry.geometries) {
      for (i = 0, len = geometry.geometries.length; i < len; i++) {
        this.reducePrecision(geometry.geometries[i])
      }
    }
  }
}
