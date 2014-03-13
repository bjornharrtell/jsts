describe("GitHub issue #153 - getEnvelope", function() {
  it("should return a polygon class", function() {
    var reader = new jsts.io.WKTReader();
    var rect = reader.read('POLYGON((0 0, 0 10, 20 10, 20 0, 0 0))');
    var envelope = rect.getEnvelope();
    expect(envelope instanceof jsts.geom.Polygon).toBe(true);
    expect(envelope.equalsTopo(rect)).toBe(true);
  }); 
});

describe("GitHub issue #153 - getEnvelopeInternal", function() {
  it("should return an Envelope class", function() {
    var reader = new jsts.io.WKTReader();
    var rect = reader.read('POLYGON((0 0, 0 10, 20 10, 20 0, 0 0))');
    var envelope = rect.getEnvelopeInternal();
    expect(envelope instanceof jsts.geom.Envelope).toBe(true);
    expect(envelope.getMinX()).toBe(0);
    expect(envelope.getMaxX()).toBe(20);
    expect(envelope.getMinY()).toBe(0);
    expect(envelope.getMaxY()).toBe(10);
  }); 
});
