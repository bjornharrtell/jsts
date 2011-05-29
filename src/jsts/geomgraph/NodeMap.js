/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */



/**
 * A map of nodes, indexed by the coordinate of the node
 *
 * @constructor
 */
jsts.geomgraph.NodeMap = function(nodeFactory) {
  this.nodeMap = {};
  this.nodeFact = nodeFactory;
};


/**
 * NOTE: In In JSTS a JS object replaces TreeMap. Sorting is done when needed.
 */
jsts.geomgraph.NodeMap.prototype.nodeMap = null;

jsts.geomgraph.NodeMap.prototype.nodeFact = null;


/**
 * This method expects that a node has a coordinate value.
 *
 * @param {Coordinate/Node}
 *          arg
 * @return {Node}
 */
jsts.geomgraph.NodeMap.prototype.addNode = function(arg) {
  var node, coord;

  if (arg instanceof jsts.geom.Coordinate) {
    coord = arg;
    node = this.nodeMap[coord];
    if (node === undefined) {
      node = this.nodeFact.createNode(coord);
      this.nodeMap[coord] = node;
    }
    return node;
  } else if (arg instanceof jsts.geomgraph.Node) {
    var sn = arg;
    node = nodeMap[n.getCoordinate()];
    if (node === undefined) {
      this.nodeMap[n.getCoordinate()] = n;
      return n;
    }
    node.mergeLabel(n);
    return node;
  }
};


/**
 * Adds a node for the start point of this EdgeEnd (if one does not already
 * exist in this map). Adds the EdgeEnd to the (possibly new) node.
 *
 * @param {EdgeEnd}
 *          e
 */
jsts.geomgraph.NodeMap.prototype.add = function(e) {
  var p = e.getCoordinate();
  var n = this.addNode(p);
  n.add(e);
};


/**
 * @param {Coordinate}
 *          coord
 * @return {Node} the node if found; null otherwise.
 */
jsts.geomgraph.NodeMap.prototype.find = function(coord) {
  return this.nodeMap[coord];
};


/**
 * @return {Node[]}
 */
jsts.geomgraph.NodeMap.prototype.values = function() {
  var array = [];
  for (var key in this.nodeMap) {
    if (this.nodeMap.hasOwnProperty(key)) {
      array.push(this.nodeMap[key]);
    }
  }

  var compare = function(a,b) {
    return a.getCoordinate().compareTo(b.getCoordinate());
  };
  array.sort(compare);

  return array;
};


/**
 * @param {int}
 *          geomIndex
 * @return {Node[]}
 */
jsts.geomgraph.NodeMap.prototype.getBoundaryNodes = function(geomIndex) {
  var bdyNodes = [];
  var i, values = this.values();
  for (i = 0; i < values.length; i++) {
    var node = values[i];
    if (node.getLabel().getLocation(geomIndex) === jsts.geom.Location.BOUNDARY)
      bdyNodes.push(node);
  }
  return bdyNodes;
};
