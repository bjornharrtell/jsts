/* Copyright (c) 2011 by Björn Harrtell.
 * Published under the MIT license.
 * See https://github.com/bjornharrtell/jsts/blob/master/license.txt for the
 * full text of the license.
 */

describe('jsts.io.WKTReader', function() {

  var reader;
  
  it('can be constructed', function() {
    reader = new jsts.io.WKTReader();
    expect(reader).toBeDefined();
  });

  it('can read WKT', function() {
    var geometry = reader.read('POLYGON ((20 20, 20 100, 120 100, 140 20, 20 20))');
    expect(geometry).toBeDefined();
  });
});
