/* Copyright (c) 2011 by Björn Harrtell.
 * Published under the MIT license.
 * See https://github.com/bjornharrtell/jsts/blob/master/license.txt for the
 * full text of the license.
 */

describe('jsts.geom.LineString', function() {
 
  var geometryFactory;
  var c1,c2;

  var lineString;
  var lineStringEmpty;
  
  it('can be constructed', function() {
    geometryFactory = new jsts.geom.GeometryFactory();
    c1 = new jsts.geom.Coordinate(1,2);
    c2 = new jsts.geom.Coordinate(3,4);
    
    lineString = geometryFactory.createLineString([c1,c2]);
    lineStringEmpty = geometryFactory.createLineString(null);
    
    expect(lineString).toBeDefined();
    expect(lineStringEmpty).toBeDefined();
  });

  it('can be non empty', function() {

    var isEmpty = lineString.isEmpty();
    expect(isEmpty).toEqual(false);
  });
  
  it('can be empty', function() {
    var isEmpty = lineStringEmpty.isEmpty();
    expect(isEmpty).toEqual(true);
  });
  
  it('can be cloned', function() {
    var clone = lineString.clone();
    expect(clone.equalsExact(lineString, 0)).toEqual(true);
  });
  
});
