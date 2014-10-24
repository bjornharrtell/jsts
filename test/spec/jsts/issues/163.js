describe("GitHub issue #163", function() {
  var reader = new jsts.io.WKTReader();
  it("moo", function() {
    var a = reader.read('POLYGON((10 10, 100 10, 10 50, 100 100, 10 100, 10 10))');
    var valid = a.isValid();
    expect(valid).toBe(false);
  });
});
