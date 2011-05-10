/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/**
 * The purpose of this file is to facilitate OpenLayers compatibility by mixin
 * jsts.geom.* implementation into corresponding OpenLayers.Geometry.* then set
 * jsts.geom.* as an alias.
 *
 * Note that jsts.geom.Point is unified with jsts.geom.Coordinate.
 *
 * @requires jsts/geom/Coordinate.js
 * @requires jsts/geom/Point.js
 * @requires jsts/geom/GeometryCollection.js
 * @requires jsts/geom/MultiPoint.js
 * @requires jsts/geom/LineString.js
 * @requires jsts/geom/MultiLineString.js
 * @requires jsts/geom/LinearRing.js
 * @requires jsts/geom/Polygon.js
 * @requires jsts/geom/MultiPolygon.js
 */

OpenLayers.Geometry.Point = OpenLayers.Class(OpenLayers.Geometry.Point,
    jsts.geom.Coordinate);
jsts.geom.Coordinate = OpenLayers.Geometry.Point;
jsts.geom.Point = OpenLayers.Class(jsts.geom.Point, jsts.geom.Coordinate);

OpenLayers.Geometry.Collection = OpenLayers.Class(
    OpenLayers.Geometry.Collection, jsts.geom.GeometryCollection);
jsts.geom.GeometryCollection = OpenLayers.Geometry.Collection;

OpenLayers.Geometry.MultiPoint = OpenLayers.Class(
    OpenLayers.Geometry.MultiPoint, jsts.geom.MultiPoint);
jsts.geom.MultiPoint = OpenLayers.Geometry.MultiPoint;

OpenLayers.Geometry.LineString = OpenLayers.Class(
    OpenLayers.Geometry.LineString, jsts.geom.LineString);
jsts.geom.LineString = OpenLayers.Geometry.LineString;

OpenLayers.Geometry.MultiLineString = OpenLayers.Class(
    OpenLayers.Geometry.MultiLineString, jsts.geom.MultiLineString);
jsts.geom.MultiLineString = OpenLayers.Geometry.MultiLineString;

OpenLayers.Geometry.LinearRing = OpenLayers.Class(
    OpenLayers.Geometry.LinearRing, jsts.geom.LinearRing);
jsts.geom.LinearRing = OpenLayers.Geometry.LinearRing;

OpenLayers.Geometry.Polygon = OpenLayers.Class(OpenLayers.Geometry.Polygon,
    jsts.geom.Polygon);
jsts.geom.Polygon = OpenLayers.Geometry.Polygon;

OpenLayers.Geometry.MultiPolygon = OpenLayers.Class(
    OpenLayers.Geometry.MultiPolygon, jsts.geom.MultiPolygon);
jsts.geom.MultiPolygon = OpenLayers.Geometry.MultiPolygon;
