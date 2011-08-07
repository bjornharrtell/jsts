/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

(function() {

  /**
   * @requires jsts/geomgraph/EdgeIntersection.js
   */

  var EdgeIntersection = jsts.geomgraph.EdgeIntersection;
  var TreeMap = javascript.util.TreeMap;

  /**
   * @constructor
   */
  var EdgeIntersectionList = function(edge) {
    this.nodeMap = new TreeMap();
    this.edge = edge;
  };


  /**
   * @type {javascript.util.Map}
   * @private
   */
  EdgeIntersectionList.prototype.nodeMap = null;


  /**
   * the parent edge
   *
   * @type {Edge}
   */
  EdgeIntersectionList.prototype.edge = null;


  /**
   * Adds an intersection into the list, if it isn't already there. The input
   * segmentIndex and dist are expected to be normalized.
   *
   * @param {Coordinate}
   *          intPt
   * @param {int}
   *          segmentIndex
   * @param {double}
   *          dist
   * @return {EdgeIntersection} the EdgeIntersection found or added.
   */
  EdgeIntersectionList.prototype.add = function(intPt, segmentIndex, dist) {
    var eiNew = new EdgeIntersection(intPt, segmentIndex, dist);
    var ei = this.nodeMap.get(eiNew);
    if (ei !== null) {
      return ei;
    }
    this.nodeMap.put(eiNew, eiNew);
    return eiNew;
  };

  /**
   * Returns an iterator of {@link EdgeIntersection}s
   *
   * @return an Iterator of EdgeIntersections.
   */
  EdgeIntersectionList.prototype.iterator = function() {
    return this.nodeMap.values().iterator();
  };


  /**
   * Adds entries for the first and last points of the edge to the list
   */
  EdgeIntersectionList.prototype.addEndpoints = function() {
    var maxSegIndex = this.edge.pts.length - 1;
    this.add(this.edge.pts[0], 0, 0.0);
    this.add(this.edge.pts[maxSegIndex], maxSegIndex, 0.0);
  };

  jsts.geomgraph.EdgeIntersectionList = EdgeIntersectionList;

})();

// TODO: port rest
