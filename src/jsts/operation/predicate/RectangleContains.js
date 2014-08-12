/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */
 
/**
 * Port source:
 * /jts/jts/java/src/com/vividsolutions/jts/operation/predicate/RectangleContains.java
 * Revision: 707
 */

(function() {

/**
 * Optimized implementation of the <tt>contains</tt> spatial predicate 
 * for cases where the first {@link Geometry} is a rectangle.
 * This class works for all input geometries, including
 * {@link GeometryCollection}s.
 * <p>
 * As a further optimization,
 * this class can be used to test 
 * many geometries against a single
 * rectangle in a slightly more efficient way.
 *
 * @version 1.7
 *
 * Create a new contains computer for two geometries.
 *
 * @param rectangle a rectangular geometry
 */
jsts.operation.predicate.RectangleContains = function(rectangle) {
    this.rectEnv = rectangle.getEnvelopeInternal();
}


  /**
   * Tests whether a rectangle contains a given geometry.
   * 
   * @param rectangle a rectangular Polygon
   * @param b a Geometry of any type
   * @return true if the geometries intersect
   */
jsts.operation.predicate.RectangleContains.contains = function(rectangle, b) {
    var rc = new jsts.operation.predicate.RectangleContains(rectangle);
    return rc.contains(b);
}

jsts.operation.predicate.RectangleContains.prototype.rectEnv = null;

jsts.operation.predicate.RectangleContains.prototype.contains = function(geom) {
    // the test geometry must be wholly contained in the rectangle envelope
    if (! this.rectEnv.contains(geom.getEnvelopeInternal()))
      return false;
    
    /**
     * Check that geom is not contained entirely in the rectangle boundary.
     * According to the somewhat odd spec of the SFS, if this
     * is the case the geometry is NOT contained.
     */
    if (this.isContainedInBoundary(geom))
      return false;
    return true;
}

jsts.operation.predicate.RectangleContains.prototype.isContainedInBoundary = function(geom) {
    // polygons can never be wholely contained in the boundary
    if (geom instanceof jsts.geom.Polygon) return false;
    if (geom instanceof jsts.geom.Point) return this.isPointContainedInBoundary(geom.getCoordinate());
    if (geom instanceof jsts.geom.LineString) return this.isLineStringContainedInBoundary(geom);

    for (var i = 0; i < geom.getNumGeometries(); i++) {
      var comp = geom.getGeometryN(i);
      if (! this.isContainedInBoundary(comp))
        return false;
    }
    return true;
}

  /**
   * Tests if a point is contained in the boundary of the target rectangle.
   * 
   * @param pt the point to test
   * @return true if the point is contained in the boundary
   */
jsts.operation.predicate.RectangleContains.prototype.isPointContainedInBoundary = function(pt) {
    /**
     * contains = false iff the point is properly contained in the rectangle.
     * 
     * This code assumes that the point lies in the rectangle envelope
     */ 
    return pt.x == this.rectEnv.getMinX() 
    		|| pt.x == this.rectEnv.getMaxX()
    		|| pt.y == this.rectEnv.getMinY()
    		|| pt.y == this.rectEnv.getMaxY();
}

  /**
   * Tests if a linestring is completely contained in the boundary of the target rectangle.
   * @param line the linestring to test
   * @return true if the linestring is contained in the boundary
   */
jsts.operation.predicate.RectangleContains.prototype.isLineStringContainedInBoundary = function(line) {
    var seq = line.getCoordinateSequence();  
    // TODO: reworked as CoordinateSequence does not use original API
    for (var i = 0; i < seq.length - 1; i++) {
      var p0 = seq[i];
      var p1 = seq[i + 1];

      if (! this.isLineSegmentContainedInBoundary(p0, p1))
        return false;
    }
    return true;
}

  /**
   * Tests if a line segment is contained in the boundary of the target rectangle.
   * @param p0 an endpoint of the segment
   * @param p1 an endpoint of the segment
   * @return true if the line segment is contained in the boundary
   */
jsts.operation.predicate.RectangleContains.prototype.isLineSegmentContainedInBoundary = function(p0, p1) {
    if (p0.equals(p1))
      return this.isPointContainedInBoundary(p0);

    // we already know that the segment is contained in the rectangle envelope
    if (p0.x == p1.x) {
      if (p0.x == this.rectEnv.getMinX() ||
          p0.x == this.rectEnv.getMaxX() )
        return true;
    }
    else if (p0.y == p1.y) {
      if (p0.y == this.rectEnv.getMinY() ||
          p0.y == this.rectEnv.getMaxY() )
        return true;
    }
    /**
     * Either
     *   both x and y values are different
     * or
     *   one of x and y are the same, but the other ordinate is not the same as a boundary ordinate
     *
     * In either case, the segment is not wholely in the boundary
     */
    return false;
}

})();


