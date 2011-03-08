/* Copyright (c) 2011 by Björn Harrtell.
 * Published under the MIT license.
 * See https://github.com/bjornharrtell/jsts/blob/master/license.txt for the
 * full text of the license.
 */

describe('jsts.io.*', function() {

  var reader;
  var writer;
  var geometry;
  var wkt = 'POLYGON ((20 20, 20 100, 120 100, 140 20, 20 20))';
  
  it('WKT reader/writer can be constructed', function() {
    reader = new jsts.io.WKTReader();
    expect(reader).toBeDefined();
    
    writer = new jsts.io.WKTWriter();
    expect(writer).toBeDefined();
  });

  it('can read WKT', function() {
    geometry = reader.read(wkt);
    expect(geometry).toBeDefined();
  });
  
  it('can write WKT', function() {
    var wkt2 = writer.write(geometry);
    var geometry2 = reader.read(wkt2);
    expect(geometry.equals(geometry)).toBeTruthy();
  });
});
