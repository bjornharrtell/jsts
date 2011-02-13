describe('Coordinate', function() {
  var c1;
  var c2;

  beforeEach(function() {

  });
  
  it('should be constructable', function() {
    c1 = new jsts.geom.Coordinate(1, 2);
    c2 = new jsts.geom.Coordinate(3, 4);
    expect(c1).toBeDefined();
    expect(c2).toBeDefined();
  });

  it('should not be equal to another coordinate with different x/y', function() {
    expect(c1.equals2D(c2)).toEqual(false);
  });

  it('can be set to a new position from another Coordinate', function() {
    c1.setCoordinate(c2);
  });

  it('should be equal to another coordinate if is has the same x/y', function() {
    expect(c1.equals2D(c2)).toEqual(true);
  });
});
