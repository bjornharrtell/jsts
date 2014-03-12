/**
 * Example of calculating intersection between a polygon and a line or a point.
 */

var jsts = require("jsts");
var show = require("./show");  // just for showing the geometric objects during the example.

var reader = new jsts.io.WKTReader();


var polygon = reader.read('POLYGON((0 0, 0 10, 10 10, 10 0, 0 0))'); // the square between (0,0) and (10,10)
var line1 = reader.read('LINESTRING(-10 8, 20 8)');
var line2 = reader.read('LINESTRING(0 11, 11 11)');
var point1 = reader.read("POINT(7 7)");
var point2 = reader.read("POINT(11 11)");

show("polygon",polygon);
show("line1",line1);
show("line2",line2);
show("point1",point1);
show("point2",point2);

show("line1 ^ polygon", line1.intersection(polygon));
show("polygon ^ line2", polygon.intersection(line2));

show("point1 ^ polygon", point1.intersection(polygon));
show("polygon ^ point2", polygon.intersection(point2));
