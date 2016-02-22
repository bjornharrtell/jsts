import SnapOverlayOp from './SnapOverlayOp';
import extend from '../../../../../../extend';
import RuntimeException from '../../../../../../java/lang/RuntimeException';
import OverlayOp from '../OverlayOp';
export default function SnapIfNeededOverlayOp() {
	this.geom = new Array(2).fill(null);
	let g1 = arguments[0], g2 = arguments[1];
	this.geom[0] = g1;
	this.geom[1] = g2;
}
extend(SnapIfNeededOverlayOp.prototype, {
	getResultGeometry: function (opCode) {
		var result = null;
		var isSuccess = false;
		var savedException = null;
		try {
			result = OverlayOp.overlayOp(this.geom[0], this.geom[1], opCode);
			var isValid = true;
			if (isValid) isSuccess = true;
		} catch (ex) {
			if (ex instanceof RuntimeException) {
				savedException = ex;
			} else throw ex;
		} finally {}
		if (!isSuccess) {
			try {
				result = SnapOverlayOp.overlayOp(this.geom[0], this.geom[1], opCode);
			} catch (ex) {
				if (ex instanceof RuntimeException) {
					throw savedException;
				} else throw ex;
			} finally {}
		}
		return result;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return SnapIfNeededOverlayOp;
	}
});
SnapIfNeededOverlayOp.overlayOp = function (g0, g1, opCode) {
	var op = new SnapIfNeededOverlayOp(g0, g1);
	return op.getResultGeometry(opCode);
};
SnapIfNeededOverlayOp.union = function (g0, g1) {
	return SnapIfNeededOverlayOp.overlayOp(g0, g1, OverlayOp.UNION);
};
SnapIfNeededOverlayOp.intersection = function (g0, g1) {
	return SnapIfNeededOverlayOp.overlayOp(g0, g1, OverlayOp.INTERSECTION);
};
SnapIfNeededOverlayOp.symDifference = function (g0, g1) {
	return SnapIfNeededOverlayOp.overlayOp(g0, g1, OverlayOp.SYMDIFFERENCE);
};
SnapIfNeededOverlayOp.difference = function (g0, g1) {
	return SnapIfNeededOverlayOp.overlayOp(g0, g1, OverlayOp.DIFFERENCE);
};

