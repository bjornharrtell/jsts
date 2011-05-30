/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */



/**
 * Represents a directed graph which is embeddable in a planar surface.
 * <p>
 * This class and the other classes in this package serve as a framework for
 * building planar graphs for specific algorithms. This class must be subclassed
 * to expose appropriate methods to construct the graph. This allows controlling
 * the types of graph components ({@link DirectedEdge}s, {@link Edge}s and
 * {@link Node}s) which can be added to the graph. An application which uses
 * the graph framework will almost always provide subclasses for one or more
 * graph components, which hold application-specific data and graph algorithms.
 *
 * @constructor
 */
jsts.planargraph.PlanarGraph = function() {
  this.nodeMap = {};

  this.edges = [];
  this.dirEdges = [];
};

jsts.planargraph.PlanarGraph.prototype.edges = null;
jsts.planargraph.PlanarGraph.prototype.dirEdges = null;


/**
 * @type {Object}
 */
jsts.planargraph.PlanarGraph.prototype.nodeMap = null;
