/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/**
 * Experimental code to union MultiPolygons
 * with processing limited to the elements which actually interact.
 *
 * Not currently used, since it doesn't seem to offer much of a performance advantage.
 *
 */


/**
 * @param {Geometry} g0
 * @param {Geometry} g1
 */
jsts.operation.union.UnionInteracting = function(g0, g1) {

};


/**
 * @param {Geometry} g0
 * @param {Geometry} g1
 * @return {Geometry}
 */
jsts.operation.union.UnionInteracting.union = function(g0, g1) {

};


/**
 * @type {GeometryFactory}
 */
jsts.operation.union.UnionInteracting.prototype.geomFactory;


/**
 * @type {Geometry}
 */
jsts.operation.union.UnionInteracting.prototype.g0;


/**
 * @type {Geometry}
 */
jsts.operation.union.UnionInteracting.prototype.g1;


/**
 * @type {Boolean[]}
 */
jsts.operation.union.UnionInteracting.prototype.interacts0;


/**
 * @type {Boolean[]}
 */
jsts.operation.union.UnionInteracting.prototype.interacts1;


/**
 * @return {Geometry}
 */
jsts.operation.union.UnionInteracting.prototype.union = function() {

};


/**
 * @param {Geometry} g0
 * @param {Geometry} g1
 * @return {Geometry}
 * @private
 */
jsts.operation.union.UnionInteracting.prototype.bufferUnion = function(g0, g1) {

};


/**
 * @param {Geometry} [elem0].
 * @return {void}
 * @return {Boolean}
 * @private
 */
jsts.operation.union.UnionInteracting.prototype.computeInteracting = function(elem0) {

};


/**
 * @param {Geometry} geom
 * @param {Boolean[]} interacts
 * @param {Boolean} isInteracting
 * @return {Geometry}
 * @private
 */
jsts.operation.union.UnionInteracting.prototype.extractElements = function(geom, interacts, isInteracting) {

};

