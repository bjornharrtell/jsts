/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/**
 * @requires jsts/geomgraph/NodeMap.js
 * @requires jsts/geomgraph/NodeFactory.js
 */

(function() {

  var ArrayList = javascript.util.ArrayList;

  /**
   * The computation of the <code>IntersectionMatrix</code> relies on the use
   * of a structure called a "topology graph". The topology graph contains nodes
   * and edges corresponding to the nodes and line segments of a
   * <code>Geometry</code>. Each node and edge in the graph is labeled with
   * its topological location relative to the source geometry.
   * <P>
   * Note that there is no requirement that points of self-intersection be a
   * vertex. Thus to obtain a correct topology graph, <code>Geometry</code>s
   * must be self-noded before constructing their graphs.
   * <P>
   * Two fundamental operations are supported by topology graphs:
   * <UL>
   * <LI>Computing the intersections between all the edges and nodes of a
   * single graph
   * <LI>Computing the intersections between the edges and nodes of two
   * different graphs
   * </UL>
   *
   * @constructor
   */
  jsts.geomgraph.PlanarGraph = function(nodeFactory) {
    this.edges = new ArrayList();
    this.edgeEndList = new ArrayList();
    this.nodes = new jsts.geomgraph.NodeMap(nodeFactory ||
        new jsts.geomgraph.NodeFactory());
  };


  /**
   * @type {javascript.util.ArrayList}
   * @protected
   */
  jsts.geomgraph.PlanarGraph.prototype.edges = null;


  /**
   * @type {jsts.geomgraph.NodeMap}
   * @protected
   */
  jsts.geomgraph.PlanarGraph.prototype.nodes = null;
  /**
   * @type {javascript.util.ArrayList}
   * @protected
   */
  jsts.geomgraph.PlanarGraph.prototype.edgeEndList = null;

  /**
   * For nodes in the Collection, link the DirectedEdges at the node that are in
   * the result. This allows clients to link only a subset of nodes in the
   * graph, for efficiency (because they know that only a subset is of
   * interest).
   */
  jsts.geomgraph.PlanarGraph.linkResultDirectedEdges = function(nodes) {
    for (var nodeit = nodes.iterator(); nodeit.hasNext();) {
      var node = nodeit.next();
      node.getEdges().linkResultDirectedEdges();
    }
  };


  jsts.geomgraph.PlanarGraph.prototype.getEdgeIterator = function() {
    return this.edges.iterator();
  };
  jsts.geomgraph.PlanarGraph.prototype.getEdgeEnds = function() {
    return this.edgeEndList;
  };

  jsts.geomgraph.PlanarGraph.prototype.isBoundaryNode = function(geomIndex, coord) {
    var node = this.nodes.find(coord);
    if (node === null)
      return false;
    var label = node.getLabel();
    if (label !== null &&
        label.getLocation(geomIndex) === jsts.geom.Location.BOUNDARY)
      return true;
    return false;
  };

  jsts.geomgraph.PlanarGraph.prototype.insertEdge = function(e) {
    this.edges.add(e);
  };

  jsts.geomgraph.PlanarGraph.prototype.add = function(e) {
    this.nodes.add(e);
    this.edgeEndList.add(e);
  };

  /**
   * @return {javascript.util.Iterator}
   */
  jsts.geomgraph.PlanarGraph.prototype.getNodeIterator = function() {
    return this.nodes.values().iterator();
  };

  /**
   * @return {javascript.util.Collection}
   */
  jsts.geomgraph.PlanarGraph.prototype.getNodes = function() {
    return this.nodes.values();
  };

  jsts.geomgraph.PlanarGraph.prototype.addNode = function(node) {
    if (node instanceof jsts.geom.Coordinate) {
      return this.addNode2(node);
    }

    return this.nodes.addNode(node);
  };
  jsts.geomgraph.PlanarGraph.prototype.addNode2 = function(coord) {
    return this.nodes.addNode(coord);
  };

  /**
   * Add a set of edges to the graph. For each edge two DirectedEdges will be
   * created. DirectedEdges are NOT linked by this method.
   * @param {javascript.util.List} edgedToAdd
   */
  jsts.geomgraph.PlanarGraph.prototype.addEdges = function(edgesToAdd) {
    // create all the nodes for the edges
    for (var it = edgesToAdd.iterator(); it.hasNext(); ) {
      var e = it.next();
      this.edges.add(e);

      var de1 = new jsts.geomgraph.DirectedEdge(e, true);
      var de2 = new jsts.geomgraph.DirectedEdge(e, false);
      de1.setSym(de2);
      de2.setSym(de1);

      this.add(de1);
      this.add(de2);
    }
  };

})();

// TODO: port rest of class
