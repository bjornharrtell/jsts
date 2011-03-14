/* Copyright (c) 2011 by Björn Harrtell.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */



/**
 * @constructor
 * @extends {OpenLayers.Geometry.Collection}
 * @extends {jsts.geom.Geometry}
 */
jsts.geom.GeometryCollection = function() {
};
jsts.geom.GeometryCollection = OpenLayers.Class(jsts.geom.Geometry);
