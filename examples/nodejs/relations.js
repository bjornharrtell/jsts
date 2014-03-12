/**
 * Calculating the various boolean relations (overlaps, contains, etc.)
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

var reference = reader.read('POLYGON((0 0, 0 10, 10 10, 10 0, 0 0))'); // the square between (0,0) and (10,10)

var others = {};
others.internalPoint = reader.read("POINT(7 7)");    // a point inside the square
others.boundaryPoint = reader.read("POINT(10 5)");    // a point on the boundary of the square
others.externalPoint = reader.read("POINT(11 11)");  // a point outside the square
others.farawaySquare = reader.read('POLYGON((20 20, 20 30, 30 30, 30 20, 20 20))'); // the square between (20,20) and (30,30)
others.cornerSquare = reader.read('POLYGON((10 10, 10 30, 30 30, 30 10, 10 10))'); // the square between (10,10) and (30,30)
others.sideSquare = reader.read('POLYGON((10 0, 10 30, 30 30, 30 0, 10 0))'); // the rectangle between (10,0) and (30,30)
others.overlappingSquare = reader.read('POLYGON((5 5, 5 20, 20 20, 20 5, 5 5))'); // the square between (5,5) and (20,20)

var relations = [
    "disjoint", "touches", 
    "intersects", //"crosses", 
    "within", "contains",
    "overlaps",
    //"covers", "coveredBy", 
    "relate"
    ];


for (var p in others) {
  console.log("\n"+p+"\n-----------------\n");
  var point = others[p];
  for (var r in relations) {
    var relation = relations[r];
    console.log("reference."+relation+"("+p+") = "+reference[relation](point));
    console.log(p+"."+relation+"(reference) = "+point[relation](reference));
  }
}

