describe('TestCentroid', function() {
  var doc = null;
  var xmlLoaded = false;
  var isReady = function() {
    return xmlLoaded; 
  };

  $.ajax({
    url: '../testxml/general/TestCentroid.xml',
    success: function(response) {
      doc = response;
      xmlLoaded = true;
    }
  });
  
  it('passes all tests in TestCentroid.xml', function() {
    waitsFor(isReady);
    runs(function() {
      var cases = $('case', doc);
      
      var count = 0;
      var passed = 0;
      
      for (var i = 0; i<cases.length; i++) {
        var testcase = cases[i];
        var desc = $("desc", testcase).text().trim();
        var wkt = $("a", testcase).text().trim();
        var expected = $("op", testcase).text().trim();
        
        var reader = new jsts.io.WKTReader();
        var geometry = reader.read(wkt);
        if (geometry === undefined) continue;
        
        var centroid = geometry.getCentroid();
        
        var writer = new jsts.io.WKTReader();
        var result = writer.write(centroid);
        
        count++;
        
        if (result === expected) {
          passed++;
        }
        else {
          console.log('Testcase "' + desc + '" failed. (Result: ' + result + ' / Expected: ' + expected + ')');
        }
      }
      
      expect(passed).toEqual(count);
    });
  });
});
