/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */



/**
 * @constructor
 */
jsts.geom.CoordinateArrays = function() {
  throw new jsts.error.AbstractMethodInvocationError();
};


/**
 * If the coordinate array argument has repeated points, constructs a new array
 * containing no repeated points. Otherwise, returns the argument.
 *
 * @return {Coordinate[]}
 * @see #hasRepeatedPoints(Coordinate[])
 */
jsts.geom.CoordinateArrays.removeRepeatedPoints = function(coord) {
  if (!this.hasRepeatedPoints(coord))
    return coord;
  var coordList = new jsts.geom.CoordinateList(coord, false);
  return coordList;
};


/**
 * Returns whether #equals returns true for any two consecutive Coordinates in
 * the given array.
 *
 * @param {Coordinate[]}
 *          coord
 * @return {boolean}
 */
jsts.geom.CoordinateArrays.hasRepeatedPoints = function(coord) {
  for (var i = 1; i < coord.length; i++) {
    if (coord[i - 1].equals(coord[i])) {
      return true;
    }
  }
  return false;
};
