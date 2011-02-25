/* Copyright (c) 2011 by Björn Harrtell.
 * Published under the GNU Lesser GPL 2.1 license.
 * See https://github.com/bjornharrtell/jsts/blob/master/license.txt for the
 * full text of the license.
 */

describe('jsts.geom.GeometryFactory', function() {

  var geometryFactory;
  
  it('can be constructed', function() {
    geometryFactory = new jsts.geom.GeometryFactory();
  });
  
  it('can construct Point instances', function() {
    var coordinate = new jsts.geom.Coordinate(1,2);
    var point = geometryFactory.createPoint(coordinate);
    expect(point).toBeDefined();
  });
  
  it('can construct LineString instances', function() {
    var c1 = new jsts.geom.Coordinate(1,2);
    var c2 = new jsts.geom.Coordinate(3,4);
    var lineString = geometryFactory.createLineString([c1,c2]);
    expect(lineString).toBeDefined();
  });
  
  
});
