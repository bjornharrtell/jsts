describe('TestDistance', function() {
  var doc = null;
  var xmlLoaded = false;
  var isReady = function() {
    return xmlLoaded; 
  };

  Ext.Ajax.request({
    url: '../testxml/general/TestDistance.xml',
    success: function(response) {
      doc = response.responseXML;
      xmlLoaded = true;
    }
  });
  
  it('passes all tests in TestDistance.xml', function() {
    waitsFor(isReady);
    runs(function() {
      var cases = Ext.DomQuery.select("case", doc);
      
      var count = 0;
      var passed = 0;
      
      for (var i = 0; i<cases.length; i++) {
        var testcase = cases[i];
        var desc = Ext.DomQuery.select("desc", testcase)[0].textContent.trim();
        var a = Ext.DomQuery.select("a", testcase)[0].textContent.trim();
        var b = Ext.DomQuery.select("b", testcase)[0].textContent.trim();
        var expected = Ext.DomQuery.select("op", testcase)[0].textContent.trim();
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
