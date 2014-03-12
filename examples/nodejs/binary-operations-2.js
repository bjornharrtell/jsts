/**
 * Example of calculating intersection and union between polygons, normalization and equality checking.
 */

var jsts = require("jsts");
var show = require("./show");  // just for showing the geometric objects during the example.

var reader = new jsts.io.WKTReader();

var a = reader.read('POLYGON((0 0, 0 10, 10 10, 10 0, 0 0))'); // the square between (0,0) and (10,10)
var b = reader.read('POLYGON((5 5, 5 20, 20 20, 20 5, 5 5))'); // the square between (5,5) and (20,20)
var c = reader.read('POLYGON((15 15, 15 20, 20 20, 20 15, 15 15))'); // the square between (15,15) and (20,20)
var d = reader.read('POLYGON((5 5, 10 10, 5 15, 0 10, 5 5))'); // a rotated square 

show("a",a);
show("b",b);
show("c",c);
show("d",d);

console.log(a.intersects(b)? "a intersects b": "a does not intersect b");
var a_intersection_b = a.intersection(b);
show("a ^ b",a_intersection_b); // the square between (5,5) and (10,10)
var e = reader.read('POLYGON((5 5, 5 10, 10 10, 10 5, 5 5))'); // also the square between (5,5) and (10,10)
show("e",e);
show("a^b equalsExact e",a_intersection_b.equalsExact(e)); // false
show("a^b equalsTopo  e",a_intersection_b.equalsTopo(e));  // true
a_intersection_b = a_intersection_b.norm();
e = e.norm();
show("a^b normalized",a_intersection_b);
show("e normalized",e);
show("a^b normalized equalsExact e normalized",a_intersection_b.equalsExact(e)); // false

console.log(a.intersects(c)? "a intersects c": "a does not intersect c");
show("a ^ c",a.intersection(c)); // empty intersection

console.log(a.intersects(d)? "a intersects d": "a does not intersect d");
show("a ^ d",a.intersection(d)); // a RAIT

show("a U b",a.union(b));        // octagon
show("a U c",a.union(c));        // two disjoint squares
show("a U d",a.union(d));        // a house-shaped pentagon

