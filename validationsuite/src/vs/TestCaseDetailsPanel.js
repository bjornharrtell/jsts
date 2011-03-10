/**
 * @constructor
 */
jsts.vs.TestCaseDetailsPanel = Ext.extend(Ext.Panel, {
  initComponent: function() {

    this.layer = new OpenLayers.Layer.Vector();

    this.map = new GeoExt.MapPanel({
      map: {
        controls: [],
        maxResolution: 100,
        layers: [this.layer]
      }
    });

    Ext.apply(this, {
      layout: 'absolute',
      items: [{
        x: 5,
        y: 5,
        height: 150,
        width: 150,
        frame: true,
        items: this.map
      }, {
        x: 170,
        y: 5,
        height: 150,
        width: 400,
        layout: 'fit',
        frame: true,
        html: 'A: POINT( 10 10 ) <br><br> B: POINT ( 5 12 )'
      }]
    });

    jsts.vs.TestCaseDetailsPanel.superclass.initComponent
        .apply(this, arguments);
  },
  map: null,
  layer: null,
  showTestCase: function() {

    // TODO: use real test case input

    var geometry = new OpenLayers.Geometry.Point(10, 10);
    var feature = new OpenLayers.Feature.Vector(geometry, null, { stroke: false, fillColor: 'red', graphicName: 'square', pointRadius: 3});

    var geometry2 = new OpenLayers.Geometry.Point(5, 12);
    var feature2 = new OpenLayers.Feature.Vector(geometry2, null, { stroke: false, fillColor: 'blue', graphicName: 'square', pointRadius: 3});

    this.layer.addFeatures([feature, feature2]);

    var bounds = this.layer.getDataExtent();

    this.map.map.zoomToExtent(bounds);
  }
});