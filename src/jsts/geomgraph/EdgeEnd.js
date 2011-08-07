/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

(function() {

  /**
   * @requires jsts/util/Assert.js
   */

  var Assert = jsts.util.Assert;

  /**
   * Models the end of an edge incident on a node. EdgeEnds have a direction
   * determined by the direction of the ray from the initial point to the next
   * point. EdgeEnds are comparable under the ordering "a has a greater angle
   * with the x-axis than b". This ordering is used to sort EdgeEnds around a
   * node.
   *
   * @param {Edge}
   *          edge
   * @param {Coordinate}
   *          p0
   * @param {Coordinate}
   *          p1
   * @param {Label}
   *          label
   * @constructor
   */
  var EdgeEnd = function(edge, p0, p1, label) {
    this.hashCode = parseInt(Math.random() * 99999999).toString();

    this.edge = edge;
    if (p0 && p1) {
      this.init(p0, p1);
    }
    if (label) {
      this.label = label || null;
    }
  };

  EdgeEnd.prototype.hashCode = null;

  /**
   * the parent edge of this edge end
   *
   * @type {Edge}
   * @protected
   */
  EdgeEnd.prototype.edge = null;


  /**
   * @type {Label}
   * @protected
   */
  EdgeEnd.prototype.label = null;


  /**
   * the node this edge end originates at
   *
   * @type {Node}
   * @private
   */
  EdgeEnd.prototype.node = null;


  /**
   * points of initial line segment
   *
   * @type {Coordinate}
   * @private
   */
  EdgeEnd.prototype.p0 = null;
  EdgeEnd.prototype.p1 = null;


  /**
   * the direction vector for this edge from its starting point
   *
   * @type {double}
   * @private
   */
  EdgeEnd.prototype.dx = null;
  EdgeEnd.prototype.dy = null;


  /**
   * @type {int}
   * @private
   */
  EdgeEnd.prototype.quadrant = null;


  /**
   * @param {Coordinate}
   *          p0
   * @param {Coordinate}
   *          p1
   * @protected
   */
  EdgeEnd.prototype.init = function(p0, p1) {
    this.p0 = p0;
    this.p1 = p1;
    this.dx = p1.x - p0.x;
    this.dy = p1.y - p0.y;
    this.quadrant = jsts.geomgraph.Quadrant.quadrant(this.dx, this.dy);
    Assert.isTrue(!(this.dx === 0 && this.dy === 0),
        'EdgeEnd with identical endpoints found');
  };

  EdgeEnd.prototype.getEdge = function() {
    return this.edge;
  };

  EdgeEnd.prototype.getLabel = function() {
    return this.label;
  };

  EdgeEnd.prototype.getCoordinate = function() {
    return this.p0;
  };

  EdgeEnd.prototype.getDirectedCoordinate = function() {
    return this.p1;
  };

  EdgeEnd.prototype.getQuadrant = function() {
    return this.quadrant;
  };

  EdgeEnd.prototype.getDx = function() {
    return this.dx;
  };

  EdgeEnd.prototype.getDy = function() {
    return this.dy;
  };


  EdgeEnd.prototype.setNode = function(node) {
    this.node = node;
  };

  EdgeEnd.prototype.getNode = function() {
    return this.node;
  };

  EdgeEnd.prototype.compareTo = function(e) {
    return this.compareDirection(e);
  };


  /**
   * Implements the total order relation:
   * <p>
   * a has a greater angle with the positive x-axis than b
   * <p>
   * Using the obvious algorithm of simply computing the angle is not robust,
   * since the angle calculation is obviously susceptible to roundoff. A robust
   * algorithm is: - first compare the quadrant. If the quadrants are different,
   * it it trivial to determine which vector is "greater". - if the vectors lie
   * in the same quadrant, the computeOrientation function can be used to decide
   * the relative orientation of the vectors.
   *
   * @param {EdgeEnd}
   *          e
   * @return {number}
   */
  EdgeEnd.prototype.compareDirection = function(e) {
    if (this.dx === e.dx && this.dy === e.dy)
      return 0;
    // if the rays are in different quadrants, determining the ordering is
    // trivial
    if (this.quadrant > e.quadrant)
      return 1;
    if (this.quadrant < e.quadrant)
      return -1;
    // vectors are in the same quadrant - check relative orientation of
    // direction vectors
    // this is > e if it is CCW of e
    return jsts.algorithm.CGAlgorithms.computeOrientation(e.p0, e.p1, this.p1);
  };

  EdgeEnd.prototype.computeLabel = function(boundaryNodeRule) {
  // subclasses should override this if they are using labels
  };

  /**
   * Need to be representable by string for use as key in Maps.
   *
   * TODO: Might not be equivalent to JTS/Java, need investigation.
   */
  EdgeEnd.prototype.toString = function() {
    var angle = Math.atan2(this.dy, this.dx);
    //return this.hashCode;
    return 'EdgeEnd_' + this.dx + '_' + this.dy + '_' + this.quadrant + '_' + angle;
  };

  jsts.geomgraph.EdgeEnd = EdgeEnd;

})();
