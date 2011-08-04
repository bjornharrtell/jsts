/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */


/**
 * A EdgeList is a list of Edges. It supports locating edges that are pointwise
 * equals to a target edge.
 *
 * @version 1.7
 */
jsts.geomgraph.EdgeList = function() {
  this.edges = [];
  this.ocaMap = {};
};


/**
 * @type {Array}
 * @private
 */
jsts.geomgraph.EdgeList.prototype.edges = null;


/**
 * An index of the edges, for fast lookup. NOTE: was TreeMap in JTS, but it
 * seems like the sorting wasn't used so it's replaced by a plain javascript
 * Object.
 *
 * @type {Object}
 * @private
 */
jsts.geomgraph.EdgeList.prototype.ocaMap = null;


/**
 * Insert an edge unless it is already in the list
 */
jsts.geomgraph.EdgeList.prototype.add = function(e) {
  this.edges.push(e);
  var oca = new jsts.noding.OrientedCoordinateArray(e.getCoordinates());
  this.ocaMap[oca] = e;
};

jsts.geomgraph.EdgeList.prototype.addAll = function(edgeColl) {
  for (var i = 0; i < edgeColl.length; i++) {
    this.add(edgeColl[i]);
  }
};


/**
 * @return {Array}
 */
jsts.geomgraph.EdgeList.prototype.getEdges = function() {
  return edges;
};


/**
 * If there is an edge equal to e already in the list, return it. Otherwise
 * return null.
 *
 * @param {Edge}
 *          e
 * @return {Edge} equal edge, if there is one already in the list null
 *         otherwise.
 */
jsts.geomgraph.EdgeList.prototype.findEqualEdge = function(e) {
  var oca = new jsts.noding.OrientedCoordinateArray(e.getCoordinates());
  // will return null if no edge matches
  var matchEdge = this.ocaMap[oca];
  if (matchEdge === undefined)
    matchEdge = null;
  return matchEdge;
};

jsts.geomgraph.EdgeList.prototype.getEdges = function() {
  return this.edges;
};

jsts.geomgraph.EdgeList.prototype.get = function(i) {
  return this.edges[i];
};


/**
 * If the edge e is already in the list, return its index.
 *
 * @return {Number} index, if e is already in the list -1 otherwise.
 */
jsts.geomgraph.EdgeList.prototype.findEdgeIndex = function(e) {
  for (var i = 0; i < this.edges.length; i++) {
    if (this.edges[i].equals(e))
      return i;
  }
  return -1;
};
