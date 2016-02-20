import WKTWriter from './io/WKTWriter';
import GeometryCollectionMapper from './geom/util/GeometryCollectionMapper';
import IsValidOp from './operation/valid/IsValidOp';
import InteriorPointArea from './algorithm/InteriorPointArea';
import UnaryUnionOp from './operation/union/UnaryUnionOp';
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

export default function patch () {
	const mixin = {
		union: function () {
			if (arguments.length === 0) {
				return UnaryUnionOp.union(this);
			} else if (arguments.length === 1) {
				let other = arguments[0];
				if (this.isEmpty() || other.isEmpty()) {
					if (this.isEmpty() && other.isEmpty()) return OverlayOp.createEmptyResult(OverlayOp.UNION, this, other, this.factory);
					if (this.isEmpty()) return other.copy();
					if (other.isEmpty()) return this.copy();
				}
				this.checkNotGeometryCollection(this);
				this.checkNotGeometryCollection(other);
				return SnapIfNeededOverlayOp.overlayOp(this, other, OverlayOp.UNION);
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
		intersects: function (g) {
			if (!this.getEnvelopeInternal().intersects(g.getEnvelopeInternal())) return false;
			if (this.isRectangle()) {
				return RectangleIntersects.intersects(this, g);
			}
			if (g.isRectangle()) {
				return RectangleIntersects.intersects(g, this);
			}
			return this.relate(g).isIntersects();
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
		relate(...args) {
			if (args.length === 1) {
				let [g] = args;
				this.checkNotGeometryCollection(this);
				this.checkNotGeometryCollection(g);
				return RelateOp.relate(this, g);
			} else if (args.length === 2) {
				let [g, intersectionPattern] = args;
				return this.relate(g).matches(intersectionPattern);
			}
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
		disjoint(g) {
			return !this.intersects(g);
		},
		toText: function () {
			var writer = new WKTWriter();
			return writer.write(this);
		},
		contains: function (g) {
			if (!this.getEnvelopeInternal().contains(g.getEnvelopeInternal())) return false;
			if (this.isRectangle()) {
				return RectangleContains.contains(this, g);
			}
			return this.relate(g).isContains();
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
	}

	for (const key in mixin) {
		Geometry.prototype[key] = mixin[key];
	};

}
