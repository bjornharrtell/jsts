/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/**
 * @requires jsts/geomgraph/NodeMap.js
 * @requires jsts/geomgraph/NodeFactory.js
 */



/**
 * The computation of the <code>IntersectionMatrix</code> relies on the use of
 * a structure called a "topology graph". The topology graph contains nodes and
 * edges corresponding to the nodes and line segments of a <code>Geometry</code>.
 * Each node and edge in the graph is labeled with its topological location
 * relative to the source geometry.
 * <P>
 * Note that there is no requirement that points of self-intersection be a
 * vertex. Thus to obtain a correct topology graph, <code>Geometry</code>s
 * must be self-noded before constructing their graphs.
 * <P>
 * Two fundamental operations are supported by topology graphs:
 * <UL>
 * <LI>Computing the intersections between all the edges and nodes of a single
 * graph
 * <LI>Computing the intersections between the edges and nodes of two different
 * graphs
 * </UL>
 *
 * @constructor
 */
jsts.geomgraph.PlanarGraph = function(nodeFactory) {
  this.edges = [];
  this.edgeEndList = [];
  this.nodes = new jsts.geomgraph.NodeMap(nodeFactory ||
      new jsts.geomgraph.NodeFactory());
};


/**
 * @protected
 */
jsts.geomgraph.PlanarGraph.prototype.edges = null;


/**
 * @type {jsts.geomgraph.NodeMap}
 */
jsts.geomgraph.PlanarGraph.prototype.nodes = null;

jsts.geomgraph.PlanarGraph.prototype.edgeEndList = null;

/**
 * Replaced with getEdges()
 */
jsts.geomgraph.PlanarGraph.prototype.getEdgeIterator = function() {
  throw new jsts.error.NotImplementedError();
};
jsts.geomgraph.PlanarGraph.prototype.getEdges = function() {
  return this.edges;
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
  this.edges.push(e);
};

jsts.geomgraph.PlanarGraph.prototype.add = function(e) {
  this.nodes.add(e);
  this.edgeEndList.add(e);
};

jsts.geomgraph.PlanarGraph.prototype.getNodeIterator = function() {
  throw new jsts.error.NotImplementedError();
};

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
 * Add a set of edges to the graph.  For each edge two DirectedEdges
 * will be created.  DirectedEdges are NOT linked by this method.
 */
jsts.geomgraph.PlanarGraph.prototype.addEdges = function(edgesToAdd) {
  // create all the nodes for the edges
  for (var i = 0; i < edgesToAdd.length; i++) {
    var e = edgesToAdd[i];
    this.edges.push(e);

    var de1 = new jsts.geomgraph.DirectedEdge(e, true);
    var de2 = new jsts.geomgraph.DirectedEdge(e, false);
    de1.setSym(de2);
    de2.setSym(de1);

    this.add(de1);
    this.add(de2);
  }
};

// TODO: port rest of class
