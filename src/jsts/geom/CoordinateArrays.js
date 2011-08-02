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
  var coordList;
  if (!this.hasRepeatedPoints(coord)) {
    return coord;
  }
  coordList = new jsts.geom.CoordinateList(coord, false);
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
  var i;
  for (i = 1; i < coord.length; i++) {
    if (coord[i - 1].equals(coord[i])) {
      return true;
    }
  }
  return false;
};

/**
 * Determines which orientation of the {@link Coordinate} array
 * is (overall) increasing.
 * In other words, determines which end of the array is "smaller"
 * (using the standard ordering on {@link Coordinate}).
 * Returns an integer indicating the increasing direction.
 * If the sequence is a palindrome, it is defined to be
 * oriented in a positive direction.
 *
 * @param pts the array of Coordinates to test.
 * @return <code>1</code> if the array is smaller at the start
 * or is a palindrome,
 * <code>-1</code> if smaller at the end.
 */
jsts.geom.CoordinateArrays.increasingDirection = function(pts) {
  for (var i = 0; i < parseInt(pts.length / 2); i++) {
    var j = pts.length - 1 - i;
    // skip equal points on both ends
    var comp = pts[i].compareTo(pts[j]);
    if (comp != 0)
      return comp;
  }
  // array must be a palindrome - defined to be in positive direction
  return 1;
};
