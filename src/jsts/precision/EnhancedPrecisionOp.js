/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

 /**
 * @requires jsts/geom/Geometry.js
 * @requires jsts/precision/CommonBitsOp.js
 */
 
/**
 * Provides versions of Geometry spatial functions which use
 * enhanced precision techniques to reduce the likelihood of robustness problems.
 *
 * @version 1.7
 *
 * @constructor
 */
jsts.precision.EnhancedPrecisionOp = function() {
};

/**
 * Computes the set-theoretic intersection of two {@link jsts.geom.Geometry}s, using enhanced precision.
 * @param {jsts.geom.Geometry} geom0 the first Geometry
 * @param {jsts.geom.Geometry} geom1 the second Geometry
 * @return {jsts.geom.Geometry} the Geometry representing the set-theoretic intersection of the input Geometries.
 */
jsts.precision.EnhancedPrecisionOp.intersection = function(geom0, geom1) {
    var originalEx;
    try {
        var result = geom0.intersection(geom1);
        return result;
    } catch (ex) {
        originalEx = ex;
    }
    
    /*
     * If we are here, the original op encountered a precision problem
     * (or some other problem).  Retry the operation with
     * enhanced precision to see if it succeeds
     */
    try {
        var cbo = new jsts.precision.CommonBitsOp(true);
        var resultEP = cbo.intersection(geom0, geom1);
        // check that result is a valid geometry after the reshift to orginal precision
        if (!resultEP.isValid()) {
            throw originalEx;
        }
        return resultEP;
    } catch (ex2){
        throw originalEx;
    }
};

/**
 * Computes the set-theoretic union of two {@link jsts.geom.Geometry}s, using enhanced precision.
 * @param {jsts.geom.Geometry} geom0 the first Geometry
 * @param {jsts.geom.Geometry} geom1 the second Geometry
 * @return {jsts.geom.Geometry} the Geometry representing the set-theoretic union of the input Geometries.
 */
jsts.precision.EnhancedPrecisionOp.union = function(geom0, geom1) {
    var originalEx;
    try {
        var result = geom0.union(geom1);
        return result;
    } catch (ex) {
        originalEx = ex;
    }
    
    /*
     * If we are here, the original op encountered a precision problem
     * (or some other problem).  Retry the operation with
     * enhanced precision to see if it succeeds
     */
    try {
        var cbo = new jsts.precision.CommonBitsOp(true);
        var resultEP = cbo.union(geom0, geom1);
        // check that result is a valid geometry after the reshift to orginal precision
        if (!resultEP.isValid()) {
            throw originalEx;
        }
        return resultEP;
    } catch (ex2){
        throw originalEx;
    }
};

/**
 * Computes the set-theoretic difference of two {@link jsts.geom.Geometry}s, using enhanced precision.
 * @param {jsts.geom.Geometry} geom0 the first Geometry
 * @param {jsts.geom.Geometry} geom1 the second Geometry
 * @return {jsts.geom.Geometry} the Geometry representing the set-theoretic difference of the input Geometries.
 */
jsts.precision.EnhancedPrecisionOp.difference = function(geom0, geom1) {
    var originalEx;
    try {
        var result = geom0.difference(geom1);
        return result;
    } catch (ex) {
        originalEx = ex;
    }
    
    /*
     * If we are here, the original op encountered a precision problem
     * (or some other problem).  Retry the operation with
     * enhanced precision to see if it succeeds
     */
    try {
        var cbo = new jsts.precision.CommonBitsOp(true);
        var resultEP = cbo.difference(geom0, geom1);
        // check that result is a valid geometry after the reshift to orginal precision
        if (!resultEP.isValid()) {
            throw originalEx;
        }
        return resultEP;
    } catch (ex2){
        throw originalEx;
    }
};

/**
 * Computes the set-theoretic symmetric difference of two {@link jsts.geom.Geometry}s, using enhanced precision.
 * @param {jsts.geom.Geometry} geom0 the first Geometry
 * @param {jsts.geom.Geometry} geom1 the second Geometry
 * @return {jsts.geom.Geometry} the Geometry representing the set-theoretic symmetric difference of the input Geometries.
 */
jsts.precision.EnhancedPrecisionOp.symDifference = function(geom0, geom1) {
    var originalEx;
    try {
        var result = geom0.symDifference(geom1);
        return result;
    } catch (ex) {
        originalEx = ex;
    }
    
    /*
     * If we are here, the original op encountered a precision problem
     * (or some other problem).  Retry the operation with
     * enhanced precision to see if it succeeds
     */
    try {
        var cbo = new jsts.precision.CommonBitsOp(true);
        var resultEP = cbo.symDifference(geom0, geom1);
        // check that result is a valid geometry after the reshift to orginal precision
        if (!resultEP.isValid()) {
            throw originalEx;
        }
        return resultEP;
    } catch (ex2){
        throw originalEx;
    }
};

/**
 * Computes the buffer of a {@link Geometry}, using enhanced precision.
 * This method should no longer be necessary, since the buffer algorithm
 * now is highly robust.
 *
 * @param {jsts.geom.Geometry} geom the first Geometry
 * @param {number} distance the buffer distance
 * @return {jsts.geom.Geometry} the Geometry representing the buffer of the input Geometry.
 */
jsts.precision.EnhancedPrecisionOp.buffer = function(geom, distance) {
    var originalEx;
    try {
        var result = geom.buffer(distance);
        return result;
    } catch (ex) {
        originalEx = ex;
    }
    
    /*
     * If we are here, the original op encountered a precision problem
     * (or some other problem).  Retry the operation with
     * enhanced precision to see if it succeeds
     */
    try {
        var cbo = new jsts.precision.CommonBitsOp(true);
        var resultEP = cbo.buffer(geom, distance);
        // check that result is a valid geometry after the reshift to orginal precision
        if (!resultEP.isValid()) {
            throw originalEx;
        }
        return resultEP;
    } catch (ex2){
        throw originalEx;
    }
};
