import WKTReader from 'https://unpkg.com/jsts@1.6.0/org/locationtech/jts/io/WKTReader.js'
import OL3Parser from 'https://unpkg.com/jsts@1.6.0/org/locationtech/jts/io/OL3Parser.js'

import BufferOp from 'https://unpkg.com/jsts@1.6.0/org/locationtech/jts/operation/buffer/BufferOp.js'
import OverlayOp from 'https://unpkg.com/jsts@1.6.0/org/locationtech/jts/operation/overlay/OverlayOp.js'
import UnionOp from 'https://unpkg.com/jsts@1.6.0/org/locationtech/jts/operation/union/UnionOp.js'

const reader = new WKTReader()
const parser = new OL3Parser()

function visualize (geometries, override, i) {
  const colors = [[255, 0, 0, 0.5], [0, 0, 255, 0.5], [0, 150, 0, 0.5]]

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

  const features = geometries.map((g, i) => {
    const f = new ol.Feature({
      geometry: parser.write(g)
    })
    f.setStyle(createStyle(override ? colors[2] : colors[i]))
    return f
  })

  const source = new ol.source.Vector({
    features: features
  })
  const layer = new ol.layer.Vector({
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

const p1 = reader.read('POINT (-20 0)')
const p2 = reader.read('POINT (20 0)')
const a = [p1, p2]
const b = a.map(g => BufferOp.bufferOp(g, 40))
const c = [OverlayOp.intersection(b[0], b[1])]
const d = [OverlayOp.difference(b[0], b[1])]
const e = [UnionOp.union(b[0], b[1])]
const f = [OverlayOp.symDifference(b[0], b[1])]
const geometries = [a, b, c, d, e, f]
const override = [false, false, true, true, true, true]
geometries.forEach((e, i) => visualize(e, override[i], i))

