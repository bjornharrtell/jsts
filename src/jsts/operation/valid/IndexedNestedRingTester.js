/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */


/**
 *
 * Tests whether any of a set of {@link LinearRing}s are nested inside another
 * ring in the set, using a spatial index to speed up the comparisons.
 *
 * @version 1.7
 */



jsts.operation.valid.IndexedNestedRingTester = function(graph) {

  this.graph = graph;

};
jsts.operation.valid.IndexedNestedRingTester.prototype.graph; // used to find non-node vertices

jsts.operation.valid.IndexedNestedRingTester.prototype.rings = new ArrayList();

jsts.operation.valid.IndexedNestedRingTester.prototype.totalEnv = new Envelope();

jsts.operation.valid.IndexedNestedRingTester.prototype.index;

jsts.operation.valid.IndexedNestedRingTester.prototype.nestedPt;



jsts.operation.valid.IndexedNestedRingTester.prototype.getNestedPoint = function() {
  return nestedPt;
};



jsts.operation.valid.IndexedNestedRingTester.prototype.add = function(ring) {

  rings.add(ring);

  totalEnv.expandToInclude(ring.getEnvelopeInternal());

};



jsts.operation.valid.IndexedNestedRingTester.prototype.isNonNested = function() {

  buildIndex();



  for (var i = 0; i < rings.size(); i++) {

    var innerRing = rings.get(i);

    var innerRingPts = innerRing.getCoordinates();



    var results = index.query(innerRing.getEnvelopeInternal());

    // System.out.println(results.size());

    for (var j = 0; j < results.size(); j++) {

      var searchRing = results.get(j);

      var searchRingPts = searchRing.getCoordinates();



      if (innerRing == searchRing) {

        continue;
      }



      if (!innerRing.getEnvelopeInternal().intersects(
          searchRing.getEnvelopeInternal())) {

        continue;
      }



      var innerRingPt = jsts.operation.valid.IsValidOp.findPtNotNode(
          innerRingPts, searchRing, graph);



      /**
       *
       * If no non-node pts can be found, this means
       *
       * that the searchRing touches ALL of the innerRing vertices.
       *
       * This indicates an invalid polygon, since either
       *
       * the two holes create a disconnected interior,
       *
       * or they touch in an infinite number of points
       *
       * (i.e. along a line segment).
       *
       * Both of these cases are caught by other tests,
       *
       * so it is safe to simply skip this situation here.
       *
       */

      if (innerRingPt == null) {

        continue;
      }



      var isInside = jsts.algorithm.CGAlgorithms.isPointInRing(innerRingPt,
          searchRingPts);

      if (isInside) {

        nestedPt = innerRingPt;

        return false;

      }

    }

  }

  return true;

};



jsts.operation.valid.IndexedNestedRingTester.prototype.buildIndex = function() {

  index = new jsts.index.strtree.STRtree();



  for (var i = 0; i < rings.size(); i++) {

    var ring = rings.get(i);

    var env = ring.getEnvelopeInternal();

    index.insert(env, ring);

  }

};
