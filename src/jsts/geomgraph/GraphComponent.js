/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

jsts.geomgraph.GraphComponent = function() {

};


/**
 * @type {Label}
 * @protected
 */
jsts.geomgraph.Edge.prototype.label = null;

jsts.geomgraph.Edge.prototype.getLabel = function() {
  return this.label;
};
jsts.geomgraph.Edge.prototype.setLabel = function(label) {
  this.label = label;
};

// TODO: port rest..
