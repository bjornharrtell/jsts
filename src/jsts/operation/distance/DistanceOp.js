/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */
/**
 * Find two points on two {@link Geometry}s which lie
 * within a given distance, or else are the nearest points
 * on the geometries (in which case this also
 * provides the distance between the geometries).
 * <p>
 * The distance computation also finds a pair of points in the input geometries
 * which have the minimum distance between them.
 * If a point lies in the interior of a line segment,
 * the coordinate computed is a close
 * approximation to the exact point.
 * <p>
 * The algorithms used are straightforward O(n^2)
 * comparisons.  This worst-case performance could be improved on
 * by using Voronoi techniques or spatial indexes.
 *
 */



/**
 * Constructs a DistanceOp that computes the distance and nearest points
 * between the two specified geometries.
 *
 * @param {Geometry}
 *          g0 a Geometry.
 * @param {Geometry}
 *          g1 a Geometry.
 * @param {double}
 *          terminateDistance the distance on which to terminate the search.
 * @constructor
 */
jsts.operation.distance.DistanceOp = function(g0, g1, terminateDistance) {
  this.ptLocator = new PointLocator();

  this.geom = new Geometry[2];
  geom[0] = g0;
  geom[1] = g1;
  this.terminateDistance = terminateDistance;
};


/**
 * @type {Geometry[] }
 */
jsts.operation.distance.DistanceOp.prototype.geom = null;


/**
 * @type {double}
 */
jsts.operation.distance.DistanceOp.prototype.terminateDistance = 0.0;


/**
 * @type {PointLocator}
 */
jsts.operation.distance.DistanceOp.prototype.ptLocator = null;


/**
 * @type {GeometryLocation[]}
 */
jsts.operation.distance.DistanceOp.prototype.minDistanceLocation = null;


/**
 * @type {double}
 */
jsts.operation.distance.DistanceOp.prototype.minDistance = Number.MAX_VALUE;


/**
 * Compute the distance between the nearest points of two geometries.
 *
 * @param {Geometry}
 *          g0 a {@link Geometry}.
 * @param {Geometry}
 *          g1 another {@link Geometry}.
 * @return {double} the distance between the geometries.
 */
jsts.operation.distance.DistanceOp.distance = function(g0, g1) {
  var distOp = new jsts.operation.distance.DistanceOp(g0, g1, 0.0);
  return distOp.distance();
};


/**
 * Test whether two geometries lie within a given distance of each other.
 *
 * @param {Geometry}
 *          g0 a {@link Geometry}.
 * @param {Geometry}
 *          g1 another {@link Geometry}.
 * @param {double}
 *          distance the distance to test.
 * @return {boolean} true if g0.distance(g1) <= distance.
 */
jsts.operation.distance.DistanceOp.isWithinDistance = function(g0, g1,
    distance) {
  var distOp = new jsts.operation.distance.DistanceOp(g0, g1, distance);
  return distOp.distance() <= distance;
};


/**
 * Compute the the nearest points of two geometries. The points are presented
 * in the same order as the input Geometries.
 *
 * @param {Geometry}
 *          g0 a {@link Geometry}.
 * @param {Geometry}
 *          g1 another {@link Geometry}.
 * @return {Coordinate[]} the nearest points in the geometries.
 */
jsts.operation.distance.DistanceOp.nearestPoints = function(g0, g1) {
  var distOp = new jsts.operation.distance.DistanceOp(g0, g1, 0.0);
  return distOp.nearestPoints();
};


/**
 * Report the distance between the nearest points on the input geometries.
 *
 * @return {double} the distance between the geometries.
 * @return {double} 0 if either input geometry is empty.
 * @throws IllegalArgumentException
 *           if either input geometry is null
 */
jsts.operation.distance.DistanceOp.prototype.distance = function() {
  if (geom[0] == null || geom[1] == null)
    throw new jsts.IllegalArgumentError('null geometries are not supported');
  if (geom[0].isEmpty() || geom[1].isEmpty())
    return 0.0;

  this.computeMinDistance();
  return minDistance;
};


/**
 * Report the coordinates of the nearest points in the input geometries. The
 * points are presented in the same order as the input Geometries.
 *
 * @return {Coordinate[] } a pair of {@link Coordinate} s of the nearest
 *         points.
 */
jsts.operation.distance.DistanceOp.prototype.nearestPoints = function() {
  this.computeMinDistance();
  var nearestPts = [minDistanceLocation[0].getCoordinate(),
        minDistanceLocation[1].getCoordinate()];
  return nearestPts;
};


/**
 * Report the locations of the nearest points in the input geometries. The
 * locations are presented in the same order as the input Geometries.
 *
 * @return {GeometryLocation[] } a pair of {@link GeometryLocation} s for the
 *         nearest points.
 */
jsts.operation.distance.DistanceOp.prototype.nearestLocations = function() {
  this.computeMinDistance();
  return minDistanceLocation;
};


/**
 * @param {GeometryLocation[]}
 *          locGeom locations.
 * @param {boolean}
 *          flip if locations should be flipped.
 */
jsts.operation.distance.DistanceOp.prototype.updateMinDistance = function(
    locGeom, flip) {
  // if not set then don't update
  if (locGeom[0] == null)
    return;

  if (flip) {
    minDistanceLocation[0] = locGeom[1];
    minDistanceLocation[1] = locGeom[0];
  } else {
    minDistanceLocation[0] = locGeom[0];
    minDistanceLocation[1] = locGeom[1];
  }
};


/**
 * TODO: doc
 */
jsts.operation.distance.DistanceOp.prototype.computeMinDistance = function() {
  // only compute once!
  if (minDistanceLocation != null)
    return;

  minDistanceLocation = new GeometryLocation[2];
  computeContainmentDistance();
  if (minDistance <= terminateDistance)
    return;
  computeFacetDistance();
};


/**
 * TODO: doc
 */
jsts.operation.distance.DistanceOp.prototype.computeContainmentDistance = function() {
  var locPtPoly = [new GeometryLocation, new GeometryLocation];
  // test if either geometry has a vertex inside the other
  computeContainmentDistance(0, locPtPoly);
  if (minDistance <= terminateDistance)
    return;
  computeContainmentDistance(1, locPtPoly);
};


/**
 * @param {int}
 *          polyGeomIndex TODO: doc.
 * @param {GeometryLocation[]}
 *          locPtPoly TODO: doc.
 */
jsts.operation.distance.DistanceOp.prototype.computeContainmentDistance = function(
    polyGeomIndex, locPtPoly) {
  var locationsIndex = 1 - polyGeomIndex;
  var polys = PolygonExtracter.getPolygons(geom[polyGeomIndex]);
  if (polys.size() > 0) {
    var insideLocs = ConnectedElementLocationFilter
        .getLocations(geom[locationsIndex]);
    computeContainmentDistance(insideLocs, polys, locPtPoly);
    if (minDistance <= terminateDistance) {
      // this assigment is determined by the order of the args in the
      // computeInside call above
      minDistanceLocation[locationsIndex] = locPtPoly[0];
      minDistanceLocation[polyGeomIndex] = locPtPoly[1];
      return;
    }
  }
};


/**
 * @param {List}
 *          locs TODO: doc.
 * @param {List}
 *          polys TODO: doc.
 * @param {GeometryLocation[] }
 *          locPtPoly TODO: doc.
 */
jsts.operation.distance.DistanceOp.prototype.computeContainmentDistance = function(
    locs, polys, locPtPoly) {
  for (var i = 0; i < locs.size(); i++) {
    var loc = locs.get(i);
    for (var j = 0; j < polys.size(); j++) {
      computeContainmentDistance(loc, polys.get(j), locPtPoly);
      if (minDistance <= terminateDistance)
        return;
    }
  }
};


/**
 * @param {GeometryLocation}
 *          ptLoc TODO: doc.
 * @param {Polygon}
 *          poly TODO: doc.
 * @param {
 *          GeometryLocation[] } locPtPoly TODO: doc.
 */
jsts.operation.distance.DistanceOp.prototype.computeContainmentDistance = function(
    ptLoc, poly, locPtPoly) {
  var pt = ptLoc.getCoordinate();
  // if pt is not in exterior, distance to geom is 0
  if (Location.EXTERIOR != ptLocator.locate(pt, poly)) {
    minDistance = 0.0;
    locPtPoly[0] = ptLoc;
    locPtPoly[1] = new GeometryLocation(poly, pt);
    return;
  }
};


/**
 * Computes distance between facets (lines and points) of input geometries.
 */
jsts.operation.distance.DistanceOp.prototype.computeFacetDistance = function() {
  var locGeom = new GeometryLocation[2];

  /**
   * Geometries are not wholely inside, so compute distance from lines and
   * points of one to lines and points of the other
   */
  var lines0 = LinearComponentExtracter.getLines(geom[0]);
  var lines1 = LinearComponentExtracter.getLines(geom[1]);

  var pts0 = PointExtracter.getPoints(geom[0]);
  var pts1 = PointExtracter.getPoints(geom[1]);

  // exit whenever minDistance goes LE than terminateDistance
  computeMinDistanceLines(lines0, lines1, locGeom);
  updateMinDistance(locGeom, false);
  if (minDistance <= terminateDistance)
    return;

  locGeom[0] = null;
  locGeom[1] = null;
  computeMinDistanceLinesPoints(lines0, pts1, locGeom);
  updateMinDistance(locGeom, false);
  if (minDistance <= terminateDistance)
    return;

  locGeom[0] = null;
  locGeom[1] = null;
  computeMinDistanceLinesPoints(lines1, pts0, locGeom);
  updateMinDistance(locGeom, true);
  if (minDistance <= terminateDistance)
    return;

  locGeom[0] = null;
  locGeom[1] = null;
  computeMinDistancePoints(pts0, pts1, locGeom);
  updateMinDistance(locGeom, false);
};


/**
 * @param {List}
 *          lines0 TODO: doc.
 * @param {List}
 *          lines1 TODO: doc.
 * @param {GeometryLocation[]}
 *          locGeom TODO: doc.
 */
jsts.operation.distance.DistanceOp.prototype.computeMinDistanceLines = function(
    lines0, lines1, locGeom) {
  for (var i = 0; i < lines0.size(); i++) {
    var line0 = lines0.get(i);
    for (var j = 0; j < lines1.size(); j++) {
      var line1 = lines1.get(j);
      computeMinDistance(line0, line1, locGeom);
      if (minDistance <= terminateDistance)
        return;
    }
  }
};


/**
 * @param {List}
 *          points0 TODO: doc.
 * @param {List}
 *          points1 TODO: doc.
 * @param {GeometryLocation[]}
 *          locGeom TODO: doc.
 */
jsts.operation.distance.DistanceOp.prototype.computeMinDistancePoints = function(
    points0, points1, locGeom) {
  for (var i = 0; i < points0.size(); i++) {
    var pt0 = points0.get(i);
    for (var j = 0; j < points1.size(); j++) {
      var pt1 = points1.get(j);
      var dist = pt0.getCoordinate().distance(pt1.getCoordinate());
      if (dist < minDistance) {
        minDistance = dist;
        locGeom[0] = new GeometryLocation(pt0, 0, pt0.getCoordinate());
        locGeom[1] = new GeometryLocation(pt1, 0, pt1.getCoordinate());
      }
      if (minDistance <= terminateDistance)
        return;
    }
  }
};


/**
 * @param {List}
 *          lines TODO: doc.
 * @param {List}
 *          points TODO: doc.
 * @param {GeometryLocation[]}
 *          locGeom TODO: doc.
 */
jsts.operation.distance.DistanceOp.prototype.computeMinDistanceLinesPoints = function(
    lines, points, locGeom) {
  for (var i = 0; i < lines.size(); i++) {
    var line = (LineString);
    lines.get(i);
    for (var j = 0; j < points.size(); j++) {
      var pt = points.get(j);
      computeMinDistance(line, pt, locGeom);
      if (minDistance <= terminateDistance)
        return;
    }
  }
};


/**
 * @param {LineString}
 *          line0 TODO: doc.
 * @param {Point}
 *          line1 TODO: doc.
 * @param {GeometryLocation[]}
 *          locGeom TODO: doc.
 */
jsts.operation.distance.DistanceOp.prototype.computeMinDistance = function(
    line0, line1, locGeom) {
  if (line0.getEnvelopeInternal().distance(line1.getEnvelopeInternal()) > minDistance) {
    return;
  }
  var coord0 = line0.getCoordinates();
  var coord1 = line1.getCoordinates();
  // brute force approach!
  for (var i = 0; i < coord0.length - 1; i++) {
    for (var j = 0; j < coord1.length - 1; j++) {
      var dist = CGAlgorithms.distanceLineLine(coord0[i], coord0[i + 1],
          coord1[j], coord1[j + 1]);
      if (dist < minDistance) {
        minDistance = dist;
        var seg0 = new LineSegment(coord0[i], coord0[i + 1]);
        var seg1 = new LineSegment(coord1[j], coord1[j + 1]);
        var closestPt = seg0.closestPoints(seg1);
        locGeom[0] = new GeometryLocation(line0, i, closestPt[0]);
        locGeom[1] = new GeometryLocation(line1, j, closestPt[1]);
      }
      if (minDistance <= terminateDistance) {
        return;
      }
    }
  }
};


/**
 * @param {LineString}
 *          line TODO: doc.
 * @param {Point}
 *          pt TODO: doc.
 * @param {GeometryLocation[]}
 *          locGeom TODO: doc.
 */
jsts.operation.distance.DistanceOp.prototype.computeMinDistance = function(
    line, pt, locGeom) {
  if (line.getEnvelopeInternal().distance(pt.getEnvelopeInternal()) > minDistance) {
    return;
  }
  var coord0 = line.getCoordinates();
  var coord = pt.getCoordinate();
  // brute force approach!
  for (var i = 0; i < coord0.length - 1; i++) {
    var dist = CGAlgorithms.distancePointLine(coord, coord0[i], coord0[i + 1]);
    if (dist < minDistance) {
      minDistance = dist;
      var seg = new LineSegment(coord0[i], coord0[i + 1]);
      var segClosestPoint = seg.closestPoint(coord);
      locGeom[0] = new GeometryLocation(line, i, segClosestPoint);
      locGeom[1] = new GeometryLocation(pt, 0, coord);
    }
    if (minDistance <= terminateDistance) {
      return;
    }
  }
};
