var pjson = require('./package.json')
import git from 'git-rev-sync'
import replace from 'rollup-plugin-replace'
// import nodeResolve from 'rollup-plugin-node-resolve'
// import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'

export default {
  entry: 'src/jsts.js',
  format: 'umd',
  moduleName: 'jsts',
  plugins: [
    replace({
      npm_package_version: pjson.version,
      git_hash: git.short()
    }),
    /*
    nodeResolve({}),
    commonjs({
      include: 'node_modules/**'
    }),
    */
    babel({
      exclude: 'node_modules/**',
      presets: ['es2015-rollup'],
      babelrc: false
    })
  ]
}
