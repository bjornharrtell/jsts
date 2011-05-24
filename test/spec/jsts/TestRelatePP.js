describe('TestRelatePP', function() {
  var doc = null;
  var xmlLoaded = false;
  var isReady = function() {
    return xmlLoaded; 
  };

  $.ajax({
    url: '../testxml/general/TestRelatePP.xml',
    success: function(response) {
      doc = response;
      xmlLoaded = true;
    }
  });
  
  it('passes all tests in TestRelatePP.xml', function() {
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
          
          var matrix = $("op", test).attr('arg3');
          var expected = $("op", test).text().trim();

          var reader = new jsts.io.WKTReader();
          var ag = reader.read(a);
          var bg = reader.read(b);
          if (ag === undefined) continue;
          
          var result;
          
          result = ag.relate(bg, matrix);
          
          if (result === undefined) continue;
          
          count++;
          
          if (result === expected) {
            passed++;
          }
          else {
            console.log('Testcase "' + desc + '" failed. (Result: ' + result + ' / Expected: ' + expected + ')');
          }
        }
        
      }
      
      expect(passed).toEqual(count);
    });
  });
});
