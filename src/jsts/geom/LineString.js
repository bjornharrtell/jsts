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
   * @constructor
   * @extends jsts.geom.Geometry
   */
  var LineString = function(points) {
    OpenLayers.Geometry.Curve.prototype.initialize.apply(this, arguments);

    this.geometries = this.components;
  };
  LineString.prototype = OpenLayers.Geometry.LineString.prototype;

  for (key in jsts.geom.Geometry.prototype) {
    LineString.prototype[key] = jsts.geom.Geometry.prototype[key];
  }

  /**
   * @return {jsts.geom.Coordinate[]} this LineString's internal coordinate
   *         array.
   */
  LineString.prototype.getCoordinates = function() {
    return this.components;
  };


  /**
   * @return {jsts.geom.Coordinate} The n'th coordinate of this LineString.
   * @param {int}
   *          n index.
   */
  LineString.prototype.getCoordinateN = function(n) {
    return this.components[n];
  };


  /**
   * @return {jsts.geom.Coordinate} The first coordinate of this LineString or
   *         null if empty.
   */
  LineString.prototype.getCoordinate = function() {
    if (this.isEmpty()) {
      return null;
    }
    return this.getCoordinateN(0);
  };


  /**
   * @return {int} LineStrings are always 1-dimensional.
   */
  LineString.prototype.getDimension = function() {
    return 1;
  };


  /**
   * @return {int} dimension of the boundary of this LineString.
   */
  LineString.prototype.getBoundaryDimension = function() {
    if (this.isClosed()) {
      return Dimension.FALSE;
    }
    return 0;
  };


  /**
   * @return {Boolean} true if empty.
   */
  LineString.prototype.isEmpty = function() {
    return this.components.length === 0;
  };

  LineString.prototype.getNumPoints = function() {
    return this.components.length;
  };

  LineString.prototype.getPointN = function(n) {
    return this.getFactory().createPoint(this.components[n]);
  };


  LineString.prototype.getStartPoint = function() {
    if (this.isEmpty()) {
      return null;
    }
    return this.getPointN(0);
  };

  LineString.prototype.getEndPoint = function() {
    if (this.isEmpty()) {
      return null;
    }
    return this.getPointN(this.getNumPoints() - 1);
  };


  /**
   * @return {Boolean} true if LineString is Closed.
   */
  LineString.prototype.isClosed = function() {
    if (this.isEmpty()) {
      return false;
    }
    return this.getCoordinateN(0).equals2D(
        this.getCoordinateN(this.components.length - 1));
  };


  /**
   * @return {Boolean} true if LineString is a Ring.
   */
  LineString.prototype.isRing = function() {
    return this.isClosed() && this.isSimple();
  };


  /**
   * @return {String} String representation of LineString type.
   */
  LineString.prototype.getGeometryType = function() {
    return 'LineString';
  };


  /**
   * Gets the boundary of this geometry. The boundary of a lineal geometry is
   * always a zero-dimensional geometry (which may be empty).
   *
   * @return {Geometry} the boundary geometry.
   * @see Geometry#getBoundary
   */
  LineString.prototype.getBoundary = function() {
    return (new jsts.operation.BoundaryOp(this)).getBoundary();
  };


  LineString.prototype.computeEnvelopeInternal = function() {
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
  LineString.prototype.equalsExact = function(other, tolerance) {
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


  /**
   * Creates and returns a full copy of this {@link LineString} object.
   * (including all coordinates contained by it).
   *
   * @return {LineString} a clone of this instance.
   */
  LineString.prototype.clone = function() {
    var points = this.components.map(function(component) {
      return component.clone();
    });

    var clone = new LineString(points);

    return clone;
  };

  LineString.prototype.apply = function(filter) {
    filter.filter(this);
  };

  jsts.geom.LineString = LineString;
  OpenLayers.Geometry.LineString = LineString;

})();
