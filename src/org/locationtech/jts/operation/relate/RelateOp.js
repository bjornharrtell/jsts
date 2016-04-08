import Geometry from '../../geom/Geometry';
import hasInterface from '../../../../../hasInterface';
import RelateComputer from './RelateComputer';
import BoundaryNodeRule from '../../algorithm/BoundaryNodeRule';
import extend from '../../../../../extend';
import GeometryGraphOperation from '../GeometryGraphOperation';
import RectangleContains from '../predicate/RectangleContains';
import inherits from '../../../../../inherits';
import RectangleIntersects from '../predicate/RectangleIntersects';
export default function RelateOp() {
	this._relate = null;
	if (arguments.length === 2) {
		let g0 = arguments[0], g1 = arguments[1];
		GeometryGraphOperation.call(this, g0, g1);
		this._relate = new RelateComputer(this.arg);
	} else if (arguments.length === 3) {
		let g0 = arguments[0], g1 = arguments[1], boundaryNodeRule = arguments[2];
		GeometryGraphOperation.call(this, g0, g1, boundaryNodeRule);
		this._relate = new RelateComputer(this.arg);
	}
}
inherits(RelateOp, GeometryGraphOperation);
extend(RelateOp.prototype, {
	getIntersectionMatrix: function () {
		return this._relate.computeIM();
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return RelateOp;
	}
});
RelateOp.covers = function (g1, g2) {
	if (!g1.getEnvelopeInternal().covers(g2.getEnvelopeInternal())) return false;
	if (g1.isRectangle()) {
		return true;
	}
	return RelateOp.relate(g1, g2).isCovers();
};
RelateOp.intersects = function (g1, g2) {
	if (!g1.getEnvelopeInternal().intersects(g2.getEnvelopeInternal())) return false;
	if (g1.isRectangle()) {
		return RectangleIntersects.intersects(g1, g2);
	}
	if (g2.isRectangle()) {
		return RectangleIntersects.intersects(g2, g1);
	}
	return RelateOp.relate(g1, g2).isIntersects();
};
RelateOp.touches = function (g1, g2) {
	if (!g1.getEnvelopeInternal().intersects(g2.getEnvelopeInternal())) return false;
	return RelateOp.relate(g1, g2).isTouches(g1.getDimension(), g2.getDimension());
};
RelateOp.within = function (g1, g2) {
	return g2.contains(g1);
};
RelateOp.coveredBy = function (g1, g2) {
	return RelateOp.covers(g2, g1);
};
RelateOp.relate = function () {
	if (arguments.length === 2) {
		let a = arguments[0], b = arguments[1];
		var relOp = new RelateOp(a, b);
		var im = relOp.getIntersectionMatrix();
		return im;
	} else if (arguments.length === 3) {
		if (typeof arguments[2] === "string" && (arguments[0] instanceof Geometry && arguments[1] instanceof Geometry)) {
			let g1 = arguments[0], g2 = arguments[1], intersectionPattern = arguments[2];
			return RelateOp.relateWithCheck(g1, g2).matches(intersectionPattern);
		} else if (hasInterface(arguments[2], BoundaryNodeRule) && (arguments[0] instanceof Geometry && arguments[1] instanceof Geometry)) {
			let a = arguments[0], b = arguments[1], boundaryNodeRule = arguments[2];
			var relOp = new RelateOp(a, b, boundaryNodeRule);
			var im = relOp.getIntersectionMatrix();
			return im;
		}
	}
};
RelateOp.overlaps = function (g1, g2) {
	if (!g1.getEnvelopeInternal().intersects(g2.getEnvelopeInternal())) return false;
	return RelateOp.relate(g1, g2).isOverlaps(g1.getDimension(), g2.getDimension());
};
RelateOp.disjoint = function (g1, g2) {
	return !g1.intersects(g2);
};
RelateOp.relateWithCheck = function (g1, g2) {
	g1.checkNotGeometryCollection(g1);
	g1.checkNotGeometryCollection(g2);
	return RelateOp.relate(g1, g2);
};
RelateOp.crosses = function (g1, g2) {
	if (!g1.getEnvelopeInternal().intersects(g2.getEnvelopeInternal())) return false;
	return RelateOp.relate(g1, g2).isCrosses(g1.getDimension(), g2.getDimension());
};
RelateOp.contains = function (g1, g2) {
	if (!g1.getEnvelopeInternal().contains(g2.getEnvelopeInternal())) return false;
	if (g1.isRectangle()) {
		return RectangleContains.contains(g1, g2);
	}
	return RelateOp.relate(g1, g2).isContains();
};

