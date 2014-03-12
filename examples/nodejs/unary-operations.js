/**
 * Example of constructing and translating polygons.
 */
var jsts = require("jsts");
var factory = new jsts.geom.GeometryFactory();

var show = require("./show");  // just for showing the geometric objects during the example.


// some shorthands:

function coord(x,y)  {  return new jsts.geom.Coordinate(x,y); }
function linstr(coords) {  return factory.createLineString(coords); }
function linring(coords) {  return factory.createLinearRing(coords); }
function polygon(coords,holes)  { return factory.createPolygon(linring(coords),holes); }

var a = polygon([coord(0, 0), coord(0, 10), coord(10, 10), coord(10, 0), coord(0, 0)]);
var b = polygon([coord(5, 5), coord(10, 10), coord(5, 15), coord(0, 10), coord(5, 5)]);
var c = linstr([coord(3,0), coord(3,10)]);
show("a",a);
show("b",b);
show("c",c);

show("a.centroid", a.getCentroid()); //(5,5)
show("b.centroid", b.getCentroid()); //(5,10)
show("c.centroid", c.getCentroid()); //(3,5)

show("a.dimension", a.getDimension()); // 2
show("b.dimension", b.getDimension()); // 2
show("c.dimension", c.getDimension()); // 1

show("a.type", a.getGeometryType()); // Geometry
show("b.type", b.getGeometryType()); // Geometry
show("c.type", c.getGeometryType()); // LineString

show("a.length", a.getLength()); // 40
show("b.length", b.getLength()); // 20*sqrt(2)
show("c.length", c.getLength()); // 10

show("a.area", a.getArea()); // 100 (10x10)
show("b.area", b.getArea()); // 50 (100/2)
//show("c.area", c.getArea()); // error: a linestring doesn't have area

show("a.envelope", a.getEnvelope()); // == a
show("b.envelope", b.getEnvelope()); // = the square [0,10]x[5,15]
show("c.envelope", c.getEnvelope()); // == c

show("a.envelope.area", a.getEnvelope().getArea()); // 100
show("b.envelope.area", b.getEnvelope().getArea()); // 100
