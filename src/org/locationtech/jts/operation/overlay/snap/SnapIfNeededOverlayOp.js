import SnapOverlayOp from './SnapOverlayOp';
import RuntimeException from '../../../../../../java/lang/RuntimeException';
import OverlayOp from '../OverlayOp';
export default class SnapIfNeededOverlayOp {
	constructor(...args) {
		(() => {
			this.geom = new Array(2);
		})();
		const overloads = (...args) => {
			switch (args.length) {
				case 2:
					return ((...args) => {
						let [g1, g2] = args;
						this.geom[0] = g1;
						this.geom[1] = g2;
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static overlayOp(g0, g1, opCode) {
		var op = new SnapIfNeededOverlayOp(g0, g1);
		return op.getResultGeometry(opCode);
	}
	static union(g0, g1) {
		return SnapIfNeededOverlayOp.overlayOp(g0, g1, OverlayOp.UNION);
	}
	static intersection(g0, g1) {
		return SnapIfNeededOverlayOp.overlayOp(g0, g1, OverlayOp.INTERSECTION);
	}
	static symDifference(g0, g1) {
		return SnapIfNeededOverlayOp.overlayOp(g0, g1, OverlayOp.SYMDIFFERENCE);
	}
	static difference(g0, g1) {
		return SnapIfNeededOverlayOp.overlayOp(g0, g1, OverlayOp.DIFFERENCE);
	}
	getResultGeometry(opCode) {
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
	}
	getClass() {
		return SnapIfNeededOverlayOp;
	}
}

