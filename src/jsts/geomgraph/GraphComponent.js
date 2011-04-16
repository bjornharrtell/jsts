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
jsts.geomgraph.GraphComponent.prototype.label = null;

jsts.geomgraph.GraphComponent.prototype.getLabel = function() {
  return this.label;
};
jsts.geomgraph.GraphComponent.prototype.setLabel = function(label) {
  this.label = label;
};

// TODO: port rest..
