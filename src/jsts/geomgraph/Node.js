/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
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

jsts.geomgraph.Node.prototype.getCoordinate = function() {
  return this.coord;
};
jsts.geomgraph.Node.prototype.getEdges = function() {
  return this.edges;
};

// TODO: port rest
