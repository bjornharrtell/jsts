/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/**
 * Simplifies a linestring (sequence of points) using
 * the standard Douglas-Peucker algorithm.
 * @constructor
 * 
 * @param {jsts.geom.Coordinate}
 *          pts 
 */
jsts.simplify.DouglasPeuckerLineSimplifier = function(
    pts) {
  this.pts = pts;
  this.seg = new jsts.geom.LineSegment();
};

/**
 * @type {jsts.geom.Coordinate[]} 
 */
jsts.simplify.DouglasPeuckerLineSimplifier.prototype.pts = null;

/**
 * @type {boolean[]}
 */
jsts.simplify.DouglasPeuckerLineSimplifier.prototype.usePt = null;

/**
 * @type {double} 
 */
jsts.simplify.DouglasPeuckerLineSimplifier.prototype.distanceTolerance = null;

/**
 * @param {jsts.geom.Coordinate[]}
 *          pts
 * @param {double}
 *          distanceTolerance
 * @return {jsts.geom.Coordinate[]} 
 */
jsts.simplify.DouglasPeuckerLineSimplifier.simplify = function(
    pts, distanceTolerance) {
  var simp = new jsts.simplify.DouglasPeuckerLineSimplifier(pts);
  simp.setDistanceTolerance(distanceTolerance);
  return simp.simplify();
};

/**
 * Set the distance tolerance for the simplification.
 * All vertices in the simplified linestring will be within this
 * distance of the original linestring.
 * @param {double}
 *          distanceTolerance 
 */
jsts.simplify.DouglasPeuckerLineSimplifier.prototype.setDistanceTolerance = function(
    distanceTolerance) {
  this.distanceTolerance = distanceTolerance;
};

/**
 * @return {jsts.geom.Coordinate[]} 
 */
jsts.simplify.DouglasPeuckerLineSimplifier.prototype.simplify = function() {
  this.usePt = [];
  for (var i = 0; i < this.pts.length; i++) {
    this.usePt[i] = true;
  }
  this.simplifySection(0, this.pts.length - 1);
  var coordList = new jsts.geom.CoordinateList();
  for (var j = 0; j < this.pts.length; j++) {
    if (this.usePt[j]) {
      coordList.add(new jsts.geom.Coordinate(this.pts[j]));
    }
  }
  return coordList.toCoordinateArray();
};

/**
 * @type {jsts.geom.LineSegment}
 */
jsts.simplify.DouglasPeuckerLineSimplifier.prototype.seg = null;

/**
 * @param {int}
 *          i
 * @param {int}
 *          j 
 */
jsts.simplify.DouglasPeuckerLineSimplifier.prototype.simplifySection = function(
    i, j) {
  if (i+1 == j) {
    return;
  }
  this.seg.p0 = this.pts[i];
  this.seg.p1 = this.pts[j];
  var maxDistance = -1.0;
  var maxIndex = i;
  for (var k = i + 1; k < j; k++) {
    var distance = this.seg.distance(this.pts[k]);
    if (distance > maxDistance) {
      maxDistance = distance;
      maxIndex = k;
    }
  }
  if (maxDistance <= this.distanceTolerance) {
    for (var l = i + 1; l < j; l++) {
      this.usePt[l] = false;
    }
  } else {
    this.simplifySection(i, maxIndex);
    this.simplifySection(maxIndex, j);
  }
};