describe('jsts.operation.valid.IsValidOp', function() {
  
  var geometryFactory = new jsts.geom.GeometryFactory(), coordinate, point, isValidOp, valid, line, pts, err;

  it('Can be created',function(){
    coordinate = new jsts.geom.Coordinate(1,2);
    point = geometryFactory.createPoint(coordinate);
    
    isValidOp = new jsts.operation.valid.IsValidOp(point);
    
    expect(isValidOp).toBeDefined();
  });
  
  it('Returns true for a valid point.', function() {
    var goodCoord0 = new jsts.geom.Coordinate(1.0, 1.0);
    var goodCoord1 = new jsts.geom.Coordinate(0.0, 0.0);
    pts = [goodCoord0, goodCoord1];
    
    line = geometryFactory.createLineString(pts);    
    isValidOp = new jsts.operation.valid.IsValidOp(line);
    
    valid = isValidOp.isValid();
    
    expect(valid).toBeTruthy();
  });
  
  it('Returns false for a self intersecting polygon.', function() {
    var coord0 = new jsts.geom.Coordinate(0.0, 0.0);
    var coord1 = new jsts.geom.Coordinate(1.0, 1.0);
    var coord2 = new jsts.geom.Coordinate(0.0, 1.0);
    var coord3 = new jsts.geom.Coordinate(1.0, 0.0);
    var coord4 = new jsts.geom.Coordinate(0.0, 0.0);
    
    pts = [coord0,coord1,coord2,coord3,coord4];
    var ring = geometryFactory.createLinearRing(pts);
    var polygon = geometryFactory.createPolygon(ring,[]);
    
    isValidOp = new jsts.operation.valid.IsValidOp(polygon);
    valid = isValidOp.isValid();
    
    expect(valid).toBeFalsy();
    
    err = isValidOp.getValidationError();
    expect(err.getErrorType()).toBe(jsts.error.TopologyValidationError.RING_SELF_INTERSECTION);
  });
  
  it('Detects a NaN- coordinate.', function() {
    var badCoord = new jsts.geom.Coordinate(1.0, Number.NaN);
    var goodCoord = new jsts.geom.Coordinate(0.0, 0.0);
    pts = [badCoord, goodCoord];
    
    line = geometryFactory.createLineString(pts);    
    isValidOp = new jsts.operation.valid.IsValidOp(line);
    
    valid = isValidOp.isValid();
    expect(valid).toBeFalsy();
    
    err = isValidOp.getValidationError();
    expect(err.getErrorType()).toBe(jsts.error.TopologyValidationError.INVALID_COORDINATE);
  });
});