/* Copyright (c) 2015 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
*/

/**
 * @requires jsts/geom/util/GeometryTransformer.js
 */

(function() {

/**
 * Densifies a {@link Geometry} by inserting extra vertices along the line
 * segments contained in the geometry.  All segments in the created densified
 * geometry will be no longer than than the given distance tolerance.
 * Densified polygonal geometries are guaranteed to be topologically correct.
 * The coordinates created during densification respect the input geometry's
 * {@link PrecisionModel}.
 *
 * @author Stephan Telling, Septima.dk
 * @author (Hans) Gregers Petersen, Septima.dk
 */


/*
 *
 * @constructor
 */
jsts.densify.Densifier = function(geom) {
  this.geom = geom;
};

jsts.densify.Densifier.prototype.densify = function(geom, distanceTolerance) {
  var densifier = new jsts.densify.Densifier(geom);
  densifier.setDistanceTolerance(distanceTolerance);
  return densifier.getResultGeometry();
};

// Static function, so no prototyping...
jsts.densify.Densifier.densifyPoints = function(pts, distanceTolerance, precModel) {
  var seg = new jsts.geom.LineSegment();
  var coordinateList = new jsts.geom.CoordinateList();

  for (i = 0; i < pts.length - 1; i++) {
    seg.p0 = pts[i];
    seg.p1 = pts[i + 1];
    coordinateList.add(seg.p0, false);
    var len = seg.getLength();
    var densifiedSegCount = (len / distanceTolerance) + 1;

    if (densifiedSegCount > 1) {
      var densifiedSegLen = len / densifiedSegCount;
      for (j = 1; j < densifiedSegCount; j++) {
        var segFract = (j * densifiedSegLen) / len;
        var p = seg.pointAlong(segFract);
        precModel.makePrecise(p);
        coordinateList.add(p, false);
      }
    }
  }
  coordinateList.add(pts[pts.length - 1], false);
  return coordinateList.toCoordinateArray();
};


jsts.densify.Densifier.prototype.setDistanceTolerance = function(distanceTolerance) {
  if (distanceTolerance <= 0.0) {
    throw new jsts.error.IllegalArgumentError("Tolerance must be positive");
  }

  this.distanceTolerance = distanceTolerance;
};


jsts.densify.Densifier.prototype.getResultGeometry = function() {
  return (new jsts.densify.Densifier.DensifyTransformer(this.distanceTolerance)).transform(this.geom);
};




/*
 * Class DensifyTransformer from http://sourceforge.net/p/jts-topo-suite/code/HEAD/tree/trunk/jts/java/src/com/vividsolutions/jts/densify/Densifier.java
 */

// Extend jsts.geom.util.GeometryTransformer by calling constructor and prototyping new object
jsts.densify.Densifier.DensifyTransformer = function(distanceTolerance) {
	jsts.geom.util.GeometryTransformer.call(this); // super called
	this.distanceTolerance = distanceTolerance;
};

jsts.densify.Densifier.DensifyTransformer.prototype = new jsts.geom.util.GeometryTransformer();
jsts.densify.Densifier.DensifyTransformer.constructor = jsts.densify.Densifier.DensifyTransformer;
jsts.densify.Densifier.DensifyTransformer.CLASS_NAME = 'jsts.densify.Densifier.DensifyTransformer';

jsts.densify.Densifier.DensifyTransformer.prototype.transformCoordinates = function(coords, parent) {
  var inputPts = coords;
  if( !(inputPts instanceof Array) ) {  inputPts = coords.toCoordinateArray() };

  var newPts = jsts.densify.Densifier.densifyPoints(inputPts, this.distanceTolerance, parent.getPrecisionModel());

  if (parent instanceof jsts.geom.LineString && newPts.length == 1) {
    newPts = new jsts.geom.Coordinate(0);
  }

 // Would like to do
 //  return this.factory.getCoordinateSequenceFactory().create(newPts);
  return newPts;
};

jsts.densify.Densifier.DensifyTransformer.prototype.transformPolygon = function(geom, parent) {
   var roughGeom = jsts.geom.util.GeometryTransformer.prototype.transformPolygon.call(this, geom, parent); // Special super call :-|

  if (parent instanceof jsts.geom.MultiPolygon) {
    return roughGeom;
  }
  return this.createValidArea(roughGeom);
};

jsts.densify.Densifier.DensifyTransformer.prototype.transformMultiPolygon = function(geom, parent) {
  var roughGeom = this._super.transformMultiPolygon(geom, parent);
  return this.createValidArea(roughGeom);
};

jsts.densify.Densifier.DensifyTransformer.prototype.createValidArea = function(roughAreaGeom) {
  return roughAreaGeom.buffer(0.0);
};

jsts.densify.Densifier.DensifyTransformer.CLASS_NAME = 'jsts.densify.Densifier.DensifyTransformer';

})();
