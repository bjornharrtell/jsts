/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */



/**
 * Constructs a new list from an array of Coordinates, allowing caller to
 * specify if repeated points are to be removed.
 *
 * In JSTS CoordinateList do *not* expose an API extended from ArrayList in Java, instead it is based on a simple JavaScript array.
 * CoordinateList does not seem to be used extensively which would warrant keeping the API.
 *
 * @param {Array.<jsts.geom.Coordinate>}
 *          coord the array of coordinates to load into the list.
 * @param {boolean}
 *          allowRepeated if <code>false</code>, repeated points are removed.
 *
 * @constructor
 */
jsts.geom.CoordinateList = function(coord, allowRepeated) {
  this.add(coord, allowRepeated);
};

jsts.geom.CoordinateList.prototype = new Array();


/**
 * Adds an array of coordinates to the list.
 *
 * @param {Array.<jsts.geom.Coordinate>}
 *          coord The coordinates.
 * @param {boolean}
 *          allowRepeated if set to false, repeated coordinates are collapsed.
 * @param {boolean}
 *          direction if false, the array is added in reverse order.
 * @return {boolean} true (as by general collection contract).
 */
jsts.geom.CoordinateList.prototype.add = function(coord, allowRepeated,
    direction) {
  direction = direction || true;

  if (direction) {
    for (var i = 0; i < coord.length; i++) {
      this.addCoordinate(coord[i], allowRepeated);
    }
  } else {
    for (var i = coord.length - 1; i >= 0; i--) {
      this.addCoordinate(coord[i], allowRepeated);
    }
  }
  return true;
};


/**
 * Adds a coordinate to the end of the list.
 *
 * @param {Coordinate}
 *          coord The coordinates.
 * @param {boolean}
 *          allowRepeated if set to false, repeated coordinates are collapsed.
 */
jsts.geom.CoordinateList.prototype.addCoordinate = function(coord,
    allowRepeated) {
  // don't add duplicate coordinates
  if (!allowRepeated) {
    if (this.length >= 1) {
      var last = this[this.length - 1];
      if (last.equals2D(coord))
        return;
    }
  }
  this.push(coord);
};

/**
 * Inserts a coordinate at the specified place in the list
 *
 * @param {Number}
 *          index The index where to insert the coordinate.
 * @param {Coordinate}
 *          coord The coordinate.
 * @param {boolean}
 *          allowRepeated if set to false, repeated coordinates are collapsed.
 */
jsts.geom.CoordinateList.prototype.insertCoordinate = function(index, coord,
    allowRepeated) {
  // don't add duplicate coordinates
  if (!allowRepeated) {
    var before = index > 0 ? index - 1 : -1;
    if (before !== -1 && this[before].equals2D(coord)) {
      return;
    }

    var after = index < this.length - 1 ? index + 1 : -1;
    if (after !== -1 && this[after].equals2D(coord)) {
      return;
    }
  }
  this.splice(index, 0, coord);
};

/**
 * Ensure this coordList is a ring, by adding the start point if necessary
 */
jsts.geom.CoordinateList.prototype.closeRing = function() {
  if (this.length > 0) {
    this.addCoordinate(new jsts.geom.Coordinate(this[0]), false);
  }
};

/**
 * Creates a standard javascript-array from the contents of this list
 *
 * @return {Array}
 *            the created array.
 */
jsts.geom.CoordinateList.prototype.toArray = function() {
  var i, il, arr;
  i = 0, il = this.length, arr = new Array(il);

  for (i; i < il; i++) {
    arr[i] = this[i];
  }

  return arr;
};

// TODO: port rest?
