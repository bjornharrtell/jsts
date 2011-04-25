/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
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
jsts.geomgraph.PlanarGraph = function() {
  this.nodes = new jsts.geomgraph.NodeMap();
};


/**
 * @protected
 */
jsts.geomgraph.PlanarGraph.prototype.edges = [];


/**
 * @type {jsts.geomgraph.NodeMap}
 */
jsts.geomgraph.PlanarGraph.prototype.nodes = null;

jsts.geomgraph.PlanarGraph.prototype.insertEdge = function(e) {
  this.edges.push(e);
};

// TODO: port rest of class
