/* Copyright (c) 2011 by Björn Harrtell.
 * Published under the MIT license.
 * See https://github.com/bjornharrtell/jsts/blob/master/license.txt for the
 * full text of the license.
 */



/**
 * Basic implementation of <code>Point</code>.
 *
 * @param {Coordinate}
 *          coordinate contains the single coordinate on which to base this
 *          <code>Point</code> , or <code>null</code> to create the empty
 *          geometry.
 * @param {GeometryFactory}
 *          factory that will create the geometry.
 *
 * @constructor
 * @extends {jsts.geom.Geometry}
 */
jsts.geom.Point = function(x, y) {
  if (x === undefined) {
    return;
  }

  this.x = x;
  this.y = y;
};

jsts.inherit(jsts.geom.Point, jsts.geom.Coordinate);


/**
 * @return {String} String representation of Point type.
 */
jsts.geom.Point.prototype.getGeometryType = function() {
  return 'Point';
};

