/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */



/**
 * Computes the intersection of line segments, and adds the intersection to the
 * edges containing the segments.
 * @constructor
 */
jsts.geomgraph.index.SegmentIntersector = function() {

};


/**
 * @param {int}
 *          i1
 * @param {int}
 *          i2
 * @return {boolean}
 */
jsts.geomgraph.index.SegmentIntersector.isAdjacentSegments = function(i1, i2) {
  return Math.abs(i1 - i2) == 1;
};

// TODO: port
