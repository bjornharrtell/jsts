/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */


/**
 * Finds all intersections in one or two sets of edges, using the
 * straightforward method of comparing all segments. This algorithm is too slow
 * for production use, but is useful for testing purposes.
 */
jsts.geomgraph.index.SimpleEdgeSetIntersector {

};

jsts.geomgraph.index.SimpleEdgeSetIntersector.prototype = new jsts.geomgraph.index.EdgeSetIntersector();


// TODO: finish port


/**
   * statistics information
   *
   * @type {int}
   */
jsts.geomgraph.index.SimpleEdgeSetIntersector.prototype.nOverlaps = 0;

jsts.geomgraph.index.SimpleEdgeSetIntersector.prototype.computeIntersections(List edges, SegmentIntersector si, boolean testAllSegments)
 {
  this.nOverlaps = 0;

  for (Iterator i0 = edges.iterator(); i0.hasNext(); ) {
    Edge edge0 = (Edge) i0.next();
    for (Iterator i1 = edges.iterator(); i1.hasNext(); ) {
      Edge edge1 = (Edge) i1.next();
      if (testAllSegments || edge0 != edge1)
        computeIntersects(edge0, edge1, si);
    }
  }
}


jsts.geomgraph.index.SimpleEdgeSetIntersector.prototype.computeIntersections(List edges0, List edges1, SegmentIntersector si)
 {
  nOverlaps = 0;

  for (Iterator i0 = edges0.iterator(); i0.hasNext(); ) {
    Edge edge0 = (Edge) i0.next();
    for (Iterator i1 = edges1.iterator(); i1.hasNext(); ) {
      Edge edge1 = (Edge) i1.next();
      computeIntersects(edge0, edge1, si);
    }
  }
}


/**
   * Performs a brute-force comparison of every segment in each Edge. This has
   * n^2 performance, and is about 100 times slower than using monotone chains.
   */
jsts.geomgraph.index.SimpleEdgeSetIntersector.prototype.computeIntersects(Edge e0, Edge e1, SegmentIntersector si)
 {
  Coordinate[] pts0 = e0.getCoordinates();
  Coordinate[] pts1 = e1.getCoordinates();
  for (int i0 = 0; i0 < pts0.length - 1; i0++) {
    for (int i1 = 0; i1 < pts1.length - 1; i1++) {
      si.addIntersections(e0, i0, e1, i1);
    }
  }
}
