import RelateComputer from './RelateComputer';
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
		this._relate = new RelateComputer(this._arg);
	} else if (arguments.length === 3) {
		let g0 = arguments[0], g1 = arguments[1], boundaryNodeRule = arguments[2];
		GeometryGraphOperation.call(this, g0, g1, boundaryNodeRule);
		this._relate = new RelateComputer(this._arg);
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
	if (g2.getDimension() === 2 && g1.getDimension() < 2) {
		return false;
	}
	if (g2.getDimension() === 1 && g1.getDimension() < 1 && g2.getLength() > 0.0) {
		return false;
	}
	if (!g1.getEnvelopeInternal().covers(g2.getEnvelopeInternal())) return false;
	if (g1.isRectangle()) {
		return true;
	}
	return new RelateOp(g1, g2).getIntersectionMatrix().isCovers();
};
RelateOp.intersects = function (g1, g2) {
	if (!g1.getEnvelopeInternal().intersects(g2.getEnvelopeInternal())) return false;
	if (g1.isRectangle()) {
		return RectangleIntersects.intersects(g1, g2);
	}
	if (g2.isRectangle()) {
		return RectangleIntersects.intersects(g2, g1);
	}
	if (g1.isGeometryCollection() || g2.isGeometryCollection()) {
		var r = false;
		for (var i = 0; i < g1.getNumGeometries(); i++) {
			for (var j = 0; j < g2.getNumGeometries(); j++) {
				if (g1.getGeometryN(i).intersects(g2.getGeometryN(j))) {
					return true;
				}
			}
		}
		return false;
	}
	return new RelateOp(g1, g2).getIntersectionMatrix().isIntersects();
};
RelateOp.touches = function (g1, g2) {
	if (!g1.getEnvelopeInternal().intersects(g2.getEnvelopeInternal())) return false;
	return new RelateOp(g1, g2).getIntersectionMatrix().isTouches(g1.getDimension(), g2.getDimension());
};
RelateOp.relate = function () {
	if (arguments.length === 2) {
		let a = arguments[0], b = arguments[1];
		var relOp = new RelateOp(a, b);
		var im = relOp.getIntersectionMatrix();
		return im;
	} else if (arguments.length === 3) {
		let a = arguments[0], b = arguments[1], boundaryNodeRule = arguments[2];
		var relOp = new RelateOp(a, b, boundaryNodeRule);
		var im = relOp.getIntersectionMatrix();
		return im;
	}
};
RelateOp.overlaps = function (g1, g2) {
	if (!g1.getEnvelopeInternal().intersects(g2.getEnvelopeInternal())) return false;
	return new RelateOp(g1, g2).getIntersectionMatrix().isOverlaps(g1.getDimension(), g2.getDimension());
};
RelateOp.crosses = function (g1, g2) {
	if (!g1.getEnvelopeInternal().intersects(g2.getEnvelopeInternal())) return false;
	return new RelateOp(g1, g2).getIntersectionMatrix().isCrosses(g1.getDimension(), g2.getDimension());
};
RelateOp.contains = function (g1, g2) {
	if (g2.getDimension() === 2 && g1.getDimension() < 2) {
		return false;
	}
	if (g2.getDimension() === 1 && g1.getDimension() < 1 && g2.getLength() > 0.0) {
		return false;
	}
	if (!g1.getEnvelopeInternal().contains(g2.getEnvelopeInternal())) return false;
	if (g1.isRectangle()) {
		return RectangleContains.contains(g1, g2);
	}
	return new RelateOp(g1, g2).getIntersectionMatrix().isContains();
};
