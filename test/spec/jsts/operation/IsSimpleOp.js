describe('jsts.operation.IsSimpleOp', function() {
  var isSimpleOp;
  
  it('can be constructed', function() {
    var isSimpleOp = new jsts.operation.IsSimpleOp();
    expect(isSimpleOp).toBeDefined();
  });
  
  it('L - simple line test should be true', function() {
    var reader = new jsts.io.WKTReader();
    
    var lineString = reader.read('LINESTRING(10 10, 20 20)');
    
    var isSimpleOp = new jsts.operation.IsSimpleOp(lineString);
    expect(isSimpleOp.isSimple()).toBeTruthy();
    
  });
  
  it('L - simple line test should be true', function() {
    var reader = new jsts.io.WKTReader();
    
    var lineString = reader.read('LINESTRING (20 60, 160 60, 80 160, 80 20)');
    
    var isSimpleOp = new jsts.operation.IsSimpleOp(lineString);
    expect(isSimpleOp.isSimple()).toBeFalsy();
  });
});
