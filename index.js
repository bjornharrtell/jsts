function demo () {
  var reader = new jsts.io.WKTReader()
  var parser = new jsts.io.OL3Parser()

  function visualize (geometries, override, i) {
    var colors = [[255, 0, 0, 0.5], [0, 0, 255, 0.5], [0, 150, 0, 0.5]]

    function createStyle (color) {
      return new ol.style.Style({
        image: new ol.style.Circle({
          fill: new ol.style.Fill({
            color: color
          }),
          stroke: new ol.style.Stroke({
            color: 'black',
            width: 1
          }),
          radius: 3
        }),
        fill: new ol.style.Fill({
          color: color
        }),
        stroke: new ol.style.Stroke({
          color: 'black',
          width: 1
        })
      })
    }

    var features = geometries.map(function (g, i) {
      var f = new ol.Feature({
        geometry: parser.write(g)
      })
      f.setStyle(createStyle(override ? colors[2] : colors[i]))
      return f
    })

    var source = new ol.source.Vector({
      features: features
    })
    var layer = new ol.layer.Vector({
      source: source
      // style: createStyle(color)
    })

    //var maps = document.getElementById('maps')
    //var div = document.createElement('span')
    //div.classList.add('map')
    //maps.appendChild(div)

    new ol.Map({
      layers: [ layer ],
      target: 'map' + i,
      controls: [],
      view: new ol.View({
        center: [0, 0],
        resolution: 1
      })
    })
  }

  var p1 = reader.read('POINT (-20 0)')
  var p2 = reader.read('POINT (20 0)')
  var a = [p1, p2]
  var b = a.map(function (g) { return g.buffer(40) })
  var c = [b[0].intersection(b[1])]
  var d = [b[0].difference(b[1])]
  var e = [b[0].union(b[1])]
  var f = [b[0].symDifference(b[1])]
  var geometries = [a, b, c, d, e, f]
  var override = [false, false, true, true, true, true]
  geometries.forEach(function (e, i) {
    visualize(e, override[i], i)
  })
}
