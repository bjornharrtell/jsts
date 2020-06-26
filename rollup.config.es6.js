import fs from 'fs'
import git from 'git-rev-sync'
import replace from 'rollup-plugin-replace'
import babel from '@rollup/plugin-babel'

const packageJson = JSON.parse(fs.readFileSync('./package.json'))
const license = fs.readFileSync('./license.txt', { encoding: 'utf8' })

export default {
  input: 'src/jsts.es6.js',
  output: {
    file: 'dist/jsts.es6.js',
    format: 'es',
    name: 'jsts',
    banner: license,
    sourcemap: true
  },
  plugins: [
    replace({
      npm_package_version: packageJson.version,
      git_hash: git.short()
    }),
    babel({
      exclude: 'node_modules/**',
      presets: [['@babel/env', {
        targets: {
          browsers: ['>5%', 'not dead', 'not ie 11']
        }
      }]],
      babelrc: false
    })
  ]
}
