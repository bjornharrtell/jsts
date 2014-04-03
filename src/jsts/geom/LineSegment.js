/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/**
 * @requires jsts/geom/Coordinate.js
 * @requires jsts/algorithm/CGAlgorithms.js
 * @requires jsts/algorithm/RobustLineIntersector.js
 * @requires jsts/algorithm/HCoordinate.js
 */

/**
 * Represents a line segment defined by two {@link Coordinate}s. Provides
 * methods to compute various geometric properties and relationships of line
 * segments.
 * <p>
 * This class is designed to be easily mutable (to the extent of having its
 * contained points public). This supports a common pattern of reusing a single
 * LineSegment object as a way of computing segment properties on the segments
 * defined by arrays or lists of {@link Coordinate}s.
 *
 * @param {Coordinate}
 *          p0
 * @param {Coordinate}
 *          p1
 * @constructor
 */
jsts.geom.LineSegment = function () {
    if (arguments.length === 0) {
        this.p0 = new jsts.geom.Coordinate();
        this.p1 = new jsts.geom.Coordinate();
    } else if (arguments.length === 1) {
        this.p0 = arguments[0].p0;
        this.p1 = arguments[0].p1;
    } else if (arguments.length === 2) {
        this.p0 = arguments[0];
        this.p1 = arguments[1];
    } else if (arguments.length === 4) {
        this.p0 = new jsts.geom.Coordinate(arguments[0], arguments[1]);
        this.p1 = new jsts.geom.Coordinate(arguments[2], arguments[3]);
    }
};

/**
 * @type {Coordinate}
 */
jsts.geom.LineSegment.prototype.p0 = null;


/**
 * @type {Coordinate}
 */
jsts.geom.LineSegment.prototype.p1 = null;

/**
 * Computes the midpoint of a segment
 *
 * @param {jsts.geom.Coordinate} p0
 * @param {jsts.geom.Coordinate} p1
 * @return {jsts.geom.Coordinate} the midpoint of the segment
 */
jsts.geom.LineSegment.midPoint = function (p0, p1) {
    return new jsts.geom.Coordinate((p0.x + p1.x) / 2, (p0.y + p1.y) / 2);
};

/**
 * @param {number} i
 * @return {jsts.geom.Coordinate}
 */
jsts.geom.LineSegment.prototype.getCoordinate = function (i) {
    if (i === 0) return this.p0;
    return this.p1;
};

/**
 * Computes the length of the line segment.
 *
 * @return {number} the length of the line segment.
 */
jsts.geom.LineSegment.prototype.getLength = function () {
    return this.p0.distance(this.p1);
};

/**
 * Tests whether the segment is horizontal.
 *
 * @return {boolean} <code>true</code> if the segment is horizontal.
 */
jsts.geom.LineSegment.prototype.isHorizontal = function () {
    return this.p0.y === this.p1.y;
};
/**
 * Tests whether the segment is vertical.
 *
 * @return {boolean} <code>true</code> if the segment is vertical.
 */
jsts.geom.LineSegment.prototype.isVertical = function () {
    return this.p0.x === this.p1.x;
};

jsts.geom.LineSegment.prototype.orientationIndex = function (arg) {
    if (arg instanceof jsts.geom.LineSegment) {
        return this.orientationIndex1(arg);
    } else if (arg instanceof jsts.geom.Coordinate) {
        return this.orientationIndex2(arg);
    }
};

/**
  * Determines the orientation of a LineSegment relative to this segment.
  * The concept of orientation is specified as follows:
  * Given two line segments A and L,
  * <ul>
  * <li>A is to the left of a segment L if A lies wholly in the
  * closed half-plane lying to the left of L
  * <li>A is to the right of a segment L if A lies wholly in the
  * closed half-plane lying to the right of L
  * <li>otherwise, A has indeterminate orientation relative to L. This
  * happens if A is collinear with L or if A crosses the line determined by L.
  * </ul>
  *
  * @param {jsts.geom.LineSegment} seg the LineSegment to compare
  *
  * @return 1 if <code>seg</code> is to the left of this segment<br />
  * -1 if <code>seg</code> is to the right of this segment<br />
  * 0 if <code>seg</code> has indeterminate orientation relative to this segment
  */
jsts.geom.LineSegment.prototype.orientationIndex1 = function (seg) {
    var orient0 = jsts.algorithm.CGAlgorithms.orientationIndex(this.p0, this.p1, seg.p0);
    var orient1 = jsts.algorithm.CGAlgorithms.orientationIndex(this.p0, this.p1, seg.p1);
    // this handles the case where the points are L or collinear
    if (orient0 >= 0 && orient1 >= 0) {
        return Math.max(orient0, orient1);
    }
    // this handles the case where the points are R or collinear
    if (orient0 <= 0 && orient1 <= 0) {
        return Math.max(orient0, orient1);
    }
    // points lie on opposite sides ==> indeterminate orientation
    return 0;
};

/**
 * Determines the orientation index of a {@link Coordinate} relative to this segment.
 * The orientation index is as defined in {@link CGAlgorithms#computeOrientation}.
 *
 * @param {jsts.geom.Coordinate} p the coordinate to compare
 *
 * @return 1 (LEFT) if <code>p</code> is to the left of this segment
 * @return -1 (RIGHT) if <code>p</code> is to the right of this segment
 * @return 0 (COLLINEAR) if <code>p</code> is collinear with this segment
 * 
 * @see CGAlgorithms#computeOrientation(Coordinate, Coordinate, Coordinate)
 */
jsts.geom.LineSegment.prototype.orientationIndex2 = function (p) {
    return jsts.algorithm.CGAlgorithms.orientationIndex(this.p0, this.p1, p);
};

/**
 * Reverses the direction of the line segment.
 */
jsts.geom.LineSegment.prototype.reverse = function () {
    var temp = this.p0;
    this.p0 = this.p1;
    this.p1 = temp;
};

/**
 * Puts the line segment into a normalized form.
 * This is useful for using line segments in maps and indexes when
 * topological equality rather than exact equality is desired.
 * A segment in normalized form has the first point smaller
 * than the second (according to the standard ordering on {@link Coordinate}).
 */
jsts.geom.LineSegment.prototype.normalize = function () {
    if (this.p1.compareTo(this.p0) < 0) this.reverse();
};

/**
 * Computes the angle that the vector defined by this segment
 * makes with the X-axis.
 * The angle will be in the range [ -PI, PI ] radians.
 *
 * @return {number} the angle this segment makes with the X-axis (in radians)
 */
jsts.geom.LineSegment.prototype.angle = function () {
    return Math.atan2(this.p1.y - this.p0.y, this.p1.x - this.p0.x);
};

/**
 * Computes the midpoint of the segment
 *
 * @return {jsts.geom.Coordinate} the midpoint of the segment
 */
jsts.geom.LineSegment.prototype.midPoint = function () {
    return jsts.geom.LineSegment.midPoint(this.p0, this.p1);
};

jsts.geom.LineSegment.prototype.distance = function (arg) {
    if (arg instanceof jsts.geom.LineSegment) {
        return this.distance1(arg);
    } else if (arg instanceof jsts.geom.Coordinate) {
        return this.distance2(arg);
    }
};

/**
 * Computes the distance between this line segment and another segment.
 *
 * @param {jsts.geom.LineSegment} ls
 * @return {number} the distance to the other segment
 */
jsts.geom.LineSegment.prototype.distance1 = function (ls) {
    return jsts.algorithm.CGAlgorithms.distanceLineLine(this.p0, this.p1, ls.p0, ls.p1);
};

/**
 * Computes the distance between this line segment and a given point.
 *
 * @param {jsts.geom.Coordinate}
 *          p the coordinate.
 * @return {number}
 *          the distance from this segment to the given point.
 */
jsts.geom.LineSegment.prototype.distance2 = function (p) {
    return jsts.algorithm.CGAlgorithms.distancePointLine(p, this.p0, this.p1);
};

/**
 * Computes the {@link Coordinate} that lies a given
 * fraction along the line defined by this segment.
 * A fraction of <code>0.0</code> returns the start point of the segment;
 * a fraction of <code>1.0</code> returns the end point of the segment.
 * If the fraction is < 0.0 or > 1.0 the point returned 
 * will lie before the start or beyond the end of the segment. 
 *
 * @param {number} segmentLengthFraction the fraction of the segment length along the line
 * @return {jsts.geom.Coordinate} the point at that distance
 */
jsts.geom.LineSegment.prototype.pointAlong = function (segmentLengthFraction) {
    var coord = new jsts.geom.Coordinate();
    coord.x = this.p0.x + segmentLengthFraction * (this.p1.x - this.p0.x);
    coord.y = this.p0.y + segmentLengthFraction * (this.p1.y - this.p0.y);
    return coord;
};

/**
 * Computes the {@link Coordinate} that lies a given
 * fraction along the line defined by this segment and offset from 
 * the segment by a given distance.
 * A fraction of <code>0.0</code> offsets from the start point of the segment;
 * a fraction of <code>1.0</code> offsets from the end point of the segment.
 * The computed point is offset to the left of the line if the offset distance is
 * positive, to the right if negative.
 *
 * @param {number} segmentLengthFraction the fraction of the segment length along the line
 * @param {number} offsetDistance the distance the point is offset from the segment
 *    (positive is to the left, negative is to the right)
 * @return {jsts.geom.Coordinate} the point at that distance and offset
 */
jsts.geom.LineSegment.prototype.pointAlongOffset = function (segmentLengthFraction, offsetDistance) {
    // the point on the segment line
    var segx = this.p0.x + segmentLengthFraction * (this.p1.x - this.p0.x);
    var segy = this.p0.y + segmentLengthFraction * (this.p1.y - this.p0.y);

    var dx = this.p1.x - this.p0.x;
    var dy = this.p1.y - this.p0.y;
    var len = Math.sqrt(dx * dx + dy * dy);
    var ux = 0;
    var uy = 0;
    if (offsetDistance !== 0) {
        if (len <= 0) {
            throw "Cannot compute offset from zero-length line segment";
        }

        // u is the vector that is the length of the offset, in the direction of the segment
        ux = offsetDistance * dx / len;
        uy = offsetDistance * dy / len;
    }

    // the offset point is the seg point plus the offset vector rotated 90 degrees CCW
    var offsetx = segx - uy;
    var offsety = segy + ux;

    var coord = new jsts.geom.Coordinate(offsetx, offsety);
    return coord;
};

/**
 * Computes the Projection Factor for the projection of the point p onto this
 * LineSegment. The Projection Factor is the constant r by which the vector for
 * this segment must be multiplied to equal the vector for the projection of
 * <tt>p<//t> on the line
 * defined by this segment.
 * <p>
 * The projection factor returned will be in the range <tt>(-inf, +inf)</tt>.
 *
 * @param {Coordinate} p the point to compute the factor for.
 * @return {double} the projection factor for the point.
 */
jsts.geom.LineSegment.prototype.projectionFactor = function (p) {
    if (p.equals(this.p0))
        return 0.0;
    if (p.equals(this.p1))
        return 1.0;
    // Otherwise, use comp.graphics.algorithms Frequently Asked Questions method
    /*            AC dot AB
                   r = ---------
                         ||AB||^2
                r has the following meaning:
                r=0 P = A
                r=1 P = B
                r<0 P is on the backward extension of AB
                r>1 P is on the forward extension of AB
                0<r<1 P is interior to AB
        */
    var dx = this.p1.x - this.p0.x;
    var dy = this.p1.y - this.p0.y;
    var len2 = dx * dx + dy * dy;
    var r = ((p.x - this.p0.x) * dx + (p.y - this.p0.y) * dy) / len2;
    return r;
};

/**
 * Computes the fraction of distance (in <tt>[0.0, 1.0]</tt>) 
 * that the projection of a point occurs along this line segment.
 * If the point is beyond either ends of the line segment,
 * the closest fractional value (<tt>0.0</tt> or <tt>1.0</tt>) is returned.
 * <p>
 * Essentially, this is the {@link #projectionFactor} clamped to 
 * the range <tt>[0.0, 1.0]</tt>.
 * If the segment has zero length, 1.0 is returned.
 *  
 * @param {jsts.geom.Coordinate} inputPt the point
 * @return {number} the fraction along the line segment the projection of the point occurs
 */
jsts.geom.LineSegment.prototype.segmentFraction = function (inputPt) {
    var segFrac = this.projectionFactor(inputPt);
    if (segFrac < 0) {
        segFrac = 0;
    } else if (segFrac > 1 || isNaN(segFrac)) {
        segFrac = 1;
    }
    return segFrac;
};

jsts.geom.LineSegment.prototype.project = function (arg) {
    if (arg instanceof jsts.geom.Coordinate) {
        return this.project1(arg);
    } else if (arg instanceof jsts.geom.LineSegment) {
        return this.project2(arg);
    }
};

/**
 * Compute the projection of a point onto the line determined
 * by this line segment.
 * <p>
 * Note that the projected point
 * may lie outside the line segment.  If this is the case,
 * the projection factor will lie outside the range [0.0, 1.0].
 * @param {jsts.geom.Coordinate} p
 * @return {jsts.geom.Coordinate}
 */
jsts.geom.LineSegment.prototype.project1 = function (p) {
    if (p.equals(this.p0) || p.equals(this.p1)) {
        return new jsts.geom.Coordinate(p);
    }

    var r = this.projectionFactor(p);
    var coord = new jsts.geom.Coordinate();
    coord.x = this.p0.x + r * (this.p1.x - this.p0.x);
    coord.y = this.p0.y + r * (this.p1.y - this.p0.y);
    return coord;
};

/**
 * Project a line segment onto this line segment and return the resulting
 * line segment.  The returned line segment will be a subset of
 * the target line line segment.  This subset may be null, if
 * the segments are oriented in such a way that there is no projection.
 * <p>
 * Note that the returned line may have zero length (i.e. the same endpoints).
 * This can happen for instance if the lines are perpendicular to one another.
 *
 * @param {jsts.geom.LineSegment} seg the line segment to project
 * @return {jsts.geom.LineSegment} the projected line segment, or <code>null</code> if there is no overlap
 */
jsts.geom.LineSegment.prototype.project2 = function (seg) {
    var pf0 = this.projectionFactor(seg.p0);
    var pf1 = this.projectionFactor(seg.p1);
    // check if segment projects at all
    if (pf0 >= 1 && pf1 >= 1) return null;
    if (pf0 <= 0 && pf1 <= 0) return null;

    var newp0 = this.project(seg.p0);
    if (pf0 < 0) newp0 = p0;
    if (pf0 > 1) newp0 = p1;

    var newp1 = this.project(seg.p1);
    if (pf1 < 0.0) newp1 = p0;
    if (pf1 > 1.0) newp1 = p1;

    return new jsts.geom.LineSegment(newp0, newp1);
};

/**
 * Computes the closest point on this line segment to another point.
 *
 * @param {Coordinate}
 *          p the point to find the closest point to.
 * @return {Coordinate} a Coordinate which is the closest point on the line
 *         segment to the point p.
 */
jsts.geom.LineSegment.prototype.closestPoint = function (p) {
    var factor = this.projectionFactor(p);
    if (factor > 0 && factor < 1) {
        return this.project(p);
    }
    var dist0 = this.p0.distance(p);
    var dist1 = this.p1.distance(p);
    if (dist0 < dist1)
        return this.p0;
    return this.p1;
};


/**
 * Computes the closest points on two line segments.
 *
 * @param {LineSegment}
 *          line the segment to find the closest point to.
 * @return {[]} a pair of Coordinates which are the closest points on the line
 *         segments.
 */
jsts.geom.LineSegment.prototype.closestPoints = function (line) {
    // test for intersection
    var intPt = this.intersection(line);
    if (intPt !== null) {
        return [intPt, intPt];
    }

    /**
     * if no intersection closest pair contains at least one endpoint. Test each
     * endpoint in turn.
     */
    var closestPt = [];
    var minDistance = Number.MAX_VALUE;
    var dist;

    var close00 = this.closestPoint(line.p0);
    minDistance = close00.distance(line.p0);
    closestPt[0] = close00;
    closestPt[1] = line.p0;

    var close01 = this.closestPoint(line.p1);
    dist = close01.distance(line.p1);
    if (dist < minDistance) {
        minDistance = dist;
        closestPt[0] = close01;
        closestPt[1] = line.p1;
    }

    var close10 = line.closestPoint(this.p0);
    dist = close10.distance(this.p0);
    if (dist < minDistance) {
        minDistance = dist;
        closestPt[0] = this.p0;
        closestPt[1] = close10;
    }

    var close11 = line.closestPoint(this.p1);
    dist = close11.distance(this.p1);
    if (dist < minDistance) {
        minDistance = dist;
        closestPt[0] = this.p1;
        closestPt[1] = close11;
    }

    return closestPt;
};


/**
 * Computes an intersection point between two line segments, if there is one.
 * There may be 0, 1 or many intersection points between two segments. If there
 * are 0, null is returned. If there is 1 or more, exactly one of them is
 * returned (chosen at the discretion of the algorithm). If more information is
 * required about the details of the intersection, the
 * {@link RobustLineIntersector} class should be used.
 *
 * @param {LineSegment}
 *          line a line segment.
 * @return {Coordinate} an intersection point, or <code>null</code> if there
 *         is none.
 *
 * @see RobustLineIntersector
 */
jsts.geom.LineSegment.prototype.intersection = function (line) {
    var li = new jsts.algorithm.RobustLineIntersector();
    li.computeIntersection(this.p0, this.p1, line.p0, line.p1);
    if (li.hasIntersection())
        return li.getIntersection(0);
    return null;
};

jsts.geom.LineSegment.prototype.setCoordinates = function (ls) {
    if (ls instanceof jsts.geom.Coordinate) {
        this.setCoordinates2.apply(this, arguments);
        return;
    }

    this.setCoordinates2(ls.p0, ls.p1);
};

jsts.geom.LineSegment.prototype.setCoordinates2 = function (p0, p1) {
    this.p0.x = p0.x;
    this.p0.y = p0.y;
    this.p1.x = p1.x;
    this.p1.y = p1.y;
};

/**
 * Computes the perpendicular distance between the (infinite) line defined
 * by this line segment and a point.
 *
 * @param {jsts.geom.Coordinate} p the coordinate
 * @return {number} the perpendicular distance between the defined line and the given point
 */
jsts.geom.LineSegment.prototype.distancePerpendicular = function (p) {
    return jsts.algorithm.CGAlgorithms.distancePointLinePerpendicular(p, this.p0, this.p1);
};

/**
 * Computes the intersection point of the lines of infinite extent defined
 * by two line segments (if there is one).
 * There may be 0, 1 or an infinite number of intersection points 
 * between two lines.
 * If there is a unique intersection point, it is returned. 
 * Otherwise, <tt>null</tt> is returned.
 * If more information is required about the details of the intersection,
 * the {@link RobustLineIntersector} class should be used.
 *
 * @param {jsts.geom.LineSegment} line a line segment defining an straight line with infinite extent
 * @return {jsts.geom.Coordinate} an intersection point, 
 * or <code>null</code> if there is no point of intersection
 * or an infinite number of intersection points
 * 
 * @see RobustLineIntersector
 */
jsts.geom.LineSegment.prototype.lineIntersection = function (line) {
    try {
        var intPt = jsts.algorithm.HCoordinate.intersection(this.p0, this.p1, line.p0, line.p1);
        return intPt;
    } catch (ex) {
        // eat this exception, and return null;
    }
    return null;
};

/**
 * Creates a LineString with the same coordinates as this segment
 * 
 * @param {jsts.geom.GeometryFactory} geomFactory the geometery factory to use
 * @return {jsts.geom.LineString} a LineString with the same geometry as this segment
 */
jsts.geom.LineSegment.prototype.toGeometry = function (geomFactory) {
    return geomFactory.createLineString([this.p0, this.p1]);
};

/**
 *  Returns <code>true</code> if <code>other</code> has the same values for
 *  its points.
 *
 * @param {Object} o a <code>LineSegment</code> with which to do the comparison.
 * @return {boolean} <code>true</code> if <code>other</code> is a <code>LineSegment</code>
 *      with the same values for the x and y ordinates.
 */
jsts.geom.LineSegment.prototype.equals = function (o) {
    if (!(o instanceof jsts.geom.LineSegment)) {
        return false;
    }
    return this.p0.equals(o.p0) && this.p1.equals(o.p1);
};

/**
 *  Compares this object with the specified object for order.
 *  Uses the standard lexicographic ordering for the points in the LineSegment.
 *
 *@param {Object} o  the <code>LineSegment</code> with which this <code>LineSegment</code>
 *      is being compared
 *@return {number} a negative integer, zero, or a positive integer as this <code>LineSegment</code>
 *      is less than, equal to, or greater than the specified <code>LineSegment</code>
 */
jsts.geom.LineSegment.prototype.compareTo = function (o) {
    var comp0 = this.p0.compareTo(o.p0);
    if (comp0 !== 0) return comp0;
    return this.p1.compareTo(o.p1);
};

/**
 *  Returns <code>true</code> if <code>other</code> is
 *  topologically equal to this LineSegment (e.g. irrespective
 *  of orientation).
 *
 * @param {jsts.geom.LineSegment} other  a <code>LineSegment</code> with which to do the comparison.
 * @return {boolean} <code>true</code> if <code>other</code> is a <code>LineSegment</code>
 *      with the same values for the x and y ordinates.
 */
jsts.geom.LineSegment.prototype.equalsTopo = function (other) {
    return this.p0.equals(other.p0) && this.p1.equals(other.p1)
        || this.p0.equals(other.p1) && this.p1.equals(other.p0);
};

jsts.geom.LineSegment.prototype.toString = function () {
    return "LINESTRING(" +
        this.p0.x + " " + this.p0.y
        + ", " +
        this.p1.x + " " + this.p1.y + ")";
};
