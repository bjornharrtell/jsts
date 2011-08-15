describe('TestBoundary', function() {
  var doc = null;
  var xmlLoaded = false;
  var isReady = function() {
    return xmlLoaded; 
  };

  $.ajax({
    url: '../testxml/general/TestBoundary.xml',
    success: function(response) {
      doc = response;
      xmlLoaded = true;
    }
  });
  
  it('passes all tests in TestBoundary.xml', function() {
    waitsFor(isReady);
    runs(function() {
      var cases = $('case', doc);
      
      var count = 0;
      var passed = 0;
      
      for (var i = 0; i<cases.length; i++) {
        var testcase = cases[i];
        var desc = $('desc', testcase).text();
        var wkt = $('a', testcase).text().trim().replace(/\n/g,'');
        var expected = $('op', testcase).text().trim().replace(/\n/g,'');
        
        var reader = new jsts.io.WKTReader();
        var geometry = reader.read(wkt);
        if (geometry === undefined) continue;
        
        var expectedg = reader.read(expected);
        if (expectedg === undefined) continue;
        
        var boundary = geometry.getBoundary();
        //var writer = new jsts.io.WKTWriter();
        //result = writer.write(result);
        
        var result = boundary.compareTo(expectedg);
        
        count++;
        
        if (result === 0) {
          passed++;
        }
        else {
          console.log('Testcase "' + desc + '" failed. (Result: ' + boundary + ' / Expected: ' + expectedg + ')');
        }
      }
      
      expect(passed).toEqual(count);
    });
  });
});
