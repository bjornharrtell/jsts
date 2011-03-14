describe('jsts.index.DoubleBits', function() {
  it('calculates correct exponent', function() {
    var db = jsts.index.DoubleBits.prototype;
    expect(db.exponent(-1)===0);
    expect(db.exponent(8.0)===3);
    expect(db.exponent(128.0) === 7);
  });
});
