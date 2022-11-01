import fs from 'fs'
import replace from '@rollup/plugin-replace'
import babel from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser'

const packageJson = JSON.parse(fs.readFileSync('./package.json'))
const license = fs.readFileSync('./license.txt', { encoding: 'utf8' })

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
      npm_package_version: packageJson.version
    }),
    babel({
      exclude: 'node_modules/**',
      presets: [['@babel/env', {
        targets: {
          browsers: ['>2%', 'not dead']
        }
      }]],
      babelrc: false
    }),
    terser()
  ]
}
