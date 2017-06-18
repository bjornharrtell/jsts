import babel from 'rollup-plugin-babel'
import includePaths from 'rollup-plugin-includepaths'

export default {
  entry: 'test/auto/browser/runner.js',
  format: 'umd',
  moduleName: 'jsts-testrunner',
  sourceMap: true,
  plugins: [
    includePaths({
      paths: ['src'],
    }),
    babel({
      exclude: 'node_modules/**',
      presets: [['env', {
        modules: false,
        targets: {
          browsers: ['last 2 versions', 'ie >= 11']
        }
      }]],
      plugins: [
        'external-helpers'
      ],
      babelrc: false
    })
  ]
}
