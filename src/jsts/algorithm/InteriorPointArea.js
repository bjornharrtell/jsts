/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */



/**
 * Computes a point in the interior of an areal geometry.
 *
 * <h2>Algorithm</h2>
 * <ul>
 *   <li>Find a Y value which is close to the centre of
 *       the geometry's vertical extent but is different
 *       to any of it's Y ordinates.
 *   <li>Create a horizontal bisector line using the Y value
 *       and the geometry's horizontal extent
 *   <li>Find the intersection between the geometry
 *       and the horizontal bisector line.
 *       The intersection is a collection of lines and points.
 *   <li>Pick the midpoint of the largest intersection geometry
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

jsts.algorithm.InteriorPointArea.avg = function(a, b) {
    return (a + b) / 2;
};

/**
 * Gets the computed interior point.
 *
 * @return {jsts.geom.Coordinate} the coordinate of an interior point
 */
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
 * Finds an interior point of a Polygon.
 * @param {jsts.geom.Geometry} geometry the geometry to analyze
 */
jsts.algorithm.InteriorPointArea.prototype.addPolygon = function(geometry) {
    if (geometry.isEmpty()) {
        return;
    }

    var intPt;
    var width = 0;

    var bisector = this.horizontalBisector(geometry);
    if (bisector.getLength() == 0.0) {
        width = 0;
        intPt = bisector.getCoordinate();
    } else {
        var intersections = bisector.intersection(geometry);
        var widestIntersection = this.widestGeometry(intersections);
        width = widestIntersection.getEnvelopeInternal().getWidth();
        intPt = this.centre(widestIntersection.getEnvelopeInternal());
    }
    if (this.interiorPoint == null || width > this.maxWidth) {
        this.interiorPoint = intPt;
        this.maxWidth = width;
    }
};

/**
 * Finds widest geometry
 * @return if geometry is a collection, the widest sub-geometry; otherwise, the geometry itself
 * @private
 */
jsts.algorithm.InteriorPointArea.prototype.widestGeometry = function(obj) {

    if (obj instanceof jsts.geom.GeometryCollection) {
        var gc = obj;
        if (gc.isEmpty()) {
            return gc;
        }

        var widestGeometry = gc.getGeometryN(0);
        // scan remaining geom components to see if any are wider
        for (var i = 1; i < gc.getNumGeometries(); i++) {
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

    var bisectY = jsts.algorithm.SafeBisectorFinder.getBisectorY(geometry);
    return this.factory.createLineString([
        new jsts.geom.Coordinate(envelope.getMinX(), bisectY),
        new jsts.geom.Coordinate(envelope.getMaxX(), bisectY)
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


/**
 * Finds a safe bisector Y ordinate
 * by projecting to the Y axis
 * and finding the Y-ordinate interval
 * which contains the centre of the Y extent.
 * The centre of this interval is returned as the bisector Y-ordinate.
 *
 * @author mdavis
 *
 * @constructor
 */
jsts.algorithm.SafeBisectorFinder = function(poly) {

    this.poly;

    this.centreY;
    this.hiY = Number.MAX_VALUE;
    this.loY = -Number.MAX_VALUE;


    this.poly = poly;

    // initialize using extremal values
    this.hiY = poly.getEnvelopeInternal().getMaxY();
    this.loY = poly.getEnvelopeInternal().getMinY();
    this.centreY = jsts.algorithm.InteriorPointArea.avg(this.loY, this.hiY);
};

jsts.algorithm.SafeBisectorFinder.getBisectorY = function(poly) {
    var finder = new jsts.algorithm.SafeBisectorFinder(poly);
    return finder.getBisectorY();
};

jsts.algorithm.SafeBisectorFinder.prototype.getBisectorY = function() {
    this.process(this.poly.getExteriorRing());
    for (var i = 0; i < this.poly.getNumInteriorRing(); i++) {
        this.process(this.poly.getInteriorRingN(i));
    }
    var bisectY = jsts.algorithm.InteriorPointArea.avg(this.hiY, this.loY);
    return bisectY;
};

jsts.algorithm.SafeBisectorFinder.prototype.process = function(line) {
    var seq = line.getCoordinateSequence();
    for (var i = 0; i < seq.length; i++) {
        var y = seq[i].y;
        this.updateInterval(y);
    }
};

jsts.algorithm.SafeBisectorFinder.prototype.updateInterval = function(y) {
    if (y <= this.centreY) {
        if (y > this.loY) {
            this.loY = y;
        }
    } else if (y > this.centreY) {
        if (y < this.hiY) {
            this.hiY = y;
        }
    }
};
