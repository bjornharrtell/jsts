/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */



/**
 * Specifies the precision model of the {@link Coordinate}s in a
 * {@link Geometry}. In other words, specifies the grid of allowable points for
 * all <code>Geometry</code>s.
 * <p>
 * The {@link makePrecise} method allows rounding a coordinate to a "precise"
 * value; that is, one whose precision is known exactly.
 * <p>
 * Coordinates are assumed to be precise in geometries. That is, the coordinates
 * are assumed to be rounded to the precision model given for the geometry. JTS
 * input routines automatically round coordinates to the precision model before
 * creating Geometries. All internal operations assume that coordinates are
 * rounded to the precision model. Constructive methods (such as boolean
 * operations) always round computed coordinates to the appropriate precision
 * model.
 * <p>
 * Currently one type of precision model are supported:
 * <ul>
 * <li>FLOATING - represents full double precision floating point.
 * <p>
 * Coordinates are represented internally as Java double-precision values. Since
 * Java uses the IEEE-754 floating point standard, this provides 53 bits of
 * precision.
 * <p>
 * JSTS methods currently do not handle inputs with different precision models.
 *
 * @constructor
 */
jsts.geom.PrecisionModel = function() {

};


/**
 * @type {int}
 */
jsts.geom.PrecisionModel.FLOATING = 0;


/**
 * @type {int}
 */
jsts.geom.PrecisionModel.FIXED = 1;


/**
 * @return {boolean} always true.
 */
jsts.geom.PrecisionModel.prototype.isFloating = function() {
  return true;
};


/**
 * @return {int} always jsts.geom.PrecisionModel.FLOATING.
 */
jsts.geom.PrecisionModel.prototype.getType = function() {
  return jsts.geom.PrecisionModel.FLOATING;
};

jsts.geom.PrecisionModel.prototype.equals = function(other) {
  return true;

  //TODO: needs to be ported for fixed precision

  /*if (!(other instanceof PrecisionModel)) {
    return false;
  }
  var otherPrecisionModel = other;
  return this.modelType == otherPrecisionModel.modelType &&
      this.scale == otherPrecisionModel.scale;*/
};


/**
 * Compares this {@link PrecisionModel} object with the specified object for
 * order. A PrecisionModel is greater than another if it provides greater
 * precision. The comparison is based on the value returned by the
 * {@link #getMaximumSignificantDigits} method. This comparison is not strictly
 * accurate when comparing floating precision models to fixed models; however,
 * it is correct when both models are either floating or fixed.
 *
 * @param o
 *          the <code>PrecisionModel</code> with which this
 *          <code>PrecisionModel</code> is being compared.
 * @return a negative integer, zero, or a positive integer as this
 *         <code>PrecisionModel</code> is less than, equal to, or greater than
 *         the specified <code>PrecisionModel.</code>
 */
jsts.geom.PrecisionModel.prototype.compareTo = function(o) {
  var other = o;

  // TODO: needs to be ported for fixed precision

  // var sigDigits = this.getMaximumSignificantDigits();
  // var otherSigDigits = other.getMaximumSignificantDigits();
  // return (new Integer(sigDigits)).compareTo(new Integer(otherSigDigits));

  return 0;
};
