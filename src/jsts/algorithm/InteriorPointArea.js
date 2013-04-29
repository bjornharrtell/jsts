/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */



/**
 * Computes a point in the interior of an area geometry.
 *
 * <h2>Algorithm</h2>
 * <ul>
 *   <li>Find the intersections between the geometry
 *       and the horizontal bisector of the area's envelope
 *   <li>Pick the midpoint of the largest intersection (the intersections
 *       will be lines and points)
 * </ul>
 *
 * <h3>KNOWN BUGS</h3>
 * <ul>
 * <li>If a fixed precision model is used,
 * in some cases this method may return a point
 * which does not lie in the interior.
 * </ul>
 *
 * @version 1.7
 *
 * @constructor
 */
jsts.algorithm.InteriorPointArea = function(geometry) {
 
    this.factory;
    this.interiorPoint = null;
    this.maxWidth = 0;
    
    this.factory = geometry.getFactory();
    this.add(geometry);
};

/**
 * @private
 */
jsts.algorithm.InteriorPointArea.avg = function(a, b) {
    return (a + b) / 2;
};

jsts.algorithm.InteriorPointArea.prototype.getInteriorPoint = function() {
    return this.interiorPoint;
};

/**
 * Tests the interior vertices (if any)
 * defined by an areal Geometry for the best inside point.
 * If a component Geometry is not of dimension 2 it is not tested.
 * 
 * @param {jsts.geom.Geometry} geometry the geometry to add
 * @private
 */
jsts.algorithm.InteriorPointArea.prototype.add = function(geometry) {
    if (geometry instanceof jsts.geom.Polygon) {
        this.addPolygon(geometry);
    } else if (geometry instanceof jsts.geom.GeometryCollection) {
        for (var i = 0; i < geometry.getNumGeometries(); i++) {
            this.add(geometry.getGeometryN(i));
        }
    }
};

/**
 * Finds a reasonable point at which to label a Geometry.
 * @param {jsts.geom.Geometry} geometry the geometry to analyze
 */
jsts.algorithm.InteriorPointArea.prototype.addPolygon = function(geometry) {
    var bisector = this.horizontalBisector(geometry);

    var intersections = bisector.intersection(geometry);
    var widestIntersection = this.widestGeometry(intersections);

    var width = widestIntersection.getEnvelopeInternal().getWidth();
    if (this.interiorPoint == null || width > this.maxWidth) {
        this.interiorPoint = this.centre(widestIntersection.getEnvelopeInternal());
        this.maxWidth = width;
    }
};

/**
 * Finds widest geometry
 * @return if geometry is a collection, the widest sub-geometry; otherwise, the geometry itself
 * @protected
 */
jsts.algorithm.InteriorPointArea.prototype.widestGeometry = function(obj) {

    if (obj instanceof jsts.geom.GeometryCollection) {
        var gc = obj;
        if (gc.isEmpty()) {
            return gc;
        }

        var widestGeometry = gc.getGeometryN(0);
        for (var i = 1; i < gc.getNumGeometries(); i++) { //Start at 1
            if (gc.getGeometryN(i).getEnvelopeInternal().getWidth() >
                widestGeometry.getEnvelopeInternal().getWidth()) {
                
                widestGeometry = gc.getGeometryN(i);
            }
        }
        return widestGeometry;
    } else if (obj instanceof jsts.geom.Geometry) {
        return obj;
    }
};

/**
 * @protected
 */
jsts.algorithm.InteriorPointArea.prototype.horizontalBisector = function(geometry) {
    var envelope = geometry.getEnvelopeInternal();

    var avgY = jsts.algorithm.InteriorPointArea.avg(envelope.getMinY(), envelope.getMaxY());
    return this.factory.createLineString([
        new jsts.geom.Coordinate(envelope.getMinX(), avgY),
        new jsts.geom.Coordinate(envelope.getMaxX(), avgY)
    ]);
};

/**
 * Returns the centre point of the envelope.
 * @param {jsts.geom.Envelope} envelope the envelope to analyze
 * @return {jsts.geom.Coordinate} the centre of the envelope
 */
jsts.algorithm.InteriorPointArea.prototype.centre = function(envelope) {
    return new jsts.geom.Coordinate(
        jsts.algorithm.InteriorPointArea.avg(envelope.getMinX(), envelope.getMaxX()),
        jsts.algorithm.InteriorPointArea.avg(envelope.getMinY(), envelope.getMaxY())
    );
};
