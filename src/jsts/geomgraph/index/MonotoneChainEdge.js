/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/**
 * MonotoneChains are a way of partitioning the segments of an edge to
 * allow for fast searching of intersections.
 * They have the following properties:
 * <ol>
 * <li>the segments within a monotone chain will never intersect each other
 * <li>the envelope of any contiguous subset of the segments in a monotone chain
 * is simply the envelope of the endpoints of the subset.
 * </ol>
 * Property 1 means that there is no need to test pairs of segments from
 * the same monotone chain for intersection.
 * Property 2 allows
 * binary search to be used to find the intersection points of two monotone chains.
 * For many types of real-world data, these properties eliminate a large number of
 * segment comparisons, producing substantial speed gains.
 */

/**
 * @param {Edge} 
 *          e
 * @constructor 
 */
jsts.geomgraph.index.MonotoneChainEdge = function(e) {
  this.e = e;
  this.pts = e.getCoordinates();
  var mcb = new jsts.geomgraph.index.MonotoneChainIndexer();
  this.startIndex = mcb.getChainStartIndices(this.pts);
};

/**
 * @type {Edge} 
 */
jsts.geomgraph.index.MonotoneChainEdge.prototype.e = null;

/**
 * cache a reference to the coord array, for efficiency 
 *
 * @type {Coordinate[]} 
 */
jsts.geomgraph.index.MonotoneChainEdge.prototype.pts = null;

/**
 * the lists of start/end indexes of the monotone chains.
 * Includes the end point of the edge as a sentinel
 * 
 * @type {int[]} 
 */
jsts.geomgraph.index.MonotoneChainEdge.prototype.startIndex = null;

/**
 * these envelopes are created once and reused
 * 
 * @type {Envelope} 
 */
jsts.geomgraph.index.MonotoneChainEdge.prototype.env1 = new jsts.geom.Envelope();
jsts.geomgraph.index.MonotoneChainEdge.prototype.env2 = new jsts.geom.Envelope();

jsts.geomgraph.index.MonotoneChainEdge.prototype.getCoordinates = function() {
	return this.pts;
};

jsts.geomgraph.index.MonotoneChainEdge.prototype.getStartIndexes = function() {
	return this.startIndex;
};

/**
 * @param {int}
 *          chainIndex
 * @return {double} 
 */
jsts.geomgraph.index.MonotoneChainEdge.prototype.getMinX = function(
    chainIndex) {
  var x1 = this.pts[this.startIndex[chainIndex]].x;
  var x2 = this.pts[this.startIndex[chainIndex + 1]].x;
  if (x1 < x2) {
  	return x1;
  }
  return x2;
};

/**
 * @param {int}
 *          chainIndex
 * @return {double} 
 */
jsts.geomgraph.index.MonotoneChainEdge.prototype.getMaxX = function(
    chainIndex) {
  var x1 = this.pts[this.startIndex[chainIndex]].x;
  var x2 = this.pts[this.startIndex[chainIndex + 1]].x;
  if (x1 > x2) {
  	return x1;
  }
  return x2;
};

/**
 * @param {MonotoneChainEdge}
 *          mce
 * @param {SegmentIntersector}
 *          si 
 */
jsts.geomgraph.index.MonotoneChainEdge.prototype.computeIntersects = function(
    mce, si) {
  for (var i = 0; i < this.startIndex.length - 1; i++) {
    for (var j = 0; j < mce.startIndex.length - 1; j++) {
    	this.computeIntersectsForChain(i, mce, j, si);
    }
  }
};

/**
 * @param {int}
 *          chainIndex0
 * @param {MonotoneChainEdge}
 *          mce
 * @param {int}
 *          chainIndex1
 * @param {SegmentIntersector}
 *          si 
 */
jsts.geomgraph.index.MonotoneChainEdge.prototype.computeIntersectsForChain = function(
    chainIndex0, mce, chainIndex1, si) {
  this.computeIntersectsForChain2(this.startIndex[chainIndex0], this.startIndex[chainIndex0 + 1],
                                  mce,
                                  mce.startIndex[chainIndex1], mce.startIndex[chainIndex1 + 1],
                                  si);
};

/**
 * @param {int}
 *          start0
 * @param {int}
 *          end0
 * @param {MonotoneChainEdge}
 *          mce
 * @param {int}
 *          start1
 * @param {int}
 *          end1
 * @param {SegmentIntersector}
 *          ei 
 */
jsts.geomgraph.index.MonotoneChainEdge.prototype.computeIntersectsForChain2 = function(
    start0, end0, mce, start1, end1, ei) {
  var p00 = this.pts[start0];
  var p01 = this.pts[end0];
  var p10 = mce.pts[start1];
  var p11 = mce.pts[end1];
  
  //console.log("computeIntersectsForChain2:" + p00 + p01 + p10 + p11);
  // terminating condition for the recursion
  if (end0 - start0 == 1 && end1 - start1 == 1) {
    ei.addIntersections(this.e, start0, mce.e, start1);
    return;
  }

  // nothing to do if the envelopes of these chains don't overlap
  this.env1.init(p00, p01);
  this.env2.init(p10, p11);
  if (!this.env1.intersects(this.env2)) {
    return;
  }

  // the chains overlap, so split each in half and iterate (binary search)
  var mid0 = Math.floor((start0 + end0) / 2);
  var mid1 = Math.floor((start1 + end1) / 2);

  // Assert: mid != start or end (since we checked above for end - start <= 1)
  // check terminating conditions before recursing
  if (start0 < mid0) {
    if (start1 < mid1) {
      this.computeIntersectsForChain2(start0, mid0, mce, start1, mid1, ei);
    }
    if (mid1 < end1) {
      this.computeIntersectsForChain2(start0, mid0, mce, mid1, end1, ei);
    }
  }
  if (mid0 < end0) {
    if (start1 < mid1) {
      this.computeIntersectsForChain2(mid0, end0, mce, start1, mid1, ei);
    }
    if (mid1 < end1) {
      this.computeIntersectsForChain2(mid0, end0, mce, mid1, end1, ei);
    }
  }
};