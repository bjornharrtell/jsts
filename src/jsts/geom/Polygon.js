/* Copyright (c) 2011 by Björn Harrtell.
 * Published under the MIT license.
 * See https://github.com/bjornharrtell/jsts/blob/master/license.txt for the
 * full text of the license.
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
 * Constructs a <code>Polygon</code> with the given exterior boundary and
 * interior boundaries.
 *
 * @param {LinearRing}
 *          shell the outer boundary of the new <code>Polygon</code>, or
 *          <code>null</code> or an empty <code>LinearRing</code> if the
 *          empty geometry is to be created.
 * @param {LinearRing[]}
 *          holes the inner boundaries of the new <code>Polygon</code>, or
 *          <code>null</code> or empty <code>LinearRing</code>s if the
 *          empty geometry is to be created.
 * @constructor
 * @extends {OpenLayers.Geometry.Polygon}
 * @extends {jsts.geom.Geometry}
 */
jsts.geom.Polygon = function(shell, holes) {
};
jsts.geom.Polygon = OpenLayers.Class(OpenLayers.Geometry.Polygon,
    jsts.geom.Geometry);
