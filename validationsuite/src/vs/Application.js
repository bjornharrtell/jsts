// TODO: use GeoExt, parse test data from testxml

jsts.vs.Application = {
  init: function() {
    new Ext.Viewport({
      layout: 'absolute',
      items: [{
        title: 'Choose test case',
        x: 20,
        y: 20,
        height: 100,
        width: 600,
        xtype: 'form',
        frame: true,
        html: 'TODO: Replace with form controls to choose test case'
      }, {
        title: 'Test case details',
        x: 20,
        y: 130,
        height: 200,
        width: 600,
        frame: true,
        html: 'TODO: Replace with test case details'
      }, {
        title: 'Test case results',
        x: 20,
        y: 340,
        height: 200,
        width: 600,
        frame: true,
        html: 'TODO: Replace with test case results'
      }]
    });
  }
};

Ext.onReady(jsts.vs.Application.init);
