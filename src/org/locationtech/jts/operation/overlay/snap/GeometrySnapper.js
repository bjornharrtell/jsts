import TreeSet from '../../../../../../java/util/TreeSet';
import GeometryTransformer from '../../../geom/util/GeometryTransformer';
import hasInterface from '../../../../../../hasInterface';
import Double from '../../../../../../java/lang/Double';
import extend from '../../../../../../extend';
import LineStringSnapper from './LineStringSnapper';
import PrecisionModel from '../../../geom/PrecisionModel';
import Polygonal from '../../../geom/Polygonal';
import inherits from '../../../../../../inherits';
export default function GeometrySnapper() {
	this.srcGeom = null;
	let srcGeom = arguments[0];
	this.srcGeom = srcGeom;
}
extend(GeometrySnapper.prototype, {
	snapTo: function (snapGeom, snapTolerance) {
		var snapPts = this.extractTargetCoordinates(snapGeom);
		var snapTrans = new SnapTransformer(snapTolerance, snapPts);
		return snapTrans.transform(this.srcGeom);
	},
	snapToSelf: function (snapTolerance, cleanResult) {
		var snapPts = this.extractTargetCoordinates(this.srcGeom);
		var snapTrans = new SnapTransformer(snapTolerance, snapPts, true);
		var snappedGeom = snapTrans.transform(this.srcGeom);
		var result = snappedGeom;
		if (cleanResult && hasInterface(result, Polygonal)) {
			result = snappedGeom.buffer(0);
		}
		return result;
	},
	computeSnapTolerance: function (ringPts) {
		var minSegLen = this.computeMinimumSegmentLength(ringPts);
		var snapTol = minSegLen / 10;
		return snapTol;
	},
	extractTargetCoordinates: function (g) {
		var ptSet = new TreeSet();
		var pts = g.getCoordinates();
		for (var i = 0; i < pts.length; i++) {
			ptSet.add(pts[i]);
		}
		return ptSet.toArray(new Array(0).fill(null));
	},
	computeMinimumSegmentLength: function (pts) {
		var minSegLen = Double.MAX_VALUE;
		for (var i = 0; i < pts.length - 1; i++) {
			var segLen = pts[i].distance(pts[i + 1]);
			if (segLen < minSegLen) minSegLen = segLen;
		}
		return minSegLen;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return GeometrySnapper;
	}
});
GeometrySnapper.snap = function (g0, g1, snapTolerance) {
	var snapGeom = new Array(2).fill(null);
	var snapper0 = new GeometrySnapper(g0);
	snapGeom[0] = snapper0.snapTo(g1, snapTolerance);
	var snapper1 = new GeometrySnapper(g1);
	snapGeom[1] = snapper1.snapTo(snapGeom[0], snapTolerance);
	return snapGeom;
};
GeometrySnapper.computeOverlaySnapTolerance = function () {
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
};
GeometrySnapper.computeSizeBasedSnapTolerance = function (g) {
	var env = g.getEnvelopeInternal();
	var minDimension = Math.min(env.getHeight(), env.getWidth());
	var snapTol = minDimension * GeometrySnapper.SNAP_PRECISION_FACTOR;
	return snapTol;
};
GeometrySnapper.snapToSelf = function (geom, snapTolerance, cleanResult) {
	var snapper0 = new GeometrySnapper(geom);
	return snapper0.snapToSelf(snapTolerance, cleanResult);
};
GeometrySnapper.SNAP_PRECISION_FACTOR = 1e-9;
function SnapTransformer() {
	GeometryTransformer.apply(this);
	this.snapTolerance = null;
	this.snapPts = null;
	this.isSelfSnap = false;
	if (arguments.length === 2) {
		let snapTolerance = arguments[0], snapPts = arguments[1];
		this.snapTolerance = snapTolerance;
		this.snapPts = snapPts;
	} else if (arguments.length === 3) {
		let snapTolerance = arguments[0], snapPts = arguments[1], isSelfSnap = arguments[2];
		this.snapTolerance = snapTolerance;
		this.snapPts = snapPts;
		this.isSelfSnap = isSelfSnap;
	}
}
inherits(SnapTransformer, GeometryTransformer);
extend(SnapTransformer.prototype, {
	snapLine: function (srcPts, snapPts) {
		var snapper = new LineStringSnapper(srcPts, this.snapTolerance);
		snapper.setAllowSnappingToSourceVertices(this.isSelfSnap);
		return snapper.snapTo(snapPts);
	},
	transformCoordinates: function (coords, parent) {
		var srcPts = coords.toCoordinateArray();
		var newPts = this.snapLine(srcPts, this.snapPts);
		return this.factory.getCoordinateSequenceFactory().create(newPts);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return SnapTransformer;
	}
});
