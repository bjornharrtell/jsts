/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/**
 * @requires jsts/geom/Coordinate.js
 * @requires jsts/geom/Geometry.js
 * @requires jsts/geom/CoordinateFilter.js
 * @requires jsts/precision/CommonBits.js
 */

/**
 * Removes common most-significant mantissa bits 
 * from one or more {@link Geometry}s.
 * <p>
 * The CommonBitsRemover "scavenges" precision 
 * which is "wasted" by a large displacement of the geometry 
 * from the origin.  
 * For example, if a small geometry is displaced from the origin 
 * by a large distance, 
 * the displacement increases the significant figures in the coordinates, 
 * but does not affect the <i>relative</i> topology of the geometry.  
 * Thus the geometry can be translated back to the origin 
 * without affecting its topology.
 * In order to compute the translation without affecting 
 * the full precision of the coordinate values, 
 * the translation is performed at the bit level by
 * removing the common leading mantissa bits.
 * <p>
 * If the geometry envelope already contains the origin, 
 * the translation procedure cannot be applied.  
 * In this case, the common bits value is computed as zero.
 * <p>
 * If the geometry crosses the Y axis but not the X axis 
 * (and <i>mutatis mutandum</i>), 
 * the common bits for Y are zero, 
 * but the common bits for X are non-zero.
 *
 * @version 1.7
 *
 * @constructor
 */
jsts.precision.CommonBitsRemover = function() {
    
    /**
     * @type {jsts.geom.Coordinate}
     * @private
     */
    this.commonCoord;
    
    /**
     * @type {jsts.precision.CommonCoordinateFilter}
     * @private
     */
    this.ccFilter = new jsts.precision.CommonCoordinateFilter();
};

/**
 * Add a geometry to the set of geometries whose common bits are
 * being computed.  After this method has executed the
 * common coordinate reflects the common bits of all added
 * geometries.
 *
 * @param {jsts.geom.Geometry} geom a Geometry to test for common bits
 */
jsts.precision.CommonBitsRemover.prototype.add = function(geom) {
    geom.apply(this.ccFilter);
    this.commonCoord = this.ccFilter.getCommonCoordinate();
};

/**
 * The common bits of the Coordinates in the supplied Geometries.
 *
 * @return {jsts.geom.Coordinate}
 */
jsts.precision.CommonBitsRemover.prototype.getCommonCoordinate = function() {
    return this.commonCoord;
};

/**
 * Removes the common coordinate bits from a Geometry.
 * The coordinates of the Geometry are changed.
 *
 * @param {jsts.geom.Geometry} geom the Geometry from which to remove the common coordinate bits
 * @return {jsts.geom.Geometry} the shifted Geometry
 */
jsts.precision.CommonBitsRemover.prototype.removeCommonBits = function(geom) {
    if (this.commonCoord.x === 0 && this.commonCoord.y === 0) {
        return geom;
    }
    var invCoord = new jsts.geom.Coordinate(this.commonCoord);
    invCoord.x = -invCoord.x;
    invCoord.y = -invCoord.y;
    var trans = new jsts.precision.Translater(invCoord);
    geom.apply(trans);
    // TODO: call geom.geometryChanged(); when ported
    return geom;
};

/**
 * Adds the common coordinate bits back into a Geometry.
 * The coordinates of the Geometry are changed.
 *
 * @param {jsts.geom.Geometry} geom the Geometry to which to add the common coordinate bits
 */
jsts.precision.CommonBitsRemover.prototype.addCommonBits = function (geom) {
    var trans = new jsts.precision.Translater(this.commonCoord);
    geom.apply(trans);
    // TODO: call geom.geometryChanged(); when ported
};

/**
 * @constructor
 * @implements {jsts.geom.CoordinateFilter}
 */
jsts.precision.CommonCoordinateFilter = function() {

    /**
     * @type {jsts.precision.CommonBits}
     * @private
     */
    this.commonBitsX = new jsts.precision.CommonBits();

    /**
     * @type {jsts.precision.CommonBits}
     * @private
     */
    this.commonBitsY = new jsts.precision.CommonBits();
};

jsts.precision.CommonCoordinateFilter.prototype = new jsts.geom.CoordinateFilter();
jsts.precision.CommonCoordinateFilter.constructor = jsts.precision.CommonCoordinateFilter;


jsts.precision.CommonCoordinateFilter.prototype.filter = function (coord) {
    this.commonBitsX.add(coord.x);
    this.commonBitsY.add(coord.y);
};

jsts.precision.CommonCoordinateFilter.prototype.getCommonCoordinate = function () {
    return new jsts.geom.Coordinate(
        this.commonBitsX.getCommon(),
        this.commonBitsY.getCommon()
    );
};


/**
 * @constructor
 * @implements {jsts.geom.CoordinateFilter}
 */
jsts.precision.Translater = function(trans) {

    /**
     * @type {jsts.geom.Coordinate}
     * @private
     */
    this.trans = trans;
};

jsts.precision.Translater.prototype = new jsts.geom.CoordinateFilter();
jsts.precision.Translater.constructor = jsts.precision.Translater;

jsts.precision.Translater.prototype.filter = function (coord) {
    coord.x += this.trans.x;
    coord.y += this.trans.y;
};
