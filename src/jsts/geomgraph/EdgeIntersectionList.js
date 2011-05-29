/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */



/**
 * @constructor
 */
jsts.geomgraph.EdgeIntersectionList = function(edge) {
  this.nodeMap = {};
  this.edge = edge;
};


/**
 * NOTE: In In JSTS a JS object replaces TreeMap. Sorting is done when needed.
 */
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
jsts.geomgraph.EdgeIntersectionList.prototype.add = function(intPt, segmentIndex, dist)    {
  var eiNew = new jsts.geomgraph.EdgeIntersection(intPt, segmentIndex, dist);
  var ei = this.nodeMap[eiNew];
  if (ei !== undefined) {
    return ei;
  }
  this.nodeMap[eiNew] = eiNew;
  return eiNew;
};


/**
 * Adds entries for the first and last points of the edge to the list
 */
jsts.geomgraph.EdgeIntersectionList.prototype.addEndpoints = function()    {
  var maxSegIndex = this.edge.pts.length - 1;
  this.add(this.edge.pts[0], 0, 0.0);
  this.add(this.edge.pts[maxSegIndex], maxSegIndex, 0.0);
};


/**
 * NOTE: replaces iterator in JTS
 */
jsts.geomgraph.EdgeIntersectionList.prototype.getSortedIntersections = function() {
  var array = [];
  for (var key in this.nodeMap) {
    if (this.nodeMap.hasOwnProperty(key)) {
      array.push(this.nodeMap[key]);
    }
  }

  var compare = function(a,b) {
    return a.compareTo(b);
  };
  array.sort(compare);

  return array;
};

// TODO: port rest
