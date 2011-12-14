/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */
//TODO: REMOVE
/**
 * This class tests that the interior of an area {@link Geometry}
 * ( {@link Polygon}  or {@link MultiPolygon} )
 * is connected.
 * This can happen if:
 * <ul>
 * <li>a shell self-intersects
 * <li>one or more holes form a connected chain touching a shell at two different points
 * <li>one or more holes form a ring around a subset of the interior
 * </ul>
 * If a disconnected situation is found the location of the problem is recorded.
 *
 * @version 1.7
 */



  jsts.operation.valid.ConnectedInteriorTester.findDifferentPoint = function(coord, pt)

  {

    for (var i = 0; i < coord.length; i++) {

      if (! coord[i].equals(pt))

        return coord[i];

    }

    return null;

  };

  jsts.operation.valid.ConnectedInteriorTester = function(geomGraph)

  {

    this.geomGraph = geomGraph;

  };

  jsts.operation.valid.ConnectedInteriorTester.prototype.geometryFactory = new jsts.geom.GeometryFactory();



  jsts.operation.valid.ConnectedInteriorTester.prototype.geomGraph;

  // save a coordinate for any disconnected interior found
  // the coordinate will be somewhere on the ring surrounding the disconnected interior

  jsts.operation.valid.ConnectedInteriorTester.prototype.disconnectedRingcoord;

  jsts.operation.valid.ConnectedInteriorTester.prototype.getCoordinate = function() {
    return disconnectedRingcoord;
    };



  jsts.operation.valid.ConnectedInteriorTester.prototype.isInteriorsConnected = function() {

    // node the edges, in case holes touch the shell

    var splitEdges = new javascript.util.ArrayList();

    geomGraph.computeSplitEdges(splitEdges);



    // form the edges into rings

    var graph = new jsts.geomgraph.PlanarGraph(new jsts.operation.overlay.OverlayNodeFactory());

    graph.addEdges(splitEdges);

    setInteriorEdgesInResult(graph);

    graph.linkResultDirectedEdges();

    var edgeRings = buildEdgeRings(graph.getEdgeEnds());



    /**

     * Mark all the edges for the edgeRings corresponding to the shells

     * of the input polygons.  Note only ONE ring gets marked for each shell.

     */

    visitShellInteriors(geomGraph.getGeometry(), graph);



    /**

     * If there are any unvisited shell edges

     * (i.e. a ring which is not a hole and which has the interior

     * of the parent area on the RHS)

     * this means that one or more holes must have split the interior of the

     * polygon into at least two pieces.  The polygon is thus invalid.

     */

    return ! hasUnvisitedShellEdge(edgeRings);

  };



  jsts.operation.valid.ConnectedInteriorTester.prototype.setInteriorEdgesInResult = function(graph)

  {

    for (var it = graph.getEdgeEnds().iterator(); it.hasNext(); ) {

      var de = it.next();

      if (de.getLabel().getLocation(0, jsts.geomgraph.Position.RIGHT) == jsts.geom.Location.INTERIOR) {

        de.setInResult(true);

      }

    }

  };



  /**

   * Form DirectedEdges in graph into Minimal EdgeRings.

   * (Minimal Edgerings must be used, because only they are guaranteed to provide

   * a correct isHole computation)

   */

  jsts.operation.valid.ConnectedInteriorTester.prototype.buildEdgeRings = function(dirEdges)

  {

    var edgeRings = new javascript.util.ArrayList();

    for (var it = dirEdges.iterator(); it.hasNext(); ) {

      var de = it.next();

      // if this edge has not yet been processed

      if (de.isInResult()

         && de.getEdgeRing() == null) {

        var er = new jsts.operation.overlay.MaximalEdgeRing(de, geometryFactory);



        er.linkDirectedEdgesForMinimalEdgeRings();

        var minEdgeRings = er.buildMinimalRings();

        edgeRings.addAll(minEdgeRings);

      }

    }

    return edgeRings;

  };


  /**

   * Mark all the edges for the edgeRings corresponding to the shells

   * of the input polygons.

   * Only ONE ring gets marked for each shell - if there are others which remain unmarked

   * this indicates a disconnected interior.

   */

  jsts.operation.valid.ConnectedInteriorTester.prototype.visitShellInteriors = function(g, graph)

  {

    if (g instanceof Polygon) {

      var p = g;

      visitInteriorRing(p.getExteriorRing(), graph);

    }

    if (g instanceof MultiPolygon) {

      var mp = g;

      for (var i = 0; i < mp.getNumGeometries(); i++) {

        var p = mp.getGeometryN(i);

        visitInteriorRing(p.getExteriorRing(), graph);

      }

    }

  };



  jsts.operation.valid.ConnectedInteriorTester.prototype.visitInteriorRing = function(ring, graph)

  {

    var pts = ring.getCoordinates();

    var pt0 = pts[0];

    /**

     * Find first point in coord list different to initial point.

     * Need special check since the first point may be repeated.

     */

    var pt1 = findDifferentPoint(pts, pt0);

    var e = graph.findEdgeInSameDirection(pt0, pt1);

    var de = graph.findEdgeEnd(e);

    var intDe = null;

    if (de.getLabel().getLocation(0, jsts.geomgraph.Position.RIGHT) == jsts.geom.Location.INTERIOR) {

      intDe = de;

    }

    else if (de.getSym().getLabel().getLocation(0, jsts.geomgraph.Position.RIGHT) == jsts.geom.Location.INTERIOR) {

      intDe = de.getSym();

    }

    jsts.util.Assert.isTrue(intDe != null, 'unable to find dirEdge with Interior on RHS');



    visitLinkedDirectedEdges(intDe);

  };



  jsts.operation.valid.ConnectedInteriorTester.prototype.visitLinkedDirectedEdges = function(start)

  {

    var startDe = start;

    var de = start;

    do {

      jsts.util.Assert.isTrue(de != null, 'found null Directed Edge');

      de.setVisited(true);

      de = de.getNext();

    } while (de != startDe);

  };



  /**

   * Check if any shell ring has an unvisited edge.

   * A shell ring is a ring which is not a hole and which has the interior

   * of the parent area on the RHS.

   * (Note that there may be non-hole rings with the interior on the LHS,

   * since the interior of holes will also be polygonized into CW rings

   * by the linkAllDirectedEdges() step)

   *

   * @return true if there is an unvisited edge in a non-hole ring.

   */

  jsts.operation.valid.ConnectedInteriorTester.prototype.hasUnvisitedShellEdge = function(edgeRings)

  {

    for (var i = 0; i < edgeRings.size(); i++) {

      var er = edgeRings.get(i);

      // don't check hole rings

      if (er.isHole())

        continue;

      var edges = er.getEdges();

      var de = edges.get(0);

      // don't check CW rings which are holes

      // (MD - this check may now be irrelevant)

      if (de.getLabel().getLocation(0, jsts.geomgraph.Position.RIGHT) != jsts.geom.Location.INTERIOR) continue;



      /**

       * the edgeRing is CW ring which surrounds the INT of the area, so check all

       * edges have been visited.  If any are unvisited, this is a disconnected part of the interior

       */

      for (var j = 0; j < edges.size(); j++) {

        de = edges.get(j);

//Debug.print("visted? "); Debug.println(de);

        if (! de.isVisited()) {

//Debug.print("not visited "); Debug.println(de);

          disconnectedRingcoord = de.getCoordinate();

          return true;

        }

      }

    }

    return false;

  };



