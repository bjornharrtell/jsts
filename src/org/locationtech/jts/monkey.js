import WKTWriter from './io/WKTWriter';
import GeometryCollectionMapper from './geom/util/GeometryCollectionMapper';
import IsValidOp from './operation/valid/IsValidOp';
import InteriorPointArea from './algorithm/InteriorPointArea';
import UnaryUnionOp from './operation/union/UnaryUnionOp';
import UnionOp from './operation/union/UnionOp';
import SnapIfNeededOverlayOp from './operation/overlay/snap/SnapIfNeededOverlayOp';
import InteriorPointLine from './algorithm/InteriorPointLine';
import IsSimpleOp from './operation/IsSimpleOp';
import BufferOp from './operation/buffer/BufferOp';
import ConvexHull from './algorithm/ConvexHull';
import Centroid from './algorithm/Centroid';
import Comparable from '../../../java/lang/Comparable';
import RelateOp from './operation/relate/RelateOp';
import InteriorPointPoint from './algorithm/InteriorPointPoint';
import Cloneable from '../../../java/lang/Cloneable';
import Serializable from '../../../java/io/Serializable';
import DistanceOp from './operation/distance/DistanceOp';
import Envelope from './geom/Envelope';
import RectangleContains from './operation/predicate/RectangleContains';
import Assert from './util/Assert';
import RectangleIntersects from './operation/predicate/RectangleIntersects';
import OverlayOp from './operation/overlay/OverlayOp';

import Geometry from './geom/Geometry';
import GeometryCollection from './geom/GeometryCollection';

import extend from '../../../extend';

extend(Geometry.prototype, {
	equalsTopo: function (g) {
		if (!this.getEnvelopeInternal().equals(g.getEnvelopeInternal())) return false;
		return RelateOp.relate(this, g).isEquals(this.getDimension(), g.getDimension());
	},
	union: function () {
		if (arguments.length === 0) {
			return UnaryUnionOp.union(this);
		} else if (arguments.length === 1) {
			let other = arguments[0];
			return UnionOp.union(this, other);
		}
	},
	isValid: function () {
		return IsValidOp.isValid(this);
	},
	intersection: function (other) {
		if (this.isEmpty() || other.isEmpty()) return OverlayOp.createEmptyResult(OverlayOp.INTERSECTION, this, other, this.factory);
		if (this.isGeometryCollection()) {
			var g2 = other;
			return GeometryCollectionMapper.map(this, {
				interfaces_: function () {
					return [MapOp];
				},
				map: function (g) {
					return g.intersection(g2);
				}
			});
		}
		this.checkNotGeometryCollection(this);
		this.checkNotGeometryCollection(other);
		return SnapIfNeededOverlayOp.overlayOp(this, other, OverlayOp.INTERSECTION);
	},
	covers: function (g) {
		return RelateOp.covers(this, g);
	},
	coveredBy: function (g) {
		return RelateOp.coveredBy(this, g);
	},
	touches: function (g) {
		return RelateOp.touches(this, g);
	},
	intersects: function (g) {
		return RelateOp.intersects(this, g);
	},
	within: function (g) {
		return RelateOp.within(this, g);
	},
	overlaps: function (g) {
		return RelateOp.overlaps(this, g);
	},
	disjoint: function (g) {
		return RelateOp.disjoint(this, g);
	},
	crosses: function (g) {
		return RelateOp.crosses(this, g);
	},
	buffer: function () {
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
	},
	convexHull: function () {
		return new ConvexHull(this).getConvexHull();
	},
	relate: function (...args) {
		return RelateOp.relate(this, ...args);
	},
	getCentroid: function () {
		if (this.isEmpty()) return this.factory.createPoint();
		var centPt = Centroid.getCentroid(this);
		return this.createPointFromInternalCoord(centPt, this);
	},
	getInteriorPoint: function () {
		if (this.isEmpty()) return this.factory.createPoint();
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
	},
	symDifference: function (other) {
		if (this.isEmpty() || other.isEmpty()) {
			if (this.isEmpty() && other.isEmpty()) return OverlayOp.createEmptyResult(OverlayOp.SYMDIFFERENCE, this, other, this.factory);
			if (this.isEmpty()) return other.copy();
			if (other.isEmpty()) return this.copy();
		}
		this.checkNotGeometryCollection(this);
		this.checkNotGeometryCollection(other);
		return SnapIfNeededOverlayOp.overlayOp(this, other, OverlayOp.SYMDIFFERENCE);
	},
	createPointFromInternalCoord: function (coord, exemplar) {
		exemplar.getPrecisionModel().makePrecise(coord);
		return exemplar.getFactory().createPoint(coord);
	},
	toText: function () {
		var writer = new WKTWriter();
		return writer.write(this);
	},
	toString: function() {
		this.toText();
	},
	contains: function (g) {
		return RelateOp.contains(this, g);
	},
	difference: function (other) {
		if (this.isEmpty()) return OverlayOp.createEmptyResult(OverlayOp.DIFFERENCE, this, other, this.factory);
		if (other.isEmpty()) return this.copy();
		this.checkNotGeometryCollection(this);
		this.checkNotGeometryCollection(other);
		return SnapIfNeededOverlayOp.overlayOp(this, other, OverlayOp.DIFFERENCE);
	},
	isSimple: function () {
		var op = new IsSimpleOp(this);
		return op.isSimple();
	},
	isWithinDistance: function (geom, distance) {
		var envDist = this.getEnvelopeInternal().distance(geom.getEnvelopeInternal());
		if (envDist > distance) return false;
		return DistanceOp.isWithinDistance(this, geom, distance);
	},
	distance: function (g) {
		return DistanceOp.distance(this, g);
	},
	isEquivalentClass: function (other) {
		return this.getClass() === other.getClass();
	}
})
