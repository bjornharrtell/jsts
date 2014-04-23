/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

describe('jsts.algorithm.MinimumDiameter', function() {
    
    var wktReader = new jsts.io.WKTReader();
    
    function doMinimumDiameterTest(convex, wkt, c0, c1) {
        var minimumDiameter = new jsts.algorithm.MinimumDiameter(wktReader.read(wkt), convex).getDiameter().getCoordinates();
        expect(c0.x).toBeCloseTo(minimumDiameter[0].x, 10);
        expect(c0.y).toBeCloseTo(minimumDiameter[0].y, 10);
        expect(c1.x).toBeCloseTo(minimumDiameter[1].x, 10);
        expect(c1.y).toBeCloseTo(minimumDiameter[1].y, 10);
    }
    
    it('testMinimumDiameter1', function() {
        doMinimumDiameterTest(true, "POINT (0 240)", new jsts.geom.Coordinate(0, 240), new jsts.geom.Coordinate(0, 240));
    });
    
    it('testMinimumDiameter2', function() {
        doMinimumDiameterTest(true, "LINESTRING (0 240, 220 240)", new jsts.geom.Coordinate(0, 240), new jsts.geom.Coordinate(0, 240));
    });
    
    it('testMinimumDiameter3', function() {
        doMinimumDiameterTest(true, "POLYGON ((0 240, 220 240, 220 0, 0 0, 0 240))", new jsts.geom.Coordinate(220, 240), new jsts.geom.Coordinate(0, 240));
    });
    
    it('testMinimumDiameter4', function() {
        doMinimumDiameterTest(true, "POLYGON ((0 240, 220 240, 220 0, 0 0, 0 240))", new jsts.geom.Coordinate(220, 240), new jsts.geom.Coordinate(0, 240));
    });
    
    it('testMinimumDiameter5', function() {
        doMinimumDiameterTest(true, "POLYGON ((0 240, 160 140, 220 0, 0 0, 0 240))", new jsts.geom.Coordinate(185.86206896551724, 79.65517241379311), new jsts.geom.Coordinate(0, 0));
    });
    
    it('testMinimumDiameter6', function() {
        doMinimumDiameterTest(false, "LINESTRING ( 39 119, 162 197, 135 70, 95 35, 33 66, 111 82, 97 131, 48 160, -4 182, 57 195, 94 202, 90 174, 75 134, 47 114, 0 100, 59 81, 123 60, 136 43, 163 75, 145 114, 93 136, 92 159, 105 175 )", new jsts.geom.Coordinate(64.46262341325811, 196.41184767277855), new jsts.geom.Coordinate(95, 35));
    });
});
