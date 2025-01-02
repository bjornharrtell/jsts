import fs from 'fs'
import replace from '@rollup/plugin-replace'
import terser from '@rollup/plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

const packageJson = JSON.parse(fs.readFileSync('./package.json'))
const license = fs.readFileSync('./license.txt', { encoding: 'utf8' })

export default {
  input: 'src/jsts.js',
  output: {
    file: 'dist/jsts.js',
    format: 'umd',
    name: 'jsts',
    banner: license,
    sourcemap: true,
    globals: {
      'ol/Feature.js': 'ol.Feature',
      'ol/geom/Point.js': 'ol.geom.Point',
      'ol/geom/MultiPoint.js': 'ol.geom.MultiPoint',
      'ol/geom/LineString.js': 'ol.geom.LineString',
      'ol/geom/MultiLineString.js': 'ol.geom.MultiLineString',
      'ol/geom/Polygon.js': 'ol.geom.Polygon',
      'ol/geom/MultiPolygon.js': 'ol.geom.MultiPolygon',
      'ol/geom/GeometryLayout.js': 'ol.geom.GeometryLayout',
      'ol/loadingstrategy.js': 'ol.loadingstrategy',
      'ol/proj.js': 'ol.proj',
    },
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    replace({
      npm_package_version: packageJson.version,
      preventAssignment: true
    }),
    terser()
  ]
}
