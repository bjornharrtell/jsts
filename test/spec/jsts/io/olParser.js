describe('jsts.io.olParser', function() {

	if (typeof ol === 'undefined') return;

	var pm = new jsts.geom.PrecisionModel(jsts.geom.PrecisionModel.FLOATING);
	var factory = new jsts.geom.GeometryFactory(pm);
	var parser = new jsts.io.olParser(factory); 

	it("check olParser.write(Point) from jsts to ol3", function() {
        var geom = new jsts.geom.Point(new jsts.geom.Coordinate(11, 41, 3.2));
        var olGeom = parser.write(geom);
        expect(olGeom).toBeDefined();
        expect(olGeom instanceof ol.geom.Point).toBe(true);
    });
	
    it("check olParser.write(MultiPoint) from jsts to ol3", function() {
        var p1  = new jsts.geom.Coordinate( 8, 43);
        var p2  = new jsts.geom.Coordinate(12, 48);
        var p3  = new jsts.geom.Coordinate(13, 48); 
        var geom = new jsts.geom.MultiPoint([p1, p2, p3]);
        var olGeom = parser.write(geom);
        expect(olGeom).toBeDefined();
        expect(olGeom instanceof ol.geom.MultiPoint).toBe(true);
        var olCoords = olGeom.getCoordinates();
        expect(olCoords.length).toBe(3);
        expect(olCoords[0][0]).toBe( 8); expect(olCoords[0][1]).toBe(43);
        expect(olCoords[1][0]).toBe(12); expect(olCoords[1][1]).toBe(48);
        expect(olCoords[2][0]).toBe(13); expect(olCoords[2][1]).toBe(48);
    });	

	it("check olParser.write(LineString) from jsts to ol3", function() {
        var p1  = new jsts.geom.Coordinate( 8, 43);
        var p2  = new jsts.geom.Coordinate(12, 48);
        var p3  = new jsts.geom.Coordinate(13, 48); 
        var geom = new jsts.geom.LineString([p1, p2, p3]);
        var olGeom = parser.write(geom);
        expect(olGeom).toBeDefined();
        expect(olGeom instanceof ol.geom.LineString).toBe(true);
    });

    it("check olParser.write(LinearRing) from jsts to ol3", function() {
        var p1  = new jsts.geom.Coordinate( 8, 43);
        var p2  = new jsts.geom.Coordinate(12, 48);
        var p3  = new jsts.geom.Coordinate(13, 48); 
        var p4  = new jsts.geom.Coordinate( 8, 43); 
        var geom = new jsts.geom.LinearRing([p1, p2, p3, p4]);
        var olGeom = parser.write(geom);
        expect(olGeom).toBeDefined();
        expect(olGeom instanceof ol.geom.LinearRing).toBe(true);
        var olCoords = olGeom.getCoordinates();
        expect(olCoords[0][0]).toBe(8); expect(olCoords[0][1]).toBe(43);
        expect(olCoords[1][0]).toBe(12); expect(olCoords[1][1]).toBe(48);
        expect(olCoords[2][0]).toBe(13); expect(olCoords[2][1]).toBe(48);
        expect(olCoords[3][0]).toBe(8); expect(olCoords[3][1]).toBe(43);
    })	

	it("check olParser.write(MultiLineString) from jsts to ol3", function() {
        var p1  = new jsts.geom.Coordinate( 8, 43);
		var p2  = new jsts.geom.Coordinate(12, 48);
		var p3  = new jsts.geom.Coordinate(13, 48); 
		var ls1 = new jsts.geom.LineString([p1, p2, p3]);
		var p4  = new jsts.geom.Coordinate( 9, 43);
		var p5  = new jsts.geom.Coordinate(13, 48);
		var p6  = new jsts.geom.Coordinate(14, 48); 
		var ls2 = new jsts.geom.LineString([p4, p5, p6]);
		geom = new jsts.geom.MultiLineString([ls1, ls2]);
        var olGeom = parser.write(geom);
        expect(olGeom).toBeDefined();
        expect(olGeom instanceof ol.geom.MultiLineString).toBe(true);
        var olCoords = olGeom.getCoordinates();
        expect(olCoords.length).toBe(2);
        //Linestring 0
        expect(olCoords[0][0][0]).toBe( 8); expect(olCoords[0][0][1]).toBe(43);
        expect(olCoords[0][1][0]).toBe(12); expect(olCoords[0][1][1]).toBe(48);
        expect(olCoords[0][2][0]).toBe(13); expect(olCoords[0][2][1]).toBe(48);
        //Linestring 1
        expect(olCoords[1][0][0]).toBe( 9); expect(olCoords[1][0][1]).toBe(43);
        expect(olCoords[1][1][0]).toBe(13); expect(olCoords[1][1][1]).toBe(48);
        expect(olCoords[1][2][0]).toBe(14); expect(olCoords[1][2][1]).toBe(48);
    });

	it("check olParser.write(Polygon) from jsts to ol3", function() {
        var sh = new jsts.geom.LinearRing([new jsts.geom.Coordinate(10,40), new jsts.geom.Coordinate(10,42), new jsts.geom.Coordinate(12,42), new jsts.geom.Coordinate(12,40), new jsts.geom.Coordinate(10,40)]);
        var hl = new jsts.geom.LinearRing([new jsts.geom.Coordinate(10.5,40.5), new jsts.geom.Coordinate(10.5,41.5), new jsts.geom.Coordinate(11.5,41.5), new jsts.geom.Coordinate(11.5,40.5), new jsts.geom.Coordinate(10.5,40.5)]);
        var geom = new jsts.geom.Polygon(sh,[hl]);
        var olGeom = parser.write(geom);
        expect(olGeom).toBeDefined();
        expect(olGeom instanceof ol.geom.Polygon).toBe(true);
        var olCoords = olGeom.getCoordinates();
        expect(olCoords.length).toBe(2);
        expect(olCoords[0].length).toBe(5);
        expect(olCoords[1].length).toBe(5);
        //Shell
        expect(olCoords[0][0][0]).toBe(10); expect(olCoords[0][0][1]).toBe(40);
        expect(olCoords[0][1][0]).toBe(10); expect(olCoords[0][1][1]).toBe(42);
        expect(olCoords[0][2][0]).toBe(12); expect(olCoords[0][2][1]).toBe(42);
        expect(olCoords[0][3][0]).toBe(12); expect(olCoords[0][3][1]).toBe(40);
        expect(olCoords[0][4][0]).toBe(10); expect(olCoords[0][4][1]).toBe(40);
        //Hole
        expect(olCoords[1][0][0]).toBe(10.5); expect(olCoords[1][0][1]).toBe(40.5);
        expect(olCoords[1][1][0]).toBe(10.5); expect(olCoords[1][1][1]).toBe(41.5);
        expect(olCoords[1][2][0]).toBe(11.5); expect(olCoords[1][2][1]).toBe(41.5);
        expect(olCoords[1][3][0]).toBe(11.5); expect(olCoords[1][3][1]).toBe(40.5);
        expect(olCoords[1][4][0]).toBe(10.5); expect(olCoords[1][4][1]).toBe(40.5);        
    });

    it("check olParser.write(MultiPolygon) from jsts to ol3", function() {
        var sh1 = new jsts.geom.LinearRing([new jsts.geom.Coordinate(10,40), new jsts.geom.Coordinate(10,42), new jsts.geom.Coordinate(12,42), new jsts.geom.Coordinate(12,40), new jsts.geom.Coordinate(10,40)]);
        var hl1 = new jsts.geom.LinearRing([new jsts.geom.Coordinate(10.5,40.5), new jsts.geom.Coordinate(10.5,41.5), new jsts.geom.Coordinate(11.5,41.5), new jsts.geom.Coordinate(11.5,40.5), new jsts.geom.Coordinate(10.5,40.5)]);
        var pg1 = new jsts.geom.Polygon(sh1,[hl1]);
        var sh2 = new jsts.geom.LinearRing([new jsts.geom.Coordinate(10,40), new jsts.geom.Coordinate(10,42), new jsts.geom.Coordinate(12,42), new jsts.geom.Coordinate(12,40), new jsts.geom.Coordinate(10,40)]);
        var pg2 = new jsts.geom.Polygon(sh2,[]);
        var geom = new jsts.geom.MultiPolygon([pg1, pg2]);
        var olGeom = parser.write(geom);
        expect(olGeom).toBeDefined();
        expect(olGeom instanceof ol.geom.MultiPolygon).toBe(true);
        expect(olGeom.getPolygon(0) instanceof ol.geom.Polygon).toBe(true);
        expect(olGeom.getPolygon(1) instanceof ol.geom.Polygon).toBe(true);
        var areaT = olGeom.getArea();
        var area1 = olGeom.getPolygon(0).getArea();
        var area2 = olGeom.getPolygon(1).getArea();
		expect(area1+area2).toBe(areaT);
        var olCoords = olGeom.getCoordinates();
        expect(olCoords.length).toBe(2);
        //Polygon 0
        expect(olCoords[0].length).toBe(2); //Polygon 0: 1 shell + 1 hole
        expect(olCoords[0][0].length).toBe(5); //shell
        expect(olCoords[0][1].length).toBe(5); //hole
        //Polygon 1
        expect(olCoords[1].length).toBe(1);    //Polygon 1: 1 shell 
        expect(olCoords[1][0].length).toBe(5); //shell
    });

    it("check olParser.write(GeometryCollection) from jsts to ol3", function() {
		var pt = new jsts.geom.Point(new jsts.geom.Coordinate(11,41));
		var ln = new jsts.geom.LineString([new jsts.geom.Coordinate(11,41),new jsts.geom.Coordinate(11,42)]);
		var shell = new jsts.geom.LinearRing([new jsts.geom.Coordinate(10,40), new jsts.geom.Coordinate(10,42), new jsts.geom.Coordinate(12,42), new jsts.geom.Coordinate(12,40), new jsts.geom.Coordinate(10,40)]);
		var holes = new jsts.geom.LinearRing([new jsts.geom.Coordinate(10.5,40.5), new jsts.geom.Coordinate(10.5,41.5), new jsts.geom.Coordinate(11.5,41.5), new jsts.geom.Coordinate(11.5,40.5), new jsts.geom.Coordinate(10.5,40.5)]);
		var pg = new jsts.geom.Polygon(shell,[holes]);
		var geom = new jsts.geom.GeometryCollection([pt,ln,pg]);
		var olGeom = parser.write(geom);
		expect(olGeom).toBeDefined();
        expect(olGeom instanceof ol.geom.GeometryCollection).toBe(true);
        var olGeoms = olGeom.getGeometries();
        expect(olGeoms.length).toBe(3);
        expect(olGeoms[0] instanceof ol.geom.Point).toBe(true);
        expect(olGeoms[1] instanceof ol.geom.LineString).toBe(true);
        expect(olGeoms[2] instanceof ol.geom.Polygon).toBe(true);
    });
	
});
