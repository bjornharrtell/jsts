/* Copyright (c) 2011 by Björn Harrtell.
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
 */


/**
 * Extend OpenLayers.Geometry.Point with jsts.geom.Coordinate
 */
OpenLayers.Geometry.Point = OpenLayers.Class(OpenLayers.Geometry.Point,
    jsts.geom.Coordinate);


/**
 * Alias for extended OpenLayers.Geometry.Point
 */
jsts.geom.Coordinate = OpenLayers.Geometry.Point;


/**
 * Alias for jsts.geom.Coordinate
 */
jsts.geom.Point = OpenLayers.Class(jsts.geom.Point, jsts.geom.Coordinate);


/**
 * Extend OpenLayers.Geometry.Collection with jsts.geom.GeometryCollection
 */
OpenLayers.Geometry.Collection = OpenLayers.Class(
    OpenLayers.Geometry.Collection, jsts.geom.GeometryCollection);


/**
 * Alias for extended OpenLayers.Geometry.MultiPoint
 */
jsts.geom.GeometryCollection = OpenLayers.Geometry.Collection;


/**
 * Extend OpenLayers.Geometry.Point with jsts.geom.Coordinate
 */
OpenLayers.Geometry.MultiPoint = OpenLayers.Class(
    OpenLayers.Geometry.MultiPoint, jsts.geom.MultiPoint);


/**
 * Alias for extended OpenLayers.Geometry.MultiPoint
 */
jsts.geom.MultiPoint = OpenLayers.Geometry.Point;


/**
 * Extend OpenLayers.Geometry.LineString with jsts.geom.LineString
 */
OpenLayers.Geometry.LineString = OpenLayers.Class(
    OpenLayers.Geometry.LineString, jsts.geom.LineString);


/**
 * Alias for extended OpenLayers.Geometry.LineString
 */
jsts.geom.LineString = OpenLayers.Geometry.LineString;


/**
 * Extend OpenLayers.Geometry.MultiLineString with jsts.geom.MultiLineString
 */
OpenLayers.Geometry.MultiLineString = OpenLayers.Class(
    OpenLayers.Geometry.MultiLineString, jsts.geom.MultiLineString);


/**
 * Alias for extended OpenLayers.Geometry.MultiLineString
 */
jsts.geom.MultiLineString = OpenLayers.Geometry.MultiLineString;


/**
 * Extend OpenLayers.Geometry.LinearRing with jsts.geom.LinearRing
 */
OpenLayers.Geometry.LinearRing = OpenLayers.Class(
    OpenLayers.Geometry.LinearRing, jsts.geom.LinearRing);


/**
 * Alias for extended OpenLayers.Geometry.LinearRing
 */
jsts.geom.LinearRing = OpenLayers.Geometry.LinearRing;


/**
 * Extend OpenLayers.Geometry.Polygon with jsts.geom.Polygon
 */
OpenLayers.Geometry.Polygon = OpenLayers.Class(OpenLayers.Geometry.Polygon,
    jsts.geom.Polygon);


/**
 * Alias for extended OpenLayers.Geometry.Polygon
 */
jsts.geom.Polygon = OpenLayers.Geometry.Polygon;


/**
 * Extend OpenLayers.Geometry.Polygon with jsts.geom.Polygon
 */
OpenLayers.Geometry.MultiPolygon = OpenLayers.Class(
    OpenLayers.Geometry.MultiPolygon, jsts.geom.MultiPolygon);


/**
 * Alias for extended OpenLayers.Geometry.MultiPolygon
 */
jsts.geom.MultiPolygon = OpenLayers.Geometry.MultiPolygon;
