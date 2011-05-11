/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

// TODO: Below code will rpobably not work right, use of Hashtable needs hash for entities to work correct



/**
 * A map of nodes, indexed by the coordinate of the node
 *
 * @constructor
 */
jsts.geomgraph.NodeMap = function() {
  this.nodeMap = new jsts.Hashtable();
};

jsts.geomgraph.NodeMap.prototype.nodeMap = null;


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
    node = this.nodeMap.get(coord);
    if (node == null) {
      node = new jsts.geomgraph.Node(coord, null);
      this.nodeMap.put(coord, node);
    }
    return node;
  } else if (arg instanceof jsts.geomgraph.Node) {
    node = arg;
    node = nodeMap.get(n.getCoordinate());
    if (node === null) {
      this.nodeMap.put(n.getCoordinate(), n);
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
  var n = addNode(p);
  n.add(e);
};


/**
 * @param {Coordinate}
 *          coord
 * @return {Node} the node if found; null otherwise.
 */
jsts.geomgraph.NodeMap.prototype.find = function(coord) {
  return nodeMap.get(coord);
};


/**
 * @return {Node[]}
 */
jsts.geomgraph.NodeMap.prototype.values = function() {
  // TODO: sort by key?
  return this.nodeMap.values();
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
      bdyNodes.add(node);
  }
  return bdyNodes;
};
