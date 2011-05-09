describe('jsts.operation.IsSimpleOp', function() {
  var isSimpleOp;

  var format = new OpenLayers.Format.XML();
  
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
        var desc = Ext.DomQuery.select("desc", testcase)[0].textContent;
        var wkt = Ext.DomQuery.select("a", testcase)[0].textContent;
        var expected = Ext.DomQuery.select("op", testcase)[0].textContent.trim() === 'true';
        
        var reader = new jsts.io.WKTReader();
        var geometry = reader.read(wkt);
        if (geometry === undefined) continue;
        var result = geometry.isSimple();
        
        expect(expected).toEqual(result);
      }
    });
  });
  
  // NOTE: deprecated by TestSimple stuff
  it('L - simple line test should be true', function() {
    var reader = new jsts.io.WKTReader();

    var lineString = reader.read('LINESTRING(10 10, 20 20)');

    var isSimpleOp = new jsts.operation.IsSimpleOp(lineString);
    expect(isSimpleOp.isSimple()).toBeTruthy();

  });
  
  //NOTE: deprecated by TestSimple stuff
  it('L - non-simple, proper interior intersection should be false',
      function() {
        var reader = new jsts.io.WKTReader();

        var lineString = reader.read('LINESTRING (20 60, 160 60, 80 160, 80 20)');

        var isSimpleOp = new jsts.operation.IsSimpleOp(lineString);
        expect(isSimpleOp.isSimple()).toBeFalsy();
      });
});
