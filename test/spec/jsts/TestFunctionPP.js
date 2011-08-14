describe('TestFunctionPP', function() {
  var doc = null;
  var xmlLoaded = false;
  var isReady = function() {
    return xmlLoaded; 
  };

  $.ajax({
    url: '../testxml/general/TestFunctionPP.xml',
    success: function(response) {
      doc = response;
      xmlLoaded = true;
    }
  });
  
  it('passes all tests in TestFunctionPP.xml', function() {
    waitsFor(isReady);
    runs(function() {
      var cases = $('case', doc);
      
      var count = 0;
      var passed = 0;
      
      for (var i = 0; i<cases.length; i++) {
        var testcase = cases[i];
        var desc = $("desc", testcase).text().trim();
        var a = $("a", testcase).text().trim().replace(/\n/g,'');
        var b = $("b", testcase).text().trim().replace(/\n/g,'');
        
        var tests = $("test", testcase);
        
        for (var j = 0; j<tests.length; j++) {
          var test = tests[j];
          
          var op = $("op", test).attr('name');
          var expected = $("op", test).text().trim().replace(/\n/g,'');

          var reader = new jsts.io.WKTReader();
          
          var expectedg = reader.read(expected);
          
          var ag = reader.read(a);
          var bg = reader.read(b);
          if (ag === undefined) continue;
          
          var opresult;
          
          if (op === 'union') {
            opresult = ag.union(bg);
          } else if (op === 'intersection') {
            opresult = ag.intersection(bg);
          } else if (op === 'difference') {
            opresult = ag.difference(bg);
          } else if (op === 'symdifference') {
            opresult = ag.symDifference(bg);
          } else if (op === 'convexhull') {
            opresult = ag.convexHull(bg);
          } else if (op === 'getboundary') {
            opresult = ag.getBoundary(bg);
          } else {
            opresult = undefined;
          }
          
          if (opresult === undefined) continue;
          
          var result = opresult.equalsExact(expectedg);
          
          count++;
          
          if (result === true) {
            passed++;
          }
          else {
            console.log('Testcase "' + desc + '" failed. (Result: ' + opresult + ' / Expected: ' + expected + ')');
          }
        }
        
      }
      
      expect(passed).toEqual(count);
    });
  });
});
