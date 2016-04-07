import RelateComputer from './RelateComputer';
import extend from '../../../../../extend';
import GeometryGraphOperation from '../GeometryGraphOperation';
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

