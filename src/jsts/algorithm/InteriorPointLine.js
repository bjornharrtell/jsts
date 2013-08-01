/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */



/**
 * Computes a point in the interior of an linear geometry.
 * <h2>Algorithm</h2>
 * <ul>
 * <li>Find an interior vertex which is closest to
 * the centroid of the linestring.
 * <li>If there is no interior vertex, find the endpoint which is
 * closest to the centroid.
 * </ul>
 *
 * @version 1.7
 *
 * @constructor
 */
jsts.algorithm.InteriorPointLine = function(geometry) {
 
    this.centroid;
    this.minDistance = Number.MAX_VALUE;
    this.interiorPoint = null;
    
    this.centroid = geometry.getCentroid().getCoordinate();
    this.addInterior(geometry);
    if (this.interiorPoint == null) {
        this.addEndpoints(geometry);
    }
};

jsts.algorithm.InteriorPointLine.prototype.getInteriorPoint = function() {
    return this.interiorPoint;
};

/**
 * Tests the interior vertices (if any)
 * defined by a linear Geometry for the best inside point.
 * If a Geometry is not of dimension 1 it is not tested.
 * @param {jsts.geom.Coordinate} geometry the geometry to add
 * @private
 */
jsts.algorithm.InteriorPointLine.prototype.addInterior = function(geometry) {
    if (geometry instanceof jsts.geom.LineString) {
        this.addInteriorCoord(geometry.getCoordinates());
    } else if (geometry instanceof jsts.geom.GeometryCollection) {
        for (var i = 0; i < geometry.getNumGeometries(); i++) {
            this.addInterior(geometry.getGeometryN(i));
        }
    }
};

/**
 * @private
 */
jsts.algorithm.InteriorPointLine.prototype.addInteriorCoord = function(pts) {
    for (var i = 1; i < pts.length - 1; i++) {
        this.add(pts[i]);
    }
};

/**
 * Tests the endpoint vertices
 * defined by a linear Geometry for the best inside point.
 * If a Geometry is not of dimension 1 it is not tested.
 * @param geom the geometry to add
 * @private
 */
jsts.algorithm.InteriorPointLine.prototype.addEndpoints = function(geometry) {
    if (geometry instanceof jsts.geom.LineString) {
        this.addEndpointsCoord(geometry.getCoordinates());
    } else if (geometry instanceof jsts.geom.GeometryCollection) {
        for (var i = 0; i < geometry.getNumGeometries(); i++) {
            this.addEndpoints(geometry.getGeometryN(i));
        }
    }
};

/**
 * @private
 */
jsts.algorithm.InteriorPointLine.prototype.addEndpointsCoord = function(pts) {
    this.add(pts[0]);
    this.add(pts[pts.length - 1]);
};

/**
 * @private
 */
jsts.algorithm.InteriorPointLine.prototype.add = function(point) {
    var dist = point.distance(this.centroid);
    if (dist < this.minDistance) {
        this.interiorPoint = new jsts.geom.Coordinate(point);
        this.minDistance = dist;
    }
};
