/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */



/**
 * Builds the buffer geometry for a given input geometry and precision model.
 * Allows setting the level of approximation for circular arcs, and the
 * precision model in which to carry out the computation.
 * <p>
 * When computing buffers in floating point double-precision it can happen that
 * the process of iterated noding can fail to converge (terminate). In this case
 * a TopologyException will be thrown. Retrying the computation in a fixed
 * precision can produce more robust results.
 *
 * @param {jsts.operation.buffer.BufferParameters}
 *          bufParams
 * @constructor
 */
jsts.operation.buffer.BufferBuilder = function(bufParams) {
  this.bufParams = bufParams;
};

jsts.operation.buffer.BufferBuilder.prototype.buffer = function() {
  throw new jsts.error.NotImplementedError();
};

// TODO: port rest of class
