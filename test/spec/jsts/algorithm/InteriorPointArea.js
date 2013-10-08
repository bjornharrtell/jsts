/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

describe('jsts.algorithm.InteriorPointArea', function() {
    var ipa;

    it('can be constructed', function() {
        var shell = new jsts.geom.LinearRing([
            new jsts.geom.Coordinate(2, 2),
            new jsts.geom.Coordinate(6, 2),
            new jsts.geom.Coordinate(6, 6),
            new jsts.geom.Coordinate(2, 6),
            new jsts.geom.Coordinate(2, 2)
        ]);
        var polygon = new jsts.geom.Polygon(shell);

        ipa = new jsts.algorithm.InteriorPointArea(polygon);
        expect(ipa).toBeDefined();
    });

    it('interior point of simple square', function() {
        var validCoord = new jsts.geom.Coordinate(4, 4);
        expect(ipa.getInteriorPoint().distance(validCoord)).toEqual(0);
    });

    it('interior point of square with hole', function() {
        var shell = new jsts.geom.LinearRing([
            new jsts.geom.Coordinate(2, 2),
            new jsts.geom.Coordinate(8, 2),
            new jsts.geom.Coordinate(8, 6),
            new jsts.geom.Coordinate(2, 6),
            new jsts.geom.Coordinate(2, 2)
        ]);
        var hole = new jsts.geom.LinearRing([
            new jsts.geom.Coordinate(3, 3),
            new jsts.geom.Coordinate(3, 5),
            new jsts.geom.Coordinate(6, 5),
            new jsts.geom.Coordinate(6, 3),
            new jsts.geom.Coordinate(3, 3)
        ]);
        var polygon = new jsts.geom.Polygon(shell, [hole]);

        ipa = new jsts.algorithm.InteriorPointArea(polygon);
        var validCoord = new jsts.geom.Coordinate(7, 4);
        expect(ipa.getInteriorPoint().distance(validCoord)).toEqual(0);
    });

    it('interior point of the widest horizontal intersection in geometry collection', function() {
        var shell1 = new jsts.geom.LinearRing([
            new jsts.geom.Coordinate(2, 2),
            new jsts.geom.Coordinate(4, 2),
            new jsts.geom.Coordinate(4, 4),
            new jsts.geom.Coordinate(2, 4),
            new jsts.geom.Coordinate(2, 2)
        ]);
        var polygon1 = new jsts.geom.Polygon(shell1);
        var shell2 = new jsts.geom.LinearRing([
            new jsts.geom.Coordinate(5, 5),
            new jsts.geom.Coordinate(11, 5),
            new jsts.geom.Coordinate(11, 7),
            new jsts.geom.Coordinate(5, 7),
            new jsts.geom.Coordinate(5, 5)
        ]);
        var polygon2 = new jsts.geom.Polygon(shell2);
        var shell3 = new jsts.geom.LinearRing([
            new jsts.geom.Coordinate(12, 12),
            new jsts.geom.Coordinate(15, 12),
            new jsts.geom.Coordinate(15, 25),
            new jsts.geom.Coordinate(12, 25),
            new jsts.geom.Coordinate(12, 12)
        ]);
        var polygon3 = new jsts.geom.Polygon(shell3);
        var gc = new jsts.geom.GeometryCollection([polygon1, polygon2, polygon3]);

        ipa = new jsts.algorithm.InteriorPointArea(gc);
        var validCoord = new jsts.geom.Coordinate(8, 6);
        expect(ipa.getInteriorPoint().distance(validCoord)).toEqual(0);
    });
});
