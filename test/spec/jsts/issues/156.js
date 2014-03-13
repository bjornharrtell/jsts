describe("GitHub issue #156 - RectangleContains", function() {
  var reader = new jsts.io.WKTReader();
  it("works for two rectangles", function() {
    var a = reader.read('POLYGON((0 0, 0 10, 20 10, 20 0, 0 0))');
    var part_of_a = reader.read('POLYGON((0 0, 0 10, 10 10, 10 0, 0 0))');
    var inside_a = reader.read('POLYGON((2 2, 2 8, 18 8, 18 2, 2 2))');
    var boundary_of_a = reader.read('LINESTRING(0 2, 0 8)');
    var outside_a = reader.read('POLYGON((30 30, 30 50, 50 50, 50 30, 30 30))');
    expect(a.contains(a)).toBe(true);
    expect(a.contains(part_of_a)).toBe(true);
    expect(a.contains(inside_a)).toBe(true);
    expect(a.contains(boundary_of_a)).toBe(false);
    expect(a.contains(outside_a)).toBe(false);
  }); 
  it("works for a rectangle and a point", function() {
    var a = reader.read('POLYGON((0 0, 0 10, 20 10, 20 0, 0 0))');
    var external = reader.read('POINT(30 30)');
    var boundary = reader.read('POINT(0 5)');
    var corner = reader.read('POINT(0 0)');
    var internal = reader.read('POINT(5 5)');
    expect(a.contains(external)).toBe(false);
    expect(a.contains(boundary)).toBe(false);
    expect(a.contains(corner)).toBe(false);
    expect(a.contains(internal)).toBe(true);
  }); 
});
