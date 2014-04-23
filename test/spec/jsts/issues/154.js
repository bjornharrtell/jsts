describe("GitHub issue #154 - covers", function() {
  var reader = new jsts.io.WKTReader();
  it("works for two rectangles", function() {
    var a = reader.read('POLYGON((0 0, 0 10, 20 10, 20 0, 0 0))');
    var b = reader.read('POLYGON((0 0, 0 10, 10 10, 10 0, 0 0))');
    expect(a.covers(b)).toBe(true);
    expect(b.covers(a)).toBe(false);
    expect(a.coveredBy(b)).toBe(false);
    expect(b.coveredBy(a)).toBe(true);
  }); 
  it("works for a rectangle and a point", function() {
    var a = reader.read('POLYGON((0 0, 0 10, 20 10, 20 0, 0 0))');
    var external = reader.read('POINT(30 30)');
    var boundary = reader.read('POINT(0 5)');
    var corner = reader.read('POINT(0 0)');
    var internal = reader.read('POINT(5 5)');
    expect(a.covers(external)).toBe(false);
    expect(a.covers(boundary)).toBe(true);
    expect(a.covers(corner)).toBe(true);
    expect(a.covers(internal)).toBe(true);
  }); 
});
