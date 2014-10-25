describe('jsts.operation.polygonize.Polygonizer', function() {
  var wktReader = new jsts.io.WKTReader();
  
  var polygonizer = null;
  
  it('Can be created',function() {
    polygonizer = new jsts.operation.polygonize.Polygonizer();
    
    expect(polygonizer).toBeDefined();
  });
  
  it('Can add lines',function() {
    var a = wktReader.read('LINESTRING(30 150,250 150)');
    var b = wktReader.read('LINESTRING(120 240,120 20,20 20,120 170)');
    
    polygonizer.add(a);
    polygonizer.add(b);
    
    expect(polygonizer).toBeDefined();
  });
  
  it('Can get polygons result',function() {
    var polygons = polygonizer.getPolygons();
    
    expect(polygons).toBeDefined();
  });
  
  it('Can use a noder as preprocessing step', function() {
    var factory = new jsts.geom.GeometryFactory();
    var reader = new jsts.io.WKTReader();
    var lineString = reader.read('LINESTRING (20 20, 20 100, 120 100, 140 20, 20 20)');
  
    // convert input to segment string
    // NOTE: if input has self intersections it should be broken up into multiple segment strings first
    var segmentString = new jsts.noding.NodedSegmentString(lineString.getCoordinates());
    var segmentStrings = new javascript.util.ArrayList();
    segmentStrings.add(segmentString);
  
    // initialize noder with a segment intersector
    var noder = new jsts.noding.MCIndexNoder();
    var li = new jsts.algorithm.RobustLineIntersector();
    var intFinderAdder = new jsts.noding.IntersectionAdder(li);
    noder.setSegmentIntersector(intFinderAdder);
    
    noder.computeNodes(segmentStrings);
    var nodedSegmentStrings = noder.getNodedSubstrings();
    
    var polygonizer = new jsts.operation.polygonize.Polygonizer();
    
    // extract noded segment strings as linestrings and add to polygonizer
    for (var i = nodedSegmentStrings.iterator(); i.hasNext();) {
      var ns = i.next();
      var coords = ns.getCoordinates();
      var lineString = factory.createLineString(coords);    
      polygonizer.add(lineString);
    }
    
    var polygons = polygonizer.getPolygons();
    
    var polygon = polygons.get(0);
    var wkt = polygon.toString();
    
    expect(wkt).toEqual("POLYGON((20 20,20 100,120 100,140 20,20 20))");
  });
  
});
