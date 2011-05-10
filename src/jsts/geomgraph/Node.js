/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */



/**
 * @constructor
 * @augments jsts.geomgraph.GraphComponent
 */
jsts.geomgraph.Node = function() {

};

jsts.geomgraph.Node.prototype = new jsts.geomgraph.GraphComponent();

jsts.geomgraph.Node.prototype.getLabel = function() {
  // TODO: port
  return new jsts.geomgraph.Label();
};

// TODO: port rest
