/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/**
 * @requires jsts/geomgraph/index/EdgeSetIntersector.js
 */



/**
 * Finds all intersections in one or two sets of edges,
 * using an x-axis sweepline algorithm in conjunction with Monotone Chains.
 * While still O(n^2) in the worst case, this algorithm
 * drastically improves the average-case time.
 * The use of MonotoneChains as the items in the index
 * seems to offer an improvement in performance over a sweep-line alone.
 * 
 * A SimpleMCSweepLineIntersector creates monotone chains from the edges
 * and compares them using a simple sweep-line along the x-axis.
 * @constructor
 */
jsts.geomgraph.index.SimpleMCSweepLineIntersector = function() {
  this.events = [];
};


jsts.geomgraph.index.SimpleMCSweepLineIntersector.prototype = new jsts.geomgraph.index.EdgeSetIntersector();


/**
 * @type {array} 
 */
jsts.geomgraph.index.SimpleMCSweepLineIntersector.prototype.events = null;

/**
 * statistics information
 * 
 * @type {int} 
 */
jsts.geomgraph.index.SimpleMCSweepLineIntersector.prototype.nOverlaps = 0;

/**
 * @param {javascript.util.List}
 *          edges
 * @param {SegmentIntersector}
 *          si
 * @param {boolean}
 *          testAllSegments
 */
jsts.geomgraph.index.SimpleMCSweepLineIntersector.prototype.computeIntersections = function(
    edges, si, testAllSegments) {

  if (si instanceof javascript.util.List) {
  	this.computeIntersections2.apply(this, arguments);
  	return;
  }

  if (testAllSegments) {
  	this.addList2(edges, null);
  } else {
  	this.addList(edges);
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
jsts.geomgraph.index.SimpleMCSweepLineIntersector.prototype.computeIntersections2 = function(
    edges0, edges1, si) {
  this.addList2(edges0, edges0);
  this.addList2(edges1, edges1);
  this.computeIntersections3(si);  	
};

/** 
 * @param {Edge}
 *          edge
 * @param {Object}
 *          edgeSet
 */
jsts.geomgraph.index.SimpleMCSweepLineIntersector.prototype.add = function(
    edge, edgeSet) {

  if (edge instanceof javascript.util.List) {
  	this.addList.apply(this, arguments);
  	return;
  }

  var mce = edge.getMonotoneChainEdge();
  var startIndex = mce.getStartIndexes();
  for (var i = 0; i < startIndex.length - 1; i++) {
    var mc = new jsts.geomgraph.index.MonotoneChain(mce, i);
    var insertEvent = new jsts.geomgraph.index.SweepLineEvent(mce.getMinX(i), mc, edgeSet);
    this.events.push(insertEvent);
    this.events.push(new jsts.geomgraph.index.SweepLineEvent(mce.getMaxX(i), insertEvent));
  }
};

/**
 * @param {javascript.util.List}
 *          edges
 * @param {Object}
 *          edgeSet 
 */
jsts.geomgraph.index.SimpleMCSweepLineIntersector.prototype.addList = function(
    edges) {
  for (var i = edges.iterator(); i.hasNext(); ) {
    var edge = i.next();
    this.add(edge, edge);
  }
};
/**
 * @param {javascript.util.List}
 *          edges
 * @param {Object}
 *          edgeSet 
 */
jsts.geomgraph.index.SimpleMCSweepLineIntersector.prototype.addList2 = function(
    edges, edgeSet) {
  for (var i = edges.iterator(); i.hasNext(); ) {
    var edge = i.next();
    this.add(edge, edgeSet);
  }
};

/**
 * Because Delete Events have a link to their corresponding Insert event,
 * it is possible to compute exactly the range of events which must be
 * compared to a given Insert event object. 
 */
jsts.geomgraph.index.SimpleMCSweepLineIntersector.prototype.prepareEvents = function() {
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
jsts.geomgraph.index.SimpleMCSweepLineIntersector.prototype.computeIntersections3 = function(
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
jsts.geomgraph.index.SimpleMCSweepLineIntersector.prototype.processOverlaps = function(
    start, end, ev0, si) {
  var mc0 = ev0.getObject();

  /**
   * Since we might need to test for self-intersections,
   * include current INSERT event object in list of event objects to test.
   * Last index can be skipped, because it must be a Delete event. 
   */
  for (var i = start; i < end; i++) {
    var ev1 = this.events[i];
    if (ev1.isInsert()) {
      var mc1 = ev1.getObject();
      // don't compare edges in same group, if labels are present
      if (!ev0.isSameLabel(ev1)) {
        mc0.computeIntersections(mc1, si);
        this.nOverlaps++;
      }
    }
  }
};
