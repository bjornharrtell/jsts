/* Copyright (c) 2011 by Björn Harrtell.
 * Published under the MIT license.
 * See https://github.com/bjornharrtell/jsts/blob/master/license.txt for the
 * full text of the license.
 */

describe('jsts.geom.Point', function() {
 
  var geometryFactory = new jsts.geom.GeometryFactory();
  var coordinate = new jsts.geom.Coordinate(1,2);
  var point = geometryFactory.createPoint(coordinate);
  var pointEmpty = geometryFactory.createPoint(null);
  
  it('can be non empty', function() {
    var isEmpty = point.isEmpty();
    expect(isEmpty).toEqual(false);
  });
  
  it('can be empty', function() {
    var isEmpty = pointEmpty.isEmpty();
    expect(isEmpty).toEqual(true);
  });
  
  it('can be cloned', function() {
    var clone = point.clone();
    expect(clone.equalsExact(point, 0)).toEqual(true);
  });
  
});
