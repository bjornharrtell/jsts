/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

describe('jsts.geom.Coordinate', function() {
  it('should not be equal to another coordinate with different position', function() {
    var c1 = new jsts.geom.Coordinate(1, 2);
    var c2 = new jsts.geom.Coordinate(3, 4);
    expect(c1.equals2D(c2)).toBeFalsy();
  });

  it('should be equal to another coordinate with same position', function() {
    var c1 = new jsts.geom.Coordinate(1, 2);
    var c2 = new jsts.geom.Coordinate(3, 4);
    c1.setCoordinate(c2);
    expect(c1.equals2D(c2)).toBeTruthy();
  });
});
