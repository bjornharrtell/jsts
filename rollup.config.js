import fs from 'fs'
import git from 'git-rev-sync'
import replace from 'rollup-plugin-replace'
import babel from 'rollup-plugin-babel'

const packageJson = JSON.parse(fs.readFileSync('./package.json'))
const license = fs.readFileSync('./license.txt')

export default {
  input: 'src/jsts.js',
  output: {
    file: 'dist/jsts.js',
    format: 'umd',
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
