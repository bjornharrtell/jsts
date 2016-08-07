import BufferParameters from './BufferParameters';
import Position from '../../geomgraph/Position';
import Coordinate from '../../geom/Coordinate';
import extend from '../../../../../extend';
import BufferInputLineSimplifier from './BufferInputLineSimplifier';
import CoordinateArrays from '../../geom/CoordinateArrays';
import OffsetSegmentGenerator from './OffsetSegmentGenerator';
export default function OffsetCurveBuilder() {
	this.distance = 0.0;
	this.precisionModel = null;
	this.bufParams = null;
	let precisionModel = arguments[0], bufParams = arguments[1];
	this.precisionModel = precisionModel;
	this.bufParams = bufParams;
}
extend(OffsetCurveBuilder.prototype, {
	getOffsetCurve: function (inputPts, distance) {
		this.distance = distance;
		if (distance === 0.0) return null;
		var isRightSide = distance < 0.0;
		var posDistance = Math.abs(distance);
		var segGen = this.getSegGen(posDistance);
		if (inputPts.length <= 1) {
			this.computePointCurve(inputPts[0], segGen);
		} else {
			this.computeOffsetCurve(inputPts, isRightSide, segGen);
		}
		var curvePts = segGen.getCoordinates();
		if (isRightSide) CoordinateArrays.reverse(curvePts);
		return curvePts;
	},
	computeSingleSidedBufferCurve: function (inputPts, isRightSide, segGen) {
		var distTol = this.simplifyTolerance(this.distance);
		if (isRightSide) {
			segGen.addSegments(inputPts, true);
			var simp2 = BufferInputLineSimplifier.simplify(inputPts, -distTol);
			var n2 = simp2.length - 1;
			segGen.initSideSegments(simp2[n2], simp2[n2 - 1], Position.LEFT);
			segGen.addFirstSegment();
			for (var i = n2 - 2; i >= 0; i--) {
				segGen.addNextSegment(simp2[i], true);
			}
		} else {
			segGen.addSegments(inputPts, false);
			var simp1 = BufferInputLineSimplifier.simplify(inputPts, distTol);
			var n1 = simp1.length - 1;
			segGen.initSideSegments(simp1[0], simp1[1], Position.LEFT);
			segGen.addFirstSegment();
			for (var i = 2; i <= n1; i++) {
				segGen.addNextSegment(simp1[i], true);
			}
		}
		segGen.addLastSegment();
		segGen.closeRing();
	},
	computeRingBufferCurve: function (inputPts, side, segGen) {
		var distTol = this.simplifyTolerance(this.distance);
		if (side === Position.RIGHT) distTol = -distTol;
		var simp = BufferInputLineSimplifier.simplify(inputPts, distTol);
		var n = simp.length - 1;
		segGen.initSideSegments(simp[n - 1], simp[0], side);
		for (var i = 1; i <= n; i++) {
			var addStartPoint = i !== 1;
			segGen.addNextSegment(simp[i], addStartPoint);
		}
		segGen.closeRing();
	},
	computeLineBufferCurve: function (inputPts, segGen) {
		var distTol = this.simplifyTolerance(this.distance);
		var simp1 = BufferInputLineSimplifier.simplify(inputPts, distTol);
		var n1 = simp1.length - 1;
		segGen.initSideSegments(simp1[0], simp1[1], Position.LEFT);
		for (var i = 2; i <= n1; i++) {
			segGen.addNextSegment(simp1[i], true);
		}
		segGen.addLastSegment();
		segGen.addLineEndCap(simp1[n1 - 1], simp1[n1]);
		var simp2 = BufferInputLineSimplifier.simplify(inputPts, -distTol);
		var n2 = simp2.length - 1;
		segGen.initSideSegments(simp2[n2], simp2[n2 - 1], Position.LEFT);
		for (var i = n2 - 2; i >= 0; i--) {
			segGen.addNextSegment(simp2[i], true);
		}
		segGen.addLastSegment();
		segGen.addLineEndCap(simp2[1], simp2[0]);
		segGen.closeRing();
	},
	computePointCurve: function (pt, segGen) {
		switch (this.bufParams.getEndCapStyle()) {
			case BufferParameters.CAP_ROUND:
				segGen.createCircle(pt);
				break;
			case BufferParameters.CAP_SQUARE:
				segGen.createSquare(pt);
				break;
		}
	},
	getLineCurve: function (inputPts, distance) {
		this.distance = distance;
		if (distance < 0.0 && !this.bufParams.isSingleSided()) return null;
		if (distance === 0.0) return null;
		var posDistance = Math.abs(distance);
		var segGen = this.getSegGen(posDistance);
		if (inputPts.length <= 1) {
			this.computePointCurve(inputPts[0], segGen);
		} else {
			if (this.bufParams.isSingleSided()) {
				var isRightSide = distance < 0.0;
				this.computeSingleSidedBufferCurve(inputPts, isRightSide, segGen);
			} else this.computeLineBufferCurve(inputPts, segGen);
		}
		var lineCoord = segGen.getCoordinates();
		return lineCoord;
	},
	getBufferParameters: function () {
		return this.bufParams;
	},
	simplifyTolerance: function (bufDistance) {
		return bufDistance * this.bufParams.getSimplifyFactor();
	},
	getRingCurve: function (inputPts, side, distance) {
		this.distance = distance;
		if (inputPts.length <= 2) return this.getLineCurve(inputPts, distance);
		if (distance === 0.0) {
			return OffsetCurveBuilder.copyCoordinates(inputPts);
		}
		var segGen = this.getSegGen(distance);
		this.computeRingBufferCurve(inputPts, side, segGen);
		return segGen.getCoordinates();
	},
	computeOffsetCurve: function (inputPts, isRightSide, segGen) {
		var distTol = this.simplifyTolerance(this.distance);
		if (isRightSide) {
			var simp2 = BufferInputLineSimplifier.simplify(inputPts, -distTol);
			var n2 = simp2.length - 1;
			segGen.initSideSegments(simp2[n2], simp2[n2 - 1], Position.LEFT);
			segGen.addFirstSegment();
			for (var i = n2 - 2; i >= 0; i--) {
				segGen.addNextSegment(simp2[i], true);
			}
		} else {
			var simp1 = BufferInputLineSimplifier.simplify(inputPts, distTol);
			var n1 = simp1.length - 1;
			segGen.initSideSegments(simp1[0], simp1[1], Position.LEFT);
			segGen.addFirstSegment();
			for (var i = 2; i <= n1; i++) {
				segGen.addNextSegment(simp1[i], true);
			}
		}
		segGen.addLastSegment();
	},
	getSegGen: function (distance) {
		return new OffsetSegmentGenerator(this.precisionModel, this.bufParams, distance);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return OffsetCurveBuilder;
	}
});
OffsetCurveBuilder.copyCoordinates = function (pts) {
	var copy = new Array(pts.length).fill(null);
	for (var i = 0; i < copy.length; i++) {
		copy[i] = new Coordinate(pts[i]);
	}
	return copy;
};
