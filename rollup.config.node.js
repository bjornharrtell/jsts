import nodeResolve from 'rollup-plugin-node-resolve'

export default {
  entry: 'src/jsts.js',
  format: 'cjs',
  plugins: [
    nodeResolve({})
  ]
}
