/* Copyright (c) 2011 by Björn Harrtell.
 * Published under the GNU Lesser GPL 2.1 license.
 * See https://github.com/bjornharrtell/jsts/blob/master/license.txt for the
 * full text of the license.
 */

describe('jsts.geom.LineString', function() {
 
  var geometryFactory = new jsts.geom.GeometryFactory();
  var c1 = new jsts.geom.Coordinate(1,2);
  var c2 = new jsts.geom.Coordinate(3,4);

  var lineString = geometryFactory.createLineString([c1,c2]);

  it('can be non empty', function() {

    var isEmpty = lineString.isEmpty();
    expect(isEmpty).toEqual(false);
  });
  
  it('can be empty', function() {

    var lineStringEmpty = geometryFactory.createLineString(null);
    var isEmpty = lineStringEmpty.isEmpty();
    expect(isEmpty).toEqual(true);
  });
  
  it('can be cloned', function() {
    var clone = lineString.clone();
    expect(clone.equalsExact(lineString, 0)).toEqual(true);
  });
  
});
