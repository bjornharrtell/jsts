/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/**
 * @requires jsts/geom/Geometry.js
 * @requires jsts/geom/Coordinate.js
 * @requires jsts/geom/Triangle.js
 * @requires jsts/geom/CoordinateArrays.js
 * @requires jsts/algorithm/Angle.js
 */

/**
 * Computes the <b>Minimum Bounding Circle</b> (MBC)
 * for the points in a {@link Geometry}.
 * The MBC is the smallest circle which <tt>cover</tt>s
 * all the input points 
 * (this is also known as the <b>Smallest Enclosing Circle</b>).
 * This is equivalent to computing the Maximum Diameter 
 * of the input point set.
 * <p>
 * The computed circle can be specified in two equivalent ways,
 * both of which are provide as output by this class:
 * <ul>
 * <li>As a centre point and a radius
 * <li>By the set of points defining the circle.
 * Depending on the number of points in the input
 * and their relative positions, this
 * will be specified by anywhere from 0 to 3 points. 
 * <ul>
 * <li>0 or 1 points indicate an empty or trivial input point arrangement.
 * <li>2 or 3 points define a circle which contains 
 * all the input points.
 * </ul>
 * </ul>
 * The class can also output a {@link Geometry} which approximates the
 * shape of the MBC (although as an approximation 
 * it is <b>not</b> guaranteed to <tt>cover</tt> all the input points.)
 * 
 * @author Martin Davis
 * 
 * @see MinimumDiameter
 *
 */
jsts.algorithm.MinimumBoundingCircle = function (geom) {

    /*
     * The algorithm used is based on the one by Jon Rokne in 
     * the article "An Easy Bounding Circle" in <i>Graphic Gems II</i>.
     */

    /**
     * @type {jsts.geom.Geometry}
     * @private
     */
    this.input = null;

    /**
     * @type {jsts.geom.Coordinate[]}
     * @private
     */
    this.extremalPts = null;

    /**
     * @type {jsts.geom.Coordinate}
     * @private
     */
    this.centre = null;

    /**
     * @type {number}
     * @private
     */
    this.radius = 0;


    this.input = geom;
};

/**
 * Gets a geometry which represents the Minimum Bounding Circle.
 * If the input is degenerate (empty or a single unique point),
 * this method will return an empty geometry or a single Point geometry.
 * Otherwise, a Polygon will be returned which approximates the 
 * Minimum Bounding Circle. 
 * (Note that because the computed polygon is only an approximation, 
 * it may not precisely contain all the input points.)
 * 
 * @return a Geometry representing the Minimum Bounding Circle.
 */
jsts.algorithm.MinimumBoundingCircle.prototype.getCircle = function () {
    //TODO: ensure the output circle contains the extermal points.
    //TODO: or maybe even ensure that the returned geometry contains ALL the input points?

    this.compute();
    if (this.centre === null) {
        return this.input.getFactory().createPolygon(null, null);
    }
    var centrePoint = this.input.getFactory().createPoint(this.centre);
    if (this.radius === 0) {
        return centrePoint;
    }
    return centrePoint.buffer(this.radius);
};

/**
 * Gets the extremal points which define the computed Minimum Bounding Circle.
 * There may be zero, one, two or three of these points,
 * depending on the number of points in the input
 * and the geometry of those points.
 * 
 * @return {jsts.geom.Coordinate[]} the points defining the Minimum Bounding Circle
 */
jsts.algorithm.MinimumBoundingCircle.prototype.getExtremalPoints = function () {
    this.compute();
    return this.extremalPts;
};

/**
 * Gets the centre point of the computed Minimum Bounding Circle.
 * 
 * @return {jsts.geom.Coordinate} the centre point of the Minimum Bounding Circle
 * @return null if the input is empty
 */
jsts.algorithm.MinimumBoundingCircle.prototype.getCentre = function () {
    this.compute();
    return this.centre;
};

/**
 * Gets the radius of the computed Minimum Bounding Circle.
 * 
 * @return {number} the radius of the Minimum Bounding Circle
 */
jsts.algorithm.MinimumBoundingCircle.prototype.getRadius = function () {
    this.compute();
    return this.radius;
};

/**
 * @private
 */
jsts.algorithm.MinimumBoundingCircle.prototype.computeCentre = function () {
    switch (this.extremalPts.length) {
        case 0:
            this.centre = null;
            break;
        case 1:
            this.centre = this.extremalPts[0];
            break;
        case 2:
            this.centre = new jsts.geom.Coordinate(
				(this.extremalPts[0].x + this.extremalPts[1].x) / 2,
				(this.extremalPts[0].y + this.extremalPts[1].y) / 2
			);
            break;
        case 3:
            this.centre = jsts.geom.Triangle.circumcentre(
                this.extremalPts[0], this.extremalPts[1], this.extremalPts[2]);
            break;
    }
};

/**
 * @private
 */
jsts.algorithm.MinimumBoundingCircle.prototype.compute = function () {
    if (this.extremalPts !== null) {
        return;
    }

    this.computeCirclePoints();
    this.computeCentre();
    if (this.centre !== null) {
        this.radius = this.centre.distance(this.extremalPts[0]);
    }
};

/**
 * @private
 */
jsts.algorithm.MinimumBoundingCircle.prototype.computeCirclePoints = function () {
    // handle degenerate or trivial cases
    if (this.input.isEmpty()) {
        this.extremalPts = [];
        return;
    }

    var pts;
    if (this.input.getNumPoints() === 1) {
        pts = this.input.getCoordinates();
        this.extremalPts = [new jsts.geom.Coordinate(pts[0])];
        return;
    }

    /**
     * The problem is simplified by reducing to the convex hull.
     * Computing the convex hull also has the useful effect of eliminating duplicate points
     */
    var convexHull = this.input.convexHull();

    var hullPts = convexHull.getCoordinates();

    // strip duplicate final point, if any
    pts = hullPts;
    if (hullPts[0].equals2D(hullPts[hullPts.length - 1])) {
        pts = [];
        jsts.geom.CoordinateArrays.copyDeep(hullPts, 0, pts, 0, hullPts.length - 1);
    }

    /**
     * Optimization for the trivial case where the CH has fewer than 3 points
     */
    if (pts.length <= 2) {
        this.extremalPts = jsts.geom.CoordinateArrays.copyDeep(pts);
        return;
    }

    // find a point P with minimum Y ordinate
    var P = jsts.algorithm.MinimumBoundingCircle.lowestPoint(pts);

    // find a point Q such that the angle that PQ makes with the x-axis is minimal
    var Q = jsts.algorithm.MinimumBoundingCircle.pointWitMinAngleWithX(pts, P);

    /**
     * Iterate over the remaining points to find 
     * a pair or triplet of points which determine the minimal circle.
     * By the design of the algorithm, 
     * at most <tt>pts.length</tt> iterations are required to terminate 
     * with a correct result.
     */
    for (var i = 0; i < pts.length; i++) {
        var R = jsts.algorithm.MinimumBoundingCircle.pointWithMinAngleWithSegment(pts, P, Q);

        // if PRQ is obtuse, then MBC is determined by P and Q
        if (jsts.algorithm.Angle.isObtuse(P, R, Q)) {
            this.extremalPts = [new jsts.geom.Coordinate(P), new jsts.geom.Coordinate(Q)];
            return;
        }
        // if RPQ is obtuse, update baseline and iterate
        if (jsts.algorithm.Angle.isObtuse(R, P, Q)) {
            P = R;
            continue;
        }
        // if RQP is obtuse, update baseline and iterate
        if (jsts.algorithm.Angle.isObtuse(R, Q, P)) {
            Q = R;
            continue;
        }
        // otherwise all angles are acute, and the MBC is determined by the triangle PQR
        this.extremalPts = [new jsts.geom.Coordinate(P), new jsts.geom.Coordinate(Q), new jsts.geom.Coordinate(R)];
        return;
    }
    throw new Error("Logic failure in Minimum Bounding Circle algorithm!");
};

/**
 * @param {jsts.geom.Coordinate[]} pts
 * @return {jsts.geom.Coordinate}
 *
 * @private
 */
jsts.algorithm.MinimumBoundingCircle.lowestPoint = function (pts) {
    var min = pts[0];
    for (var i = 1; i < pts.length; i++) {
        if (pts[i].y < min.y) {
            min = pts[i];
        }
    }
    return min;
};

/**
 * @param {jsts.geom.Coordinate[]} pts
 * @param {jsts.geom.Coordinate} p
 * @return {jsts.geom.Coordinate}
 *
 * @private
 */
jsts.algorithm.MinimumBoundingCircle.pointWitMinAngleWithX = function (pts, P) {
    var minSin = Number.MAX_VALUE;
    var minAngPt = null;
    for (var i = 0; i < pts.length; i++) {

        var p = pts[i];
        if (p === P) continue;

        /**
         * The sin of the angle is a simpler proxy for the angle itself
         */
        var dx = p.x - P.x;
        var dy = p.y - P.y;
        if (dy < 0) dy = -dy;
        var len = Math.sqrt(dx * dx + dy * dy);
        var sin = dy / len;

        if (sin < minSin) {
            minSin = sin;
            minAngPt = p;
        }
    }
    return minAngPt;
};

/**
 * @param {jsts.geom.Coordinate[]} pts
 * @param {jsts.geom.Coordinate} P
 * @param {jsts.geom.Coordinate} Q
 * @return {jsts.geom.Coordinate}
 *
 * @private
 */
jsts.algorithm.MinimumBoundingCircle.pointWithMinAngleWithSegment = function (pts, P, Q) {
    var minAng = Number.MAX_VALUE;
    var minAngPt = null;
    for (var i = 0; i < pts.length; i++) {

        var p = pts[i];
        if (p === P) continue;
        if (p === Q) continue;

        var ang = jsts.algorithm.Angle.angleBetween(P, p, Q);
        if (ang < minAng) {
            minAng = ang;
            minAngPt = p;
        }
    }
    return minAngPt;
};
