import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
  entry: 'src/browser.js',
  format: 'iife',
  moduleName: 'jsts',
  plugins: [
    nodeResolve({}),
    commonjs({
      include: 'node_modules/**'
    })
  ]
}
