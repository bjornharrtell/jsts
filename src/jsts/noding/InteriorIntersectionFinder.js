/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

(function() {

  /**
   * @requires jsts/noding/SegmentIntersector.js
   */

  var SegmentIntersector = jsts.noding.SegmentIntersector;
  var ArrayList = javascript.util.ArrayList;

  /**
   * Finds an interior intersection in a set of {@link SegmentString}s, if one
   * exists. Only the first intersection found is reported.
   *
   * Creates an intersection finder which finds an interior intersection if one
   * exists
   *
   * @param li
   *          the LineIntersector to use.
   */
  var InteriorIntersectionFinder = function(li) {
    this.li = li;
    this.intersections = new ArrayList();
    this.interiorIntersection = null;
  };

  InteriorIntersectionFinder.prototype = new SegmentIntersector();
  InteriorIntersectionFinder.constructor = InteriorIntersectionFinder;

  InteriorIntersectionFinder.prototype.findAllIntersections = false;
  InteriorIntersectionFinder.prototype.isCheckEndSegmentsOnly = false;
  InteriorIntersectionFinder.prototype.li = null;
  InteriorIntersectionFinder.prototype.interiorIntersection = null;
  InteriorIntersectionFinder.prototype.intSegments = null;
  InteriorIntersectionFinder.prototype.intersections = null;


  InteriorIntersectionFinder.prototype.setFindAllIntersections = function(
      findAllIntersections) {
    this.findAllIntersections = findAllIntersections;
  }

  InteriorIntersectionFinder.prototype.getIntersections = function() {
    return intersections;
  }

  /**
   * Sets whether only end segments should be tested for interior intersection.
   * This is a performance optimization that may be used if the segments have
   * been previously noded by an appropriate algorithm. It may be known that any
   * potential noding failures will occur only in end segments.
   *
   * @param isCheckEndSegmentsOnly
   *          whether to test only end segments.
   */
  InteriorIntersectionFinder.prototype.setCheckEndSegmentsOnly = function(
      isCheckEndSegmentsOnly) {
    this.isCheckEndSegmentsOnly = isCheckEndSegmentsOnly;
  }

  /**
   * Tests whether an intersection was found.
   *
   * @return true if an intersection was found.
   */
  InteriorIntersectionFinder.prototype.hasIntersection = function() {
    return this.interiorIntersection != null;
  }

  /**
   * Gets the computed location of the intersection. Due to round-off, the
   * location may not be exact.
   *
   * @return the coordinate for the intersection location.
   */
  InteriorIntersectionFinder.prototype.getInteriorIntersection = function() {
    return this.interiorIntersection;
  }

  /**
   * Gets the endpoints of the intersecting segments.
   *
   * @return an array of the segment endpoints (p00, p01, p10, p11).
   */
  InteriorIntersectionFinder.prototype.getIntersectionSegments = function() {
    return this.intSegments;
  }

  /**
   * This method is called by clients of the {@link SegmentIntersector} class to
   * process intersections for two segments of the {@link SegmentString}s being
   * intersected. Note that some clients (such as {@link MonotoneChain}s) may
   * optimize away this call for segment pairs which they have determined do not
   * intersect (e.g. by an disjoint envelope test).
   */
  InteriorIntersectionFinder.prototype.processIntersections = function(e0,
      segIndex0, e1, segIndex1) {
    // short-circuit if intersection already found
    if (this.hasIntersection())
      return;

    // don't bother intersecting a segment with itself
    if (e0 == e1 && segIndex0 == segIndex1)
      return;

    /**
     * If enabled, only test end segments (on either segString).
     *
     */
    if (this.isCheckEndSegmentsOnly) {
      var isEndSegPresent = this.isEndSegment(e0, segIndex0) ||
          isEndSegment(e1, segIndex1);
      if (!isEndSegPresent)
        return;
    }

    var p00 = e0.getCoordinates()[segIndex0];
    var p01 = e0.getCoordinates()[segIndex0 + 1];
    var p10 = e1.getCoordinates()[segIndex1];
    var p11 = e1.getCoordinates()[segIndex1 + 1];

    this.li.computeIntersection(p00, p01, p10, p11);
    // if (li.hasIntersection() && li.isProper()) Debug.println(li);

    if (this.li.hasIntersection()) {
      if (this.li.isInteriorIntersection()) {
        this.intSegments = [];
        this.intSegments[0] = p00;
        this.intSegments[1] = p01;
        this.intSegments[2] = p10;
        this.intSegments[3] = p11;

        this.interiorIntersection = li.getIntersection(0);
        this.intersections.add(interiorIntersection);
      }
    }
  }

  /**
   * Tests whether a segment in a {@link SegmentString} is an end segment.
   * (either the first or last).
   *
   * @param segStr
   *          a segment string.
   * @param index
   *          the index of a segment in the segment string.
   * @return true if the segment is an end segment.
   * @private
   */
  InteriorIntersectionFinder.prototype.isEndSegment = function(segStr, index) {
    if (index == 0)
      return true;
    if (index >= segStr.size() - 2)
      return true;
    return false;
  }

  InteriorIntersectionFinder.prototype.isDone = function() {
    if (this.findAllIntersections)
      return false;
    return this.interiorIntersection != null;
  }

  jsts.noding.InteriorIntersectionFinder = InteriorIntersectionFinder;

})();
