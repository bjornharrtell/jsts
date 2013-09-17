/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/**
 * @requires jsts/geom/Coordinate.js
 * @requires jsts/geom/Point.js
 * @requires jsts/geom/LineString.js
 * @requires jsts/geom/Polygon.js
 * @requires jsts/geom/GeometryCollection.js
 * @requires jsts/algorithm/CGAlgorithms.js
 */

/**
 * Computes the centroid of a {@link Geometry} of any dimension.
 * If the geometry is nominally of higher dimension, 
 * but has lower <i>effective</i> dimension 
 * (i.e. contains only components
 * having zero length or area), 
 * the centroid will be computed as for the equivalent lower-dimension geometry.
 * If the input geometry is empty, a
 * <code>null</code> Coordinate is returned.
 * 
 * <h2>Algorithm</h2>
 * <ul>
 * <li><b>Dimension 2</b> - the centroid is computed 
 * as the weighted sum of the centroids
 * of a decomposition of the area into (possibly overlapping) triangles.
 * Holes and multipolygons are handled correctly.
 * See <code>http://www.faqs.org/faqs/graphics/algorithms-faq/</code>
 * for further details of the basic approach.
 * 
 * <li><b>Dimension 1</b> - Computes the average of the midpoints
 * of all line segments weighted by the segment length.
 * Zero-length lines are treated as points.
 * 
 * <li><b>Dimension 0</b> - Compute the average coordinate for all points.
 * Repeated points are all included in the average.
 * </ul>
 * 
 * @version 1.7
 *
 * @constructor
 */
jsts.algorithm.Centroid = function (geometry) {

    /**
     * The point all triangles are based at
     * @type {jsts.geom.Coordinate}
     * @private
     */
    this.areaBasePt = null;

    /**
     * Temporary variable to hold centroid of triangle
     * @type {jsts.geom.Coordinate}
     * @private
     */
    this.triangleCent3 = new jsts.geom.Coordinate();

    /**
     * Partial area sum
     * @type {number}
     * @private
     */
    this.areasum2 = 0;

    /**
     * Partial centroid sum
     * @type {jsts.geom.Coordinate}
     * @private
     */
    this.cg3 = new jsts.geom.Coordinate();

    // data for linear centroid computation, if needed
    this.lineCentSum = new jsts.geom.Coordinate();
    this.totalLength = 0;

    this.ptCount = 0;
    this.ptCentSum = new jsts.geom.Coordinate();


    this.add(geometry);
};

/**
 * Computes the centroid point of a geometry.
 * @param {jsts.geom.Geometry} geometry the geometry to use
 * @return {jsts.geom.Coordinate} the centroid point, or null if the geometry is empty
 */
jsts.algorithm.Centroid.getCentroid = function (geometry) {
    var cent = new jsts.algorithm.Centroid(geometry);
    return cent.getCentroid();
};

/**
 * Computes three times the centroid of the triangle p1-p2-p3.
 * The factor of 3 is left in to permit division to be avoided until later.
 * @param {jsts.geom.Coordinate} p0
 * @param {jsts.geom.Coordinate} p1
 * @param {jsts.geom.Coordinate} p2
 * @param {jsts.geom.Coordinate} c
 * @private
 */
jsts.algorithm.Centroid.centroid3 = function (p1, p2, p3, c) {
    c.x = p1.x + p2.x + p3.x;
    c.y = p1.y + p2.y + p3.y;
};

/**
 * Returns twice the signed area of the triangle p1-p2-p3.
 * The area is positive if the triangle is oriented CCW, and negative if CW.
 * @param {jsts.geom.Coordinate} p1
 * @param {jsts.geom.Coordinate} p2
 * @param {jsts.geom.Coordinate} p3
 * @private
 */
jsts.algorithm.Centroid.area2 = function (p1, p2, p3) {
    return (p2.x - p1.x) * (p3.y - p1.y) - (p3.x - p1.x) * (p2.y - p1.y);
};

/**
 * Adds a Geometry to the centroid total.
 * @param {jsts.geom.Geometry} geom the geometry to add
 * @private
 */
jsts.algorithm.Centroid.prototype.add = function (geom) {
    if (geom.isEmpty()) {
        return;
    }
    if (geom instanceof jsts.geom.Point) {
        this.addPoint(geom.getCoordinate());
    } else if (geom instanceof jsts.geom.LineString) {
        this.addLineSegments(geom.getCoordinates());
    } else if (geom instanceof jsts.geom.Polygon) {
        this.addPolygon(geom);
    } else if (geom instanceof jsts.geom.GeometryCollection) {
        for (var i = 0; i < geom.getNumGeometries(); i++) {
            this.add(geom.getGeometryN(i));
        }
    }
};

/**
 * Gets the computed centroid.
 * @return {jsts.geom.Coordinate} the computed centroid, or null if the input is empty
 */
jsts.algorithm.Centroid.prototype.getCentroid = function () {
    var cent = new jsts.geom.Coordinate();
    if (Math.abs(this.areasum2) > 0) {
        cent.x = this.cg3.x / 3 / this.areasum2;
        cent.y = this.cg3.y / 3 / this.areasum2;
    } else if (this.totalLength > 0) {
        // if polygon was degenerate, compute linear centroid instead
        cent.x = this.lineCentSum.x / this.totalLength;
        cent.y = this.lineCentSum.y / this.totalLength;
    } else if (this.ptCount > 0) {
        cent.x = this.ptCentSum.x / this.ptCount;
        cent.y = this.ptCentSum.y / this.ptCount;
    } else {
        return null;
    }
    return cent;
};

/**
 * @param {jsts.geom.Coordinate} basePt
 * @private
 */
jsts.algorithm.Centroid.prototype.setBasePoint = function (basePt) {
    if (this.areaBasePt === null) {
        this.areaBasePt = basePt;
    }
};

/**
 * @param {jsts.geom.Polygon} poly
 * @private
 */
jsts.algorithm.Centroid.prototype.addPolygon = function (poly) {
    this.addShell(poly.getExteriorRing().getCoordinates());
    for (var i = 0; i < poly.getNumInteriorRing(); i++) {
        this.addHole(poly.getInteriorRingN(i).getCoordinates());
    }
};

/**
 * @param {jsts.geom.Coordinate[]} pts
 * @private
 */
jsts.algorithm.Centroid.prototype.addShell = function (pts) {
    if (pts.length > 0) {
        this.setBasePoint(pts[0]);
    }
    var isPositiveArea = !jsts.algorithm.CGAlgorithms.isCCW(pts);
    for (var i = 0; i < pts.length - 1; i++) {
        this.addTriangle(this.areaBasePt, pts[i], pts[i + 1], isPositiveArea);
    }
    this.addLineSegments(pts);
};

/**
 * @param {jsts.geom.Coordinate[]} pts
 * @private
 */
jsts.algorithm.Centroid.prototype.addHole = function (pts) {
    var isPositiveArea = jsts.algorithm.CGAlgorithms.isCCW(pts);
    for (var i = 0; i < pts.length - 1; i++) {
        this.addTriangle(this.areaBasePt, pts[i], pts[i + 1], isPositiveArea);
    }
    this.addLineSegments(pts);
};

/**
 * @param {jsts.geom.Coordinate} p0
 * @param {jsts.geom.Coordinate} p1
 * @param {jsts.geom.Coordinate} p2
 * @param {boolean} isPositiveArea
 * @private
 */
jsts.algorithm.Centroid.prototype.addTriangle = function (p0, p1, p2, isPositiveArea) {
    var sign = (isPositiveArea) ? 1 : -1;
    jsts.algorithm.Centroid.centroid3(p0, p1, p2, this.triangleCent3);
    var area2 = jsts.algorithm.Centroid.area2(p0, p1, p2);
    this.cg3.x += sign * area2 * this.triangleCent3.x;
    this.cg3.y += sign * area2 * this.triangleCent3.y;
    this.areasum2 += sign * area2;
};

/**
 * Adds the line segments defined by an array of coordinates
 * to the linear centroid accumulators.
 * @param {jsts.geom.Coordinate[]} pts
 * @private
 */
jsts.algorithm.Centroid.prototype.addLineSegments = function (pts) {
    var lineLen = 0;
    for (var i = 0; i < pts.length - 1; i++) {
        var segmentLen = pts[i].distance(pts[i + 1]);
        if (segmentLen === 0) {
            continue;
        }

        lineLen += segmentLen;

        var midx = (pts[i].x + pts[i + 1].x) / 2;
        this.lineCentSum.x += segmentLen * midx;
        var midy = (pts[i].y + pts[i + 1].y) / 2;
        this.lineCentSum.y += segmentLen * midy;
    }
    this.totalLength += lineLen;
    if (lineLen === 0 && pts.length > 0) {
        this.addPoint(pts[0]);
    }
};

/**
 * Adds a point to the point centroid accumulator.
 * @param {jsts.geom.Coordinate} pt
 * @private
 */
jsts.algorithm.Centroid.prototype.addPoint = function (pt) {
    this.ptCount += 1;
    this.ptCentSum.x += pt.x;
    this.ptCentSum.y += pt.y;
};
