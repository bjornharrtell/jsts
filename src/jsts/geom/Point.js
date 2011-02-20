/* Copyright (c) 2011 by Björn Harrtell.
 * Published under the GNU Lesser GPL 2.1 license.
 * See https://github.com/bjornharrtell/jsts/blob/master/license.txt for the
 * full text of the license.
 */

/**
 *  Basic implementation of <code>Point</code>.
 *
 */



/**
 * @constructor
 *
 * @param {Coordinate}
 *          coordinate contains the single coordinate on which to base this
 *          <code>Point</code> , or <code>null</code> to create the empty
 *          geometry.
 * @param {GeometryFactory}
 *          factory that will create the geometry.
 */
jsts.geom.Point = function(coordinate, factory) {
  super(factory);
  this.init(coordinate);
};

jsts.inherit(jsts.geom.Point, jsts.geom.Geometry);
