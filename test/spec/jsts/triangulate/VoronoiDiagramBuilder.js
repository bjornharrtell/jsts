describe('jsts.triangulate.VoronoiDiagramBuilder', function() {
  var geomFact = new jsts.geom.GeometryFactory();
  var reader = new jsts.io.WKTReader();
  
  var runVoronoi = function(sitesWKT) {
    var sites = reader.read(sitesWKT);
    var builder = new jsts.triangulate.VoronoiDiagramBuilder();
    builder.setSites(sites);
    
    var result = builder.getDiagram(geomFact);
    return result;
  };

  
  it('can be constructed', function() {
    var builder = new jsts.triangulate.VoronoiDiagramBuilder();
    expect(builder).toBeDefined();
  });
  
  
  it('can build from multipoints', function() {
    var wkt = "MULTIPOINT ((10 10), (20 70), (60 30), (80 70))";
    
    /**
     * TODO: ? This is not the same as in JTS, however, after analyzing the resulting edges,
     * the only thing that differs is how far away the line goes "to eternity".
     * 
     * The important vertexes are identical with JTS-results. And JTS-test seems erratic to.
     */
    var expectedTri = reader.read("GEOMETRYCOLLECTION(POLYGON((-80 55.833333333333336,-80 150,50 150,50 60,27.857142857142854 37.857142857142854,-80 55.833333333333336)),POLYGON((-80 -80,-80 55.833333333333336,27.857142857142854 37.857142857142854,74.99999999999999 -80,-80 -80)),POLYGON((160 4.999999999999995,160 -80,74.99999999999999 -80,27.857142857142854 37.857142857142854,50 60,160 4.999999999999995)),POLYGON((50 150,160 150,160 4.999999999999995,50 60,50 150)))");
    expectedTri.normalize();
    
    var computedTri = runVoronoi(wkt);
    computedTri.normalize();
    
    // TODO: this fails after fixing jsts.io.Envelope code so that new Envelopes are initialized to "null" values
    expect(computedTri.equalsExact(expectedTri,1.0e-7)).toBeTruthy();
  });
});
