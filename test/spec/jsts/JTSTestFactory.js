JTSTestFactory = {};
JTSTestFactory.generate = function(doc, title) {
  var cases = $('case', doc);

  for ( var i = 0; i < cases.length; i++) {
    var testcase = cases[i];
    var desc = $("desc", testcase).text().trim();
    var awkt = $("a", testcase).text().trim().replace(/\n/g, '');
    var bwkt = $("b", testcase).text().trim().replace(/\n/g, '');
    var tests = $("test", testcase);

    describe(title + ' - ' + desc, function() {
      for ( var j = 0; j < tests.length; j++) {
        var test = tests[j];

        var opname = $("op", test).attr('name');
        var arg3 = $("op", test).attr('arg3');
        var expected = $("op", test).text().trim() === 'true';

        var reader = new jsts.io.WKTReader();
        var a = reader.read(awkt);
        var b = reader.read(bwkt);

        it(opname + ' A: ' + awkt + ' B: ' + bwkt + ' using matrix ' + arg3 + ' should be truthy', function() {
          var result = a[opname](b, arg3);
          expect(result).toEqual(expected);
        });
      }
    });
  }
};