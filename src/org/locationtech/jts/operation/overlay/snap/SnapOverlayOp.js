import GeometrySnapper from './GeometrySnapper';
import System from '../../../../../../java/lang/System';
import CommonBitsRemover from '../../../precision/CommonBitsRemover';
import OverlayOp from '../OverlayOp';
export default class SnapOverlayOp {
	constructor() {
		SnapOverlayOp.constructor_.apply(this, arguments);
	}
	static overlayOp(g0, g1, opCode) {
		var op = new SnapOverlayOp(g0, g1);
		return op.getResultGeometry(opCode);
	}
	static union(g0, g1) {
		return SnapOverlayOp.overlayOp(g0, g1, OverlayOp.UNION);
	}
	static intersection(g0, g1) {
		return SnapOverlayOp.overlayOp(g0, g1, OverlayOp.INTERSECTION);
	}
	static symDifference(g0, g1) {
		return SnapOverlayOp.overlayOp(g0, g1, OverlayOp.SYMDIFFERENCE);
	}
	static difference(g0, g1) {
		return SnapOverlayOp.overlayOp(g0, g1, OverlayOp.DIFFERENCE);
	}
	selfSnap(geom) {
		var snapper0 = new GeometrySnapper(geom);
		var snapGeom = snapper0.snapTo(geom, this._snapTolerance);
		return snapGeom;
	}
	removeCommonBits(geom) {
		this._cbr = new CommonBitsRemover();
		this._cbr.add(geom[0]);
		this._cbr.add(geom[1]);
		var remGeom = new Array(2).fill(null);
		remGeom[0] = this._cbr.removeCommonBits(geom[0].copy());
		remGeom[1] = this._cbr.removeCommonBits(geom[1].copy());
		return remGeom;
	}
	prepareResult(geom) {
		this._cbr.addCommonBits(geom);
		return geom;
	}
	getResultGeometry(opCode) {
		var prepGeom = this.snap(this._geom);
		var result = OverlayOp.overlayOp(prepGeom[0], prepGeom[1], opCode);
		return this.prepareResult(result);
	}
	checkValid(g) {
		if (!g.isValid()) {
			System.out.println("Snapped geometry is invalid");
		}
	}
	computeSnapTolerance() {
		this._snapTolerance = GeometrySnapper.computeOverlaySnapTolerance(this._geom[0], this._geom[1]);
	}
	snap(geom) {
		var remGeom = this.removeCommonBits(geom);
		var snapGeom = GeometrySnapper.snap(remGeom[0], remGeom[1], this._snapTolerance);
		return snapGeom;
	}
	getClass() {
		return SnapOverlayOp;
	}
	get interfaces_() {
		return [];
	}
}
SnapOverlayOp.constructor_ = function () {
	this._geom = new Array(2).fill(null);
	this._snapTolerance = null;
	this._cbr = null;
	let g1 = arguments[0], g2 = arguments[1];
	this._geom[0] = g1;
	this._geom[1] = g2;
	this.computeSnapTolerance();
};
