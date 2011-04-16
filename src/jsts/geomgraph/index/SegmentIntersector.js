/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */



/**
 * Computes the intersection of line segments, and adds the intersection to the
 * edges containing the segments.
 *
 * @param {LineIntersector}
 *          li
 * @param {boolean}
 *          includeProper
 * @param {boolean}
 *          recordIsolated
 * @constructor
 */
jsts.geomgraph.index.SegmentIntersector = function(li, includeProper,
    recordIsolated) {
  this.li = li;
  this.includeProper = includeProper;
  this.recordIsolated = recordIsolated;
};


/**
 * @param {int}
 *          i1
 * @param {int}
 *          i2
 * @return {boolean}
 */
jsts.geomgraph.index.SegmentIntersector.isAdjacentSegments = function(i1, i2) {
  return Math.abs(i1 - i2) === 1;
};


/**
 * @type {boolean}
 * @private
 */
jsts.geomgraph.index.SegmentIntersector.prototype._hasIntersection = false;


/**
 * @type {boolean}
 * @private
 */
jsts.geomgraph.index.SegmentIntersector.prototype.hasProper = false;


/**
 * @type {boolean}
 * @private
 */
jsts.geomgraph.index.SegmentIntersector.prototype.hasProperInterior = false;


/**
 * the proper intersection point found
 *
 * @type {Coordinate}
 * @private
 */
jsts.geomgraph.index.SegmentIntersector.prototype.properIntersectionPoint = null;


/**
 * @type {LineIntersector}
 * @private
 */
jsts.geomgraph.index.SegmentIntersector.prototype.li;


/**
 * @type {boolean}
 * @private
 */
jsts.geomgraph.index.SegmentIntersector.prototype.includeProper;


/**
 * @type {boolean}
 * @private
 */
jsts.geomgraph.index.SegmentIntersector.prototype.recordIsolated;


/**
 * @type {boolean}
 * @private
 */
jsts.geomgraph.index.SegmentIntersector.prototype.isSelfIntersection;


/**
 * @type {int}
 * @private
 */
jsts.geomgraph.index.SegmentIntersector.prototype.numIntersections = 0;


/**
 * testing only
 *
 * @type {int}
 */
jsts.geomgraph.index.SegmentIntersector.prototype.numTests = 0;


/**
 * @type {Collection[]}
 * @private
 */
jsts.geomgraph.index.SegmentIntersector.prototype.bdyNodes;


/**
 * @return {boolean}
 */
jsts.geomgraph.index.SegmentIntersector.prototype.hasIntersection = function() {
  return this._hasIntersection;
};

// TODO: port
