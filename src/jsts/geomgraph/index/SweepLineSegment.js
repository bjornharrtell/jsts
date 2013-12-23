/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/**
 * @param {Edge}
 *          edge
 * @param {int}
 *          ptIndex
 * @constructor 
 */
jsts.geomgraph.index.SweepLineSegment = function(
    edge, ptIndex) {
  this.edge = edge;
  this.ptIndex = ptIndex;
  this.pts = edge.getCoordinates();
};

/**
 * @type {Edge} 
 */
jsts.geomgraph.index.SweepLineSegment.prototype.edge = null;

/**
 * @type {Coordinate[]} 
 */
jsts.geomgraph.index.SweepLineSegment.prototype.pts = null;

/**
 * @type {int} 
 */
jsts.geomgraph.index.SweepLineSegment.prototype.ptIndex = null;

/**
 * @return {double} 
 */
jsts.geomgraph.index.SweepLineSegment.prototype.getMinX = function() {
  var x1 = this.pts[this.ptIndex].x;
  var x2 = this.pts[this.ptIndex + 1].x;
  if (x1 < x2) {
    return x1;
  }
  return x2;
};

/**
 * @return {double} 
 */
jsts.geomgraph.index.SweepLineSegment.prototype.getMaxX = function() {
  var x1 = this.pts[this.ptIndex].x;
  var x2 = this.pts[this.ptIndex + 1].x;
  if (x1 > x2) {
    return x1;
  }
  return x2;
};

/**
 * @param {SweepLineSegment}
 *          ss
 * @param {SegmentIntersector}
 *          si 
 */
jsts.geomgraph.index.SweepLineSegment.prototype.computeIntersections = function(
    ss, si) {
  si.addIntersections(this.edge, this.ptIndex, ss.edge, ss.ptIndex);
};