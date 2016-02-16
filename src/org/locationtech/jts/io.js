/**
 * Copyright (c) 2016 by Björn Harrtell.
 * License: https://github.com/bjornharrtell/jsts/blob/master/LICENSE_BHARRTELL_BSD3.txt
 */

import GeoJSONReader from './io/GeoJSONReader'
import GeoJSONWriter from './io/GeoJSONWriter'
import WKTReader from './io/WKTReader'
import WKTWriter from './io/WKTWriter'
import OL3Parser from './io/OL3Parser'

/**
 * @module jsts/io
 */
export default {
  /**
   * @type {GeoJSONReader}
   * @memberof module:jsts/io
   */
  GeoJSONReader,
  /**
   * @type {GeoJSONWriter}
   * @memberof module:jsts/io
   */
  GeoJSONWriter,
  /**
   * @type {OL3Parser}
   * @memberof module:jsts/io
   */
  OL3Parser,
  /**
   * @type {WKTReader}
   * @memberof module:jsts/io
   */
  WKTReader,
  /**
   * @type {WKTWriter}
   * @memberof module:jsts/io
   */
  WKTWriter
}
