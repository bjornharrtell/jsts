/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/**
 * @requires jsts/geomgraph/index/EdgeSetIntersector.js
 */



/**
 * Finds all intersections in one or two sets of edges, using the
 * straightforward method of comparing all segments. This algorithm is too slow
 * for production use, but is useful for testing purposes.
 *
 * @constructor
 */
jsts.geomgraph.index.SimpleEdgeSetIntersector = function() {

};

jsts.geomgraph.index.SimpleEdgeSetIntersector.prototype = new jsts.geomgraph.index.EdgeSetIntersector();


/**
 * statistics information
 *
 * @type {int}
 */
jsts.geomgraph.index.SimpleEdgeSetIntersector.prototype.nOverlaps = 0;


/**
 * @param {[]}
 *          edges
 * @param {SegmentIntersector}
 *          si
 * @param {boolean}
 *          testAllSegments
 */
jsts.geomgraph.index.SimpleEdgeSetIntersector.prototype.computeIntersections = function(
    edges, si, testAllSegments) {

  if (si instanceof Array) {
    this.computeIntersections2.apply(this, arguments);
    return;
  }

  var i0, i1, edge0, edge1;

  this.nOverlaps = 0;

  for (i0 = 0; i0 < edges.length; i0++) {
    edge0 = edges[i0];
    for (i1 = 0; i1 < edges.length; i1++) {
      edge1 = edges[i1];
      if (testAllSegments || edge0 !== edge1) {
        this.computeIntersects(edge0, edge1, si);
      }
    }
  }
};


/**
 * @param {[]}
 *          edges0
 * @param {[]}
 *          edges1
 * @param {SegmentIntersector}
 *          si
 */
jsts.geomgraph.index.SimpleEdgeSetIntersector.prototype.computeIntersections2 = function(
    edges0, edges1, si) {
  this.nOverlaps = 0;

  for (var i0 = 0; i0 < edges0.length; i0++) {
    var edge0 = edges0[i0];
    for (var i1 = 0; i1 < edges1.length; i1++) {
      var edge1 = edges1[i1];
      this.computeIntersects(edge0, edge1, si);
    }
  }
};


/**
 * Performs a brute-force comparison of every segment in each Edge. This has n^2
 * performance, and is about 100 times slower than using monotone chains.
 *
 * @param {Edge}
 *          e0
 * @param {Edge}
 *          e1
 * @param {SegmentIntersector}
 *          si
 */
jsts.geomgraph.index.SimpleEdgeSetIntersector.prototype.computeIntersects = function(
    e0, e1, si) {
  var pts0 = e0.getCoordinates();
  var pts1 = e1.getCoordinates();
  var i0, i1;
  for (i0 = 0; i0 < pts0.length - 1; i0++) {
    for (i1 = 0; i1 < pts1.length - 1; i1++) {
      si.addIntersections(e0, i0, e1, i1);
    }
  }
};
