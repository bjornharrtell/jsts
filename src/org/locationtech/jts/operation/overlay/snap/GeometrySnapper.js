import TreeSet from '../../../../../../java/util/TreeSet';
import GeometryTransformer from '../../../geom/util/GeometryTransformer';
import hasInterface from '../../../../../../hasInterface';
import Double from '../../../../../../java/lang/Double';
import LineStringSnapper from './LineStringSnapper';
import PrecisionModel from '../../../geom/PrecisionModel';
import Polygonal from '../../../geom/Polygonal';
export default class GeometrySnapper {
	constructor() {
		GeometrySnapper.constructor_.apply(this, arguments);
	}
	static snap(g0, g1, snapTolerance) {
		var snapGeom = new Array(2).fill(null);
		var snapper0 = new GeometrySnapper(g0);
		snapGeom[0] = snapper0.snapTo(g1, snapTolerance);
		var snapper1 = new GeometrySnapper(g1);
		snapGeom[1] = snapper1.snapTo(snapGeom[0], snapTolerance);
		return snapGeom;
	}
	static computeOverlaySnapTolerance() {
		if (arguments.length === 1) {
			let g = arguments[0];
			var snapTolerance = GeometrySnapper.computeSizeBasedSnapTolerance(g);
			var pm = g.getPrecisionModel();
			if (pm.getType() === PrecisionModel.FIXED) {
				var fixedSnapTol = 1 / pm.getScale() * 2 / 1.415;
				if (fixedSnapTol > snapTolerance) snapTolerance = fixedSnapTol;
			}
			return snapTolerance;
		} else if (arguments.length === 2) {
			let g0 = arguments[0], g1 = arguments[1];
			return Math.min(GeometrySnapper.computeOverlaySnapTolerance(g0), GeometrySnapper.computeOverlaySnapTolerance(g1));
		}
	}
	static computeSizeBasedSnapTolerance(g) {
		var env = g.getEnvelopeInternal();
		var minDimension = Math.min(env.getHeight(), env.getWidth());
		var snapTol = minDimension * GeometrySnapper.SNAP_PRECISION_FACTOR;
		return snapTol;
	}
	static snapToSelf(geom, snapTolerance, cleanResult) {
		var snapper0 = new GeometrySnapper(geom);
		return snapper0.snapToSelf(snapTolerance, cleanResult);
	}
	snapTo(snapGeom, snapTolerance) {
		var snapPts = this.extractTargetCoordinates(snapGeom);
		var snapTrans = new SnapTransformer(snapTolerance, snapPts);
		return snapTrans.transform(this._srcGeom);
	}
	snapToSelf(snapTolerance, cleanResult) {
		var snapPts = this.extractTargetCoordinates(this._srcGeom);
		var snapTrans = new SnapTransformer(snapTolerance, snapPts, true);
		var snappedGeom = snapTrans.transform(this._srcGeom);
		var result = snappedGeom;
		if (cleanResult && hasInterface(result, Polygonal)) {
			result = snappedGeom.buffer(0);
		}
		return result;
	}
	computeSnapTolerance(ringPts) {
		var minSegLen = this.computeMinimumSegmentLength(ringPts);
		var snapTol = minSegLen / 10;
		return snapTol;
	}
	extractTargetCoordinates(g) {
		var ptSet = new TreeSet();
		var pts = g.getCoordinates();
		for (var i = 0; i < pts.length; i++) {
			ptSet.add(pts[i]);
		}
		return ptSet.toArray(new Array(0).fill(null));
	}
	computeMinimumSegmentLength(pts) {
		var minSegLen = Double.MAX_VALUE;
		for (var i = 0; i < pts.length - 1; i++) {
			var segLen = pts[i].distance(pts[i + 1]);
			if (segLen < minSegLen) minSegLen = segLen;
		}
		return minSegLen;
	}
	getClass() {
		return GeometrySnapper;
	}
	get interfaces_() {
		return [];
	}
}
GeometrySnapper.constructor_ = function () {
	this._srcGeom = null;
	let srcGeom = arguments[0];
	this._srcGeom = srcGeom;
};
GeometrySnapper.SNAP_PRECISION_FACTOR = 1e-9;
class SnapTransformer extends GeometryTransformer {
	constructor() {
		super();
		SnapTransformer.constructor_.apply(this, arguments);
	}
	snapLine(srcPts, snapPts) {
		var snapper = new LineStringSnapper(srcPts, this._snapTolerance);
		snapper.setAllowSnappingToSourceVertices(this._isSelfSnap);
		return snapper.snapTo(snapPts);
	}
	transformCoordinates(coords, parent) {
		var srcPts = coords.toCoordinateArray();
		var newPts = this.snapLine(srcPts, this._snapPts);
		return this._factory.getCoordinateSequenceFactory().create(newPts);
	}
	getClass() {
		return SnapTransformer;
	}
	get interfaces_() {
		return [];
	}
}
SnapTransformer.constructor_ = function () {
	this._snapTolerance = null;
	this._snapPts = null;
	this._isSelfSnap = false;
	if (arguments.length === 2) {
		let snapTolerance = arguments[0], snapPts = arguments[1];
		this._snapTolerance = snapTolerance;
		this._snapPts = snapPts;
	} else if (arguments.length === 3) {
		let snapTolerance = arguments[0], snapPts = arguments[1], isSelfSnap = arguments[2];
		this._snapTolerance = snapTolerance;
		this._snapPts = snapPts;
		this._isSelfSnap = isSelfSnap;
	}
};
