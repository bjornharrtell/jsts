describe("GitHub issue #175", function() {
  var reader = new jsts.io.WKTReader();
  it("intersects() returns true when it shouldn't", function() {
    var a = reader.read('POLYGON ((0 7,3 7,3 10,0 10,0 7))');
    var b = reader.read('POLYGON ((0 0,10 0,10 10,0 0))');
    var intersects = a.intersects(b);
    var intersection = a.intersection(b);
    expect(intersection.toString()).toBe('GEOMETRYCOLLECTION EMPTY');
    expect(intersects).toBe(false);
  });
});
