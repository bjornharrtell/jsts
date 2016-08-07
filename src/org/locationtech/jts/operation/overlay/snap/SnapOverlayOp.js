import GeometrySnapper from './GeometrySnapper';
import extend from '../../../../../../extend';
import System from '../../../../../../java/lang/System';
import CommonBitsRemover from '../../../precision/CommonBitsRemover';
import OverlayOp from '../OverlayOp';
export default function SnapOverlayOp() {
	this.geom = new Array(2).fill(null);
	this.snapTolerance = null;
	this.cbr = null;
	let g1 = arguments[0], g2 = arguments[1];
	this.geom[0] = g1;
	this.geom[1] = g2;
	this.computeSnapTolerance();
}
extend(SnapOverlayOp.prototype, {
	selfSnap: function (geom) {
		var snapper0 = new GeometrySnapper(geom);
		var snapGeom = snapper0.snapTo(geom, this.snapTolerance);
		return snapGeom;
	},
	removeCommonBits: function (geom) {
		this.cbr = new CommonBitsRemover();
		this.cbr.add(geom[0]);
		this.cbr.add(geom[1]);
		var remGeom = new Array(2).fill(null);
		remGeom[0] = this.cbr.removeCommonBits(geom[0].copy());
		remGeom[1] = this.cbr.removeCommonBits(geom[1].copy());
		return remGeom;
	},
	prepareResult: function (geom) {
		this.cbr.addCommonBits(geom);
		return geom;
	},
	getResultGeometry: function (opCode) {
		var prepGeom = this.snap(this.geom);
		var result = OverlayOp.overlayOp(prepGeom[0], prepGeom[1], opCode);
		return this.prepareResult(result);
	},
	checkValid: function (g) {
		if (!g.isValid()) {
			System.out.println("Snapped geometry is invalid");
		}
	},
	computeSnapTolerance: function () {
		this.snapTolerance = GeometrySnapper.computeOverlaySnapTolerance(this.geom[0], this.geom[1]);
	},
	snap: function (geom) {
		var remGeom = this.removeCommonBits(geom);
		var snapGeom = GeometrySnapper.snap(remGeom[0], remGeom[1], this.snapTolerance);
		return snapGeom;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return SnapOverlayOp;
	}
});
SnapOverlayOp.overlayOp = function (g0, g1, opCode) {
	var op = new SnapOverlayOp(g0, g1);
	return op.getResultGeometry(opCode);
};
SnapOverlayOp.union = function (g0, g1) {
	return SnapOverlayOp.overlayOp(g0, g1, OverlayOp.UNION);
};
SnapOverlayOp.intersection = function (g0, g1) {
	return SnapOverlayOp.overlayOp(g0, g1, OverlayOp.INTERSECTION);
};
SnapOverlayOp.symDifference = function (g0, g1) {
	return SnapOverlayOp.overlayOp(g0, g1, OverlayOp.SYMDIFFERENCE);
};
SnapOverlayOp.difference = function (g0, g1) {
	return SnapOverlayOp.overlayOp(g0, g1, OverlayOp.DIFFERENCE);
};
