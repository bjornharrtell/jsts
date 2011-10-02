/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

(function() {

  /**
   * @requires jsts/geom/Geometry.js
   */


  /**
   * @extends jsts.geom.Geometry
   * @constructor
   */
  jsts.geom.LineString = function(points, factory) {
    this.factory = factory;

    OpenLayers.Geometry.Curve.prototype.initialize.apply(this, arguments);

    this.geometries = this.components;
  };
  jsts.geom.LineString.prototype = OpenLayers.Geometry.LineString.prototype;

  for (key in jsts.geom.Geometry.prototype) {
    jsts.geom.LineString.prototype[key] = jsts.geom.Geometry.prototype[key];
  }

  /**
   * @return {jsts.geom.Coordinate[]} this LineString's internal coordinate
   *         array.
   */
  jsts.geom.LineString.prototype.getCoordinates = function() {
    return this.components;
  };


  /**
   * @return {jsts.geom.Coordinate} The n'th coordinate of this
   *         jsts.geom.LineString.
   * @param {int}
   *          n index.
   */
  jsts.geom.LineString.prototype.getCoordinateN = function(n) {
    return this.components[n];
  };


  /**
   * @return {jsts.geom.Coordinate} The first coordinate of this LineString or
   *         null if empty.
   */
  jsts.geom.LineString.prototype.getCoordinate = function() {
    if (this.isEmpty()) {
      return null;
    }
    return this.getCoordinateN(0);
  };


  /**
   * @return {int} LineStrings are always 1-dimensional.
   */
  jsts.geom.LineString.prototype.getDimension = function() {
    return 1;
  };


  /**
   * @return {int} dimension of the boundary of this jsts.geom.LineString.
   */
  jsts.geom.LineString.prototype.getBoundaryDimension = function() {
    if (this.isClosed()) {
      return Dimension.FALSE;
    }
    return 0;
  };


  /**
   * @return {Boolean} true if empty.
   */
  jsts.geom.LineString.prototype.isEmpty = function() {
    return this.components.length === 0;
  };

  jsts.geom.LineString.prototype.getNumPoints = function() {
    return this.components.length;
  };

  jsts.geom.LineString.prototype.getPointN = function(n) {
    return this.getFactory().createPoint(this.components[n]);
  };


  jsts.geom.LineString.prototype.getStartPoint = function() {
    if (this.isEmpty()) {
      return null;
    }
    return this.getPointN(0);
  };

  jsts.geom.LineString.prototype.getEndPoint = function() {
    if (this.isEmpty()) {
      return null;
    }
    return this.getPointN(this.getNumPoints() - 1);
  };


  /**
   * @return {Boolean} true if LineString is Closed.
   */
  jsts.geom.LineString.prototype.isClosed = function() {
    if (this.isEmpty()) {
      return false;
    }
    return this.getCoordinateN(0).equals2D(
        this.getCoordinateN(this.components.length - 1));
  };


  /**
   * @return {Boolean} true if LineString is a Ring.
   */
  jsts.geom.LineString.prototype.isRing = function() {
    return this.isClosed() && this.isSimple();
  };


  /**
   * @return {String} String representation of LineString type.
   */
  jsts.geom.LineString.prototype.getGeometryType = function() {
    return 'LineString';
  };


  /**
   * Gets the boundary of this geometry. The boundary of a lineal geometry is
   * always a zero-dimensional geometry (which may be empty).
   *
   * @return {Geometry} the boundary geometry.
   * @see Geometry#getBoundary
   */
  jsts.geom.LineString.prototype.getBoundary = function() {
    return (new jsts.operation.BoundaryOp(this)).getBoundary();
  };


  jsts.geom.LineString.prototype.computeEnvelopeInternal = function() {
    if (this.isEmpty()) {
      return new jsts.geom.Envelope();
    }

    var env = new jsts.geom.Envelope();
    this.components.forEach(function(component) {
      env.expandToInclude(component);
    });

    return env;
  };


  /**
   * @param {Geometry}
   *          other Geometry to compare this LineString to.
   * @param {double}
   *          tolerance Tolerance.
   * @return {Boolean} true if equal.
   */
  jsts.geom.LineString.prototype.equalsExact = function(other, tolerance) {
    if (!this.isEquivalentClass(other)) {
      return false;
    }

    if (this.components.length !== other.components.length) {
      return false;
    }

    if (this.isEmpty() && other.isEmpty()) {
      return true;
    }

    return this.components.reduce(function(equal, component, i) {
      return equal &&
          jsts.geom.Geometry.prototype.equal(component, other.components[i],
              tolerance);
    });
  };

  jsts.geom.LineString.prototype.isEquivalentClass = function(other) {
    return other instanceof jsts.geom.LineString;
  };

  jsts.geom.LineString.prototype.compareToSameClass = function(o) {
    var line = o;
    // MD - optimized implementation
    var i = 0;
    var j = 0;
    while (i < this.components.length && j < line.components.length) {
      var comparison = this.components[i].compareTo(line.components[j]);
      if (comparison !== 0) {
        return comparison;
      }
      i++;
      j++;
    }
    if (i < this.components.length) {
      return 1;
    }
    if (j < line.components.length) {
      return -1;
    }
    return 0;
  };

  jsts.geom.LineString.prototype.apply = function(filter) {
    if (filter instanceof jsts.geom.GeometryFilter || filter instanceof jsts.geom.GeometryComponentFilter) {
      filter.filter(this);
    } else if (filter instanceof jsts.geom.CoordinateFilter) {
      for (var i = 0; i < this.components.length; i++) {
        filter.filter(this.components[i]);
      }
    }
  };

  /**
   * Normalizes a LineString.  A normalized linestring
   * has the first point which is not equal to it's reflected point
   * less than the reflected point.
   */
  jsts.geom.LineString.prototype.normalize = function() {
      var i, il, j, ci, cj;

      il = parseInt(this.components.length / 2);

      for (i = 0; i < il; i++) {
        j = this.components.length - 1 - i;
        // skip equal points on both ends
        ci = this.components[i];
        cj = this.components[j];
        if (!ci.equals(cj)) {
          if (ci.compareTo(cj) > 0) {
            this.components.reverse();
          }
          return;
        }
      }
  };

  OpenLayers.Geometry.LineString = jsts.geom.LineString;

})();
