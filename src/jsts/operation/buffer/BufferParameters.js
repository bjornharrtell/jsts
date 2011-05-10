/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */


/**
 * Contains the parameters which describe how a buffer should be constructed.
 */
jsts.operation.buffer.BufferParameters = function() {

};


/**
 * Specifies a round line buffer end cap style.
 *
 * @type {int}
 */
jsts.operation.buffer.BufferParameters.CAP_ROUND = 1;


/**
 * Specifies a flat line buffer end cap style.
 *
 * @type {int}
 */
jsts.operation.buffer.BufferParameters.CAP_FLAT = 2;


/**
 * Specifies a square line buffer end cap style.
 *
 * @type {int}
 */
jsts.operation.buffer.BufferParameters.CAP_SQUARE = 3;


/**
 * Specifies a round join style.
 *
 * @type {int}
 */
jsts.operation.buffer.BufferParameters.JOIN_ROUND = 1;


/**
 * Specifies a mitre join style.
 */
jsts.operation.buffer.BufferParameters.JOIN_MITRE = 2;


/**
 * Specifies a bevel join style.
 *
 * @type {int}
 */
jsts.operation.buffer.BufferParameters.OIN_BEVEL = 3;


/**
 * The default number of facets into which to divide a fillet of 90 degrees. A
 * value of 8 gives less than 2% max error in the buffer distance. For a max
 * error of < 1%, use QS = 12. For a max error of < 0.1%, use QS = 18.
 *
 * @type {int}
 */
jsts.operation.buffer.BufferParameters.DEFAULT_QUADRANT_SEGMENTS = 8;


/**
 * The default mitre limit Allows fairly pointy mitres.
 *
 * @type {double}
 */
jsts.operation.buffer.BufferParameters.DEFAULT_MITRE_LIMIT = 5.0;


/**
 * @type {int}
 * @private
 */
jsts.operation.buffer.BufferParameters.prototype.quadrantSegments = jsts.operation.buffer.BufferParameters.DEFAULT_QUADRANT_SEGMENTS;


/**
 * @type {int}
 * @private
 */
jsts.operation.buffer.BufferParameters.prototype.endCapStyle = jsts.operation.buffer.BufferParameters.CAP_ROUND;


/**
 * @type {int}
 * @private
 */
jsts.operation.buffer.BufferParameters.prototype.joinStyle = jsts.operation.buffer.BufferParameters.JOIN_ROUND;


/**
 * @type {double}
 * @private
 */
jsts.operation.buffer.BufferParameters.prototype.mitreLimit = jsts.operation.buffer.BufferParameters.DEFAULT_MITRE_LIMIT;


/**
 * Specifies the end cap style of the generated buffer. The styles supported are
 * {@link #CAP_ROUND}, {@link #CAP_BUTT}, and {@link #CAP_SQUARE}. The
 * default is CAP_ROUND.
 *
 * @param {int}
 *          endCapStyle the end cap style to specify.
 */
jsts.operation.buffer.BufferParameters.prototype.setEndCapStyle = function(
    endCapStyle) {
  this.endCapStyle = endCapStyle;
};


/**
 * Sets the number of segments used to approximate a angle fillet
 *
 * @param {int}
 *          quadrantSegments the number of segments in a fillet for a quadrant.
 */
jsts.operation.buffer.BufferParameters.prototype.setQuadrantSegments = function(
    quadrantSegments) {
  this.quadrantSegments = quadrantSegments;
};


// TODO: port rest of class...
