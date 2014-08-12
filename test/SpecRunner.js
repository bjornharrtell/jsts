(function() {

  function onReady() {
    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    //var htmlReporter = new jasmine.HtmlReporter();

    //jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function(spec) {
      return trivialReporter.specFilter(spec);
    };

    jasmineEnv.execute();
  }

  var jtsXMLs = ['TestBoundary', 'TestBuffer', 'TestCentroid',
      'TestConvexHull', 'TestEqualsExact', 'TestFunctionAA', 'TestFunctionLA',
      'TestFunctionLL', 'TestFunctionPA', 'TestFunctionPL', 'TestFunctionPP',
      'TestRelateAA', 'TestRelateAC', 'TestRelateLA', 'TestRelateLC',
      'TestRelateLL', 'TestRelatePA', 'TestRelatePL', 'TestRelatePP', 'TestSimple'];
  var count = jtsXMLs.length;

  for ( var i = 0; i < jtsXMLs.length; i++) {
    (function() {
      var xml = jtsXMLs[i];

      $.ajax({
        url: '../testxml/general/' + xml + '.xml',
        success: function(response) {
          JTSTestFactory.generate(response, xml);
          count--;

          if (count === 0) {
            onReady();
          }
        }
      });
    })();
  }

})();
