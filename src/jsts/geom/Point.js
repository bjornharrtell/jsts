/* Copyright (c) 2011 by Björn Harrtell.
 * Published under the MIT license.
 * See https://github.com/bjornharrtell/jsts/blob/master/license.txt for the
 * full text of the license.
 */



/**
 * @constructor
 * @extends {jsts.geom.Coordinate}
 */
jsts.geom.Point = function() {
};


/**
 * @return {String} String representation of Point type.
 */
jsts.geom.Point.prototype.getGeometryType = function() {
  return 'Point';
};

