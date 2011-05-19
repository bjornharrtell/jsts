describe('TestDistance', function() {
  var doc = null;
  var xmlLoaded = false;
  var isReady = function() {
    return xmlLoaded; 
  };

  $.ajax({
    url: '../testxml/general/TestDistance.xml',
    success: function(response) {
      doc = response;
      xmlLoaded = true;
    }
  });
  
  it('passes all tests in TestDistance.xml', function() {
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
        var expected = $("op", testcase).text().trim();
        expected = parseFloat(expected);
        
        var reader = new jsts.io.WKTReader();
        var ag = reader.read(a);
        var bg = reader.read(b);
        if (ag === undefined) continue;
        
        var result = ag.distance(bg);
        
        count++;
        
        if (result === expected) {
          passed++;
        }
        else {
          console.log('Testcase "' + desc + '" failed.');
        }
      }
      
      expect(passed).toEqual(count);
    });
  });
});
