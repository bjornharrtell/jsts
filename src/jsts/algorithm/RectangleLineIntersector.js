/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/**
 * /jts/jts/java/src/com/vividsolutions/jts/algorithm/RectangleLineIntersector.java
 * Revision: 972
 */

(function() {

/**
 * @requires jsts/geom/Coordinate.js
 * @requires jsts/geom/Envelope.js
 * @requires jsts/algorithm/RobustLineIntersector.js
 */

var Coordinate = jsts.geom.Coordinate;
var Envelope = jsts.geom.Envelope;
var RobustLineIntersector = jsts.algorithm.RobustLineIntersector;

/**
 * Computes whether a rectangle intersects line segments.
 * <p>
 * Rectangles contain a large amount of inherent symmetry
 * (or to put it another way, although they contain four
 * coordinates they only actually contain 4 ordinates
 * worth of information).
 * The algorithm used takes advantage of the symmetry of 
 * the geometric situation 
 * to optimize performance by minimizing the number
 * of line intersection tests.
 * 
 * @author Martin Davis
 * 
 * Creates a new intersector for the given query rectangle,
 * specified as an {@link Envelope}.
 *
 * @param rectEnv the query rectangle, specified as an Envelope
 */
jsts.algorithm.RectangleLineIntersector = function(rectEnv) {
    this.rectEnv = rectEnv;
    
    /**
     * Up and Down are the diagonal orientations
     * relative to the Left side of the rectangle.
     * Index 0 is the left side, 1 is the right side.
     */
    this.diagUp0 = new Coordinate(this.rectEnv.getMinX(), this.rectEnv.getMinY());
    this.diagUp1 = new Coordinate(this.rectEnv.getMaxX(), this.rectEnv.getMaxY());
    this.diagDown0 = new Coordinate(this.rectEnv.getMinX(), this.rectEnv.getMaxY());
    this.diagDown1 = new Coordinate(this.rectEnv.getMaxX(), this.rectEnv.getMinY());
}

// for intersection testing, don't need to set precision model
jsts.algorithm.RectangleLineIntersector.prototype.li = new RobustLineIntersector();
jsts.algorithm.RectangleLineIntersector.prototype.rectEnv;
jsts.algorithm.RectangleLineIntersector.prototype.diagUp0;
jsts.algorithm.RectangleLineIntersector.prototype.diagUp1;
jsts.algorithm.RectangleLineIntersector.prototype.diagDown0;
jsts.algorithm.RectangleLineIntersector.prototype.diagDown1;


  
/**
 * Tests whether the query rectangle intersects a 
 * given line segment.
 * 
 * @param p0 the first endpoint of the segment
 * @param p1 the second endpoint of the segment
 * @return true if the rectangle intersects the segment
 */
jsts.algorithm.RectangleLineIntersector.prototype.intersects = function(p0, p1) {
  // TODO: confirm that checking envelopes first is faster

  /**
   * If the segment envelope is disjoint from the
   * rectangle envelope, there is no intersection
   */
  var segEnv = new Envelope(p0, p1);
  if (! this.rectEnv.intersects(segEnv))
    return false;
  
  /**
   * If either segment endpoint lies in the rectangle,
   * there is an intersection.
   */
  if (this.rectEnv.intersects(p0)) return true;
  if (this.rectEnv.intersects(p1)) return true;
  
  /**
   * Normalize segment.
   * This makes p0 less than p1,
   * so that the segment runs to the right,
   * or vertically upwards.
   */
  if (p0.compareTo(p1) > 0) {
    var tmp = p0;
    p0 = p1;
    p1 = tmp;
  }
  /**
   * Compute angle of segment.
   * Since the segment is normalized to run left to right,
   * it is sufficient to simply test the Y ordinate.
   * "Upwards" means relative to the left end of the segment.
   */
  var isSegUpwards = false;
  if (p1.y > p0.y)
    isSegUpwards = true;
  
  /**
   * Since we now know that neither segment endpoint
   * lies in the rectangle, there are two possible 
   * situations:
   * 1) the segment is disjoint to the rectangle
   * 2) the segment crosses the rectangle completely.
   * 
   * In the case of a crossing, the segment must intersect 
   * a diagonal of the rectangle.
   * 
   * To distinguish these two cases, it is sufficient 
   * to test intersection with 
   * a single diagonal of the rectangle,
   * namely the one with slope "opposite" to the slope
   * of the segment.
   * (Note that if the segment is axis-parallel,
   * it must intersect both diagonals, so this is
   * still sufficient.)  
   */
  if (isSegUpwards) {
    this.li.computeIntersection(p0, p1, this.diagDown0, this.diagDown1);
  }
  else {
    this.li.computeIntersection(p0, p1, this.diagUp0, this.diagUp1);      
  }
  if (this.li.hasIntersection())
    return true;
  return false;
}

})();
