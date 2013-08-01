/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */



/**
 * Computes a point in the interior of an point geometry.
 * <h2>Algorithm</h2>
 * Find a point which is closest to the centroid of the geometry.
 *
 * @version 1.7
 *
 * @constructor
 */
 jsts.algorithm.InteriorPointPoint = function(geometry) {
 
    this.minDistance = Number.MAX_VALUE;
    
    this.interiorPoint = null;
    
    this.centroid = geometry.getCentroid().getCoordinate();
    this.add(geometry);
};

/**
 * Tests the point(s) defined by a Geometry for the best inside point.
 * If a Geometry is not of dimension 0 it is not tested.
 * @param {jsts.geom.Geometry} geometry the geometry to add
 * @private
 */
jsts.algorithm.InteriorPointPoint.prototype.add = function(geometry) {
    if (geometry instanceof jsts.geom.Point) {
        this.addPoint(geometry.getCoordinate());
    } else if (geometry instanceof jsts.geom.GeometryCollection) {
        for (var i = 0; i < geometry.getNumGeometries(); i++) {
            this.add(geometry.getGeometryN(i));
        }
    }
};

/**
 * @private
 */
jsts.algorithm.InteriorPointPoint.prototype.addPoint = function(point) {
    var dist = point.distance(this.centroid);
    if (dist < this.minDistance) {
        this.interiorPoint = new jsts.geom.Coordinate(point);
        this.minDistance = dist;
    }
};

jsts.algorithm.InteriorPointPoint.prototype.getInteriorPoint = function() {
    return this.interiorPoint;
};
