describe('TestBuffer', function() {
  var doc = null;
  var xmlLoaded = false;
  var isReady = function() {
    return xmlLoaded; 
  };

  $.ajax({
    url: '../testxml/general/TestBuffer.xml',
    success: function(response) {
      doc = response;
      xmlLoaded = true;
    }
  });
  
  it('passes all tests in TestBuffer.xml', function() {
    waitsFor(isReady);
    runs(function() {
      var cases = $('case', doc);
      
      var count = 0;
      var passed = 0;
      
      for (var i = 0; i<cases.length; i++) {
        var testcase = cases[i];
        var desc = $('desc', testcase).text();
        var wkt = $('a', testcase).text().trim().replace(/\n/g,'');
        
        var tests = $("test", testcase);
        
        for (var j = 0; j<tests.length; j++) {
          var test = tests[j];
          
          var distance = $("op", test).attr('arg2');
          var expected = $('op', test).text().trim();
          
          var reader = new jsts.io.WKTReader();
          var geometry = reader.read(wkt);
          if (geometry === undefined) continue;
          
          var result = geometry.buffer(distance);
          
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
