/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/**
 * @requires jsts/geomgraph/GraphComponent.js
 */



/**
 * @constructor
 * @augments jsts.geomgraph.GraphComponent
 */
jsts.geomgraph.Node = function(coord, edges) {
  this.coord = coord;
  this.edges = edges;
  this.label = new jsts.geomgraph.Label(0, jsts.geom.Location.NONE);
};

jsts.geomgraph.Node.prototype = new jsts.geomgraph.GraphComponent();


/**
 * only non-null if this node is precise
 */
jsts.geomgraph.Node.prototype.coord = null;
jsts.geomgraph.Node.prototype.edges = null;

jsts.geomgraph.Node.prototype.isIsolated = function() {
  return (this.label.getGeometryCount() == 1);
};

jsts.geomgraph.Node.prototype.setLabel2 = function(argIndex,  onLocation) {
  if (this.label === null) {
    this.label = new jsts.geomgraph.Label(argIndex, onLocation);
  }
  else
    this.label.setLocation(argIndex, onLocation);
};


/**
 * Updates the label of a node to BOUNDARY,
 * obeying the mod-2 boundaryDetermination rule.
 */
jsts.geomgraph.Node.prototype.setLabelBoundary = function(argIndex) {
  // determine the current location for the point (if any)
  var loc = jsts.geom.Location.NONE;
  if (this.label !== null)
    loc = this.label.getLocation(argIndex);
  // flip the loc
  var newLoc;
  switch (loc) {
    case jsts.geom.Location.BOUNDARY: newLoc = jsts.geom.Location.INTERIOR; break;
    case jsts.geom.Location.INTERIOR: newLoc = jsts.geom.Location.BOUNDARY; break;
    default: newLoc = jsts.geom.Location.BOUNDARY; break;
  }
  this.label.setLocation(argIndex, newLoc);
};


/**
 * Add the edge to the list of edges at this node
 */
jsts.geomgraph.Node.prototype.add = function(e)
    {
  // Assert: start pt of e is equal to node point
  this.edges.insert(e);
  e.setNode(this);
};

jsts.geomgraph.Node.prototype.getCoordinate = function() {
  return this.coord;
};
jsts.geomgraph.Node.prototype.getEdges = function() {
  return this.edges;
};

// TODO: port rest
