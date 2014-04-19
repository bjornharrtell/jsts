/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/**
 * @requires jsts/geom/Geometry.js
 * @requires jsts/geom/Coordinate.js
 * @requires jsts/geom/LineSegment.js
 * @requires jsts/geom/Polygon.js
 * @requires jsts/algorithm/ConvexHull.js
 */

/**
 * Computes the minimum diameter of a {@link Geometry}.
 * The minimum diameter is defined to be the
 * width of the smallest band that
 * contains the geometry,
 * where a band is a strip of the plane defined
 * by two parallel lines.
 * This can be thought of as the smallest hole that the geometry can be
 * moved through, with a single rotation.
 * <p>
 * The first step in the algorithm is computing the convex hull of the Geometry.
 * If the input Geometry is known to be convex, a hint can be supplied to
 * avoid this computation.
 * <p>
 * This class can also be used to compute a line segment representing 
 * the minimum diameter, the supporting line segment of the minimum diameter,
 * and a minimum rectangle enclosing the input geometry.
 * This rectangle will
 * have width equal to the minimum diameter, and have one side
 * parallel to the supporting segment.
 *
 * @see ConvexHull
 *
 * @version 1.7
 *
 * @constructor
 */
jsts.algorithm.MinimumDiameter = function (inputGeom, isConvex) {

    /**
     * @type {jsts.geom.Coordinate[]}
     * @private
     */
    this.convexHullPts = null;

    /**
     * @type {jsts.geom.LineSegment}
     * @private
     */
    this.minBaseSeg = new jsts.geom.LineSegment();

    /**
     * @type {jsts.geom.Coordinate}
     * @private
     */
    this.minWidthPt = null;

    /**
     * @type {number}
     * @private
     */
    this.minPtIndex = 0;

    /**
     * @type {number}
     * @private
     */
    this.minWidth = 0;


    jsts.algorithm.MinimumDiameter.inputGeom = inputGeom;
    jsts.algorithm.MinimumDiameter.isConvex = isConvex || false;
};

/**
 * A Geometry which is convex
 * @type {jsts.geom.Geometry}
 * @private
 */
jsts.algorithm.MinimumDiameter.inputGeom = null;

/**
 * <code>true</code> if the input geometry is convex
 * @type {boolean}
 * @private
 */
jsts.algorithm.MinimumDiameter.isConvex = false;

/**
 * @param {jsts.geom.Coordinate[]} pts
 * @param {number} index
 * @return {number}
 * @private
 */
jsts.algorithm.MinimumDiameter.nextIndex = function (pts, index) {
    index++;
    if (index >= pts.length) {
        index = 0;
    }
    return index;
};

/**
 * @param {number} a
 * @param {number} b
 * @param {jsts.geom.Coordinate} p
 * @return {number}
 * @private
 */
jsts.algorithm.MinimumDiameter.computeC = function (a, b, p) {
    return a * p.y - b * p.x;
};

/**
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {jsts.geom.LineSegment}
 * @private
 */
jsts.algorithm.MinimumDiameter.computeSegmentForLine = function (a, b, c) {
    var p0;
    var p1;
    /*
     * Line eqn is ax + by = c
     * Slope is a/b.
     * If slope is steep, use y values as the inputs
     */
    if (Math.abs(b) > Math.abs(a)) {
        p0 = new jsts.geom.Coordinate(0, c / b);
        p1 = new jsts.geom.Coordinate(1, c / b - a / b);
    }
    else {
        p0 = new jsts.geom.Coordinate(c / a, 0);
        p1 = new jsts.geom.Coordinate(c / a - b / a, 1);
    }
    return new jsts.geom.LineSegment(p0, p1);
};

/**
 * Gets the length of the minimum diameter of the input Geometry
 * @return {number} the length of the minimum diameter
 */
jsts.algorithm.MinimumDiameter.prototype.getLength = function () {
    this.computeMinimumDiameter();
    return this.minWidth;
};

/**
 * Gets the {@link Coordinate} forming one end of the minimum diameter
 * @return {jsts.geom.Coordinate} a coordinate forming one end of the minimum diameter
 */
jsts.algorithm.MinimumDiameter.prototype.getWidthCoordinate = function () {
    this.computeMinimumDiameter();
    return this.minWidthPt;
};

/**
 * Gets the segment forming the base of the minimum diameter
 * @return {jsts.geom.LineString} the segment forming the base of the minimum diameter
 */
jsts.algorithm.MinimumDiameter.prototype.getSupportingSegment = function () {
    this.computeMinimumDiameter();
    var coord = [this.minBaseSeg.p0, this.minBaseSeg.p1];
    return jsts.algorithm.MinimumDiameter.inputGeom.getFactory().createLineString(coord);
};

/**
 * Gets a {@link LineString} which is a minimum diameter
 * @return {jsts.geom.LineString} a {@link LineString} which is a minimum diameter
 */
jsts.algorithm.MinimumDiameter.prototype.getDiameter = function () {
    this.computeMinimumDiameter();

    // return empty linestring if no minimum width calculated
    if (this.minWidthPt === null) {
        return jsts.algorithm.MinimumDiameter.inputGeom.getFactory().createLineString(null);
    }

    var basePt = this.minBaseSeg.project(this.minWidthPt);
    return jsts.algorithm.MinimumDiameter.inputGeom.getFactory().createLineString([basePt, this.minWidthPt]);
};

/**
 * @private
 */
jsts.algorithm.MinimumDiameter.prototype.computeMinimumDiameter = function () {
    // check if computation is cached
    if (this.minWidthPt !== null) {
        return;
    }

    if (jsts.algorithm.MinimumDiameter.isConvex)
        this.computeWidthConvex(jsts.algorithm.MinimumDiameter.inputGeom);
    else {
        var convexGeom = new jsts.algorithm.ConvexHull(jsts.algorithm.MinimumDiameter.inputGeom).getConvexHull();
        this.computeWidthConvex(convexGeom);
    }
};

/**
 * @param {jsts.geom.Geometry} convexGeom
 * @private
 */
jsts.algorithm.MinimumDiameter.prototype.computeWidthConvex = function (convexGeom) {
    if (convexGeom instanceof jsts.geom.Polygon) {
        this.convexHullPts = convexGeom.getExteriorRing().getCoordinates();
    } else {
        this.convexHullPts = convexGeom.getCoordinates();
    }

    // special cases for lines or points or degenerate rings
    if (this.convexHullPts.length === 0) {
        this.minWidth = 0;
        this.minWidthPt = null;
        this.minBaseSeg = null;
    } else if (this.convexHullPts.length === 1) {
        this.minWidth = 0;
        this.minWidthPt = this.convexHullPts[0];
        this.minBaseSeg.p0 = this.convexHullPts[0];
        this.minBaseSeg.p1 = this.convexHullPts[0];
    } else if (this.convexHullPts.length === 2 || this.convexHullPts.length === 3) {
        this.minWidth = 0;
        this.minWidthPt = this.convexHullPts[0];
        this.minBaseSeg.p0 = this.convexHullPts[0];
        this.minBaseSeg.p1 = this.convexHullPts[1];
    } else {
        this.computeConvexRingMinDiameter(this.convexHullPts);
    }
};

/**
 * Compute the width information for a ring of {@link Coordinate}s.
 * Leaves the width information in the instance variables.
 * @param {jsts.geom.Coordinate[]} pts
 * @private
 */
jsts.algorithm.MinimumDiameter.prototype.computeConvexRingMinDiameter = function (pts) {
    // for each segment in the ring
    this.minWidth = Number.MAX_VALUE;
    var currMaxIndex = 1;

    var seg = new jsts.geom.LineSegment();
    // compute the max distance for all segments in the ring, and pick the minimum
    for (var i = 0; i < pts.length - 1; i++) {
        seg.p0 = pts[i];
        seg.p1 = pts[i + 1];
        currMaxIndex = this.findMaxPerpDistance(pts, seg, currMaxIndex);
    }
};

/**
 * @param {jsts.geom.Coordinate[]} pts
 * @param {jsts.geom.LineSegment} seg
 * @param {number} startIndex
 * @return {number}
 * @private
 */
jsts.algorithm.MinimumDiameter.prototype.findMaxPerpDistance = function (pts, seg, startIndex) {
    var maxPerpDistance = seg.distancePerpendicular(pts[startIndex]);
    var nextPerpDistance = maxPerpDistance;
    var maxIndex = startIndex;
    var nextIndex = maxIndex;
    while (nextPerpDistance >= maxPerpDistance) {
        maxPerpDistance = nextPerpDistance;
        maxIndex = nextIndex;

        nextIndex = jsts.algorithm.MinimumDiameter.nextIndex(pts, maxIndex);
        nextPerpDistance = seg.distancePerpendicular(pts[nextIndex]);
    }
    // found maximum width for this segment - update global min dist if appropriate
    if (maxPerpDistance < this.minWidth) {
        this.minPtIndex = maxIndex;
        this.minWidth = maxPerpDistance;
        this.minWidthPt = pts[this.minPtIndex];
        this.minBaseSeg = new jsts.geom.LineSegment(seg);
    }
    return maxIndex;
};

/**
 * Gets the minimum rectangular {@link Polygon} which encloses the input geometry.
 * The rectangle has width equal to the minimum diameter, 
 * and a longer length.
 * If the convex hull of the input is degenerate (a line or point)
 * a {@link LineString} or {@link Point} is returned.
 * <p>
 * The minimum rectangle can be used as an extremely generalized representation
 * for the given geometry.
 * 
 * @return {jsts.geom.Geometry} the minimum rectangle enclosing the input (or a line or point if degenerate)
 */
jsts.algorithm.MinimumDiameter.prototype.getMinimumRectangle = function () {
    this.computeMinimumDiameter();

    // check if minimum rectangle is degenerate (a point or line segment)
    if (this.minWidth === 0) {
        if (this.minBaseSeg.p0.equals2D(this.minBaseSeg.p1)) {
            return jsts.algorithm.MinimumDiameter.inputGeom.getFactory().createPoint(this.minBaseSeg.p0);
        }
        return this.minBaseSeg.toGeometry(jsts.algorithm.MinimumDiameter.inputGeom.getFactory());
    }

    // deltas for the base segment of the minimum diameter
    var dx = this.minBaseSeg.p1.x - this.minBaseSeg.p0.x;
    var dy = this.minBaseSeg.p1.y - this.minBaseSeg.p0.y;

    var minPara = Number.MAX_VALUE;
    var maxPara = -Number.MAX_VALUE;
    var minPerp = Number.MAX_VALUE;
    var maxPerp = -Number.MAX_VALUE;

    // compute maxima and minima of lines parallel and perpendicular to base segment
    for (var i = 0; i < this.convexHullPts.length; i++) {

        var paraC = jsts.algorithm.MinimumDiameter.computeC(dx, dy, this.convexHullPts[i]);
        if (paraC > maxPara) maxPara = paraC;
        if (paraC < minPara) minPara = paraC;

        var perpC = jsts.algorithm.MinimumDiameter.computeC(-dy, dx, this.convexHullPts[i]);
        if (perpC > maxPerp) maxPerp = perpC;
        if (perpC < minPerp) minPerp = perpC;
    }

    // compute lines along edges of minimum rectangle
    var maxPerpLine = jsts.algorithm.MinimumDiameter.computeSegmentForLine(-dx, -dy, maxPerp);
    var minPerpLine = jsts.algorithm.MinimumDiameter.computeSegmentForLine(-dx, -dy, minPerp);
    var maxParaLine = jsts.algorithm.MinimumDiameter.computeSegmentForLine(-dy, dx, maxPara);
    var minParaLine = jsts.algorithm.MinimumDiameter.computeSegmentForLine(-dy, dx, minPara);

    // compute vertices of rectangle (where the para/perp max & min lines intersect)
    var p0 = maxParaLine.lineIntersection(maxPerpLine);
    var p1 = minParaLine.lineIntersection(maxPerpLine);
    var p2 = minParaLine.lineIntersection(minPerpLine);
    var p3 = maxParaLine.lineIntersection(minPerpLine);

    var shell = jsts.algorithm.MinimumDiameter.inputGeom.getFactory().createLinearRing(
        [p0, p1, p2, p3, p0]);
    return jsts.algorithm.MinimumDiameter.inputGeom.getFactory().createPolygon(shell, null);
};
