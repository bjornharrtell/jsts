/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/**
 * @constructor 
 */
jsts.geomgraph.index.SimpleSweepLineIntersector = function() {

};

jsts.geomgraph.index.SimpleSweepLineIntersector.prototype = new jsts.geomgraph.index.EdgeSetIntersector();

/**
 * @type {array} 
 */
jsts.geomgraph.index.SimpleSweepLineIntersector.prototype.events = [];

/**
 * @type {int} 
 */
jsts.geomgraph.index.SimpleSweepLineIntersector.prototype.nOverlaps = null;

/**
 * @param {javascript.util.List}
 *          edges
 * @param {SegmentIntersector}
 *          si
 * @param {boolean}
 *          testAllSegments 
 */
jsts.geomgraph.index.SimpleSweepLineIntersector.prototype.computeIntersections = function(
    edges, si, testAllSegments) {

  if (si instanceof javascript.util.List) {
    this.computeIntersections2.apply(this, arguments);
    return;
  }

  if (testAllSegments) {
    this.add(edges, null);
  } else {
    this.add(edges);
  }
  this.computeIntersections3(si);
};

/**
 * @param {javascript.util.List}
 *          edges0
 * @param {javascript.util.List}
 *          edges1
 * @param {SegmentIntersector}
 *          si 
 */
jsts.geomgraph.index.SimpleSweepLineIntersector.prototype.computeIntersections2 = function(
    edges0, edges1, si) {
  this.add(edges0, edges0);
  this.add(edges1, edges1);
  this.computeIntersections3(si);
};

/**
 * @param {Edge}
 *          edge
 * @param {Object}
 *          edgeSet 
 */
jsts.geomgraph.index.SimpleSweepLineIntersector.prototype.add = function(
    edge, edgeSet) {

  if (edge instanceof javascript.util.List) {
    this.add2.apply(this, arguments);
    return;
  }

  var pts = edge.getCoordinates();
  for (var i = 0; i < pts.length - 1; i++) {
    var ss = new jsts.geomgraph.index.SweepLineSegment(edge, i);
    var insertEvent = new jsts.geomgraph.index.SweepLineEvent(ss.getMinX(), ss, edgeSet);
    this.events.push(insertEvent);
    this.events.push(new jsts.geomgraph.index.SweepLineEvent(ss.getMaxX(), insertEvent));
  }
};

/**
 * @param {javascript.util.List}
 *          edges
 * @param {Object}
 *          edgeSet
 */
jsts.geomgraph.index.SimpleSweepLineIntersector.prototype.add2 = function(
    edges, edgeSet) {
  for (var i = edges.iterator(); i.hasNext(); ) {
    var edge = i.next();
    if (edgeSet) {
      this.add(edge, edgeSet);
    } else {
      // edge is its own group
      this.add(edge, edge);
    }
  }
};

/**
 * Because DELETE Events have a link to their corresponding INSERT event,
 * it is possible to compute exactly the range of events which must be
 * compared to a given INSERT event object.
 */
jsts.geomgraph.index.SimpleSweepLineIntersector.prototype.prepareEvents = function() {
  this.events.sort(function(a,b) {
    return a.compareTo(b);
  });

  // set DELETE event indexes
  for (var i = 0; i < this.events.length; i++) {
    var ev = this.events[i];
    if (ev.isDelete()) {
      ev.getInsertEvent().setDeleteEventIndex(i);
    }
  }
};

/**
 * @param {SegmentIntersector}
 *          si 
 */
jsts.geomgraph.index.SimpleSweepLineIntersector.prototype.computeIntersections3 = function(
    si) {
  this.nOverlaps = 0;
  this.prepareEvents();

  for (var i = 0; i < this.events.length; i++) {
    var ev = this.events[i];
    if (ev.isInsert()) {
      this.processOverlaps(i, ev.getDeleteEventIndex(), ev, si);
    }
  }
};

/**
 * @param {int}
 *          start
 * @param {int}
 *          end
 * @param {SweepLineEvent}
 *          ev0
 * @param {SegmentIntersector}
 *          si
 */
jsts.geomgraph.index.SimpleSweepLineIntersector.prototype.processOverlaps = function(
  start, end, ev0, si) {
  var ss0 = ev0.getObject();

  /**
   * Since we might need to test for self-intersections,
   * include current INSERT event object in list of event objects to test.
   * Last index can be skipped, because it must be a Delete event.
   */
  for (var i = start; i < end; i++) {
    var ev1 = this.events[i];
    if (ev1.isInsert()) {
      var ss1 = ev1.getObject();
      // don't compare edges in same group, if labels are present
      if (!ev0.isSameLabel(ev1)) {
        ss0.computeIntersections(ss1, si);
        this.nOverlaps++;
      }
    }
  }
}
