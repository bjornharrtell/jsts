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
 * @param {GeometryFactory}
 *          factory the factory used to create this Polygon.
 * @constructor
 */
jsts.geom.Polygon = function(shell, holes, factory) {
  jsts.geom.Geometry.prototype.constructor.call(this, factory);

  if (shell === null) {
    shell = factory.createLinearRing(null);
  }
  if (holes === null || holes === undefined) {
    holes = [];
  }
  if (jsts.geom.Geometry.hasNullElements(holes)) {
    throw new jsts.IllegalArgumentError('holes must not contain null elements');
  }
  if (shell.isEmpty() && jsts.geom.Geometry.hasNonEmptyElements(holes)) {
    throw new jsts.IllegalArgumentError('shell is empty but holes are not');
  }
  this.shell = shell;
  this.holes = holes;
};


jsts.inherit(jsts.geom.Polygon, jsts.geom.Geometry);


/**
 * The exterior boundary, or <code>null</code> if this <code>Polygon</code>
 * is empty.
 *
 * @type {LinearRing}
 */
jsts.geom.Polygon.prototype.shell = null;


/**
 * The interior boundaries, if any. This instance var is never null. If there
 * are no holes, the array is of zero length.
 *
 * @type {LinearRing[]}
 */
jsts.geom.Polygon.prototype.holes = null;
