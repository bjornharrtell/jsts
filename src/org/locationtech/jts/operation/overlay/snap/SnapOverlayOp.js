import GeometrySnapper from './GeometrySnapper';
import System from '../../../../../../java/lang/System';
import CommonBitsRemover from '../../../precision/CommonBitsRemover';
import OverlayOp from '../OverlayOp';
export default class SnapOverlayOp {
	constructor(...args) {
		this.geom = new Array(2);
		this.snapTolerance = null;
		this.cbr = null;
		const overloads = (...args) => {
			switch (args.length) {
				case 2:
					return ((...args) => {
						let [g1, g2] = args;
						this.geom[0] = g1;
						this.geom[1] = g2;
						this.computeSnapTolerance();
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [];
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
		var snapGeom = snapper0.snapTo(geom, this.snapTolerance);
		return snapGeom;
	}
	removeCommonBits(geom) {
		this.cbr = new CommonBitsRemover();
		this.cbr.add(geom[0]);
		this.cbr.add(geom[1]);
		var remGeom = new Array(2);
		remGeom[0] = this.cbr.removeCommonBits(geom[0].copy());
		remGeom[1] = this.cbr.removeCommonBits(geom[1].copy());
		return remGeom;
	}
	prepareResult(geom) {
		this.cbr.addCommonBits(geom);
		return geom;
	}
	getResultGeometry(opCode) {
		var prepGeom = this.snap(this.geom);
		var result = OverlayOp.overlayOp(prepGeom[0], prepGeom[1], opCode);
		return this.prepareResult(result);
	}
	checkValid(g) {
		if (!g.isValid()) {
			System.out.println("Snapped geometry is invalid");
		}
	}
	computeSnapTolerance() {
		this.snapTolerance = GeometrySnapper.computeOverlaySnapTolerance(this.geom[0], this.geom[1]);
	}
	snap(geom) {
		var remGeom = this.removeCommonBits(geom);
		var snapGeom = GeometrySnapper.snap(remGeom[0], remGeom[1], this.snapTolerance);
		return snapGeom;
	}
	getClass() {
		return SnapOverlayOp;
	}
}

