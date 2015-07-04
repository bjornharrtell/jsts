/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

jsts.io.olParser = function(geometryFactory) {
  this.geometryFactory = geometryFactory || new jsts.geom.GeometryFactory();
};

/**
 * @param geometry
 *          {ol.geom.Geometry}
 * @return {jsts.geom.Geometry}
 */
jsts.io.olParser.prototype.read = function(geometry) {
  if (geometry instanceof ol.geom.Point) {
    return this.convertFromPoint(geometry);
  } else if (geometry instanceof ol.geom.LineString) {
    return this.convertFromLineString(geometry);
  } else if (geometry instanceof ol.geom.LinearRing) {
    return this.convertFromLinearRing(geometry);
  } else if (geometry instanceof ol.geom.Polygon) {
    return this.convertFromPolygon(geometry);
  } else if (geometry instanceof ol.geom.MultiPoint) {
    return this.convertFromMultiPoint(geometry);
  } else if (geometry instanceof ol.geom.MultiLineString) {
    return this.convertFromMultiLineString(geometry);
  } else if (geometry instanceof ol.geom.MultiPolygon) {
    return this.convertFromMultiPolygon(geometry);
  } else if (geometry instanceof ol.geom.GeometryCollection) {
    return this.convertFromCollection(geometry);
  }
};

jsts.io.olParser.prototype.convertFromPoint = function(point) {
  var coordinates = point.getCoordinates();
  return this.geometryFactory.createPoint(new jsts.geom.Coordinate(coordinates[0], coordinates[1]));
};

jsts.io.olParser.prototype.convertFromLineString = function(lineString) {
  return this.geometryFactory.createLineString(lineString.getCoordinates().map(function(coordinates) {
    return new jsts.geom.Coordinate(coordinates[0], coordinates[1]);
  }));
};

jsts.io.olParser.prototype.convertFromLinearRing = function(linearRing) {
  return this.geometryFactory.createLinearRing(linearRing.getCoordinates().map(function(coordinates) {
    return new jsts.geom.Coordinate(coordinates[0], coordinates[1]);
  }));
};

jsts.io.olParser.prototype.convertFromPolygon = function(polygon) {
  var linearRings = polygon.getLinearRings();
  var i;
  var shell = null;
  var holes = [];
  for (i = 0; i < linearRings.length; i++) {
    var linearRing = this.convertFromLinearRing(linearRings[i]);
    if (i === 0) {
      shell = linearRing;
    } else {
      holes.push(linearRing);
    }
  }
  return this.geometryFactory.createPolygon(shell, holes);
};

jsts.io.olParser.prototype.convertFromMultiPoint = function(multiPoint) {
  var points =  multiPoint.getPoints().map(function(point) {
    return this.convertFromPoint(point);
  }, this);
  return this.geometryFactory.createMultiPoint(points);
};

jsts.io.olParser.prototype.convertFromMultiLineString = function(multiLineString) {
  var lineStrings = multiLineString.getLineStrings().map(function(lineString) {
    return this.convertFromLineString(lineString);
  }, this);
  return this.geometryFactory.createMultiLineString(lineStrings);
};

jsts.io.olParser.prototype.convertFromMultiPolygon = function(multiPolygon) {
  var polygons = multiPolygon.getPolygons().map(function(polygon) {
    return this.convertFromPolygon(polygon);
  }, this);
  return this.geometryFactory.createMultiPolygon(polygons);
};

jsts.io.olParser.prototype.convertFromCollection = function(collection) {
  var geometries = collection.getGeometries().map(function(geometry) {
    return this.read(geometry);
  }, this);
  return this.geometryFactory.createGeometryCollection(geometries);
};

/**
 * @param geometry
 *          {jsts.geom.Geometry}
 * @return {ol.geom.Geometry}
 */
jsts.io.olParser.prototype.write = function(geometry) {
  if (geometry.CLASS_NAME === 'jsts.geom.Point') {
    return this.convertToPoint(geometry.coordinate);
  } else if (geometry.CLASS_NAME === 'jsts.geom.LineString') {
    return this.convertToLineString(geometry);
  } else if (geometry.CLASS_NAME === 'jsts.geom.LinearRing') {
    return this.convertToLinearRing(geometry);
  } else if (geometry.CLASS_NAME === 'jsts.geom.Polygon') {
    return this.convertToPolygon(geometry);
  } else if (geometry.CLASS_NAME === 'jsts.geom.MultiPoint') {
    return this.convertToMultiPoint(geometry);
  } else if (geometry.CLASS_NAME === 'jsts.geom.MultiLineString') {
    return this.convertToMultiLineString(geometry);
  } else if (geometry.CLASS_NAME === 'jsts.geom.MultiPolygon') {
    return this.convertToMultiPolygon(geometry);
  } else if (geometry.CLASS_NAME === 'jsts.geom.GeometryCollection') {
    return this.convertToCollection(geometry);
  }
};

jsts.io.olParser.prototype.convertToPoint = function(coordinate) {
  return new ol.geom.Point([coordinate.x, coordinate.y]);
};

jsts.io.olParser.prototype.convertToLineString = function(lineString) {
  var i;
  var points =  lineString.points.map(function(point) {
    return [point.x, point.y];
  }, this);
  return new ol.geom.LineString(points);
};

jsts.io.olParser.prototype.convertToLinearRing = function(linearRing) {
  var i;
  var points =  linearRing.points.map(function(point) {
    return [point.x, point.y];
  }, this);
  return new ol.geom.LinearRing(points);
};

jsts.io.olParser.prototype.convertToPolygon = function(polygon) {
  var i;
  var rings = [];
  rings.push(polygon.shell.points.map(function(point) {
    return [point.x, point.y];
  }, this));
  for (i = 0; i < polygon.holes.length; i++) {
    rings.push(polygon.holes[i].points.map(function(point) {
		return [point.x, point.y];
	}, this));
  }
  return new ol.geom.Polygon(rings);
};

jsts.io.olParser.prototype.convertToMultiPoint = function(multiPoint) {
  var i;
  var points = [];
  for (i = 0; i < multiPoint.geometries.length; i++) {
    points.push(this.convertToPoint(multiPoint.geometries[i]).getCoordinates());
  }
  return new ol.geom.MultiPoint(points);
};

jsts.io.olParser.prototype.convertToMultiLineString = function(multiLineString) {
  var i;
  var lineStrings = [];
  for (i = 0; i < multiLineString.geometries.length; i++) {
	lineStrings.push(this.convertToLineString(multiLineString.geometries[i]).getCoordinates());
  }
  return new ol.geom.MultiLineString(lineStrings);
};

jsts.io.olParser.prototype.convertToMultiPolygon = function(multiPolygon) {
  var i;
  var polygons = [];
  for (i = 0; i < multiPolygon.geometries.length; i++) {
	polygons.push(this.convertToPolygon(multiPolygon.geometries[i]).getCoordinates());
  }
  return new ol.geom.MultiPolygon(polygons);
};

jsts.io.olParser.prototype.convertToCollection = function(geometryCollection) {
  var i;
  var geometries = [];
  for (i = 0; i < geometryCollection.geometries.length; i++) {
    var geometry = geometryCollection.geometries[i];
    geometries.push(this.write(geometry));
  }
  return new ol.geom.GeometryCollection(geometries);
};
