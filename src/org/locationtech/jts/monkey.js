import WKTWriter from './io/WKTWriter.js'
import IsValidOp from './operation/valid/IsValidOp.js'
import InteriorPointArea from './algorithm/InteriorPointArea.js'
import UnaryUnionOp from './operation/union/UnaryUnionOp.js'
import UnionOp from './operation/union/UnionOp.js'
import InteriorPointLine from './algorithm/InteriorPointLine.js'
import IsSimpleOp from './operation/IsSimpleOp.js'
import BufferOp from './operation/buffer/BufferOp.js'
import ConvexHull from './algorithm/ConvexHull.js'
import Centroid from './algorithm/Centroid.js'
import RelateOp from './operation/relate/RelateOp.js'
import InteriorPointPoint from './algorithm/InteriorPointPoint.js'
import DistanceOp from './operation/distance/DistanceOp.js'
import OverlayOp from './operation/overlay/OverlayOp.js'
import BoundaryOp from './operation/BoundaryOp.js'
import Geometry from './geom/Geometry.js'
import LineString from './geom/LineString.js'
import MultiLineString from './geom/MultiLineString.js'

LineString.prototype.getBoundary = function() {
  return BoundaryOp.getBoundary(this)
}

MultiLineString.prototype.getBoundary = function() {
  return BoundaryOp.getBoundary(this)
}

Geometry.prototype.equalsTopo = function(g) {
  return RelateOp.equalsTopo(this, g)
}
Geometry.prototype.equals = function(g) {
  if (g === null) return false
  return RelateOp.equalsTopo(this, g)
}
Geometry.prototype.union = function() {
  if (arguments.length === 0) {
    return UnaryUnionOp.union(this)
  } else if (arguments.length === 1) {
    const other = arguments[0]
    return UnionOp.union(this, other)
  }
}
Geometry.prototype.isValid = function() {
  return IsValidOp.isValid(this)
}
Geometry.prototype.intersection = function(other) {
  return OverlayOp.intersection(this, other)
}
Geometry.prototype.covers = function(g) {
  return RelateOp.covers(this, g)
}
Geometry.prototype.coveredBy = function(g) {
  return RelateOp.covers(g, this)
}
Geometry.prototype.touches = function(g) {
  return RelateOp.touches(this, g)
}
Geometry.prototype.intersects = function(g) {
  return RelateOp.intersects(this, g)
}
Geometry.prototype.within = function(g) {
  return RelateOp.contains(g, this)
}
Geometry.prototype.overlaps = function(g) {
  return RelateOp.overlaps(this, g)
}
Geometry.prototype.disjoint = function(g) {
  return RelateOp.disjoint(this, g)
}
Geometry.prototype.crosses = function(g) {
  return RelateOp.crosses(this, g)
}
Geometry.prototype.buffer = function() {
  if (arguments.length === 1) {
    const distance = arguments[0]
    return BufferOp.bufferOp(this, distance)
  } else if (arguments.length === 2) {
    const distance = arguments[0]; const quadrantSegments = arguments[1]
    return BufferOp.bufferOp(this, distance, quadrantSegments)
  } else if (arguments.length === 3) {
    const distance = arguments[0]; const quadrantSegments = arguments[1]; const endCapStyle = arguments[2]
    return BufferOp.bufferOp(this, distance, quadrantSegments, endCapStyle)
  }
}
Geometry.prototype.convexHull = function() {
  return new ConvexHull(this).getConvexHull()
}
Geometry.prototype.relate = function() {
  if (arguments.length === 1) {
    const geometry = arguments[0]
    return RelateOp.relate(this, geometry)
  } else if (arguments.length === 2) {
    const geometry = arguments[0]; const intersectionPattern = arguments[1]
    return RelateOp.relate(this, geometry).matches(intersectionPattern)
  }
}
Geometry.prototype.getCentroid = function() {
  if (this.isEmpty()) return this._factory.createPoint()
  const centPt = Centroid.getCentroid(this)
  return this.createPointFromInternalCoord(centPt, this)
}
Geometry.prototype.getInteriorPoint = function() {
  if (this.isEmpty()) return this._factory.createPoint()
  let intPt = null
  const dim = this.getDimension()
  if (dim === 0)
    intPt = new InteriorPointPoint(this)
  else if (dim === 1)
    intPt = new InteriorPointLine(this)
  else intPt = new InteriorPointArea(this)

  const interiorPt = intPt.getInteriorPoint()
  return this.createPointFromInternalCoord(interiorPt, this)
}
Geometry.prototype.symDifference = function(other) {
  return OverlayOp.symDifference(this, other)
}
Geometry.prototype.createPointFromInternalCoord = function(coord, exemplar) {
  exemplar.getPrecisionModel().makePrecise(coord)
  return exemplar.getFactory().createPoint(coord)
}
Geometry.prototype.toText = function() {
  const writer = new WKTWriter()
  return writer.write(this)
}
Geometry.prototype.toString = function() {
  this.toText()
}
Geometry.prototype.contains = function(g) {
  return RelateOp.contains(this, g)
}
Geometry.prototype.difference = function(other) {
  return OverlayOp.difference(this, other)
}
Geometry.prototype.isSimple = function() {
  const op = new IsSimpleOp(this)
  return op.isSimple()
}
Geometry.prototype.isWithinDistance = function(geom, distance) {
  const envDist = this.getEnvelopeInternal().distance(geom.getEnvelopeInternal())
  if (envDist > distance) return false
  return DistanceOp.isWithinDistance(this, geom, distance)
}
Geometry.prototype.distance = function(g) {
  return DistanceOp.distance(this, g)
}
