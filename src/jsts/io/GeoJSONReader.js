/* Copyright (c) 2011, 2012 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */



jsts.io.GeoJSONReader = function(geometryFactory) {
  this.geometryFactory = geometryFactory || new jsts.geom.GeometryFactory();
  this.precisionModel = this.geometryFactory.getPrecisionModel();
  this.parser = new jsts.io.GeoJSONParser(this.geometryFactory);
};


jsts.io.GeoJSONReader.prototype.read = function(geoJson) {
  var geometry = this.parser.read(geoJson);

  if (this.precisionModel.getType() === jsts.geom.PrecisionModel.FIXED) {
    this.reducePrecision(geometry);
  }

  return geometry;
};

jsts.io.GeoJSONReader.prototype.reducePrecision = function(geometry) {
  var i, len;

  if (geometry.coordinate) {
    this.precisionModel.makePrecise(geometry.coordinate);
  } else if (geometry.points) {
    for (i = 0, len = geometry.points.length; i < len; i++) {
      this.precisionModel.makePrecise(geometry.points[i]);
    }
  } else if (geometry.geometries) {
    for (i = 0, len = geometry.geometries.length; i < len; i++) {
      this.reducePrecision(geometry.geometries[i]);
    }
  }
};
