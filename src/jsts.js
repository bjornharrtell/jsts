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

import geom from './org/locationtech/jts/geom/geom'
import algorithm from './org/locationtech/jts/algorithm/algorithm'
import densify from './org/locationtech/jts/densify/densify'
import dissolve from './org/locationtech/jts/dissolve/dissolve'
import index from './org/locationtech/jts/index/index'
import io from './org/locationtech/jts/io/io'
import noding from './org/locationtech/jts/noding/noding'
import operation from './org/locationtech/jts/operation/operation'
import precision from './org/locationtech/jts/precision/precision'
import simplify from './org/locationtech/jts/simplify/simplify'
import triangulate from './org/locationtech/jts/triangulate/triangulate'

import patch from './org/locationtech/jts/monkey'

(function () {
  patch()
})()

export const version = 'npm_package_version (git_hash)'
export {
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
