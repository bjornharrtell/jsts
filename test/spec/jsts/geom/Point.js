/* Copyright (c) 2011 by Björn Harrtell.
 * Published under the MIT license.
 * See https://github.com/bjornharrtell/jsts/blob/master/license.txt for the
 * full text of the license.
 */

describe('jsts.geom.Point', function() {
 
  var geometryFactory;
  var coordinate;
  var point;
  var pointEmpty;
  
  it('can be constructed', function() {
    geometryFactory = new jsts.geom.GeometryFactory();
    coordinate = new jsts.geom.Coordinate(1,2);
    point = geometryFactory.createPoint(coordinate);
    pointEmpty = geometryFactory.createPoint(null);
    expect(point).toBeDefined();
    expect(pointEmpty).toBeDefined();
  });
  
  it('can be non empty', function() {
    var isEmpty = point.isEmpty();
    expect(isEmpty).toBeFalsy();
  });
  
  it('can be empty', function() {
    var isEmpty = pointEmpty.isEmpty();
    expect(isEmpty).toBeTruthy();
  });
  
  it('can be cloned', function() {
    var clone = point.clone();
    expect(clone.equalsExact(point, 0)).toBeTruthy();
  });
  
});
