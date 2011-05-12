/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/**
 * Models an OGC SFS <code>LinearRing</code>.
 * A LinearRing is a LineString which is both closed and simple.
 * In other words,
 * the first and last coordinate in the ring must be equal,
 * and the interior of the ring must not self-intersect.
 * Either orientation of the ring is allowed.
 * <p>
 * A ring must have either 0 or 4 or more points.
 * The first and last points must be equal (in 2D).
 * If these conditions are not met, the constructors throw
 * an {@link IllegalArgumentException}
 *
 * @requires jsts/geom/LineString.js
 */



/**
 * @constructor
 * @augments OpenLayers.Geometry.LinearRing
 * @augments jsts.geom.LineString
 */
jsts.geom.LinearRing = function() {
};
jsts.geom.LinearRing = OpenLayers.Class(jsts.geom.LineString);


/**
 * Returns <code>Dimension.FALSE</code>, since by definition LinearRings do
 * not have a boundary.
 *
 * @return {int} Dimension.FALSE.
 */
jsts.geom.LinearRing.prototype.getBoundaryDimension = function() {
  return jsts.geom.Dimension.FALSE;
};


/**
 * Returns <code>true</code>, since by definition LinearRings are always
 * simple.
 *
 * @return {Boolean} <code>true.</code>
 *
 * @see Geometry#isSimple
 */
jsts.geom.LinearRing.prototype.isSimple = function() {
  return true;
};


/**
 * @return {String} String representation of LinearRing type.
 */
jsts.geom.LinearRing.prototype.getGeometryType = function() {
  return 'LinearRing';
};


OpenLayers.Geometry.LinearRing = OpenLayers.Class(
    OpenLayers.Geometry.LinearRing, jsts.geom.LinearRing);
jsts.geom.LinearRing = OpenLayers.Geometry.LinearRing;

OpenLayers.Geometry.LineString = OpenLayers.Class(
    OpenLayers.Geometry.LineString, jsts.geom.LineString, {
      initialize: function(points) {
        OpenLayers.Geometry.Curve.prototype.initialize.apply(this, arguments);

        this.geometries = this.components;
      }
    });
jsts.geom.LineString = OpenLayers.Geometry.LineString;
