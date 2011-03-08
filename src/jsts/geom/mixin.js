/* Copyright (c) 2011 by Björn Harrtell.
 * Published under the MIT license.
 * See https://github.com/bjornharrtell/jsts/blob/master/license.txt for the
 * full text of the license.
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
 * Extend OpenLayers.Geometry.LineString with jsts.geom.LineString
 */
OpenLayers.Geometry.LineString = OpenLayers.Class(
    OpenLayers.Geometry.LineString, jsts.geom.LineString);


/**
 * Alias for extended OpenLayers.Geometry.LineString
 */
jsts.geom.LineString = OpenLayers.Geometry.LineString;


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
