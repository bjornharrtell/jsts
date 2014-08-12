/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */
 
/**
 * Port source:
 * /jts/jts/java/src/com/vividsolutions/jts/operation/predicate/RectangleIntersects.java
 * Revision: 707
 */

(function() {

/**
 * @requires jsts/geom/util/ShortCircuitedGeometryVisitor.js
 */

/**
 * Tests whether it can be concluded that a rectangle intersects a geometry,
 * based on the relationship of the envelope(s) of the geometry.
 * 
 * @author Martin Davis
 * @version 1.7
 */
var EnvelopeIntersectsVisitor = function(rectEnv) {
    this.rectEnv = rectEnv;
};

EnvelopeIntersectsVisitor.prototype = new jsts.geom.util.ShortCircuitedGeometryVisitor();
EnvelopeIntersectsVisitor.constructor = EnvelopeIntersectsVisitor;

EnvelopeIntersectsVisitor.prototype.rectEnv = null;
EnvelopeIntersectsVisitor.prototype.intersects = false;

  /**
   * Reports whether it can be concluded that an intersection occurs, 
   * or whether further testing is required.
   * 
   * @return true if an intersection must occur 
   * or false if no conclusion about intersection can be made
   */
  EnvelopeIntersectsVisitor.prototype.intersects = function() {
    return this.intersects;
  }

  EnvelopeIntersectsVisitor.prototype.visit = function(element) {
    var elementEnv = element.getEnvelopeInternal();

    // disjoint => no intersection
    if (!this.rectEnv.intersects(elementEnv)) {
      return;
    }
    // rectangle contains target env => must intersect
    if (this.rectEnv.contains(elementEnv)) {
      this.intersects = true;
      return;
    }
    /**
     * Since the envelopes intersect and the test element is connected, if the
     * test envelope is completely bisected by an edge of the rectangle the
     * element and the rectangle must touch (This is basically an application of
     * the Jordan Curve Theorem). The alternative situation is that the test
     * envelope is "on a corner" of the rectangle envelope, i.e. is not
     * completely bisected. In this case it is not possible to make a conclusion
     * about the presence of an intersection.
     */
    if (elementEnv.getMinX() >= rectEnv.getMinX()
        && elementEnv.getMaxX() <= rectEnv.getMaxX()) {
      this.intersects = true;
      return;
    }
    if (elementEnv.getMinY() >= rectEnv.getMinY()
        && elementEnv.getMaxY() <= rectEnv.getMaxY()) {
      this.intersects = true;
      return;
    }
  }

  EnvelopeIntersectsVisitor.prototype.isDone = function() {
    return this.intersects == true;
  }
  
  
/**
 * A visitor which tests whether it can be 
 * concluded that a geometry contains a vertex of
 * a query geometry.
 * 
 * @author Martin Davis
 * @version 1.7
 */
var GeometryContainsPointVisitor = function(rectangle) {
    this.rectSeq = rectangle.getExteriorRing().getCoordinateSequence();
    this.rectEnv = rectangle.getEnvelopeInternal();
};
GeometryContainsPointVisitor.prototype = new jsts.geom.util.ShortCircuitedGeometryVisitor();
GeometryContainsPointVisitor.constructor = GeometryContainsPointVisitor;

GeometryContainsPointVisitor.prototype.rectSeq = null;
GeometryContainsPointVisitor.prototype.rectEnv = null;
GeometryContainsPointVisitor.prototype.containsPoint = false;

  /**
   * Reports whether it can be concluded that a corner point of the rectangle is
   * contained in the geometry, or whether further testing is required.
   * 
   * @return true if a corner point is contained 
   * or false if no conclusion about intersection can be made
   */
GeometryContainsPointVisitor.prototype.containsPoint = function() {
    return this.containsPoint;
  }

GeometryContainsPointVisitor.prototype.visit = function(geom) {
    // if test geometry is not polygonal this check is not needed
    if (!(geom instanceof jsts.geom.Polygon))
      return;

    // skip if envelopes do not intersect
    var elementEnv = geom.getEnvelopeInternal();
    if (!this.rectEnv.intersects(elementEnv))
      return;

    // test each corner of rectangle for inclusion
    var rectPt = new jsts.geom.Coordinate();
    for (var i = 0; i < 4; i++) {
      this.rectSeq.getCoordinate(i, rectPt);
      if (!elementEnv.contains(rectPt))
        continue;
      // check rect point in poly (rect is known not to touch polygon at this
      // point)
      if (SimplePointInAreaLocator.containsPointInPolygon(rectPt, geom)) {
        this.containsPoint = true;
        return;
      }
    }
  }

  GeometryContainsPointVisitor.prototype.isDone = function() {
    return this.containsPoint == true;
  }
  
/**
 * A visitor to test for intersection between the query
 * rectangle and the line segments of the geometry.
 * 
 * @author Martin Davis
 * 
 * Creates a visitor for checking rectangle intersection
 * with segments
 * 
 * @param rectangle the query rectangle 
 *
 */
var RectangleIntersectsSegmentVisitor = function(rectangle) {
    this.rectEnv = rectangle.getEnvelopeInternal();
    this.rectIntersector = new RectangleLineIntersector(rectEnv);
};
RectangleIntersectsSegmentVisitor.prototype = new jsts.geom.util.ShortCircuitedGeometryVisitor();
RectangleIntersectsSegmentVisitor.constructor = RectangleIntersectsSegmentVisitor;

RectangleIntersectsSegmentVisitor.prototype.rectEnv = null;
RectangleIntersectsSegmentVisitor.prototype.rectIntersector = null;
RectangleIntersectsSegmentVisitor.prototype.hasIntersection = false;
RectangleIntersectsSegmentVisitor.prototype.p0 = null;
RectangleIntersectsSegmentVisitor.prototype.p1 = null;

  /**
   * Reports whether any segment intersection exists.
   * 
   * @return true if a segment intersection exists
   * or false if no segment intersection exists
   */
  RectangleIntersectsSegmentVisitor.prototype.intersects = function() {
    return this.hasIntersection;
  }

  RectangleIntersectsSegmentVisitor.prototype.visit = function(geom) {
    /**
     * It may be the case that the rectangle and the 
     * envelope of the geometry component are disjoint,
     * so it is worth checking this simple condition.
     */
    var elementEnv = geom.getEnvelopeInternal();
    if (!this.rectEnv.intersects(elementEnv))
      return;
    
    // check segment intersections
    // get all lines from geometry component
    // (there may be more than one if it's a multi-ring polygon)
    var lines = LinearComponentExtracter.getLines(geom);
    this.checkIntersectionWithLineStrings(lines);
  }

  RectangleIntersectsSegmentVisitor.prototype.checkIntersectionWithLineStrings = function(lines) {
    for (var i = lines.iterator(); i.hasNext(); ) {
      var testLine = i.next();
      this.checkIntersectionWithSegments(testLine);
      if (this.hasIntersection)
        return;
    }
  }

  RectangleIntersectsSegmentVisitor.prototype.checkIntersectionWithSegments = function(testLine) {
    var seq1 = testLine.getCoordinateSequence();
    // TODO: reworked to use plain arrays instead of original API
    for (var j = 1; j < seq1.length; j++) {
      this.p0 = seq1[j - 1];
      this.p1 = seq1[j];

      if (rectIntersector.intersects(p0, p1)) {
        this.hasIntersection = true;
        return;
      }
    }
  }

  RectangleIntersectsSegmentVisitor.prototype.isDone = function() {
    return this.hasIntersection == true;
  }

/**
 * Implementation of the <tt>intersects</tt> spatial predicate
 * optimized for the case where one {@link Geometry} is a rectangle. 
 * This class works for all
 * input geometries, including {@link GeometryCollection}s.
 * <p>
 * As a further optimization, 
 * this class can be used in batch style
 * to test many geometries
 * against a single rectangle.
 * 
 * @version 1.7
 *
 * Create a new intersects computer for a rectangle.
 * 
 * @param rectangle
 *          a rectangular Polygon
 */
  jsts.operation.predicate.RectangleIntersects = function(rectangle) {
    this.rectangle = rectangle;
    this.rectEnv = rectangle.getEnvelopeInternal();
  }
  
  /**
   * Tests whether a rectangle intersects a given geometry.
   * 
   * @param rectangle
   *          a rectangular Polygon
   * @param b
   *          a Geometry of any type
   * @return true if the geometries intersect
   */
  jsts.operation.predicate.RectangleIntersects.intersects = function(rectangle, b) {
    var rp = new jsts.operation.predicate.RectangleIntersects(rectangle);
    return rp.intersects(b);
  }

  jsts.operation.predicate.RectangleIntersects.prototype.rectangle = null;

  jsts.operation.predicate.RectangleIntersects.prototype.rectEnv = null;

  /**
   * Tests whether the given Geometry intersects
   * the query rectangle.
   * 
   * @param geom the Geometry to test (may be of any type)
   * @return true if the geometry intersects the query rectangle
   */
  jsts.operation.predicate.RectangleIntersects.prototype.intersects = function(geom) {
    if (!this.rectEnv.intersects(geom.getEnvelopeInternal()))
      return false;

    /**
     * Test if rectangle envelope intersects any component envelope.
     * This handles Point components as well
     */
    var visitor = new EnvelopeIntersectsVisitor(this.rectEnv);
    visitor.applyTo(geom);
    if (visitor.intersects())
      return true;

    /**
     * Test if any rectangle vertex is contained in the target geometry
     */
    var ecpVisitor = new GeometryContainsPointVisitor(rectangle);
    ecpVisitor.applyTo(geom);
    if (ecpVisitor.containsPoint())
      return true;

    /**
     * Test if any target geometry line segment intersects the rectangle
     */
    var riVisitor = new RectangleIntersectsSegmentVisitor(rectangle);
    riVisitor.applyTo(geom);
    if (riVisitor.intersects())
      return true;

    return false;
  }
  
})();

