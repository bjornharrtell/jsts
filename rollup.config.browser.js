import nodeResolve from 'rollup-plugin-node-resolve'

export default {
  entry: 'src/browser.js',
  format: 'iife',
  moduleName: 'jsts',
  plugins: [
    nodeResolve({})
  ]
}
