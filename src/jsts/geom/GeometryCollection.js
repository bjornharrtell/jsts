/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

(function() {

  /**
   * @requires jsts/geom/Geometry.js
   */

  var Geometry = jsts.geom.Geometry;
  var TreeSet = javascript.util.TreeSet;
  var Arrays = javascript.util.Arrays;

  /**
   * @constructor
   * @extends jsts.geom.Geometry
   */
  jsts.geom.GeometryCollection = function() {
    OpenLayers.Geometry.Collection.prototype.initialize.apply(this, arguments);

    /*OpenLayers.Geometry.prototype.initialize.apply(this, arguments);

    this.components = [];

    if (!components) {
      return;
    }

    for (var i = 0; i < components.length; i++) {
      var component = components[i];
      if (component instanceof jsts.geom.Point) {
        components[i] = component.coordinate;
      } else if (component instanceof jsts.geom.Coordinate) {
        component = new jsts.geom.Point(component);
      }
      this.components.push(component);
    }

    this.components = [];
    this.addComponents(components);*/
  };

  jsts.geom.GeometryCollection.prototype = new OpenLayers.Geometry.Collection();

  for (key in Geometry.prototype) {
    jsts.geom.GeometryCollection.prototype[key] = Geometry.prototype[key];
  }


  /**
   * @return {boolean}
   */
  jsts.geom.GeometryCollection.prototype.isEmpty = function() {
    for (var i = 0; i < this.components.length; i++) {
      var geometry = this.getGeometryN(i);

      if (!geometry.isEmpty()) {
        return false;
      }
    }
    return true;
  };


  /**
   * @return {Coordinate}
   */
  jsts.geom.GeometryCollection.prototype.getCoordinate = function() {
    if (this.isEmpty())
      return null;

    return this.getGeometryN(0).getCoordinate();
  };


  /**
   * Collects all coordinates of all subgeometries into an Array.
   *
   * Note that while changes to the coordinate objects themselves may modify the
   * Geometries in place, the returned Array as such is only a temporary
   * container which is not synchronized back.
   *
   * @return {Coordinate[]} the collected coordinates.
   */
  jsts.geom.GeometryCollection.prototype.getCoordinates = function() {
    var coordinates = [];
    var k = -1;
    for (var i = 0; i < this.components.length; i++) {
      var geometry = this.getGeometryN(i);

      var childCoordinates = geometry.getCoordinates();
      for (var j = 0; j < childCoordinates.length; j++) {
        k++;
        coordinates[k] = childCoordinates[j];
      }
    }
    return coordinates;
  };


  /**
   * @return {int}
   */
  jsts.geom.GeometryCollection.prototype.getNumGeometries = function() {
    return this.components.length;
  };


  /**
   * @param {int}
   *          n
   * @return {Geometry}
   */
  jsts.geom.GeometryCollection.prototype.getGeometryN = function(n) {
    var geometry = this.components[n];
    if (geometry instanceof jsts.geom.Coordinate) {
      geometry = new jsts.geom.Point(geometry);
    }
    return geometry;
  };


  /**
   * @param {Geometry}
   *          other
   * @param {double}
   *          tolerance
   * @return {boolean}
   */
  jsts.geom.GeometryCollection.prototype.equalsExact = function(other,
      tolerance) {
    if (!this.isEquivalentClass(other)) {
      return false;
    }
    if (this.components.length !== other.components.length) {
      return false;
    }
    for (var i = 0; i < this.components.length; i++) {
      var geometry = this.getGeometryN(i);

      if (!geometry.equalsExact(other.getGeometryN(i), tolerance)) {
        return false;
      }
    }
    return true;
  };

  jsts.geom.GeometryCollection.prototype.compareToSameClass = function(o) {
    var theseElements = new TreeSet(Arrays.asList(this.components));
    var otherElements = new TreeSet(Arrays.asList(o.components));
    return this.compare(theseElements, otherElements);
  };

  jsts.geom.GeometryCollection.prototype.apply = function(filter) {
    if (filter instanceof jsts.geom.GeometryFilter || filter instanceof jsts.geom.GeometryComponentFilter) {
      filter.filter(this);
      for (var i = 0; i < this.components.length; i++) {
        this.getGeometryN(i).apply(filter);
      }
    } else if (filter instanceof jsts.geom.CoordinateFilter) {
      for (var i = 0; i < this.components.length; i++) {
        this.getGeometryN(i).apply(filter);
      }
    }
  };


  jsts.geom.GeometryCollection.prototype.getDimension = function() {
    var dimension = jsts.geom.Dimension.FALSE;
    for (var i = 0; i < this.components.length; i++) {
      var geometry = this.getGeometryN(i);
      dimension = Math.max(dimension, geometry.getDimension());
    }
    return dimension;
  };


  /**
   * @protected
   */
  jsts.geom.GeometryCollection.prototype.computeEnvelopeInternal = function() {
    var envelope = new jsts.geom.Envelope();
    for (var i = 0; i < this.components.length; i++) {
      var geometry = this.getGeometryN(i);
      envelope.expandToInclude(geometry.getEnvelopeInternal());
    }
    return envelope;
  };

  //OpenLayers.Geometry.Collection = jsts.geom.GeometryCollection;

})();

// TODO: port rest
