import './Array'
import './Number'
import './Math'

import * as geom from './org/locationtech/jts/geom'
import * as algorithm from './org/locationtech/jts/algorithm'
import * as densify from './org/locationtech/jts/densify'
import * as dissolve from './org/locationtech/jts/dissolve'
import * as index from './org/locationtech/jts/index'
import * as io from './org/locationtech/jts/io'
import * as noding from './org/locationtech/jts/noding'
import * as operation from './org/locationtech/jts/operation'
import * as precision from './org/locationtech/jts/precision'
import * as simplify from './org/locationtech/jts/simplify'
import * as triangulate from './org/locationtech/jts/triangulate'

import './org/locationtech/jts/monkey'

const version = 'npm_package_version (git_hash)'
export {
  version,
  algorithm,
  densify,
  dissolve,
  geom,
  index,
  io,
  noding,
  operation,
  precision,
  simplify,
  triangulate
}
