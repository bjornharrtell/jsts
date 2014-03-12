/**
 * A simple routine for showing geometric objects in the examples.
 */


//var util = require("util");
module.exports = function (title, polygon) {
  //console.log(title+" = \n"+util.inspect(polygon,null,3)+" "+(polygon.isEmpty? (polygon.isEmpty() ?" EMPTY": "NONEMPTY"): "")+"\n\n");
  console.log(title+" = "+polygon.toString()+" "+(polygon.isEmpty? (polygon.isEmpty() ?" EMPTY": "NONEMPTY"): "")+"\n\n");
};
