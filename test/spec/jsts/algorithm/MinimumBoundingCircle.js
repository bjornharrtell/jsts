/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

describe('jsts.algorithm.MinimumBoundingCircle', function () {

    var precisionModel = new jsts.geom.PrecisionModel(1);
    var geometryFactory = new jsts.geom.GeometryFactory(precisionModel, 0);
    var wktReader = new jsts.io.WKTReader();

    function doMinimumBoundingCircleTest(wkt, expectedWKT, expectedCentre, expectedRadius) {
        expectedCentre = expectedCentre === undefined ? null : expectedCentre;
        expectedRadius = expectedRadius === undefined ? -1 : expectedRadius;

        var mbc = new jsts.algorithm.MinimumBoundingCircle(wktReader.read(wkt));
        var exPts = mbc.getExtremalPoints();
        var actual = geometryFactory.createMultiPoint(exPts);
        var actualRadius = mbc.getRadius();
        var actualCentre = mbc.getCentre();

        var expected = wktReader.read(expectedWKT);
        var isEqual = actual.equals(expected);
        // need this hack because apparently equals does not work for MULTIPOINT EMPTY
        if (actual.isEmpty() && expected.isEmpty())
            isEqual = true;
        expect(isEqual).toBe(true);
  	
        var TOLERANCE = 1.0e-5;

        if (expectedCentre != null) {
            expect(expectedCentre.distance(actualCentre) < TOLERANCE).toBe(true);
        }
        if (expectedRadius >= 0) {
            expect(Math.abs(expectedRadius - actualRadius) < TOLERANCE).toBe(true);
        }
    }

    it('testEmptyPoint', function () {
        doMinimumBoundingCircleTest("POINT EMPTY", "MULTIPOINT EMPTY");
    });

    it('testPoint', function () {
        doMinimumBoundingCircleTest("POINT (10 10)", "MULTIPOINT ((10 10))", new jsts.geom.Coordinate(10, 10), 0);
    });

    it('testPoints2', function () {
        doMinimumBoundingCircleTest("MULTIPOINT ((10 10), (20 20))", "MULTIPOINT ((10 10), (20 20))", new jsts.geom.Coordinate(15, 15), 7.0710678118654755);
    });

    it('testPointsInLine', function () {
        doMinimumBoundingCircleTest("MULTIPOINT ((10 10), (20 20), (30 30))", "MULTIPOINT ((10 10), (30 30))", new jsts.geom.Coordinate(20, 20), 14.142135623730951);
    });

    it('testPoints3', function () {
        doMinimumBoundingCircleTest("MULTIPOINT ((10 10), (20 20), (10 20))", "MULTIPOINT ((10 10), (20 20), (10 20))", new jsts.geom.Coordinate(15, 15), 7.0710678118654755);
    });

    it('testObtuseTriangle', function () {
        doMinimumBoundingCircleTest("POLYGON ((100 100, 200 100, 150 90, 100 100))", "MULTIPOINT ((200 100), (100 100))", new jsts.geom.Coordinate(150, 100), 50);
    });

    it('testTriangleWithMiddlePoint', function () {
        doMinimumBoundingCircleTest("MULTIPOINT ((10 10), (20 20), (10 20), (15 19))", "MULTIPOINT ((10 10), (20 20), (10 20))", new jsts.geom.Coordinate(15, 15), 7.0710678118654755);
    });
});
