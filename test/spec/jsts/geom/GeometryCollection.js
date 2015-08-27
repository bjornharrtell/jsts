describe('jsts.geom.GeometryCollection', function() {
  it('can check its geometries to contain a particular other geometry', function() {
    var reader = new jsts.io.GeoJSONReader();
    // NYC Central Park
    var input = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[-73.95833,40.80068],[-73.98184,40.768061],[-73.97300,40.76455],[-73.94923,40.79691],[-73.95833,40.80068]]]}}]};
    var geometryCollection = reader.readAsGeometryCollection(input);

    // A little test of where this code was written :)
    var coordinate = new jsts.geom.Coordinate(-71.104108, 42.365614);
    var point = new jsts.geom.Point(coordinate);

    expect(geometryCollection.contains(point)).toBeTruthy();
    expect(geometryCollection.contains(point)).toBeFalsy();

  });
});
