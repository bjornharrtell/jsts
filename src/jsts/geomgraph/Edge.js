/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/**
 * @requires jsts/geomgraph/GraphComponent.js
 */



/**
 * @param {Coordinate[]}
 *          pts
 * @param {Label}
 *          label
 * @augments jsts.geomgraph.GraphComponent
 * @constructor
 */
jsts.geomgraph.Edge = function(pts, label) {
  this.pts = pts;
  this.label = label;
  // this.mce = new MonotoneChainEdge();
  // this.depth = new Depth();
  this.eiList = new jsts.geomgraph.EdgeIntersectionList(this);
};

jsts.geomgraph.Edge.prototype = new jsts.geomgraph.GraphComponent();


/**
 * Updates an IM from the label for an edge. Handles edges from both L and A
 * geometries.
 */
jsts.geomgraph.Edge.updateIM = function(label, im) {
  im.setAtLeastIfValid(label.getLocation(0, jsts.geomgraph.Position.ON), label
      .getLocation(1, jsts.geomgraph.Position.ON), 1);
  if (label.isArea()) {
    im.setAtLeastIfValid(label.getLocation(0, jsts.geomgraph.Position.LEFT),
        label.getLocation(1, jsts.geomgraph.Position.LEFT), 2);
    im.setAtLeastIfValid(label.getLocation(0, jsts.geomgraph.Position.RIGHT),
        label.getLocation(1, jsts.geomgraph.Position.RIGHT), 2);
  }
};


/**
 * @private
 */
jsts.geomgraph.Edge.prototype.pts = null;


/**
 * @private
 */
jsts.geomgraph.Edge.prototype.env = null;


/**
 * @private
 */
jsts.geomgraph.Edge.prototype.name = null;


/**
 * @type {MonotoneChainEdge}
 * @private
 */
jsts.geomgraph.Edge.prototype.mce = null;


/**
 * @private
 */
jsts.geomgraph.Edge.prototype._isIsolated = true;


/**
 * @type {Depth}
 * @private
 */
jsts.geomgraph.Edge.prototype.depth = null;


/**
 * // the change in area depth from the R to L side of this edge
 */
jsts.geomgraph.Edge.prototype.depthDelta = 0;


/**
 * @type {jsts.geomgraph.EdgeIntersectionList}
 * @private
 */
jsts.geomgraph.Edge.prototype.eiList = null;


/**
 * @return {int}
 */
jsts.geomgraph.Edge.prototype.getNumPoints = function() {
  return this.pts.length;
};


/**
 * @return {Coordinate[]}
 */
jsts.geomgraph.Edge.prototype.getCoordinates = function() {
  return this.pts;
};


/**
 * @param {int}
 *          i
 * @return {Coordinate}
 */
jsts.geomgraph.Edge.prototype.getCoordinate = function(i) {
  if (i === undefined) {
    if (this.pts.length > 0) {
      return this.pts[0];
    } else {
      return null;
    }
  }

  return this.pts[i];
};


/**
 * @return {boolean}
 */
jsts.geomgraph.Edge.prototype.isClosed = function() {
  return this.pts[0].equals(this.pts[this.pts.length - 1]);
};


jsts.geomgraph.Edge.prototype.setIsolated = function(isIsolated) {
  this._isIsolated = isIsolated;
};
jsts.geomgraph.Edge.prototype.isIsolated = function() {
  return this._isIsolated;
};


/**
 * Adds EdgeIntersections for one or both intersections found for a segment of
 * an edge to the edge intersection list.
 *
 * @param {LineIntersector}
 *          li
 * @param {int}
 *          segmentIndex
 * @param {int}
 *          geomIndex
 */
jsts.geomgraph.Edge.prototype.addIntersections = function(li, segmentIndex,
    geomIndex) {
  for (var i = 0; i < li.getIntersectionNum(); i++) {
    this.addIntersection(li, segmentIndex, geomIndex, i);
  }
};


/**
 * Add an EdgeIntersection for intersection intIndex. An intersection that falls
 * exactly on a vertex of the edge is normalized to use the higher of the two
 * possible segmentIndexes
 *
 * @param {LineIntersector}
 *          li
 * @param {int}
 *          segmentIndex
 * @param {int}
 *          geomIndex
 * @param {int}
 *          intIndex
 */
jsts.geomgraph.Edge.prototype.addIntersection = function(li, segmentIndex,
    geomIndex, intIndex) {
  var intPt = new jsts.geom.Coordinate(li.getIntersection(intIndex));
  var normalizedSegmentIndex = segmentIndex;
  var dist = li.getEdgeDistance(geomIndex, intIndex);
  //normalize the intersection point location
  var nextSegIndex = normalizedSegmentIndex + 1;
  if (nextSegIndex < this.pts.length) {
    var nextPt = this.pts[nextSegIndex];

    // Normalize segment index if intPt falls on vertex
    // The check for point equality is 2D only - Z values are ignored
    if (intPt.equals2D(nextPt)) {
      normalizedSegmentIndex = nextSegIndex;
      dist = 0.0;
    }
  }
  /**
   * Add the intersection point to edge intersection list.
   */
  var ei = this.eiList.add(intPt, normalizedSegmentIndex, dist);
};


/**
 * @return {int}
 */
jsts.geomgraph.Edge.prototype.getMaximumSegmentIndex = function() {
  return this.pts.length - 1;
};

jsts.geomgraph.Edge.prototype.getEdgeIntersectionList = function() {
  return this.eiList;
};


/**
 * Update the IM with the contribution for this component. A component only
 * contributes if it has a labelling for both parent geometries
 */
jsts.geomgraph.Edge.prototype.computeIM = function(im) {
  jsts.geomgraph.Edge.updateIM(this.label, im);
};

// TODO: port rest..
