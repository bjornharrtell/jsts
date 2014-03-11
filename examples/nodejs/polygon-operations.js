/**
 * Example of constructing and translating polygons..
 */

var jsts = require("jsts");
var factory = new jsts.geom.GeometryFactory();

var show = require("./show");  // just for showing the geometric objects during the example.


// some shorthands:

function coord(x,y)  {  return new jsts.geom.Coordinate(x,y); }
function coordlist(array) {  return new jsts.geom.CoordinateList(array); }

var a = factory.createPolygon(coordlist([coord(0, 0), coord(0, 10), coord(10, 10), coord(10, 0), coord(0, 0)]));
var b = factory.createPolygon(coordlist([coord(5, 5), coord(5, 20), coord(20, 20), coord(20, 5), coord(5, 5)]));
show("a",a);
show("b",b);

console.log(a.intersects(b)? "a intersects b": "a does not intersect b");
show("a ^ b",a.intersection(b)); // the square between (5,5) and (10,10)

