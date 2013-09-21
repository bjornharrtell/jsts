/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

describe('jsts.algorithm.InteriorPointPoint', function() {
    var geometryFactory;
    var point;
    var ipp;

    it('can be constructed', function() {
        geometryFactory = new jsts.geom.GeometryFactory();
        var coordinate = new jsts.geom.Coordinate(4, 4);
        point = geometryFactory.createPoint(coordinate);

        ipp = new jsts.algorithm.InteriorPointPoint(point);
        expect(ipp).toBeDefined();
    });

    it('the interior point should be equal to the original point', function() {
        var coord = ipp.getInteriorPoint();
        expect(point.getCoordinate().distance(coord)).toEqual(0);
    });

    it('the closest point to the GeometryCollection\'s centroid', function() {
        var c2 = new jsts.geom.Coordinate(8, 8);
        var p2 = geometryFactory.createPoint(c2);
        var c3 = new jsts.geom.Coordinate(12, 12);
        var p3 = geometryFactory.createPoint(c3);
        var gc = new jsts.geom.GeometryCollection([point, p2, p3]);

        var validCoord = new jsts.geom.Coordinate(8, 8);
        var ipp2 = new jsts.algorithm.InteriorPointPoint(gc);
        var interiorCoord = ipp2.getInteriorPoint();
        expect(interiorCoord.distance(validCoord)).toEqual(0);
    });
});
