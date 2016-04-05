import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
  entry: 'src/jsts.js',
  moduleName: 'jsts',
  plugins: [
    nodeResolve({}),
    commonjs({
      include: 'node_modules/**'
    })
  ]
}
