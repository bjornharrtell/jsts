/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/**
 * @requires jsts/geom/GeometryConverter.js
 */

jsts.geom.OpenLayersConverter = function(geometryFactory) {
  this.geometryFactory = geometryFactory || new jsts.geom.GeometryFactory();
};

jsts.geom.OpenLayersConverter.prototype = new jsts.geom.GeometryConverter();
jsts.geom.OpenLayersConverter.constructor = jsts.geom.OpenLayersConverter;

jsts.geom.OpenLayersConverter.prototype.convertFrom = function(geometry) {
  if (geometry.CLASS_NAME === 'OpenLayers.Geometry.Point') {
    return this.convertFromPoint(geometry);
  } else if (geometry.CLASS_NAME === 'OpenLayers.Geometry.LineString') {
    return this.convertFromLineString(geometry);
  } else if (geometry.CLASS_NAME === 'OpenLayers.Geometry.LinearRing') {
    return this.convertFromLinearRing(geometry);
  } else if (geometry.CLASS_NAME === 'OpenLayers.Geometry.Polygon') {
    return this.convertFromPolygon(geometry);
  } else if (geometry.CLASS_NAME === 'OpenLayers.Geometry.MultiPoint') {
    return this.convertFromMultiPoint(geometry);
  } else if (geometry.CLASS_NAME === 'OpenLayers.Geometry.MultiLineString') {
    return this.convertFromMultiLineString(geometry);
  } else if (geometry.CLASS_NAME === 'OpenLayers.Geometry.MultiPolygon') {
    return this.convertFromMultiPolygon(geometry);
  } else if (geometry.CLASS_NAME === 'OpenLayers.Geometry.Collection') {
    return this.convertFromCollection(geometry);
  }
};

jsts.geom.OpenLayersConverter.prototype.convertFromPoint = function(point) {
  return this.geometryFactory.createPoint(new jsts.geom.Coordinate(point.x,
      point.y));
};

jsts.geom.OpenLayersConverter.prototype.convertFromLineString = function(
    lineString) {
  var i;
  var coordinates = [];

  for (i = 0; i < lineString.components.length; i++) {
    coordinates.push(new jsts.geom.Coordinate(lineString.components[i].x,
        lineString.components[i].y));
  }

  return this.geometryFactory.createLineString(coordinates);
};

jsts.geom.OpenLayersConverter.prototype.convertFromLinearRing = function(
    linearRing) {
  var i;
  var coordinates = [];

  for (i = 0; i < linearRing.components.length; i++) {
    coordinates.push(new jsts.geom.Coordinate(linearRing.components[i].x,
        linearRing.components[i].y));
  }

  return this.geometryFactory.createLinearRing(coordinates);
};

jsts.geom.OpenLayersConverter.prototype.convertFromPolygon = function(polygon) {
  var i;
  var shell = null;
  var holes = [];

  for (i = 0; i < polygon.components.length; i++) {
    var linearRing = this.convertFromLinearRing(polygon.components[i]);

    if (i === 0) {
      shell = linearRing;
    } else {
      holes.push(linearRing);
    }
  }

  return this.geometryFactory.createPolygon(shell, holes);
};

jsts.geom.OpenLayersConverter.prototype.convertFromMultiPoint = function(
    multiPoint) {
  var i;
  var points = [];

  for (i = 0; i < multiPoint.components.length; i++) {
    points.push(this.convertFromPoint(multiPoint.components[i]));
  }

  return this.geometryFactory.createMultiPoint(points);
};

jsts.geom.OpenLayersConverter.prototype.convertFromMultiLineString = function(
    multiLineString) {
  var i;
  var lineStrings = [];

  for (i = 0; i < multiLineString.components.length; i++) {
    lineStrings.push(this.convertFromLineString(multiLineString.components[i]));
  }

  return this.geometryFactory.createMultiLineString(lineStrings);
};

jsts.geom.OpenLayersConverter.prototype.convertFromMultiPolygon = function(
    multiPolygon) {
  var i;
  var polygons = [];

  for (i = 0; i < multiPolygon.components.length; i++) {
    polygons.push(this.convertFromPolygon(multiPolygon.components[i]));
  }

  return this.geometryFactory.createMultiPolygon(polygons);
};

jsts.geom.OpenLayersConverter.prototype.convertFromCollection = function(
    collection) {
  var i;
  var geometries = [];

  for (i = 0; i < collection.components.length; i++) {
    geometries.push(this.convertFrom(collection.components[i]));
  }

  return this.geometryFactory.createGeometryCollection(geometries);
};

jsts.geom.OpenLayersConverter.prototype.convertTo = function(geometry) {
  if (geometry.CLASS_NAME === 'jsts.geom.Point') {
    return this.convertToPoint(geometry);
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

jsts.geom.OpenLayersConverter.prototype.convertToPoint = function(coordinate) {
  return new OpenLayers.Geometry.Point(coordinate.x, coordinate.y);
};

jsts.geom.OpenLayersConverter.prototype.convertToLineString = function(
    lineString) {
  var i;
  var points = [];

  for (i = 0; i < lineString.points.length; i++) {
    var coordinate = lineString.points[i];
    points.push(this.convertToPoint(coordinate));
  }

  return new OpenLayers.Geometry.LineString(points);
};

jsts.geom.OpenLayersConverter.prototype.convertToLinearRing = function(
    linearRing) {
  var i;
  var points = [];

  for (i = 0; i < linearRing.points.length; i++) {
    var coordinate = linearRing.points[i];
    points.push(this.convertToPoint(coordinate));
  }

  return new OpenLayers.Geometry.LinearRing(points);
};

jsts.geom.OpenLayersConverter.prototype.convertToPolygon = function(polygon) {
  var i;
  var rings = [];

  rings.push(this.convertToLinearRing(polygon.shell));

  for (i = 0; i < polygon.holes.length; i++) {
    var ring = polygon.holes[i];
    rings.push(this.convertToLinearRing(ring));
  }

  return new OpenLayers.Geometry.Polygon(rings);
};

jsts.geom.OpenLayersConverter.prototype.convertToMultiPoint = function(
    multiPoint) {
  var i;
  var points = [];

  for (i = 0; i < multiPoint.geometries.length; i++) {
    var coordinate = multiPoint.geometries[i].coordinate;
    points.push(new OpenLayers.Geometry.Point(coordinate.x, coordinate.y));
  }

  return new OpenLayers.Geometry.MultiPoint(points);
};

jsts.geom.OpenLayersConverter.prototype.convertToMultiLineString = function(
    multiLineString) {
  var i;
  var lineStrings = [];

  for (i = 0; i < multiLineString.geometries.length; i++) {
    lineStrings.push(this.convertToLineString(multiLineString.geometries[i]));
  }

  return new OpenLayers.Geometry.MultiLineString(lineStrings);
};

jsts.geom.OpenLayersConverter.prototype.convertToMultiPolygon = function(
    multiPolygon) {
  var i;
  var polygons = [];

  for (i = 0; i < multiPolygon.geometries.length; i++) {
    polygons.push(this.convertToPolygon(multiPolygon.geometries[i]));
  }

  return new OpenLayers.Geometry.MultiPolygon(polygons);
};

jsts.geom.OpenLayersConverter.prototype.convertToCollection = function(
    geometryCollection) {
  var i;
  var geometries = [];

  for (i = 0; i < geometryCollection.geometries.length; i++) {
    var geometry = geometryCollection.geometries[i];
    var geometryOpenLayers = this.convertTo(geometry);

    geometries.push(geometryOpenLayers);
  }

  return new OpenLayers.Geometry.Collection(geometries);
};
