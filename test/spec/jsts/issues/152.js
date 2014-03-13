describe("GitHub issue #152 - isRectangle", function() {
  var reader = new jsts.io.WKTReader();
  it("detects a rectangle", function() {
    var rect = reader.read('POLYGON((0 0, 0 10, 20 10, 20 0, 0 0))');
    expect(rect.isRectangle()).toBe(true);
  }); 
  it("detects a non-rectangle", function() {
    var norect = reader.read('POLYGON((0 0, 0 10, 10 15, 20 10, 20 0, 0 0))');
    expect(norect.isRectangle()).toBe(false);
  }); 
});
