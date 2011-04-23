/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */



/**
 * @constructor
 * @augments jsts.algorithm.LineIntersector
 */
jsts.algorithm.RobustLineIntersector = function() {
  jsts.geomgraph.RobustLineIntersector.prototype.constructor.call(this);
};

jsts.algorithm.RobustLineIntersector.prototype = new jsts.algorithm.LineIntersector();

// TODO: port
