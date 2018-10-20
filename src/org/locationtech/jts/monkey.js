import WKTWriter from './io/WKTWriter';
import IsValidOp from './operation/valid/IsValidOp';
import InteriorPointArea from './algorithm/InteriorPointArea';
import UnaryUnionOp from './operation/union/UnaryUnionOp';
import UnionOp from './operation/union/UnionOp';
import InteriorPointLine from './algorithm/InteriorPointLine';
import IsSimpleOp from './operation/IsSimpleOp';
import BufferOp from './operation/buffer/BufferOp';
import ConvexHull from './algorithm/ConvexHull';
import Centroid from './algorithm/Centroid';
import RelateOp from './operation/relate/RelateOp';
import InteriorPointPoint from './algorithm/InteriorPointPoint';
import DistanceOp from './operation/distance/DistanceOp';
import OverlayOp from './operation/overlay/OverlayOp';
import Geometry from './geom/Geometry';

Geometry.prototype.equalsTopo = function (g) {
	if (!this.getEnvelopeInternal().equals(g.getEnvelopeInternal())) return false;
	return RelateOp.relate(this, g).isEquals(this.getDimension(), g.getDimension());
}
Geometry.prototype.union = function() {
	if (arguments.length === 0) {
		return UnaryUnionOp.union(this);
	} else if (arguments.length === 1) {
		let other = arguments[0];
		return UnionOp.union(this, other);
	}
}
Geometry.prototype.isValid = function() {
	return IsValidOp.isValid(this);
}
Geometry.prototype.intersection = function(other) {
	return OverlayOp.intersection(this, other);
}
Geometry.prototype.covers = function(g) {
	return RelateOp.covers(this, g);
}
Geometry.prototype.coveredBy = function(g) {
	return RelateOp.covers(g, this);
}
Geometry.prototype.touches = function(g) {
	return RelateOp.touches(this, g);
}
Geometry.prototype.intersects = function(g) {
	return RelateOp.intersects(this, g);
}
Geometry.prototype.within = function(g) {
	return RelateOp.contains(g, this);
}
Geometry.prototype.overlaps = function(g) {
	return RelateOp.overlaps(this, g);
}
Geometry.prototype.disjoint = function(g) {
	return RelateOp.disjoint(this, g);
}
Geometry.prototype.crosses = function(g) {
	return RelateOp.crosses(this, g);
}
Geometry.prototype.buffer = function() {
	if (arguments.length === 1) {
		let distance = arguments[0];
		return BufferOp.bufferOp(this, distance);
	} else if (arguments.length === 2) {
		let distance = arguments[0], quadrantSegments = arguments[1];
		return BufferOp.bufferOp(this, distance, quadrantSegments);
	} else if (arguments.length === 3) {
		let distance = arguments[0], quadrantSegments = arguments[1], endCapStyle = arguments[2];
		return BufferOp.bufferOp(this, distance, quadrantSegments, endCapStyle);
	}
}
Geometry.prototype.convexHull = function() {
	return new ConvexHull(this).getConvexHull();
}
Geometry.prototype.relate = function(...args) {
	if (arguments.length === 1) {
		let geometry = arguments[0];
		return RelateOp.relate(this, geometry);
	} else if (arguments.length === 2) {
		let geometry = arguments[0], intersectionPattern = arguments[1];
		return RelateOp.relate(this, geometry).matches(intersectionPattern);
	}
}
Geometry.prototype.getCentroid = function() {
	if (this.isEmpty()) return this._factory.createPoint();
	var centPt = Centroid.getCentroid(this);
	return this.createPointFromInternalCoord(centPt, this);
}
Geometry.prototype.getInteriorPoint = function() {
	if (this.isEmpty()) return this._factory.createPoint();
	var interiorPt = null;
	var dim = this.getDimension();
	if (dim === 0) {
		var intPt = new InteriorPointPoint(this);
		interiorPt = intPt.getInteriorPoint();
	} else if (dim === 1) {
		var intPt = new InteriorPointLine(this);
		interiorPt = intPt.getInteriorPoint();
	} else {
		var intPt = new InteriorPointArea(this);
		interiorPt = intPt.getInteriorPoint();
	}
	return this.createPointFromInternalCoord(interiorPt, this);
}
Geometry.prototype.symDifference = function(other) {
	return OverlayOp.symDifference(this, other);
}
Geometry.prototype.createPointFromInternalCoord = function(coord, exemplar) {
	exemplar.getPrecisionModel().makePrecise(coord);
	return exemplar.getFactory().createPoint(coord);
}
Geometry.prototype.toText = function() {
	var writer = new WKTWriter();
	return writer.write(this);
}
Geometry.prototype.toString = function() {
	this.toText();
}
Geometry.prototype.contains = function(g) {
	return RelateOp.contains(this, g);
}
Geometry.prototype.difference = function(other) {
	return OverlayOp.difference(this, other);
}
Geometry.prototype.isSimple = function() {
	var op = new IsSimpleOp(this);
	return op.isSimple();
}
Geometry.prototype.isWithinDistance = function(geom, distance) {
	var envDist = this.getEnvelopeInternal().distance(geom.getEnvelopeInternal());
	if (envDist > distance) return false;
	return DistanceOp.isWithinDistance(this, geom, distance);
}
Geometry.prototype.distance = function(g) {
	return DistanceOp.distance(this, g);
}
Geometry.prototype.isEquivalentClass = function(other) {
	return this.getClass() === other.getClass();
}

