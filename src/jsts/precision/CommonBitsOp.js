/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

 /**
 * @requires jsts/geom/Geometry.js
 * @requires jsts/precision/CommonBitsRemover.js
 */
 
 /**
 * Provides versions of Geometry spatial functions which use
 * common bit removal to reduce the likelihood of robustness problems.
 * <p>
 * In the current implementation no rounding is performed on the
 * reshifted result geometry, which means that it is possible
 * that the returned Geometry is invalid.
 * Client classes should check the validity of the returned result themselves.
 *
 * @version 1.7
 *
 * @constructor
 */
jsts.precision.CommonBitsOp = function(returnToOriginalPrecision) {
    
    /**
     * @type {boolean}
     * @private
     */
    this.returnToOriginalPrecision;

    /**
     * @type {jsts.precision.CommonBitsRemover}
     * @private
     */
    this.cbr;
    
    this.returnToOriginalPrecision = returnToOriginalPrecision === undefined ? true : returnToOriginalPrecision;
};

/**
 * Computes the set-theoretic intersection of two {@link Geometry}s, using enhanced precision.
 * @param {jsts.geom.Geometry} geom0 the first Geometry
 * @param {jsts.geom.Geometry} geom1 the second Geometry
 * @return {jsts.geom.Geometry} the Geometry representing the set-theoretic intersection of the input Geometries.
 */
jsts.precision.CommonBitsOp.prototype.intersection = function(geom0, geom1) {
    var geom = this.removeCommonBits(geom0, geom1);
    return this.computeResultPrecision(geom[0].intersection(geom[1]));
};

/**
 * Computes the set-theoretic union of two {@link Geometry}s, using enhanced precision.
 * @param {jsts.geom.Geometry} geom0 the first Geometry
 * @param {jsts.geom.Geometry} geom1 the second Geometry
 * @return {jsts.geom.Geometry} the Geometry representing the set-theoretic union of the input Geometries.
 */
jsts.precision.CommonBitsOp.prototype.union = function(geom0, geom1) {
    var geom = this.removeCommonBits(geom0, geom1);
    return this.computeResultPrecision(geom[0].union(geom[1]));
};

/**
 * Computes the set-theoretic difference of two {@link Geometry}s, using enhanced precision.
 * @param {jsts.geom.Geometry} geom0 the first Geometry
 * @param {jsts.geom.Geometry} geom1 the second Geometry, to be subtracted from the first
 * @return {jsts.geom.Geometry} the Geometry representing the set-theoretic difference of the input Geometries.
 */
jsts.precision.CommonBitsOp.prototype.difference = function(geom0, geom1) {
    var geom = this.removeCommonBits(geom0, geom1);
    return this.computeResultPrecision(geom[0].difference(geom[1]));
};

/**
 * Computes the set-theoretic symmetric difference of two geometries,
 * using enhanced precision.
 * @param {jsts.geom.Geometry} geom0 the first Geometry
 * @param {jsts.geom.Geometry} geom1 the second Geometry
 * @return {jsts.geom.Geometry} the Geometry representing the set-theoretic symmetric difference of the input Geometries.
 */
jsts.precision.CommonBitsOp.prototype.symDifference = function(geom0, geom1) {
    var geom = this.removeCommonBits(geom0, geom1);
    return this.computeResultPrecision(geom[0].symDifference(geom[1]));
};

  /**
   * Computes the buffer a geometry,
   * using enhanced precision.
   * @param {jsts.geom.Geometry} geom0 the Geometry to buffer
   * @param {number} distance the buffer distance
   * @return {jsts.geom.Geometry} the Geometry representing the buffer of the input Geometry.
   */
jsts.precision.CommonBitsOp.prototype.buffer = function(geom0, distance) {
    var geom = this.removeCommonBits(geom0);
    return this.computeResultPrecision(geom.buffer(distance));
};

/**
 * If required, returning the result to the orginal precision if required.
 * <p>
 * In this current implementation, no rounding is performed on the
 * reshifted result geometry, which means that it is possible
 * that the returned Geometry is invalid.
 *
 * @param {jsts.geom.Geometry} result the result Geometry to modify
 * @return {jsts.geom.Geometry} the result Geometry with the required precision
 * @private
 */
jsts.precision.CommonBitsOp.prototype.computeResultPrecision = function(result) {
    if (this.returnToOriginalPrecision) {
        this.cbr.addCommonBits(result);
    }
    return result;
};

/**
 * @private
 */
jsts.precision.CommonBitsOp.prototype.removeCommonBits = function() {
    if (arguments.length === 1) {
        return this.removeCommonBits1(arguments[0]);
    } else if (arguments.length === 2) {
        return this.removeCommonBits2(arguments[0], arguments[1]);
    } else {
        throw "Wrong argument count!";
    }
};

/**
 * Computes a copy of the input {@link Geometry} with the calculated common bits
 * removed from each coordinate.
 * @param {jsts.geom.Geometry} geom0 the Geometry to remove common bits from
 * @return {jsts.geom.Geometry} a copy of the input Geometry with common bits removed
 * @private
 */
jsts.precision.CommonBitsOp.prototype.removeCommonBits1 = function(geom0) {
    this.cbr = new jsts.precision.CommonBitsRemover();
    this.cbr.add(geom0);
    var geom = this.cbr.removeCommonBits(geom0.clone());
    return geom;
};

/**
 * Computes a copy of each input {@link Geometry}s with the calculated common bits
 * removed from each coordinate.
 * @param {jsts.geom.Geometry} geom0 a Geometry to remove common bits from
 * @param {jsts.geom.Geometry} geom1 a Geometry to remove common bits from
 * @return {Array.<jsts.geom.Geometry>} an array containing copies of the input Geometry's with common bits removed
 * @private
 */
jsts.precision.CommonBitsOp.prototype.removeCommonBits2 = function(geom0, geom1) {
    this.cbr = new jsts.precision.CommonBitsRemover();
    this.cbr.add(geom0);
    this.cbr.add(geom1);
    var geom = [
        this.cbr.removeCommonBits(geom0.clone()),
        this.cbr.removeCommonBits(geom1.clone())
    ];
    return geom;
};
