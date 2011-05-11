/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/**
 * @requires jsts/geom/GeometryCollection.js
 */



/**
 * @constructor
 * @augments OpenLayers.Geometry.LineString
 * @augments jsts.geom.Geometry
 */
jsts.geom.MultiLineString = function() {

};
jsts.geom.MultiLineString = OpenLayers.Class(jsts.geom.GeometryCollection);

OpenLayers.Geometry.MultiLineString = OpenLayers.Class(
    OpenLayers.Geometry.MultiLineString, jsts.geom.MultiLineString);
jsts.geom.MultiLineString = OpenLayers.Geometry.MultiLineString;
