/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

describe('jsts.algorithm.Centroid', function() {
    var p1;
    var p2;
    var line1;
    var line2;

    it('can be constructed', function() {
        var geometryFactory = new jsts.geom.GeometryFactory();
        var coordinate = new jsts.geom.Coordinate(2, 2);
        p1 = geometryFactory.createPoint(coordinate);
        var centroid = new jsts.algorithm.Centroid(p1);
    });
    
    it('centroid of point is the point itself', function() {
        var coordinate = new jsts.geom.Coordinate(8, 8);
        p2 = new jsts.geom.Point(coordinate);
        var centroid = jsts.algorithm.Centroid.getCentroid(p2);
        expect(coordinate.distance(centroid)).toEqual(0);
    });
    
    it('centroid of two points is placed in the middle', function() {
        var gc = new jsts.geom.GeometryCollection([p1, p2]);
        
        var expected = new jsts.geom.Coordinate(5, 5);
        var centroid = jsts.algorithm.Centroid.getCentroid(gc);
        expect(expected.distance(centroid)).toEqual(0);
    });

    it('centroid of line is the line\'s middle', function() {
        var c1 = new jsts.geom.Coordinate(4, 4);
        var c2 = new jsts.geom.Coordinate(10, 4);
        line1 = new jsts.geom.LineString([c1, c2]);
        
        var expected = new jsts.geom.Coordinate(7, 4);
        var centroid = jsts.algorithm.Centroid.getCentroid(line1);
        expect(expected.distance(centroid)).toEqual(0);
    });
    
    it('centroid of two lines', function() {
        var c1 = new jsts.geom.Coordinate(4, 10);
        var c2 = new jsts.geom.Coordinate(10, 10);
        line2 = new jsts.geom.LineString([c1, c2]);
        var gc = new jsts.geom.GeometryCollection([line1, line2]);
        
        var expected = new jsts.geom.Coordinate(7, 7);
        var centroid = jsts.algorithm.Centroid.getCentroid(gc);
        expect(expected.distance(centroid)).toEqual(0);
    });
    
    it('centroid of square', function() {
        var shell = new jsts.geom.LinearRing([
            new jsts.geom.Coordinate(2, 2),
            new jsts.geom.Coordinate(6, 2),
            new jsts.geom.Coordinate(6, 6),
            new jsts.geom.Coordinate(2, 6)
        ]);
        var polygon = new jsts.geom.Polygon(shell);
        
        var centroid = jsts.algorithm.Centroid.getCentroid(polygon);
        var expected = new jsts.geom.Coordinate(4, 4);
        expect(expected.distance(centroid)).toEqual(0);
    });
    
    it('hole doesn\'t change square\'s centroid', function() {
        var shell = new jsts.geom.LinearRing([
            new jsts.geom.Coordinate(2, 2),
            new jsts.geom.Coordinate(6, 2),
            new jsts.geom.Coordinate(6, 6),
            new jsts.geom.Coordinate(2, 6)
        ]);
        var hole = new jsts.geom.LinearRing([
            new jsts.geom.Coordinate(3, 3),
            new jsts.geom.Coordinate(5, 3),
            new jsts.geom.Coordinate(5, 5),
            new jsts.geom.Coordinate(3, 5)
        ]);
        var polygon = new jsts.geom.Polygon(shell, hole);
        
        var centroid = jsts.algorithm.Centroid.getCentroid(polygon);
        var expected = new jsts.geom.Coordinate(4, 4);
        expect(expected.distance(centroid)).toEqual(0);
    });
});
