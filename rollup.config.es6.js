var pjson = require('./package.json')
import git from 'git-rev-sync'
import replace from 'rollup-plugin-replace'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
  entry: 'src/jsts.js',
  exports: 'named',
  plugins: [
    replace({
      npm_package_version: pjson.version,
      git_hash: git.short()
    }),
    nodeResolve({}),
    commonjs({
      include: 'node_modules/**'
    })
  ]
}
