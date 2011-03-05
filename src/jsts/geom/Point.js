/* Copyright (c) 2011 by Björn Harrtell.
 * Published under the MIT license.
 * See https://github.com/bjornharrtell/jsts/blob/master/license.txt for the
 * full text of the license.
 */



/**
 * Basic implementation of <code>Point</code>.
 *
 * @param {double}
 *          x the x-value.
 * @param {double}
 *          y the y-value.
 *
 * @constructor
 * @extends {jsts.geom.Coordinate}
 */
jsts.geom.Point = function(x, y) {
};
jsts.geom.Point = OpenLayers.Class(jsts.geom.Coordinate);


/**
 * @return {String} String representation of Point type.
 */
jsts.geom.Point.prototype.getGeometryType = function() {
  return 'Point';
};
