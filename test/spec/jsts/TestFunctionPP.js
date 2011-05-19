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
        var a = $("a", testcase).text().trim();
        var b = $("b", testcase).text().trim();
        
        var tests = $("test", testcase);
        
        for (var j = 0; j<tests.length; j++) {
          var test = tests[j];
          
          var op = $("op", test).attr('name');
          var expected = $("op", test).text().trim();

          var reader = new jsts.io.WKTReader();
          var ag = reader.read(a);
          var bg = reader.read(b);
          if (ag === undefined) continue;
          
          var result;
          
          if (op === 'union') {
            result = ag.union(bg);
          } else if (op === 'intersects') {
            result = ag.intersects(bg);
          } else if (op === 'difference') {
            result = ag.difference(bg);
          } else if (op === 'symdifference') {
            result = ag.symdifference(bg);
          }
          
          if (result === undefined) continue;
          
          count++;
          
          if (result === expected) {
            passed++;
          }
          else {
            console.log('Testcase "' + desc + '" failed.');
          }
        }
        
      }
      
      expect(passed).toEqual(count);
    });
  });
});
