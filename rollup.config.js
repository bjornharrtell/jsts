import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'

export default {
  entry: 'src/jsts.js',
  format: 'umd',
  moduleName: 'jsts',
  plugins: [
    nodeResolve({}),
    commonjs({
      include: 'node_modules/**'
    }),
    babel({
      exclude: 'node_modules/**',
      plugins: ['transform-inline-environment-variables'],
      presets: ['es2015-rollup'],
      babelrc: false
    })
  ]
}
