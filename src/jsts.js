/**
 * Copyright (c) 2016 by Björn Harrtell.
 * License: https://github.com/bjornharrtell/jsts/blob/master/LICENSE_BHARRTELL_BSD3.txt
 * @module
 */

import 'es6-collections'
import './fill'
import './parseFloat'
import './isFinite'
import './isInteger'
import './isNaN'
import './trunc'

import * as geom from './org/locationtech/jts/geom/geom'
import * as algorithm from './org/locationtech/jts/algorithm/algorithm'
import * as densify from './org/locationtech/jts/densify/densify'
import * as dissolve from './org/locationtech/jts/dissolve/dissolve'
import * as index from './org/locationtech/jts/index/index'
import * as io from './org/locationtech/jts/io/io'
import * as noding from './org/locationtech/jts/noding/noding'
import * as operation from './org/locationtech/jts/operation/operation'
import * as precision from './org/locationtech/jts/precision/precision'
import * as simplify from './org/locationtech/jts/simplify/simplify'
import * as triangulate from './org/locationtech/jts/triangulate/triangulate'

import patch from './org/locationtech/jts/monkey'

(function () {
  patch()
})()

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
