/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

jsts.geom.GeometryConverter = function(geometryFactory) {
};

jsts.geom.GeometryConverter.prototype.convertFrom = function(geometry) {
  throw new jsts.error.AbstractMethodInvocationError();
};

jsts.geom.GeometryConverter.prototype.convertFromPoint = function(point) {
  throw new jsts.error.AbstractMethodInvocationError();
};

jsts.geom.GeometryConverter.prototype.convertFromLineString = function(
    lineString) {
  throw new jsts.error.AbstractMethodInvocationError();
};

jsts.geom.GeometryConverter.prototype.convertFromLinearRing = function(
    linearRing) {
  throw new jsts.error.AbstractMethodInvocationError();
};

jsts.geom.GeometryConverter.prototype.convertFromPolygon = function(polygon) {
  throw new jsts.error.AbstractMethodInvocationError();
};

jsts.geom.GeometryConverter.prototype.convertTo = function(geometry) {
  throw new jsts.error.AbstractMethodInvocationError();
};

jsts.geom.GeometryConverter.prototype.convertToPoint = function(coordinate) {
  throw new jsts.error.AbstractMethodInvocationError();
};
