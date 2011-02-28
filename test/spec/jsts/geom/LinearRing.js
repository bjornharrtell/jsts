/* Copyright (c) 2011 by Björn Harrtell.
 * Published under the MIT license.
 * See https://github.com/bjornharrtell/jsts/blob/master/license.txt for the
 * full text of the license.
 */

describe('jsts.geom.LinearRing', function() {
 
  var geometryFactory;
  var c1,c2,c3,c4;

  var linearRing;
  var linearRingEmpty;

  it('can be constructed', function() {
    geometryFactory = new jsts.geom.GeometryFactory();
    c1 = new jsts.geom.Coordinate(1,2);
    c2 = new jsts.geom.Coordinate(3,4);
    c3 = new jsts.geom.Coordinate(5,6);
    c4 = new jsts.geom.Coordinate(1,2);

    linearRing = geometryFactory.createLinearRing([c1,c2,c3,c4]);
    linearRingEmpty = geometryFactory.createLinearRing(null);
  });
  
  it('can be non empty', function() {
    var isEmpty = linearRing.isEmpty();
    expect(isEmpty).toEqual(false);
  });
  
  it('can be empty', function() {
    var isEmpty = linearRingEmpty.isEmpty();
    expect(isEmpty).toEqual(true);
  });
  
  it('can be cloned', function() {
    var clone = linearRing.clone();
    expect(clone.equalsExact(linearRing, 0)).toEqual(true);
  });
  
});
