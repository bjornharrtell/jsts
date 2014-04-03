/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

describe('jsts.geom.LineSegment', function () {

    it('constructor without arguments', function () {
        var ls0 = new jsts.geom.LineSegment();
        expect(ls0).toBeDefined();
        expect(ls0.p0.x).toEqual(0);
        expect(ls0.p0.y).toEqual(0);
        expect(ls0.p1.x).toEqual(0);
        expect(ls0.p1.y).toEqual(0);
    });

    it('four argument constructor', function () {
        var ls4 = new jsts.geom.LineSegment(1, 2, 3, 4);
        expect(ls4).toBeDefined();
        expect(ls4.p0.x).toEqual(1);
        expect(ls4.p0.y).toEqual(2);
        expect(ls4.p1.x).toEqual(3);
        expect(ls4.p1.y).toEqual(4);
    });

    it('two argument constructor', function () {
        var c1 = new jsts.geom.Coordinate(5, 6);
        var c2 = new jsts.geom.Coordinate(8, 9);
        var ls2 = new jsts.geom.LineSegment(c1, c2);
        expect(ls2).toBeDefined();
        expect(ls2.p0.x).toEqual(5);
        expect(ls2.p0.y).toEqual(6);
        expect(ls2.p1.x).toEqual(8);
        expect(ls2.p1.y).toEqual(9);
    });

    it('single argument constructor', function () {
        var ls4 = new jsts.geom.LineSegment(3, 5, 7, 9);
        var ls1 = new jsts.geom.LineSegment(ls4);
        expect(ls1.p0.x).toEqual(3);
        expect(ls1.p0.y).toEqual(5);
        expect(ls1.p1.x).toEqual(7);
        expect(ls1.p1.y).toEqual(9);
    });

    it('get coordinates', function () {
        var ls = new jsts.geom.LineSegment(1, 3, 5, 7);
        var c0 = ls.getCoordinate(0);
        expect(c0.x).toEqual(1);
        expect(c0.y).toEqual(3);
        var c1 = ls.getCoordinate(1);
        expect(c1.x).toEqual(5);
        expect(c1.y).toEqual(7);
    });

    it('length', function () {
        var ls = new jsts.geom.LineSegment(1, 1, 4, 5);
        expect(ls.getLength()).toEqual(5);
    });

    it('horizontal', function () {
        var ls = new jsts.geom.LineSegment(1, 1, 1, 2);
        expect(ls.isHorizontal()).not.toBe(true);
        ls = new jsts.geom.LineSegment(1, 1, 5, 1);
        expect(ls.isHorizontal()).toBe(true);
    });

    it('vertical', function () {
        var ls = new jsts.geom.LineSegment(3, 3, 5, 5);
        expect(ls.isVertical()).not.toBe(true);
        ls = new jsts.geom.LineSegment(5, 5, 5, 10);
        expect(ls.isVertical()).toBe(true);
    });

    it('orientation index left segment', function () {
        var ls = new jsts.geom.LineSegment(1, 1, 5, 3);
        var ls2 = new jsts.geom.LineSegment(0, 1, -5, 7);
        var oi = ls.orientationIndex(ls2);
        expect(oi).toEqual(1);
    });

    it('orientation index right segment', function () {
        var ls = new jsts.geom.LineSegment(1, 1, 5, 3);
        var ls2 = new jsts.geom.LineSegment(0, -2, 2, -2);
        var oi = ls.orientationIndex(ls2);
        expect(oi).toEqual(-1);
    });

    it('orientation index indeterminate segment', function () {
        var ls = new jsts.geom.LineSegment(1, 1, 5, 3);
        var ls2 = new jsts.geom.LineSegment(-1, 10, -1, -10);
        var oi = ls.orientationIndex(ls2);
        expect(oi).toEqual(0);
    });

    it('orientation index left coordinate', function () {
        var ls = new jsts.geom.LineSegment(1, 1, 5, 3);
        var c = new jsts.geom.Coordinate(0, 10);
        var oi = ls.orientationIndex(c);
        expect(oi).toEqual(1);
    });

    it('orientation index right coordinate', function () {
        var ls = new jsts.geom.LineSegment(1, 1, 5, 3);
        var c = new jsts.geom.Coordinate(10, -2);
        var oi = ls.orientationIndex(c);
        expect(oi).toEqual(-1);
    });

    it('orientation index indeterminate coordinate', function () {
        var ls = new jsts.geom.LineSegment(1, 1, 5, 3);
        var c = new jsts.geom.Coordinate(-3, -1);
        var oi = ls.orientationIndex(c);
        expect(oi).toEqual(0);
    });

    it('reverse', function () {
        var ls = new jsts.geom.LineSegment(1, 3, 5, 7);
        ls.reverse();
        expect(ls.p0.x).toEqual(5);
        expect(ls.p0.y).toEqual(7);
        expect(ls.p1.x).toEqual(1);
        expect(ls.p1.y).toEqual(3);

    });

    it('normalize', function () {
        var ls = new jsts.geom.LineSegment(1, 1, -1, -1);
        ls.normalize();
        expect(ls.p0.x).toEqual(-1);
        expect(ls.p0.y).toEqual(-1);
        expect(ls.p1.x).toEqual(1);
        expect(ls.p1.y).toEqual(1);
        ls.normalize();
        expect(ls.p0.x).toEqual(-1);
        expect(ls.p0.y).toEqual(-1);
        expect(ls.p1.x).toEqual(1);
        expect(ls.p1.y).toEqual(1);
    });

    it('angle', function () {
        var ls = new jsts.geom.LineSegment(0, 0, 4, 2);
        var angle = ls.angle();
        expect(Math.tan(angle)).toEqual(2 / 4);
    });

    it('mid point', function () {
        var ls = new jsts.geom.LineSegment(0, 0, 4, 2);
        var c = ls.midPoint();
        expect(c.x).toEqual(2);
        expect(c.y).toEqual(1);
    });

    it('point along', function () {
        var ls = new jsts.geom.LineSegment(0, 0, 4, 2);
        var coord = ls.pointAlong(0.5);
        expect(coord.x).toEqual(2);
        expect(coord.y).toEqual(1);
        coord = ls.pointAlong(1.5);
        expect(coord.x).toEqual(6);
        expect(coord.y).toEqual(3);
    });

    it('point along offset', function () {
        var ls = new jsts.geom.LineSegment(0, 4, 4, 4);
        var coord = ls.pointAlongOffset(0.5, 2);
        expect(coord.x).toEqual(2);
        expect(coord.y).toEqual(6);
        coord = ls.pointAlongOffset(-1, -1);
        expect(coord.x).toEqual(-4);
        expect(coord.y).toEqual(3);
    });

    it('projection factor', function () {
        var ls = new jsts.geom.LineSegment(0, 0, 6, 6);
        var coord = new jsts.geom.Coordinate(0, 3);
        var pf = ls.projectionFactor(coord);
        expect(pf).toEqual(0.25);
    });
    
    it('segment fraction', function () {
        var ls = new jsts.geom.LineSegment(0, 0, 6, 6);
        var coord = new jsts.geom.Coordinate(0, 6);
        var pf = ls.segmentFraction(coord);
        expect(pf).toEqual(0.5);
        coord = new jsts.geom.Coordinate(0, 60);
        var pf = ls.segmentFraction(coord);
        expect(pf).toEqual(1);
    });

    it('project point', function () {
        var ls = new jsts.geom.LineSegment(0, 0, 6, 6);
        var coord = new jsts.geom.Coordinate(0, 3);
        var proj = ls.project(coord);
        expect(proj.x).toEqual(1.5);
        expect(proj.y).toEqual(1.5);
    });

    it('project line segment', function () {
        var ls = new jsts.geom.LineSegment(0, 0, 6, 6);
        var ls2 = new jsts.geom.LineSegment(1, 1, 0, 6);
        var proj = ls.project(ls2);
        expect(proj.p0.x).toEqual(1);
        expect(proj.p0.y).toEqual(1);
        expect(proj.p1.x).toEqual(3);
        expect(proj.p1.y).toEqual(3);
    });

    it('closest point', function () {
        var ls = new jsts.geom.LineSegment(0, 0, 4, 4);
        var coord = new jsts.geom.Coordinate(0, 2);
        var closest = ls.closestPoint(coord);
        expect(closest.x).toEqual(1);
        expect(closest.y).toEqual(1);
    });

    it('closest points', function () {
        var ls = new jsts.geom.LineSegment(0, 0, 8, 0);
        var ls2 = new jsts.geom.LineSegment(1, 1, 5, 10);
        var closest = ls.closestPoints(ls2);
        expect(closest[0].x).toEqual(1);
        expect(closest[0].y).toEqual(0);
        expect(closest[1].x).toEqual(1);
        expect(closest[1].y).toEqual(1);
    });

    it('closest points intersection', function () {
        var ls = new jsts.geom.LineSegment(0, 0, 8, 8);
        var ls2 = new jsts.geom.LineSegment(0, 4, 10, 4);
        var closest = ls.closestPoints(ls2);
        expect(closest[0].x).toEqual(4);
        expect(closest[0].y).toEqual(4);
        expect(closest[1].x).toEqual(4);
        expect(closest[1].y).toEqual(4);
    });

    it('no intersection', function () {
        var ls = new jsts.geom.LineSegment(1, 1, 8, 8);
        var ls2 = new jsts.geom.LineSegment(-1, -1, -8, -8);
        var intersection = ls.intersection(ls2);
        expect(intersection).toBeNull();
    });

    it('one intersection', function () {
        var ls = new jsts.geom.LineSegment(1, 1, 8, 8);
        var ls2 = new jsts.geom.LineSegment(4, 0, 4, 8);
        var intersection = ls.intersection(ls2);
        expect(intersection.x).toBe(4);
        expect(intersection.y).toBe(4);
    });

    it('set coordinates segment', function () {
        var ls = new jsts.geom.LineSegment(0, 0, 1, 1);
        var ls2 = new jsts.geom.LineSegment(1, 2, 3, 4);
        ls.setCoordinates(ls2);
        expect(ls.p0.x).toEqual(1);
        expect(ls.p0.y).toEqual(2);
        expect(ls.p1.x).toEqual(3);
        expect(ls.p1.y).toEqual(4);
    });

    it('set coordinates points', function () {
        var ls = new jsts.geom.LineSegment(0, 0, 1, 1);
        var c1 = new jsts.geom.Coordinate(1, 2);
        var c2 = new jsts.geom.Coordinate(3, 4);
        ls.setCoordinates(c1, c2);
        expect(ls.p0.x).toEqual(1);
        expect(ls.p0.y).toEqual(2);
        expect(ls.p1.x).toEqual(3);
        expect(ls.p1.y).toEqual(4);
    });

    it('distance point', function () {
        var ls = new jsts.geom.LineSegment(0, 0, 1, 1);
        var c = new jsts.geom.Coordinate(2, 1);
        var dist = ls.distance(c);
        expect(dist).toEqual(1);
    });

    it('distance line segment', function () {
        var ls = new jsts.geom.LineSegment(0, 5, 5, 5);
        var ls2 = new jsts.geom.LineSegment(0, 0, 3, 2);
        expect(ls.distance(ls2)).toEqual(3);
    });

    it('distance perpendicular', function () {
        var ls = new jsts.geom.LineSegment(0, 0, 1, 1);
        var c = new jsts.geom.Coordinate(2, 1);
        var dist = ls.distancePerpendicular(c);
        expect(dist).toEqual(Math.sqrt(2) / 2);
    });

    it('line intersection', function () {
        var ls = new jsts.geom.LineSegment(0, 0, 1, 1);
        var ls2 = new jsts.geom.LineSegment(10, 0, 9, 1);
        var intersection = ls.lineIntersection(ls2);
        expect(intersection.x).toEqual(5);
        expect(intersection.y).toEqual(5);
    });

    it('line no intersection', function () {
        var ls = new jsts.geom.LineSegment(0, 0, 1, 1);
        var ls2 = new jsts.geom.LineSegment(1, 0, 2, 1);
        var intersection = ls.lineIntersection(ls2);
        expect(intersection).toBeNull();
    });

    it('to geometry', function () {
        var ls = new jsts.geom.LineSegment(0, 1, 2, 3);
        var lineString = ls.toGeometry(new jsts.geom.GeometryFactory());
        expect(lineString instanceof jsts.geom.LineString).toBe(true);
        expect(lineString.points.length).toEqual(2);
        expect(lineString.points[0].x).toEqual(0);
        expect(lineString.points[0].y).toEqual(1);
        expect(lineString.points[1].x).toEqual(2);
        expect(lineString.points[1].y).toEqual(3);
    });

    it('equals', function () {
        var ls = new jsts.geom.LineSegment(0, 1, 2, 3);
        var ls2 = new jsts.geom.LineSegment(0, 1, 2, 3);
        expect(ls.equals(ls2)).toBe(true);
        ls2 = new jsts.geom.LineSegment(0, 1, 3, 3);
        expect(ls.equals(ls2)).toBe(false);
    });

    it('greater in comparison', function () {
        var ls = new jsts.geom.LineSegment(0, 1, 2, 3);
        var ls2 = new jsts.geom.LineSegment(5, 5, 7, 5);
        expect(ls.compareTo(ls2)).toBe(-1);
    });

    it('lesser in comparison', function () {
        var ls = new jsts.geom.LineSegment(0, 1, 2, 3);
        var ls2 = new jsts.geom.LineSegment(5, 5, 7, 5);
        expect(ls2.compareTo(ls)).toBe(1);
    });

    it('equal', function () {
        var ls = new jsts.geom.LineSegment(0, 1, 2, 3);
        expect(ls.equalsTopo(ls)).toBe(true);
    });

    it('not equal', function () {
        var ls = new jsts.geom.LineSegment(0, 1, 2, 3);
        var ls2 = new jsts.geom.LineSegment(5, 5, 7, 5);
        expect(ls.equalsTopo(ls2)).toBe(false);
    });

    it('toString', function () {
        var ls = new jsts.geom.LineSegment(0, 1, 2, 3);
        var expected = "LINESTRING(0 1, 2 3)";
        expect(ls.toString()).toBe(expected);
    });
});
