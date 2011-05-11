/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/**
 * Represents a linear polygon, which may include holes.
 * The shell and holes of the polygon are represented by {@link LinearRing}s.
 * In a valid polygon, holes may touch the shell or other holes at a single
 * point. However, no sequence of touching holes may split the polygon into
 * two pieces. The orientation of the rings in the polygon does not matter.
 *
 * The shell and holes must conform to the assertions specified in the <A
 * HREF="http://www.opengis.org/techno/specs.htm">OpenGIS Simple Features
 * Specification for SQL</A>.
 */



/**
 * @augments OpenLayers.Geometry.MultiPolygon
 * @augments jsts.geom.Geometry
 * @constructor
 */
jsts.geom.Polygon = function() {

};

jsts.geom.Polygon = OpenLayers.Class(jsts.geom.Geometry);


OpenLayers.Geometry.Polygon = OpenLayers.Class(OpenLayers.Geometry.Polygon,
    jsts.geom.Polygon);
jsts.geom.Polygon = OpenLayers.Geometry.Polygon;
