/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */



/**
 * @constructor
 */
jsts.geomgraph.EdgeIntersectionList = function(edge) {
  this.edge = edge;
  this.nodeMap = new jsts.Hashtable();
};

jsts.geomgraph.EdgeIntersectionList.prototype.nodeMap = null;


/**
 * the parent edge
 * @type {Edge}
 */
jsts.geomgraph.EdgeIntersectionList.prototype.edge = null;


/**
 * Adds an intersection into the list, if it isn't already there.
 * The input segmentIndex and dist are expected to be normalized.
 * @param {Coordinate} intPt
 * @param {int} segmentIndex
 * @param {double} dist
 * @return {EdgeIntersection} the EdgeIntersection found or added.
 */
jsts.geomgraph.EdgeIntersectionList.prototype.add = function(intPt, segmentIndex, dist)
    {
  var eiNew = new jsts.geomgraph.EdgeIntersection(intPt, segmentIndex, dist);
  var ei = this.nodeMap.get(eiNew);
  if (ei !== null) {
    return ei;
  }
  this.nodeMap.put(eiNew, eiNew);
  return eiNew;
};

// TODO: port rest and implement sorted map
