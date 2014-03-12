/**
 * Example of calculating intersection between a polygon and a line or a point.
 */

var jsts = require("jsts");

var reader = new jsts.io.WKTReader();

function booleanRelationToString(shape1, shape2, relationName) {
  var relationHolds = shape1[relationName](shape2);
  if (relationHolds) {
    return relationName+"s";
  } else {
    return "does not "+relationName;
  }
}

var polygon = reader.read('POLYGON((0 0, 0 10, 10 10, 10 0, 0 0))'); // the square between (0,0) and (10,10)

var points = {};
points.internal = reader.read("POINT(7 7)");    // a point inside the square
points.boundary = reader.read("POINT(10 5)");    // a point on the boundary of the square
points.external = reader.read("POINT(11 11)");  // a point outside the square

var relations = [
    "disjoint", "touches", 
    "intersects", //"crosses", 
    "within", "contains",
    "overlaps",
    //"covers", "coveredBy", 
    "relate"
    ];


for (var p in points) {
  console.log("\n"+p+"\n--------\n");
  var point = points[p];
  for (var r in relations) {
    var relation = relations[r];
    console.log("polygon."+relation+"("+p+") = "+polygon[relation](point));
    console.log(p+"."+relation+"(polygon) = "+point[relation](polygon));
  }
}

