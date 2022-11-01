import * as geom from './org/locationtech/jts/geom.js'
import * as algorithm from './org/locationtech/jts/algorithm.js'
import * as densify from './org/locationtech/jts/densify.js'
import * as dissolve from './org/locationtech/jts/dissolve.js'
import * as geomgraph from './org/locationtech/jts/geomgraph.js'
import * as index from './org/locationtech/jts/index.js'
import * as io from './org/locationtech/jts/io.js'
import * as noding from './org/locationtech/jts/noding.js'
import * as operation from './org/locationtech/jts/operation.js'
import * as precision from './org/locationtech/jts/precision.js'
import * as simplify from './org/locationtech/jts/simplify.js'
import * as triangulate from './org/locationtech/jts/triangulate.js'
import * as linearref from './org/locationtech/jts/linearref.js'
import * as util from './org/locationtech/jts/util.js'

import './org/locationtech/jts/monkey.js'

const version = 'npm_package_version'
export {
  version,
  algorithm,
  densify,
  dissolve,
  geom,
  geomgraph,
  index,
  io,
  noding,
  operation,
  precision,
  simplify,
  triangulate,
  linearref,
  util
}
