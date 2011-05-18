describe('TestFunctionPP', function() {
  var doc = null;
  var xmlLoaded = false;
  var isReady = function() {
    return xmlLoaded; 
  };

  Ext.Ajax.request({
    url: '../testxml/general/TestFunctionPP.xml',
    success: function(response) {
      doc = response.responseXML;
      xmlLoaded = true;
    }
  });
  
  it('passes all tests in TestFunctionPP.xml', function() {
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
        
        var tests = Ext.DomQuery.select("test", testcase);
        
        for (var j = 0; j<tests.length; j++) {
          var test = tests[j];
          
          var op = Ext.DomQuery.select("op@name", test)[0].firstChild.nodeValue;
          var expected = Ext.DomQuery.select("op", test)[0].textContent.trim();

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
