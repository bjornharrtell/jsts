import testCaseResultsPanel from './testCaseResultsPanel'

const parser = new jsts.io.OL3Parser()

const features = new ol.Collection()
const source = new ol.source.Vector({ features })
const layer = new ol.layer.Vector({ source })

// let geometry

const map = new ol.Map({
  controls: [],
  layers: [layer],
  view: new ol.View({
    center: [ 0, 0 ],
    zoom: 10
  })
})

const mapComponent = Ext.create('Ext.panel.Panel', {
  html: '<div id="map" style="width:200px;height:200px"></div>',
  listeners: {
    afterrender () {
      map.setTarget('map')
    }
  }
})

const geometryComponent = Ext.create('Ext.panel.Panel', {
  html: ''
})

function createStyle (sc, fc) {
  const stroke = new ol.style.Stroke({
    color: sc,
    width: 1.5
  })

  const fill = new ol.style.Fill({
    color: fc
  })

  return function (zoom) {
    const styles = [
      new ol.style.Style({
        stroke,
        fill,
        image: new ol.style.Circle({
          fill,
          stroke,
          radius: 3
        })
      })
    ]

    // TODO: render vertices, need to be smarter...

    if (this.getGeometry() instanceof ol.geom.LineString ||
      this.getGeometry() instanceof ol.geom.Polygon ||
      this.getGeometry() instanceof ol.geom.MultiLineString ||
      this.getGeometry() instanceof ol.geom.MultiPolygon
    ) {
      const vs = new ol.style.Style({
        image: new ol.style.RegularShape({
          fill: new ol.style.Fill({
            color: 'black'
          }),
          stroke: new ol.style.Stroke({
            color: 'black',
            width: 1
          }),
          points: 4,
          radius: 5,
          radius2: 0,
          angle: Math.PI / 4
        }),
        geometry: function (feature) {
          const coordinate = parser.read(feature.getGeometry()).getCoordinates().map(c => [c.x, c.y])
          return new ol.geom.MultiPoint(coordinate)
        }
      })
      styles.push(vs)
    }

    return styles
  }
}

export default Ext.create('Ext.panel.Panel', {
  layout: {
    type: 'hbox',
    align: 'stretch'
  },
  items: [{
    title: 'Visual',
    height: 200,
    width: 200,
    layout: 'fit',
    frame: true,
    items: mapComponent
  }, {
    title: 'Input',
    padding: 5,
    height: 150,
    width: 400,
    layout: 'fit',
    frame: true,
    flex: 1,
    items: geometryComponent
  },
    testCaseResultsPanel
  ],
  showTestCase (record) {
    var reader = new jsts.io.WKTReader()
    var writer = new jsts.io.WKTWriter()

    var a = reader.read(record.data.a)
    var b = reader.read(record.data.b)

    testCaseResultsPanel.showTestResults(a, b)
    geometryComponent.update(writer.write(a) + '<br><br>' + writer.write(b))

    var fa = new ol.Feature({
      geometry: parser.write(a)
    })
    fa.setStyle(createStyle([0, 0, 255, 0.5], [0, 0, 255, 0.3]))

    var fb = new ol.Feature({
      geometry: parser.write(b)
    })
    fb.setStyle(createStyle([255, 0, 0, 0.5], [255, 0, 0, 0.3]))

    features.clear()
    features.extend([fa, fb])

    const view = map.getView()
    const extent = source.getExtent()
    view.fit(extent, map.getSize())
    map.updateSize()
  },
  reset: function () {
    source.clear()
    geometryComponent.update('')
  }
})
