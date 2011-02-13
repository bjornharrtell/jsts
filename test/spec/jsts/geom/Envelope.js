describe('Envelope', function() {
  var e1, e2, e3, e4;
  
  it('should be constructable', function() {
    e1 = new jsts.geom.Envelope(1, 2, 3, 4);
    e2 = new jsts.geom.Envelope(new jsts.geom.Coordinate(1, 3), new jsts.geom.Coordinate(2, 4));
    e3 = new jsts.geom.Envelope(new jsts.geom.Coordinate(1, 2));
    e4 = new jsts.geom.Envelope(e1);
    expect(e1).toBeDefined();
  });
  
  it('should be equal to another Envelope defined from the same coordinates', function() {
    expect(e1.equals(e2)).toEqual(true);
  });
  
});
