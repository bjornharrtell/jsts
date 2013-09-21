/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

describe('jsts.algorithm.InteriorPointLine', function() {
    var ipl;

    it('can be constructed', function() {
        var c1 = new jsts.geom.Coordinate(4, 4);
        var c2 = new jsts.geom.Coordinate(6, 6);
        var line = new jsts.geom.LineString([c1, c2]);

        ipl = new jsts.algorithm.InteriorPointLine(line);
        expect(ipl).toBeDefined();
    });

    it('first point of two-point line is the interior point', function() {
        var validCoord = new jsts.geom.Coordinate(4, 4);
        expect(ipl.getInteriorPoint().distance(validCoord)).toEqual(0);
    });

    it('the closest point to the LinePoint\'s centroid', function() {
        var c1 = new jsts.geom.Coordinate(2, 2);
        var c2 = new jsts.geom.Coordinate(8, 2);
        var c3 = new jsts.geom.Coordinate(8, 8);
        var c4 = new jsts.geom.Coordinate(5, 5);
        var c5 = new jsts.geom.Coordinate(2, 8);
        var line = new jsts.geom.LineString([c1, c2, c3, c4, c5]);

        ipl = new jsts.algorithm.InteriorPointLine(line);
        var validCoord = new jsts.geom.Coordinate(5, 5);
        expect(ipl.getInteriorPoint().distance(validCoord)).toEqual(0);
    });

    it('the closest point to the GeometryCollection\'s centroid', function() {
        var c1 = new jsts.geom.Coordinate(2, 2);
        var c2 = new jsts.geom.Coordinate(8, 2);
        var line1 = new jsts.geom.LineString([c1, c2]);
        var c3 = new jsts.geom.Coordinate(8, 2);
        var c4 = new jsts.geom.Coordinate(8, 5);
        var c5 = new jsts.geom.Coordinate(8, 8);
        var line2 = new jsts.geom.LineString([c3, c4, c5]);
        var gc = new jsts.geom.GeometryCollection([line1, line2]);

        ipl = new jsts.algorithm.InteriorPointLine(gc);
        var validCoord = new jsts.geom.Coordinate(8, 5);
        expect(ipl.getInteriorPoint().distance(validCoord)).toEqual(0);
    });
});
