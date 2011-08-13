/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

(function() {

  /**
   * Represents a list of contiguous line segments, and supports noding the
   * segments. The line segments are represented by an array of
   * {@link Coordinate}s. Intended to optimize the noding of contiguous
   * segments by reducing the number of allocated objects. SegmentStrings can
   * carry a context object, which is useful for preserving topological or
   * parentage information. All noded substrings are initialized with the same
   * context object.
   *
   * Creates a new segment string from a list of vertices.
   *
   * @param pts
   *          the vertices of the segment string.
   * @param data
   *          the user-defined data of this segment string (may be null).
   * @constructor
   */
  var BasicSegmentString = function(pts, data) {
    this.pts = pts;
    this.data = data;
  };
  BasicSegmentString.prototype = new jsts.noding.SegmentString();


  BasicSegmentString.prototype.pts = null;
  BasicSegmentString.prototype.data = null;


  /**
   * Gets the user-defined data for this segment string.
   *
   * @return the user-defined data.
   */
  BasicSegmentString.prototype.getData = function() {
    return this.data;
  }

  /**
   * Sets the user-defined data for this segment string.
   *
   * @param data
   *          an Object containing user-defined data.
   */
  BasicSegmentString.prototype.setData = function(data) {
    this.data = data;
  }

  BasicSegmentString.prototype.size = function() {
    return this.pts.length;
  }
  BasicSegmentString.prototype.getCoordinate = function(i) {
    return this.pts[i];
  }
  BasicSegmentString.prototype.getCoordinates = function() {
    return this.pts;
  }

  BasicSegmentString.prototype.isClosed = function() {
    return this.pts[0].equals(this.pts[this.pts.length - 1]);
  }

  /**
   * Gets the octant of the segment starting at vertex <code>index</code>.
   *
   * @param index
   *          the index of the vertex starting the segment. Must not be the last
   *          index in the vertex list.
   * @return the octant of the segment at the vertex.
   */
  BasicSegmentString.prototype.getSegmentOctant = function(index) {
    if (index == this.pts.length - 1)
      return -1;
    return jsts.noding.Octant.octant(this.getCoordinate(index), this
        .getCoordinate(index + 1));
  }

  jsts.noding.BasicSegmentString = BasicSegmentString;

})();
