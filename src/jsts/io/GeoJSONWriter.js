/* Copyright (c) 2011, 2012 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

(function() {
    jsts.io.GeoJSONWriter = function() {
      this.parser = new jsts.io.GeoJSONParser(this.geometryFactory);
    };


    jsts.io.GeoJSONWriter.prototype.write = function(geometry) {
      var geoJson = this.parser.write(geometry);

      return geoJson;
    };
})();
