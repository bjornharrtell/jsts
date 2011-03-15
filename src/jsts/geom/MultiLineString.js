/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */



/**
 * @constructor
 * @extends {OpenLayers.Geometry.LineString}
 * @extends {jsts.geom.Geometry}
 */
jsts.geom.MultiLineString = function() {

};
jsts.geom.MultiLineString = OpenLayers.Class(jsts.geom.GeometryCollection);
