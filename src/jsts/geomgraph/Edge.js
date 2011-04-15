/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */



/**
 * @param {Coordinate[]} pts
 * @param {Label} label
 * @augments jsts.geomgraph.GraphComponent
 * @constructor
 */
jsts.geomgraph.Edge = function(pts, label) {
  this.pts = pts;
  this.label = label;
};

jsts.geomgraph.Edge.prototype = new jsts.geomgraph.GraphComponent();

jsts.geomgraph.Edge.prototype.pts = null;

//TODO: port rest..
