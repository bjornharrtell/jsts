describe('jsts.operation.IsSimpleOp', function() {
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
  
  it('can be constructed', function() {
    var isSimpleOp = new jsts.operation.IsSimpleOp();
    expect(isSimpleOp).toBeDefined();
  });
  
  it('can run TestSimple.xml stuff', function() {
    waitsFor(isReady);
    runs(function() {
      var cases = Ext.DomQuery.select("case", doc);
      
      for (var i = 0; i<cases.length; i++) {
        var testcase = cases[i];
        var desc = Ext.DomQuery.select("desc", testcase)[0].textContent.trim();
        var wkt = Ext.DomQuery.select("a", testcase)[0].textContent.trim();
        var expected = Ext.DomQuery.select("op", testcase)[0].textContent.trim() === 'true';
        
        var reader = new jsts.io.WKTReader();
        var geometry = reader.read(wkt);
        if (geometry === undefined) continue;
        
        var result = geometry.isSimple();
        
        expect(result).toEqual(expected);
      }
    });
  });
});
