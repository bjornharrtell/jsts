/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/**
 * MonotoneChains are a way of partitioning the segments of an edge to
 * allow for fast searching of intersections.
 * Specifically, a sequence of contiguous line segments
 * is a monotone chain iff all the vectors defined by the oriented segments
 * lies in the same quadrant.
 * <p>
 * Monotone Chains have the following useful properties:
 * <ol>
 * <li>the segments within a monotone chain will never intersect each other
 * <li>the envelope of any contiguous subset of the segments in a monotone chain
 * is simply the envelope of the endpoints of the subset.
 * </ol>
 * Property 1 means that there is no need to test pairs of segments from within
 * the same monotone chain for intersection.
 * Property 2 allows
 * binary search to be used to find the intersection points of two monotone chains.
 * For many types of real-world data, these properties eliminate a large number of
 * segment comparisons, producing substantial speed gains.
 * 
 * @constructor 
 */
jsts.geomgraph.index.MonotoneChainIndexer = function() {

};

/**
 * @param {javascript.util.List}
 *          list
 * @return {int[]} 
 */
jsts.geomgraph.index.MonotoneChainIndexer.toIntArray = function(
    list) {
  var array = [];
  for (var i = list.iterator(); i.hasNext(); ) {
    var element = i.next();
    array.push(element);
  }
  return array;
};

/**
 * @param {Coordinate[]}
 *          pts
 * @return {int[]} 
 */
jsts.geomgraph.index.MonotoneChainIndexer.prototype.getChainStartIndices = function(
    pts) {
  // find the startpoint (and endpoints) of all monotone chains in this edge
  var start = 0;
  var startIndexList = new javascript.util.ArrayList();
  startIndexList.add(start);
  do {
    var last = this.findChainEnd(pts, start);
    startIndexList.add(last);
    start = last;
  } while (start < pts.length - 1);

  // copy list to an array of ints, for efficiency
  var startIndex = jsts.geomgraph.index.MonotoneChainIndexer.toIntArray(startIndexList);
  return startIndex;
};

/**
 * return the index of the last point in the monotone chain
 * 
 * @param {Coordinate[]}
 *          pts
 * @param {int}
 *          start
 * @return {int} 
 */
jsts.geomgraph.index.MonotoneChainIndexer.prototype.findChainEnd = function(
    pts, start) {
  // determine quadrant for chain
  var chainQuad = jsts.geomgraph.Quadrant.quadrant(pts[start], pts[start + 1]);
  var last = start + 1;
  while (last < pts.length) {
    // compute quadrant for next possible segment in chain
    var quad = jsts.geomgraph.Quadrant.quadrant(pts[last - 1], pts[last]);
    if (quad != chainQuad) {
      break;
    }
    last++;
  }
  return last - 1;
};