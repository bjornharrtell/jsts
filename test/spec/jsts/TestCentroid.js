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
        var wkt = $("a", testcase).text().trim().replace(/\n/g,'');
        var expected = $("op", testcase).text().trim();
        
        var reader = new jsts.io.WKTReader();
        var geometry = reader.read(wkt);
        var expectedg = reader.read(expected);
        
        if (geometry === undefined) continue;
        
        // TODO: this should be taken care of more properly
        geometry.setPrecisionModel(new jsts.geom.PrecisionModel(1));
        
        var centroid = geometry.getCentroid_jsts();
        
        if (!centroid)
          continue;
        
        var result = centroid.equals(expectedg);
        
        //var writer = new jsts.io.WKTWriter();
        //var result = writer.write(centroid);
        
        count++;
        
        if (result === true) {
          passed++;
        }
        else {
          console.log('Testcase "' + desc + '" failed. (Result: ' + centroid + ' / Expected: ' + expectedg + ')');
        }
      }
      
      expect(passed).toEqual(count);
    });
  });
});
