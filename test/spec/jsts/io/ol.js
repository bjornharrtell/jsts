describe('jsts.io.OpenLayersParser', function() {

  if (typeof OpenLayers === 'undefined') return;

  it('can parse GeometryCollection', function() {  
    var reader = new jsts.io.GeoJSONReader();
    var geometry = reader.read({ "type": "GeometryCollection", "geometries": [ { "type": "Point", "coordinates": [100.0, 0.0] }, { "type": "LineString", "coordinates": [ [101.0, 0.0], [102.0, 1.0] ] } ] });
    
    var parser = new jsts.io.OpenLayersParser();
    var olgeom = parser.write(geometry);
    
    var geometry2 = parser.read(olgeom);
    
    expect(geometry.equals(geometry2)).toBeTruthy();
  });
});
