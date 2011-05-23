/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/**
 * A lightweight class used to store coordinates on the 2-dimensional Cartesian
 * plane. It is distinct from {@link Point}, which is a subclass of
 * {@link Geometry}. Unlike objects of type {@link Point} (which contain
 * additional information such as an envelope, a precision model, and spatial
 * reference system information), a <code>Coordinate</code> only contains
 * coordinate values and accessor methods.
 *
 * @requires jsts/geom/Geometry.js
 */



/**
 * @constructor
 * @augments OpenLayers.Geometry.Point
 * @augments jsts.geom.Geometry
 */
jsts.geom.Coordinate = function() {
};
jsts.geom.Coordinate = OpenLayers.Class(jsts.geom.Geometry);


/**
 * Sets this <code>Coordinate</code>s (x,y,z) values to that of
 * <code>other</code>.
 *
 * @param {Coordinate}
 *          other the <code>Coordinate</code> to copy.
 */
jsts.geom.Coordinate.prototype.setCoordinate = function(other) {
  this.x = other.x;
  this.y = other.y;
};


/**
 * Clones this instance.
 *
 * @return {jsts.geom.Coordinate} A point instance cloned from this.
 */
jsts.geom.Coordinate.prototype.clone = function() {
  return new jsts.geom.Coordinate(this.x, this.y);
};


/**
 * Computes the 2-dimensional Euclidean distance to another location. The
 * Z-ordinate is ignored.
 *
 * @param {Coordinate}
 *          p a point.
 * @return {double} the 2-dimensional Euclidean distance between the locations.
 */
jsts.geom.Coordinate.prototype.distance = function(p) {
  var dx = this.x - p.x;
  var dy = this.y - p.y;

  return Math.sqrt(dx * dx + dy * dy);
};


/**
 * Returns whether the planar projections of the two <code>Coordinate</code>s
 * are equal.
 *
 * @param {Coordinate}
 *          other a <code>Coordinate</code> with which to do the 2D
 *          comparison.
 * @return {boolean} <code>true</code> if the x- and y-coordinates are equal;
 *         the z-coordinates do not have to be equal.
 */
jsts.geom.Coordinate.prototype.equals2D = function(other) {
  if (this.x !== other.x) {
    return false;
  }

  if (this.y !== other.y) {
    return false;
  }

  return true;
};


/**
 * Returns <code>true</code> if <code>other</code> has the same values for
 * the x and y ordinates. Since Coordinates are 2.5D, this routine ignores the z
 * value when making the comparison.
 *
 * @param {Coordinate}
 *          other a <code>Coordinate</code> with which to do the comparison.
 * @return {boolean} <code>true</code> if <code>other</code> is a
 *         <code>Coordinate</code> with the same values for the x and y
 *         ordinates.
 */
jsts.geom.Coordinate.prototype.jsts_equals = function(other) {
  if (other.CLASS_NAME !== this.CLASS_NAME) {
    return false;
  }
  return this.equals2D(other);
};


/**
 * Compares this {@link Coordinate} with the specified {@link Coordinate} for
 * order. This method ignores the z value when making the comparison. Returns:
 * <UL>
 * <LI> -1 : this.x < other.x || ((this.x == other.x) && (this.y < other.y))
 * <LI> 0 : this.x == other.x && this.y = other.y
 * <LI> 1 : this.x > other.x || ((this.x == other.x) && (this.y > other.y))
 *
 * </UL>
 * Note: This method assumes that ordinate values are valid numbers. NaN values
 * are not handled correctly.
 *
 * @param {Coordinate}
 *          other the <code>Coordinate</code> with which this
 *          <code>Coordinate</code> is being compared.
 * @return {Boolean} -1, zero, or 1 as explained above.
 */
jsts.geom.Coordinate.prototype.compareTo = function(other) {
  if (this.x < other.x) {
    return -1;
  }
  if (this.x > other.x) {
    return 1;
  }
  if (this.y < other.y) {
    return -1;
  }
  if (this.y > other.y) {
    return 1;
  }

  return 0;
};


/**
 * @return {Coordinate[]} this Point as coordinate array.
 */
jsts.geom.Coordinate.prototype.getCoordinates = function() {
  return this.isEmpty() ? [] : [this.coordinate];
};


/**
 * @return {int} number of coordinates (0 or 1).
 */
jsts.geom.Coordinate.prototype.getNumPoints = function() {
  return this.isEmpty() ? 0 : 1;
};


/**
 * @return {Boolean} true ifPoint is empty.
 */
jsts.geom.Coordinate.prototype.isEmpty = function() {
  return this.x === null;
};


/**
 * @return {Boolean} Point is always simple.
 */
jsts.geom.Coordinate.prototype.isSimple = function() {
  return true;
};


/**
 * A Point is valid iff:
 * <ul>
 * <li>the coordinate which defines it is a valid coordinate (i.e does not have
 * an NaN X or Y ordinate)
 * </ul>
 *
 * @return {boolean} true iff the Point is valid.
 */
jsts.geom.Coordinate.prototype.isValid = function() {
  if (!IsValidOp.isValid(getCoordinate())) {
    return false;
  }
  return true;
};


/**
 * @return {int} Always 0.
 */
jsts.geom.Coordinate.prototype.getDimension = function() {
  return 0;
};


/**
 * @return {int} Always Dimension.FALSE.
 */
jsts.geom.Coordinate.prototype.getBoundaryDimension = function() {
  return Dimension.FALSE;
};


/**
 * @return {double} x-axis value of this Coordinate.
 */
jsts.geom.Coordinate.prototype.getX = function() {
  return this.x;
};


/**
 * @return {double} y-axis value of this Coordinate.
 */
jsts.geom.Coordinate.prototype.getY = function() {
  return this.y;
};


/**
 * @return {Coordinate} this Point coordinate.
 */
jsts.geom.Coordinate.prototype.getCoordinate = function() {
  return this;
};


/**
 * @return {String} String representation of Point type.
 */
jsts.geom.Coordinate.prototype.getGeometryType = function() {
  return 'Coordinate';
};


/**
 * @return {Envelope} Envelope of this point.
 */
jsts.geom.Coordinate.prototype.computeEnvelopeInternal = function() {
  if (this.isEmpty()) {
    return new jsts.geom.Envelope();
  }
  return new jsts.geom.Envelope(this);
};


/**
 * @param {Point}
 *          other point to compare.
 * @param {double}
 *          tolerance tolerance used in comparison.
 * @return {Boolean} true if gemetries match.
 */
jsts.geom.Coordinate.prototype.equalsExact = function(other, tolerance) {
  if (this.CLASS_NAME !== other.CLASS_NAME) {
    return false;
  }
  if (this.isEmpty() && other.isEmpty()) {
    return true;
  }
  return jsts.geom.Geometry.prototype.equal(other, this, tolerance);
};


/**
 * @return {Point} Reversed point is a cloned point.
 */
jsts.geom.Coordinate.prototype.reverse = function() {
  return this.clone();
};


/**
 *
 */
jsts.geom.Coordinate.prototype.normalize = function() {
  // a Point is always in normalized form
};


OpenLayers.Geometry.Point = OpenLayers.Class(OpenLayers.Geometry.Point,
    jsts.geom.Coordinate, {
      // replace constructor with one that also accepts JTS arguments
      initialize: function(x, y) {
        OpenLayers.Geometry.prototype.initialize.apply(this, arguments);
        if (x === undefined || x === null) {
        } else if (typeof x === 'number' || typeof x === 'string') {
          this.x = parseFloat(x);
          this.y = parseFloat(y);
        } else if (x instanceof jsts.geom.Coordinate) {
          y = x.y;
          x = x.x;
          this.x = parseFloat(x);
          this.y = parseFloat(y);
        }
      }
    });
jsts.geom.Coordinate = OpenLayers.Geometry.Point;
