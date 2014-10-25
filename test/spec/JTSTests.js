var fs = require('fs');
console.log("Testing..");
['TestBoundary', 'TestBuffer', 'TestCentroid',
'TestConvexHull', 'TestEqualsExact', 'TestFunctionAA', 'TestFunctionLA',
'TestFunctionLL', 'TestFunctionPA', 'TestFunctionPL', 'TestFunctionPP',
'TestRelateAA', 'TestRelateAC', 'TestRelateLA', 'TestRelateLC',
'TestRelateLL', 'TestRelatePA', 'TestRelatePL', 'TestRelatePP', 'TestSimple']
.forEach(function(xml) {    
    var fileName = 'testxml/general/' + xml + '.xml';
    var data = fs.readFileSync(fileName, { encoding: "utf8" });
    JTSTestFactory.generate(data, xml);
});

