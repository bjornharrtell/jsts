import fs from 'fs'
import git from 'git-rev-sync'
import replace from 'rollup-plugin-replace'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

const pckg = require('./package.json')
const license = fs.readFileSync('./license.txt')

/**
 * Babel Rollup Plugins
 */
const babelPlugins = [
  replace({
    npm_package_version: pckg.version,
    git_hash: git.short()
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

/**
 * Minify Rollup Plugins
 */
const minifyPlugins = [uglify(), ...babelPlugins]

/**
 * Assign default Rollup configs
 */
function assign({file, format, plugins}) {
  return {
    input: 'src/jsts.js',
    output: {
      file,
      format: format || 'umd',
      name: 'jsts',
      banner: license,
      sourcemap: true,
    },
    plugins: [...plugins || []]
  }
}

export default [
  assign({ format: 'cjs', file: 'dist/jsts.js' }),
  assign({ format: 'es', file: 'dist/jsts.mjs' }),
  assign({ format: 'umd', file: 'dist/jsts.min.js', plugins: minifyPlugins })
]