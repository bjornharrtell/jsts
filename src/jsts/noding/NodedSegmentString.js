/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/**
 * @requires jsts/noding/NodableSegmentString.js
 */

/**
 * Represents a list of contiguous line segments, and supports noding the
 * segments. The line segments are represented by an array of {@link Coordinate}s.
 * Intended to optimize the noding of contiguous segments by reducing the number
 * of allocated objects. SegmentStrings can carry a context object, which is
 * useful for preserving topological or parentage information. All noded
 * substrings are initialized with the same context object.
 *
 * Creates a new segment string from a list of vertices.
 *
 * @param pts
 *          the vertices of the segment string.
 * @param data
 *          the user-defined data of this segment string (may be null).
 *
 * @constructor
 */
jsts.noding.NodedSegmentString = function(pts, data) {
  this.nodeList = new jsts.noding.SegmentNodeList(this);

  this.pts = pts;
  this.data = data;
};
jsts.noding.NodedSegmentString.prototype = new jsts.noding.NodableSegmentString();
jsts.noding.NodedSegmentString.constructor = jsts.noding.NodedSegmentString;


/**
 *
 * @param {Array}
 *          segStrings a Collection of NodedSegmentStrings.
 * @param resultEdgelist
 *          a List which will collect the NodedSegmentStrings representing the
 *          substrings.
 * @return {Array} a Collection of NodedSegmentStrings representing the
 *         substrings.
 */
jsts.noding.NodedSegmentString.getNodedSubstrings = function(segStrings) {
  if (arguments[1] !== undefined) {
    return jsts.noding.NodedSegmentString.getNodedSubstrings2(segStrings, resultEdgelist);
  }

  var resultEdgelist = [];
  jsts.noding.NodedSegmentString.getNodedSubstrings2(segStrings, resultEdgelist);
  return resultEdgelist;
};


/**
 *
 * @param segStrings
 *          a Collection of NodedSegmentStrings.
 * @param resultEdgelist
 *          a List which will collect the NodedSegmentStrings representing the
 *          substrings.
 */
jsts.noding.NodedSegmentString.getNodedSubstrings2 = function(segStrings,
    resultEdgelist) {
  for (var i = 0; i < segStrings.length; i++) {
    var ss = segStrings[i];
    ss.getNodeList().addSplitEdges(resultEdgelist);
  }
};


/**
 * @type {jsts.noding.SegmentNodeList}
 * @private
 */
jsts.noding.NodedSegmentString.prototype.nodeList = null;


/**
 * @type {Array.<jsts.geom.Coordinate>}
 * @private
 */
jsts.noding.NodedSegmentString.prototype.pts = null;


/**
 * @type {Object}
 * @private
 */
jsts.noding.NodedSegmentString.prototype.data = null;


jsts.noding.NodedSegmentString.prototype.getData = function() {
  return this.data;
};
jsts.noding.NodedSegmentString.prototype.setData = function(data) {
  this.data = data;
};
jsts.noding.NodedSegmentString.prototype.getNodeList = function() {
  return this.nodeList;
};
jsts.noding.NodedSegmentString.prototype.size = function() {
  return this.pts.length;
};
jsts.noding.NodedSegmentString.prototype.getCoordinate = function(i) {
  return this.pts[i];
};
jsts.noding.NodedSegmentString.prototype.getCoordinates = function() {
  return this.pts;
};

jsts.noding.NodedSegmentString.prototype.isClosed = function() {
  return this.pts[0].equals(this.pts[this.pts.length - 1]);
};


/**
 * Gets the octant of the segment starting at vertex <code>index</code>.
 *
 * @param index
 *          the index of the vertex starting the segment. Must not be the last
 *          index in the vertex list.
 * @return the octant of the segment at the vertex.
 */
jsts.noding.NodedSegmentString.prototype.getSegmentOctant = function(index) {
  if (index === this.pts.length - 1)
    return -1;
  return this.safeOctant(getCoordinate(index), getCoordinate(index + 1));
};


/**
 * @private
 */
jsts.noding.NodedSegmentString.prototype.safeOctant = function(p0, p1) {
  if (p0.equals2D(p1))
    return 0;
  return jsts.noding.Octant.octant(p0, p1);
};


/**
 * Adds EdgeIntersections for one or both intersections found for a segment of
 * an edge to the edge intersection list.
 */
jsts.noding.NodedSegmentString.prototype.addIntersections = function(li,
    segmentIndex, geomIndex) {
  for (var i = 0; i < li.getIntersectionNum(); i++) {
    this.addIntersection(li, segmentIndex, geomIndex, i);
  }
};


/**
 * Add an SegmentNode for intersection intIndex. An intersection that falls
 * exactly on a vertex of the SegmentString is normalized to use the higher of
 * the two possible segmentIndexes
 */
jsts.noding.NodedSegmentString.prototype.addIntersection = function(li,
    segmentIndex, geomIndex, intIndex) {

  if (li instanceof jsts.geom.Coordinate) {
    this.addIntersection2.apply(this, arguments);
    return;
  }

  var intPt = new jsts.geom.Coordinate(li.getIntersection(intIndex));
  this.addIntersection2(intPt, segmentIndex);
};


/**
 * Adds an intersection node for a given point and segment to this segment
 * string.
 *
 * @param {jsts.geom.Coordinate} intPt
 *          the location of the intersection.
 * @param segmentIndex
 *          the index of the segment containing the intersection.
 */
jsts.noding.NodedSegmentString.prototype.addIntersection2 = function(intPt,
    segmentIndex) {
  this.addIntersectionNode(intPt, segmentIndex);
};


/**
 * Adds an intersection node for a given point and segment to this segment
 * string. If an intersection already exists for this exact location, the
 * existing node will be returned.
 *
 * @param {jsts.geom.Coordinate} intPt
 *          the location of the intersection.
 * @param segmentIndex
 *          the index of the segment containing the intersection.
 * @return {SegmentNode} the intersection node for the point.
 */
jsts.noding.NodedSegmentString.prototype.addIntersectionNode = function(intPt,
    segmentIndex) {
  var normalizedSegmentIndex = segmentIndex;
  // normalize the intersection point location
  var nextSegIndex = normalizedSegmentIndex + 1;
  if (nextSegIndex < this.pts.length) {
    var nextPt = this.pts[nextSegIndex];

    // Normalize segment index if intPt falls on vertex
    // The check for point equality is 2D only - Z values are ignored
    if (intPt.equals2D(nextPt)) {
      // Debug.println("normalized distance");
      normalizedSegmentIndex = nextSegIndex;
    }
  }
  /**
   * Add the intersection point to edge intersection list.
   */
  var ei = this.nodeList.push(intPt, normalizedSegmentIndex);
  return ei;
};
