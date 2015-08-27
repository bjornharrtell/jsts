describe('jsts.io.*', function() {

  var reader;
  var writer;

  it('GeoJSON reader/writer can be constructed', function() {
    reader = new jsts.io.GeoJSONReader();
    expect(reader).toBeDefined();

    writer = new jsts.io.GeoJSONWriter();
    expect(writer).toBeDefined();
  });


  it('can read Point GeoJSON', function() {
    var input = { "type": "Point", "coordinates": [100.0, 0.0] };
    var geometry = reader.read(input);
    expect(geometry).toBeDefined();
  });

  it('can read MultiPoint GeoJSON', function() {
    var input = { "type": "MultiPoint", "coordinates": [ [100.0, 0.0], [101.0, 1.0] ] };
    var geometry = reader.read(input);
    expect(geometry).toBeDefined();
  });

  it('can read LineString GeoJSON', function() {
    var input = { "type": "LineString", "coordinates": [ [100.0, 0.0], [101.0, 1.0] ] };
    var geometry = reader.read(input);
    expect(geometry).toBeDefined();
  });

  it('can read MultiLineString GeoJSON', function() {
    var input = { "type": "MultiLineString", "coordinates": [ [ [100.0, 0.0], [101.0, 1.0] ], [ [102.0, 2.0], [103.0, 3.0] ] ] };
    var geometry = reader.read(input);
    expect(geometry).toBeDefined();
  });

  it('can read Polygon GeoJSON', function() {
    var input = { "type": "Polygon", "coordinates": [ [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ] ] };
    var geometry = reader.read(input);
    expect(geometry).toBeDefined();
  });

  it('can read MultiPolygon GeoJSON', function() {
    var input = { "type": "MultiPolygon", "coordinates": [ [[[102.0, 2.0], [103.0, 2.0], [103.0, 3.0], [102.0, 3.0], [102.0, 2.0]]], [[[100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0]], [[100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8], [100.2, 0.2]]] ] };
    var geometry = reader.read(input);
    expect(geometry).toBeDefined();
  });

  it('can read GeometryCollection GeoJSON', function() {
    var input = { "type": "GeometryCollection", "geometries": [ { "type": "Point", "coordinates": [100.0, 0.0] }, { "type": "LineString", "coordinates": [ [101.0, 0.0], [102.0, 1.0] ] } ] };
    var geometry = reader.read(input);
    expect(geometry).toBeDefined();
  });

  it('can read GeometryCollection GeoJSON with a FeatureCollection into a jsts.GeometryCollection', function() {
    var input = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[-73.95833,40.80068],[-73.98184,40.768061],[-73.97300,40.76455],[-73.94923,40.79691],[-73.95833,40.80068]]]}}]};
  
    var geometryCollection = reader.readAsGeometryCollection(input);
    expect(geometryCollection).toBeDefined();
    expect(geometryCollection.isEmpty()).toBeFalsy();
    expect(geometryCollection.getArea()).toBeCloseTo(1.3); // sq miles?  
  });


  it('can write Point GeoJSON', function() {
    var geometry = reader.read({ "type": "Point", "coordinates": [100.0, 0.0] });
    var geoJson = writer.write(geometry);

    var geometry2 = reader.read(geoJson);
    expect(geometry.equals(geometry2)).toBeTruthy();
  });

  it('can write MultiPoint GeoJSON', function() {
    var geometry = reader.read({ "type": "MultiPoint", "coordinates": [ [100.0, 0.0], [101.0, 1.0] ] });
    var geoJson = writer.write(geometry);

    var geometry2 = reader.read(geoJson);
    expect(geometry.equals(geometry2)).toBeTruthy();
  });

  it('can write LineString GeoJSON', function() {
    var geometry = reader.read({ "type": "LineString", "coordinates": [ [100.0, 0.0], [101.0, 1.0] ] });
    var geoJson = writer.write(geometry);

    var geometry2 = reader.read(geoJson);
    expect(geometry.equals(geometry2)).toBeTruthy();
  });

  it('can write MultiLineString GeoJSON', function() {
    var geometry = reader.read({ "type": "MultiLineString", "coordinates": [ [ [100.0, 0.0], [101.0, 1.0] ], [ [102.0, 2.0], [103.0, 3.0] ] ] });
    var geoJson = writer.write(geometry);

    var geometry2 = reader.read(geoJson);
    expect(geometry.equals(geometry2)).toBeTruthy();
  });

  it('can write Polygon GeoJSON', function() {
    var geometry = reader.read({ "type": "Polygon", "coordinates": [ [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ] ] });
    var geoJson = writer.write(geometry);

    var geometry2 = reader.read(geoJson);
    expect(geometry.equals(geometry2)).toBeTruthy();
  });

  it('can write MultiPolygon GeoJSON', function() {
    var geometry = reader.read({ "type": "MultiPolygon", "coordinates": [ [[[102.0, 2.0], [103.0, 2.0], [103.0, 3.0], [102.0, 3.0], [102.0, 2.0]]], [[[100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0]], [[100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8], [100.2, 0.2]]] ] });
    var geoJson = writer.write(geometry);

    var geometry2 = reader.read(geoJson);
    expect(geometry.equals(geometry2)).toBeTruthy();
  });

  it('can write GeometryCollection GeoJSON', function() {
    var geometry = reader.read({ "type": "GeometryCollection", "geometries": [ { "type": "Point", "coordinates": [100.0, 0.0] }, { "type": "LineString", "coordinates": [ [101.0, 0.0], [102.0, 1.0] ] } ] });
    var geoJson = writer.write(geometry);

    var geometry2 = reader.read(geoJson);
    expect(geometry.equals(geometry2)).toBeTruthy();
  });
});
