/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/**
 * @requires jsts/geomgraph/EdgeEnd.js
 */


/**
 * A DirectedEdgeStar is an ordered list of <b>outgoing</b> DirectedEdges
 * around a node. It supports labelling the edges as well as linking the edges
 * to form both MaximalEdgeRings and MinimalEdgeRings.
 *
 * @constructor
 * @extends jsts.geomgraph.EdgeEnd
 */
jsts.geomgraph.DirectedEdgeStar = function() {
  this.resultAreaEdgeList = [];
};
jsts.geomgraph.DirectedEdgeStar.prototype = new jsts.geomgraph.EdgeEndStar();
jsts.geomgraph.DirectedEdgeStar.constructor = jsts.geomgraph.DirectedEdgeStar;


/**
 * A list of all outgoing edges in the result, in CCW order
 *
 * @private
 */
jsts.geomgraph.DirectedEdgeStar.prototype.resultAreaEdgeList = null;
jsts.geomgraph.DirectedEdgeStar.prototype.label = null;

/**
 * Insert a directed edge in the list
 */
jsts.geomgraph.DirectedEdgeStar.prototype.insert = function(ee) {
  var de = ee;
  this.insertEdgeEnd(de, de);
};

jsts.geomgraph.DirectedEdgeStar.prototype.getLabel = function() {
  return this.label;
};

jsts.geomgraph.DirectedEdgeStar.prototype.getOutgoingDegree = function() {
  var degree = 0;
  for (var i = 0; i < this.edgeList.length; i++) {
    var de = this.edgeList[i];
    if (de.isInResult())
      degree++;
  }
  return degree;
};
jsts.geomgraph.DirectedEdgeStar.prototype.getOutgoingDegree = function(er) {
  var degree = 0;
  for (var i = 0; i < this.edgeList.length; i++) {
    var de = this.edgeList[i];
    if (de.getEdgeRing() === er)
      degree++;
  }
  return degree;
};

jsts.geomgraph.DirectedEdgeStar.prototype.getRightmostEdge = function() {
  var edges = this.getEdges();
  var size = edges.length;
  if (size < 1)
    return null;
  var de0 = edges[0];
  if (size === 1)
    return de0;
  var deLast = edges[size - 1];

  var quad0 = de0.getQuadrant();
  var quad1 = deLast.getQuadrant();
  if (jsts.geomgraph.Quadrant.isNorthern(quad0) && jsts.geomgraph.Quadrant.isNorthern(quad1))
    return de0;
  else if (!jsts.geomgraph.Quadrant.isNorthern(quad0) && !jsts.geomgraph.Quadrant.isNorthern(quad1))
    return deLast;
  else {
    // edges are in different hemispheres - make sure we return one that is
    // non-horizontal
    // Assert.isTrue(de0.getDy() != 0, "should never return horizontal edge!");
    var nonHorizontalEdge = null;
    if (de0.getDy() != 0)
      return de0;
    else if (deLast.getDy() != 0)
      return deLast;
  }
  // TODO: Assert.shouldNeverReachHere("found two horizontal edges incident on
  // node");
  return null;

};
/**
 * Compute the labelling for all dirEdges in this star, as well as the overall
 * labelling
 */
jsts.geomgraph.DirectedEdgeStar.prototype.computeLabelling = function(geom) {
  jsts.geomgraph.EdgeEndStar.computeLabelling.call(this, geom);

  // determine the overall labelling for this DirectedEdgeStar
  // (i.e. for the node it is based at)
  this.label = new Label(jsts.geom.Location.NONE);
  for (var i = 0; i < this.edgeList.length; i++) {
    var ee = this.edgeList[i];
    var e = ee.getEdge();
    var eLabel = e.getLabel();
    for (var i = 0; i < 2; i++) {
      var eLoc = eLabel.getLocation(i);
      if (eLoc == jsts.geom.Location.INTERIOR || eLoc == jsts.geom.Location.BOUNDARY)
        label.setLocation(i, jsts.geom.Location.INTERIOR);
    }
  }
};

/**
 * For each dirEdge in the star, merge the label from the sym dirEdge into the
 * label
 */
jsts.geomgraph.DirectedEdgeStar.prototype.mergeSymLabels = function() {
  for (var i = 0; i < this.edgeList.length; i++) {
    var de = this.edgeList[i];
    var label = de.getLabel();
    label.merge(de.getSym().getLabel());
  }
};

/**
 * Update incomplete dirEdge labels from the labelling for the node
 */
jsts.geomgraph.DirectedEdgeStar.prototype.updateLabelling = function(nodeLabel) {
  for (var i = 0; i < this.edgeList.length; i++) {
    var de = this.edgeList[i];
    var label = de.getLabel();
    label.setAllLocationsIfNull(0, nodeLabel.getLocation(0));
    label.setAllLocationsIfNull(1, nodeLabel.getLocation(1));
  }
};

/**
 * @private
 */
jsts.geomgraph.DirectedEdgeStar.prototype.getResultAreaEdges = function() {
  if (this.resultAreaEdgeList != null)
    return this.resultAreaEdgeList;
  this.resultAreaEdgeList = [];
  for (var i = 0; i < this.edgeList.length; i++) {
    var de = this.edgeList[i];
    if (de.isInResult() || de.getSym().isInResult())
      resultAreaEdgeList.add(de);
  }
  return resultAreaEdgeList;
};

/**
 * @private
 */
jsts.geomgraph.DirectedEdgeStar.prototype.SCANNING_FOR_INCOMING = 1;
/**
 * @private
 */
jsts.geomgraph.DirectedEdgeStar.prototype.LINKING_TO_OUTGOING = 2;
/**
 * Traverse the star of DirectedEdges, linking the included edges together. To
 * link two dirEdges, the <next> pointer for an incoming dirEdge is set to the
 * next outgoing edge.
 * <p>
 * DirEdges are only linked if:
 * <ul>
 * <li>they belong to an area (i.e. they have sides)
 * <li>they are marked as being in the result
 * </ul>
 * <p>
 * Edges are linked in CCW order (the order they are stored). This means that
 * rings have their face on the Right (in other words, the topological location
 * of the face is given by the RHS label of the DirectedEdge)
 * <p>
 * PRECONDITION: No pair of dirEdges are both marked as being in the result
 */
jsts.geomgraph.DirectedEdgeStar.prototype.linkResultDirectedEdges = function() {
  // make sure edges are copied to resultAreaEdges list
  this.getResultAreaEdges();
  // find first area edge (if any) to start linking at
  var firstOut = null;
  var incoming = null;
  var state = jsts.geomgraph.DirectedEdgeStar.SCANNING_FOR_INCOMING;
  // link edges in CCW order
  for (var i = 0; i < resultAreaEdgeList.length; i++) {
    var nextOut = resultAreaEdgeList[i];
    var nextIn = nextOut.getSym();

    // skip de's that we're not interested in
    if (!nextOut.getLabel().isArea())
      continue;

    // record first outgoing edge, in order to link the last incoming edge
    if (firstOut === null && nextOut.isInResult())
      firstOut = nextOut;
    // assert: sym.isInResult() == false, since pairs of dirEdges should have
    // been removed already

    switch (state) {
    case jsts.geomgraph.DirectedEdgeStar.SCANNING_FOR_INCOMING:
      if (!nextIn.isInResult())
        continue;
      incoming = nextIn;
      state = jsts.geomgraph.DirectedEdgeStar.LINKING_TO_OUTGOING;
      break;
    case jsts.geomgraph.DirectedEdgeStar.LINKING_TO_OUTGOING:
      if (!nextOut.isInResult())
        continue;
      incoming.setNext(nextOut);
      state = jsts.geomgraph.DirectedEdgeStar.SCANNING_FOR_INCOMING;
      break;
    }
  }
  // Debug.print(this);
  if (state === jsts.geomgraph.DirectedEdgeStar.LINKING_TO_OUTGOING) {
    // Debug.print(firstOut == null, this);
    if (firstOut === null)
      throw new jsts.error.TopologyError('no outgoing dirEdge found',
          getCoordinate());
    // TODO: Assert.isTrue(firstOut.isInResult(), "unable to link last incoming
    // dirEdge");
    incoming.setNext(firstOut);
  }
};
jsts.geomgraph.DirectedEdgeStar.prototype.linkMinimalDirectedEdges = function(
    er) {
  // find first area edge (if any) to start linking at
  var firstOut = null;
  var incoming = null;
  var state = jsts.geomgraph.DirectedEdgeStar.SCANNING_FOR_INCOMING;
  // link edges in CW order
  for (var i = resultAreaEdgeList.length - 1; i >= 0; i--) {
    var nextOut = resultAreaEdgeList[i];
    var nextIn = nextOut.getSym();

    // record first outgoing edge, in order to link the last incoming edge
    if (firstOut === null && nextOut.getEdgeRing() === er)
      firstOut = nextOut;

    switch (state) {
    case jsts.geomgraph.DirectedEdgeStar.SCANNING_FOR_INCOMING:
      if (nextIn.getEdgeRing() != er)
        continue;
      incoming = nextIn;
      state = jsts.geomgraph.DirectedEdgeStar.LINKING_TO_OUTGOING;
      break;
    case jsts.geomgraph.DirectedEdgeStar.LINKING_TO_OUTGOING:
      if (nextOut.getEdgeRing() != er)
        continue;
      incoming.setNextMin(nextOut);
      state = jsts.geomgraph.DirectedEdgeStar.SCANNING_FOR_INCOMING;
      break;
    }
  }
  if (state === jsts.geomgraph.DirectedEdgeStar.LINKING_TO_OUTGOING) {
    // TODO: Assert.isTrue(firstOut != null, "found null for first outgoing
    // dirEdge");
    // TODO: Assert.isTrue(firstOut.getEdgeRing() == er, "unable to link last
    // incoming dirEdge");
    incoming.setNextMin(firstOut);
  }
};
jsts.geomgraph.DirectedEdgeStar.prototype.linkAllDirectedEdges = function() {
  this.getEdges();
  // find first area edge (if any) to start linking at
  var prevOut = null;
  var firstIn = null;
  // link edges in CW order
  for (var i = edgeList.length - 1; i >= 0; i--) {
    var nextOut = edgeList[i];
    var nextIn = nextOut.getSym();
    if (firstIn === null)
      firstIn = nextIn;
    if (prevOut !== null)
      nextIn.setNext(prevOut);
    // record outgoing edge, in order to link the last incoming edge
    prevOut = nextOut;
  }
  firstIn.setNext(prevOut);
};

/**
 * Traverse the star of edges, maintaing the current location in the result area
 * at this node (if any). If any L edges are found in the interior of the
 * result, mark them as covered.
 */
jsts.geomgraph.DirectedEdgeStar.prototype.findCoveredLineEdges = function() {
  // Since edges are stored in CCW order around the node,
  // as we move around the ring we move from the right to the left side of the
  // edge

  /**
   * Find first DirectedEdge of result area (if any). The interior of the result
   * is on the RHS of the edge, so the start location will be: - INTERIOR if the
   * edge is outgoing - EXTERIOR if the edge is incoming
   */
  var startLoc = jsts.geom.Location.NONE;
  for (var i = 0; i < this.edgeList.length; i++) {
    var nextOut = this.edgeList[i];
    var nextIn = nextOut.getSym();
    if (!nextOut.isLineEdge()) {
      if (nextOut.isInResult()) {
        startLoc = jsts.geom.Location.INTERIOR;
        break;
      }
      if (nextIn.isInResult()) {
        startLoc = jsts.geom.Location.EXTERIOR;
        break;
      }
    }
  }
  // no A edges found, so can't determine if L edges are covered or not
  if (startLoc === jsts.geom.Location.NONE)
    return;

  /**
   * move around ring, keeping track of the current location (Interior or
   * Exterior) for the result area. If L edges are found, mark them as covered
   * if they are in the interior
   */
  var currLoc = startLoc;

  for (var i = 0; i < this.edgeList.length; i++) {
    var nextOut = this.edgeList[i];
    var nextIn = nextOut.getSym();
    if (nextOut.isLineEdge()) {
      nextOut.getEdge().setCovered(currLoc === jsts.geom.Location.INTERIOR);
    } else { // edge is an Area edge
      if (nextOut.isInResult())
        currLoc = jsts.geom.Location.EXTERIOR;
      if (nextIn.isInResult())
        currLoc = jsts.geom.Location.INTERIOR;
    }
  }
};

jsts.geomgraph.DirectedEdgeStar.prototype.computeDepths = function(de) {
  var edgeIndex = findIndex(de);
  var label = de.getLabel();
  var startDepth = de.getDepth(jsts.geomgraph.Position.LEFT);
  var targetLastDepth = de.getDepth(jsts.geomgraph.Position.RIGHT);
  // compute the depths from this edge up to the end of the edge array
  var nextDepth = computeDepths(edgeIndex + 1, edgeList.size(), startDepth);
  // compute the depths for the initial part of the array
  var lastDepth = computeDepths(0, edgeIndex, nextDepth);
  if (lastDepth != targetLastDepth)
    throw new jsts.error.TopologyError('depth mismatch at ' +
        de.getCoordinate());
};

/**
 * Compute the DirectedEdge depths for a subsequence of the edge array.
 *
 * @return the last depth assigned (from the R side of the last edge visited).
 * @private
 */
jsts.geomgraph.DirectedEdgeStar.prototype.computeDepths2 = function(startIndex,
    endIndex, startDepth) {
  var currDepth = startDepth;
  for (var i = startIndex; i < endIndex; i++) {
    var nextDe = this.edgeList[i];
    var label = nextDe.getLabel();
    nextDe.setEdgeDepths(jsts.geomgraph.Position.RIGHT, currDepth);
    currDepth = nextDe.getDepth(jsts.geomgraph.Position.LEFT);
  }
  return currDepth;
};
