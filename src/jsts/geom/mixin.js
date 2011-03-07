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

OpenLayers.Geometry.Point = OpenLayers.Class(OpenLayers.Geometry.Point,
    jsts.geom.Coordinate);
jsts.geom.Coordinate = OpenLayers.Geometry.Point;
jsts.geom.Point = OpenLayers.Class(jsts.geom.Point, jsts.geom.Coordinate);

OpenLayers.Geometry.LineString = OpenLayers.Class(
    OpenLayers.Geometry.LineString, jsts.geom.LineString);
jsts.geom.LineString = OpenLayers.Geometry.LineString;

OpenLayers.Geometry.LinearRing = OpenLayers.Class(
    OpenLayers.Geometry.LinearRing, jsts.geom.LinearRing);
jsts.geom.LinearRing = OpenLayers.Geometry.LinearRing;

OpenLayers.Geometry.Polygon = OpenLayers.Class(OpenLayers.Geometry.Polygon,
    jsts.geom.Polygon);
jsts.geom.Polygon = OpenLayers.Geometry.Polygon;
