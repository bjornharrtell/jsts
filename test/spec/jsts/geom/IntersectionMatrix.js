/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */
describe('jsts.geom.IntersectionMatrix', function() {
  
  it('should be create IntersectionMatrix from string', function() {
    var mat = new jsts.geom.IntersectionMatrix("T*F**F***");
    expect(mat.toString()).toBe("T*F**F***");
	/*
    var expected = [-2,-3,-1,-3,-3,-1,-3,-3,-3];
    expect(mat.matrix.length).toBe(3);
    for(var r=0; r<3; r++){
      for(var c=0; c<3; c++){
        expect(mat.get(r,c)).toBe(expected[r*3+c]);
      }
    }
    */
  });
  
});
