/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

describe('jsts.simplify.DouglasPeuckerSimplifier', function() {

	beforeEach(function() {
		
	});

	it('can be constructed', function() {
		var geometryFactory = new jsts.geom.GeometryFactory();
		var c1 = new jsts.geom.Coordinate(0,0);
		var c2 = new jsts.geom.Coordinate(3,1);
		var c3 = new jsts.geom.Coordinate(6,0);

		var lineString = geometryFactory.createLineString([c1,c2,c3]);
		var distanceTolerance = 2;
		lineString = jsts.simplify.DouglasPeuckerSimplifier.simplify(lineString, distanceTolerance);

		expect(lineString).toBeDefined();
	});

	it('test empty polygon', function() {
		var geometryFactory = new jsts.geom.GeometryFactory();
		var shell = geometryFactory.createLinearRing([]);

		var polygon = geometryFactory.createPolygon(shell, null);
		var distanceTolerance = 1;
		polygon = jsts.simplify.DouglasPeuckerSimplifier.simplify(polygon, distanceTolerance);

		expect(polygon).toBeDefined();
		expect(polygon.shell.points.length === 0).toBe(true);
	});

	it('test point', function() {
		var geometryFactory = new jsts.geom.GeometryFactory();
		var coordinate = new jsts.geom.Coordinate(10,10);

		var point = geometryFactory.createPoint(coordinate);
		var distanceTolerance = 1;
		point = jsts.simplify.DouglasPeuckerSimplifier.simplify(point, distanceTolerance);

		expect(point).toBeDefined();
		expect(point.coordinate[0].x === 10 && point.coordinate[0].y === 10).toBe(true);
	});

	it('test polygon no reduction', function() {
		var geometryFactory = new jsts.geom.GeometryFactory();
		var c1 = new jsts.geom.Coordinate(20, 220);
		var c2 = new jsts.geom.Coordinate(40, 220);
		var c3 = new jsts.geom.Coordinate(60, 220);
		var c4 = new jsts.geom.Coordinate(80, 220);
		var c5 = new jsts.geom.Coordinate(100, 220);
		var c6 = new jsts.geom.Coordinate(120, 220);
		var c7 = new jsts.geom.Coordinate(140, 220);
		var c8 = new jsts.geom.Coordinate(140, 180);
		var c9 = new jsts.geom.Coordinate(100, 180);
		var c10 = new jsts.geom.Coordinate(60, 180);
		var c11 = new jsts.geom.Coordinate(20, 180);
		var c12 = new jsts.geom.Coordinate(20, 220);
		var shell = geometryFactory.createLinearRing([c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12]);

		var polygon = geometryFactory.createPolygon(shell, null);
		var distanceTolerance = 10;
		polygon = jsts.simplify.DouglasPeuckerSimplifier.simplify(polygon, distanceTolerance);

		expect(polygon).toBeDefined();
		var points = polygon.shell.points;
		expect(points[0].x === 20 && points[0].y === 220).toBe(true);
		expect(points[1].x === 140 && points[1].y === 220).toBe(true);
		expect(points[2].x === 140 && points[2].y === 180).toBe(true);
		expect(points[3].x === 20 && points[3].y === 180).toBe(true);
		expect(points[4].x === 20 && points[4].y === 220).toBe(true);
	});

	it('test polygon reduction', function() {
		var geometryFactory = new jsts.geom.GeometryFactory();
		var c1 = new jsts.geom.Coordinate(120, 120);
		var c2 = new jsts.geom.Coordinate(121, 121);
		var c3 = new jsts.geom.Coordinate(122, 122);
		var c4 = new jsts.geom.Coordinate(220, 120);
		var c5 = new jsts.geom.Coordinate(180, 199);
		var c6 = new jsts.geom.Coordinate(160, 200);
		var c7 = new jsts.geom.Coordinate(140, 199);
		var c8 = new jsts.geom.Coordinate(120, 120);
		var shell = geometryFactory.createLinearRing([c1,c2,c3,c4,c5,c6,c7,c8]);

		var polygon = geometryFactory.createPolygon(shell, null);
		var distanceTolerance = 10;
		polygon = jsts.simplify.DouglasPeuckerSimplifier.simplify(polygon, distanceTolerance);

		expect(polygon).toBeDefined();
		var points = polygon.shell.points;
		expect(points[0].x === 120 && points[0].y === 120).toBe(true);
		expect(points[1].x === 140 && points[1].y === 199).toBe(true);
		expect(points[2].x === 160 && points[2].y === 200).toBe(true);
		expect(points[3].x === 180 && points[3].y === 199).toBe(true);
		expect(points[4].x === 220 && points[4].y === 120).toBe(true);
		expect(points[5].x === 120 && points[5].y === 120).toBe(true);
	});

	it('test tiny square', function() {
		var geometryFactory = new jsts.geom.GeometryFactory();
		var c1 = new jsts.geom.Coordinate(0, 5);
		var c2 = new jsts.geom.Coordinate(5, 5);
		var c3 = new jsts.geom.Coordinate(5, 0);
		var c4 = new jsts.geom.Coordinate(0, 0);
		var c5 = new jsts.geom.Coordinate(0, 1);
		var c6 = new jsts.geom.Coordinate(0, 5);
		var shell = geometryFactory.createLinearRing([c1,c2,c3,c4,c5,c6]);

		var polygon = geometryFactory.createPolygon(shell, null);
		var distanceTolerance = 10;
		polygon = jsts.simplify.DouglasPeuckerSimplifier.simplify(polygon, distanceTolerance);

		expect(polygon).toBeDefined();
		expect(polygon.shell.points.length === 0).toBe(true);
	});

	it('test multi point', function() {
		var geometryFactory = new jsts.geom.GeometryFactory();
		var p1 = geometryFactory.createPoint(new jsts.geom.Coordinate(80, 200));
		var p2 = geometryFactory.createPoint(new jsts.geom.Coordinate(240, 200));
		var p3 = geometryFactory.createPoint(new jsts.geom.Coordinate(240, 60));
		var p4 = geometryFactory.createPoint(new jsts.geom.Coordinate(80, 60));
		var p5 = geometryFactory.createPoint(new jsts.geom.Coordinate(80, 200));
		var p6 = geometryFactory.createPoint(new jsts.geom.Coordinate(140, 199));
		var p7 = geometryFactory.createPoint(new jsts.geom.Coordinate(120, 120));

		var multiPoint = geometryFactory.createMultiPoint([p1,p2,p3,p4,p5,p6,p7]);
		var distanceTolerance = 10;
		multiPoint = jsts.simplify.DouglasPeuckerSimplifier.simplify(multiPoint, distanceTolerance);

		expect(multiPoint).toBeDefined();
		p1 = multiPoint.geometries[0];
		p2 = multiPoint.geometries[1];
		p3 = multiPoint.geometries[2];
		p4 = multiPoint.geometries[3];
		p5 = multiPoint.geometries[4];
		p6 = multiPoint.geometries[5];
		p7 = multiPoint.geometries[6];
		expect(p1.coordinate[0].x === 80 && p1.coordinate[0].y === 200).toBe(true);
		expect(p2.coordinate[0].x === 240 && p2.coordinate[0].y === 200).toBe(true);
		expect(p3.coordinate[0].x === 240 && p3.coordinate[0].y === 60).toBe(true);
		expect(p4.coordinate[0].x === 80 && p4.coordinate[0].y === 60).toBe(true);
		expect(p5.coordinate[0].x === 80 && p5.coordinate[0].y === 200).toBe(true);
		expect(p6.coordinate[0].x === 140 && p6.coordinate[0].y === 199).toBe(true);
		expect(p7.coordinate[0].x === 120 && p7.coordinate[0].y === 120).toBe(true);
	});

	it('test multi line string', function() {
		var geometryFactory = new jsts.geom.GeometryFactory();
		var c1 = new jsts.geom.Coordinate(0, 0);
		var c2 = new jsts.geom.Coordinate(50, 0);
		var c3 = new jsts.geom.Coordinate(70, 0);
		var c4 = new jsts.geom.Coordinate(80, 0);
		var c5 = new jsts.geom.Coordinate(100, 0);
		var c6 = new jsts.geom.Coordinate(0, 0);
		var c7 = new jsts.geom.Coordinate(50, 1);
		var c8 = new jsts.geom.Coordinate(60, 1);
		var c9 = new jsts.geom.Coordinate(100, 0);

		var lineString1 = geometryFactory.createLineString([c1,c2,c3,c4,c5]);
		var lineString2 = geometryFactory.createLineString([c6,c7,c8,c9]);
		var multiLineString = geometryFactory.createMultiLineString([lineString1,lineString2]);
		var distanceTolerance = 10;
		multiLineString = jsts.simplify.DouglasPeuckerSimplifier.simplify(multiLineString, distanceTolerance);

		expect(multiLineString).toBeDefined();
		lineString1 = multiLineString.geometries[0];
		lineString2 = multiLineString.geometries[1];
		expect(lineString1.points[0].x === 0 && lineString1.points[0].y === 0).toBe(true);
		expect(lineString1.points[1].x === 100 && lineString1.points[1].y === 0).toBe(true);
		expect(lineString2.points[0].x === 0 && lineString2.points[0].y === 0).toBe(true);
		expect(lineString2.points[1].x === 100 && lineString2.points[1].y === 0).toBe(true);
	});

	it('test multi line string with empty', function() {
		var geometryFactory = new jsts.geom.GeometryFactory();
		var c1 = new jsts.geom.Coordinate(0, 0);
		var c2 = new jsts.geom.Coordinate(50, 0);
		var c3 = new jsts.geom.Coordinate(70, 0);
		var c4 = new jsts.geom.Coordinate(80, 0);
		var c5 = new jsts.geom.Coordinate(100, 0);
		var c6 = new jsts.geom.Coordinate(0, 0);
		var c7 = new jsts.geom.Coordinate(50, 1);
		var c8 = new jsts.geom.Coordinate(60, 1);
		var c9 = new jsts.geom.Coordinate(100, 0);

		var lineString1 = geometryFactory.createLineString([]);
		var lineString2 = geometryFactory.createLineString([c1,c2,c3,c4,c5]);
		var lineString3 = geometryFactory.createLineString([c6,c7,c8,c9]);
		var multiLineString = geometryFactory.createMultiLineString([lineString1,lineString2,lineString3]);
		var distanceTolerance = 10;
		multiLineString = jsts.simplify.DouglasPeuckerSimplifier.simplify(multiLineString, distanceTolerance);

		expect(multiLineString).toBeDefined();
		expect(multiLineString.geometries.length === 2).toBe(true);
		lineString2 = multiLineString.geometries[0];
		lineString3 = multiLineString.geometries[1];
		expect(lineString2.points[0].x === 0 && lineString2.points[0].y === 0).toBe(true);
		expect(lineString2.points[1].x === 100 && lineString2.points[1].y === 0).toBe(true);
		expect(lineString3.points[0].x === 0 && lineString3.points[0].y === 0).toBe(true);
		expect(lineString3.points[1].x === 100 && lineString3.points[1].y === 0).toBe(true);
	});

	it('test multi polygon with empty', function() {
		var geometryFactory = new jsts.geom.GeometryFactory();
		var c1 = new jsts.geom.Coordinate(-36, 91.5);
		var c2 = new jsts.geom.Coordinate(4.5, 91.5);
		var c3 = new jsts.geom.Coordinate(4.5, 57.5);
		var c4 = new jsts.geom.Coordinate(-36, 57.5);
		var c5 = new jsts.geom.Coordinate(-36, 91.5);
		var c6 = new jsts.geom.Coordinate(25.5, 57.5);
		var c7 = new jsts.geom.Coordinate(61.5, 57.5);
		var c8 = new jsts.geom.Coordinate(61.5, 23.5);
		var c9 = new jsts.geom.Coordinate(25.5, 23.5);
		var c10 = new jsts.geom.Coordinate(25.5, 57.5);

		var polygon1 = geometryFactory.createPolygon(geometryFactory.createLinearRing([]));
		var polygon2 = geometryFactory.createPolygon(geometryFactory.createLinearRing([c1,c2,c3,c4,c5]));
		var polygon3 = geometryFactory.createPolygon(geometryFactory.createLinearRing([c6,c7,c8,c9,c10]));
		var multiPolygon = geometryFactory.createMultiPolygon([polygon1, polygon2, polygon3]);
		var distanceTolerance = 10;
		multiPolygon = jsts.simplify.DouglasPeuckerSimplifier.simplify(multiPolygon, distanceTolerance);

		expect(multiPolygon).toBeDefined();
		expect(multiPolygon.geometries.length === 2).toBe(true);
		polygon3 = multiPolygon.geometries[0];
		polygon2 = multiPolygon.geometries[1];
		expect(polygon3.shell.points[0].x === 25.5 && polygon3.shell.points[0].y === 57.5).toBe(true);
		expect(polygon3.shell.points[1].x === 61.5 && polygon3.shell.points[1].y === 57.5).toBe(true);
		expect(polygon3.shell.points[2].x === 61.5 && polygon3.shell.points[2].y === 23.5).toBe(true);
		expect(polygon3.shell.points[3].x === 25.5 && polygon3.shell.points[3].y === 23.5).toBe(true);
		expect(polygon3.shell.points[4].x === 25.5 && polygon3.shell.points[4].y === 57.5).toBe(true);
		expect(polygon2.shell.points[0].x === -36 && polygon2.shell.points[0].y === 91.5).toBe(true);
		expect(polygon2.shell.points[1].x === 4.5 && polygon2.shell.points[1].y === 91.5).toBe(true);
		expect(polygon2.shell.points[2].x === 4.5 && polygon2.shell.points[2].y === 57.5).toBe(true);
		expect(polygon2.shell.points[3].x === -36 && polygon2.shell.points[3].y === 57.5).toBe(true);
		expect(polygon2.shell.points[4].x === -36 && polygon2.shell.points[4].y === 91.5).toBe(true);
	});
});
