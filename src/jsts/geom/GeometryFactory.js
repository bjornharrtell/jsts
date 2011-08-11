/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */



/**
 * Supplies a set of utility methods for building Geometry objects from lists
 * of Coordinates.
 *
 * Note that the factory constructor methods do <b>not</b> change the input
 * coordinates in any way.
 *
 * In particular, they are not rounded to the supplied <tt>PrecisionModel</tt>.
 * It is assumed that input Coordinates meet the given precision.
 *
 * Constructs a GeometryFactory that generates Geometries having a floating
 * PrecisionModel and a spatial-reference ID of 0.
 *
 * @constructor
 */
jsts.geom.GeometryFactory = function(precisionModel) {
  this.precisionModel = precisionModel;
};

jsts.geom.GeometryFactory.precisionModel = null;


/**
 * Creates a Point using the given Coordinate; a null Coordinate will create an
 * empty Geometry.
 *
 * @param {Coordinate}
 *          coordinate Coordinate to base this Point on.
 * @return {Point} A new Point.
 */
jsts.geom.GeometryFactory.prototype.createPoint = function(coordinate) {
  var point = null;

  if (coordinate === null) {
    point = new jsts.geom.Point();
    point.setPrecisionModel(this.precisionModel);
  } else {
    point = new jsts.geom.Point(coordinate);
  }

  point.setPrecisionModel(this.precisionModel);

  return point;
};


/**
 * Creates a LineString using the given Coordinates; a null or empty array will
 * create an empty LineString. Consecutive points must not be equal.
 *
 * @param {Coordinate[]}
 *          coordinates an array without null elements, or an empty array, or
 *          null.
 * @return {LineString} A new LineString.
 */
jsts.geom.GeometryFactory.prototype.createLineString = function(coordinates) {
  var lineString = new jsts.geom.LineString(coordinates);
  lineString.setPrecisionModel(this.precisionModel);

  return lineString;
};


/**
 * Creates a LinearRing using the given Coordinates; a null or empty array will
 * create an empty LinearRing. The points must form a closed and simple
 * linestring. Consecutive points must not be equal.
 *
 * @param {Coordinate[]}
 *          coordinates an array without null elements, or an empty array, or
 *          null.
 * @return {LinearRing} A new LinearRing.
 */
jsts.geom.GeometryFactory.prototype.createLinearRing = function(coordinates) {
  var linearRing = new jsts.geom.LinearRing(coordinates);
  linearRing.setPrecisionModel(this.precisionModel);
  return linearRing;
};


/**
 * Constructs a <code>Polygon</code> with the given exterior boundary and
 * interior boundaries.
 *
 * @param {LinearRing}
 *          shell the outer boundary of the new <code>Polygon</code>, or
 *          <code>null</code> or an empty <code>LinearRing</code> if the
 *          empty geometry is to be created.
 * @param {LinearRing[]}
 *          holes the inner boundaries of the new <code>Polygon</code>, or
 *          <code>null</code> or empty <code>LinearRing</code> s if the
 *          empty geometry is to be created.
 * @return {Polygon} A new Polygon.
 */
jsts.geom.GeometryFactory.prototype.createPolygon = function(shell, holes) {
  if (shell === null || shell === undefined) {
    return new jsts.geom.Polygon();
  }

  var rings = [shell];

  if (holes !== undefined) {
    rings = rings.concat(holes);
  }

  var polygon = new jsts.geom.Polygon(rings);

  polygon.setPrecisionModel(this.precisionModel);

  return polygon;
};


jsts.geom.GeometryFactory.prototype.createMultiPoint = function(coordinates) {
  if (coordinates === undefined || coordinates === null) {
    return new jsts.geom.MultiPoint();
  }

  if (coordinates[0] instanceof jsts.geom.Point) {
    var temp = [];
    coordinates.forEach(function(point) {
      temp.push(point.coordinate);
    });
    coordinates = temp;
  }

  return new jsts.geom.MultiPoint(coordinates);
};

jsts.geom.GeometryFactory.prototype.createMultiLineString = function(lineStrings) {
  if (lineStrings === undefined || lineStrings === null) {
    return new jsts.geom.MultiLineString();
  }

  return new jsts.geom.MultiLineString(lineStrings);
};


/**
 *  Build an appropriate <code>Geometry</code>, <code>MultiGeometry</code>, or
 *  <code>GeometryCollection</code> to contain the <code>Geometry</code>s in
 *  it.
 * For example:<br>
 *
 *  <ul>
 *    <li> If <code>geomList</code> contains a single <code>Polygon</code>,
 *    the <code>Polygon</code> is returned.
 *    <li> If <code>geomList</code> contains several <code>Polygon</code>s, a
 *    <code>MultiPolygon</code> is returned.
 *    <li> If <code>geomList</code> contains some <code>Polygon</code>s and
 *    some <code>LineString</code>s, a <code>GeometryCollection</code> is
 *    returned.
 *    <li> If <code>geomList</code> is empty, an empty <code>GeometryCollection</code>
 *    is returned
 *  </ul>
 *
 * Note that this method does not "flatten" Geometries in the input, and hence if
 * any MultiGeometries are contained in the input a GeometryCollection containing
 * them will be returned.
 *
 *@param  geomList  the <code>Geometry</code>s to combine
 *@return {Geometry}          a <code>Geometry</code> of the "smallest", "most
 *      type-specific" class that can contain the elements of <code>geomList</code>
 *      .
 */
jsts.geom.GeometryFactory.prototype.buildGeometry = function(geomList) {

  /**
   * Determine some facts about the geometries in the list
   */
  var geomClass = null;
  var isHeterogeneous = false;
  var hasGeometryCollection = false;
  for (var i = geomList.iterator(); i.hasNext(); ) {
    var geom = i.next();
    var partClass = geom.constructor;
    if (geomClass === null) {
      geomClass = partClass;
    }
    if (partClass !== geomClass) {
      isHeterogeneous = true;
    }
    if (geom instanceof jsts.geom.GeometryCollection)
      hasGeometryCollection = true;
  }

  /**
   * Now construct an appropriate geometry to return
   */
  // for the empty geometry, return an empty GeometryCollection
  if (geomClass == null) {
    return this.createGeometryCollection(null);
  }
  if (isHeterogeneous || hasGeometryCollection) {
    return this.createGeometryCollection(geomList);
  }
  // at this point we know the collection is hetereogenous.
  // Determine the type of the result from the first Geometry in the list
  // this should always return a geometry, since otherwise an empty collection would have already been returned
  var geom0 = geomList.get(0);
  var isCollection = geomList.size() > 1;
  if (isCollection) {
    if (geom0 instanceof jsts.geom.Polygon) {
      return this.createMultiPolygon(geomList.toArray());
    }
    else if (geom0 instanceof jsts.geom.LineString) {
      return this.createMultiLineString(geomList.toArray());
    }
    else if (geom0 instanceof jsts.geom.Point) {
      return this.createMultiPoint(geomList.toArray());
    }
    jsts.util.Assert.shouldNeverReachHere('Unhandled class: ' + geom0);
  }
  return geom0;
};

jsts.geom.GeometryFactory.prototype.createGeometryCollection = function(geometries) {
  return new jsts.geom.GeometryCollection(geometries);
};
