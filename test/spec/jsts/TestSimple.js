describe('TestSimple', function() {
  var isSimpleOp;

  var doc = null;
  var xmlLoaded = false;
  var isReady = function() {
    return xmlLoaded; 
  };

  Ext.Ajax.request({
    url: '../testxml/general/TestSimple.xml',
    success: function(response) {
      doc = response.responseXML;
      xmlLoaded = true;
    }
  });
  
  it('passes all tests in TestSimple.xml', function() {
    waitsFor(isReady);
    runs(function() {
      var cases = Ext.DomQuery.select("case", doc);
      
      var count = 0;
      var passed = 0;
      
      for (var i = 0; i<cases.length; i++) {
        var testcase = cases[i];
        var desc = Ext.DomQuery.select("desc", testcase)[0].textContent.trim();
        var wkt = Ext.DomQuery.select("a", testcase)[0].textContent.trim();
        var expected = Ext.DomQuery.select("op", testcase)[0].textContent.trim() === 'true';
        
        var reader = new jsts.io.WKTReader();
        var geometry = reader.read(wkt);
        if (geometry === undefined) continue;
        
        var result = geometry.isSimple();
        
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
