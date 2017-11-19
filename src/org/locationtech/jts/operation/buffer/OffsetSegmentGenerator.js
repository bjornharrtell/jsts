import BufferParameters from './BufferParameters';
import NotRepresentableException from '../../algorithm/NotRepresentableException';
import Position from '../../geomgraph/Position';
import Coordinate from '../../geom/Coordinate';
import extend from '../../../../../extend';
import Orientation from '../../algorithm/Orientation';
import OffsetSegmentString from './OffsetSegmentString';
import LineSegment from '../../geom/LineSegment';
import Angle from '../../algorithm/Angle';
import RobustLineIntersector from '../../algorithm/RobustLineIntersector';
import HCoordinate from '../../algorithm/HCoordinate';
export default function OffsetSegmentGenerator() {
	this._maxCurveSegmentError = 0.0;
	this._filletAngleQuantum = null;
	this._closingSegLengthFactor = 1;
	this._segList = null;
	this._distance = 0.0;
	this._precisionModel = null;
	this._bufParams = null;
	this._li = null;
	this._s0 = null;
	this._s1 = null;
	this._s2 = null;
	this._seg0 = new LineSegment();
	this._seg1 = new LineSegment();
	this._offset0 = new LineSegment();
	this._offset1 = new LineSegment();
	this._side = 0;
	this._hasNarrowConcaveAngle = false;
	let precisionModel = arguments[0], bufParams = arguments[1], distance = arguments[2];
	this._precisionModel = precisionModel;
	this._bufParams = bufParams;
	this._li = new RobustLineIntersector();
	this._filletAngleQuantum = Math.PI / 2.0 / bufParams.getQuadrantSegments();
	if (bufParams.getQuadrantSegments() >= 8 && bufParams.getJoinStyle() === BufferParameters.JOIN_ROUND) this._closingSegLengthFactor = OffsetSegmentGenerator.MAX_CLOSING_SEG_LEN_FACTOR;
	this.init(distance);
}
extend(OffsetSegmentGenerator.prototype, {
	addNextSegment: function (p, addStartPoint) {
		this._s0 = this._s1;
		this._s1 = this._s2;
		this._s2 = p;
		this._seg0.setCoordinates(this._s0, this._s1);
		this.computeOffsetSegment(this._seg0, this._side, this._distance, this._offset0);
		this._seg1.setCoordinates(this._s1, this._s2);
		this.computeOffsetSegment(this._seg1, this._side, this._distance, this._offset1);
		if (this._s1.equals(this._s2)) return null;
		var orientation = Orientation.index(this._s0, this._s1, this._s2);
		var outsideTurn = orientation === Orientation.CLOCKWISE && this._side === Position.LEFT || orientation === Orientation.COUNTERCLOCKWISE && this._side === Position.RIGHT;
		if (orientation === 0) {
			this.addCollinear(addStartPoint);
		} else if (outsideTurn) {
			this.addOutsideTurn(orientation, addStartPoint);
		} else {
			this.addInsideTurn(orientation, addStartPoint);
		}
	},
	addLineEndCap: function (p0, p1) {
		var seg = new LineSegment(p0, p1);
		var offsetL = new LineSegment();
		this.computeOffsetSegment(seg, Position.LEFT, this._distance, offsetL);
		var offsetR = new LineSegment();
		this.computeOffsetSegment(seg, Position.RIGHT, this._distance, offsetR);
		var dx = p1.x - p0.x;
		var dy = p1.y - p0.y;
		var angle = Math.atan2(dy, dx);
		switch (this._bufParams.getEndCapStyle()) {
			case BufferParameters.CAP_ROUND:
				this._segList.addPt(offsetL.p1);
				this.addDirectedFillet(p1, angle + Math.PI / 2, angle - Math.PI / 2, Orientation.CLOCKWISE, this._distance);
				this._segList.addPt(offsetR.p1);
				break;
			case BufferParameters.CAP_FLAT:
				this._segList.addPt(offsetL.p1);
				this._segList.addPt(offsetR.p1);
				break;
			case BufferParameters.CAP_SQUARE:
				var squareCapSideOffset = new Coordinate();
				squareCapSideOffset.x = Math.abs(this._distance) * Math.cos(angle);
				squareCapSideOffset.y = Math.abs(this._distance) * Math.sin(angle);
				var squareCapLOffset = new Coordinate(offsetL.p1.x + squareCapSideOffset.x, offsetL.p1.y + squareCapSideOffset.y);
				var squareCapROffset = new Coordinate(offsetR.p1.x + squareCapSideOffset.x, offsetR.p1.y + squareCapSideOffset.y);
				this._segList.addPt(squareCapLOffset);
				this._segList.addPt(squareCapROffset);
				break;
		}
	},
	getCoordinates: function () {
		var pts = this._segList.getCoordinates();
		return pts;
	},
	addMitreJoin: function (p, offset0, offset1, distance) {
		var isMitreWithinLimit = true;
		var intPt = null;
		try {
			intPt = HCoordinate.intersection(offset0.p0, offset0.p1, offset1.p0, offset1.p1);
			var mitreRatio = distance <= 0.0 ? 1.0 : intPt.distance(p) / Math.abs(distance);
			if (mitreRatio > this._bufParams.getMitreLimit()) isMitreWithinLimit = false;
		} catch (ex) {
			if (ex instanceof NotRepresentableException) {
				intPt = new Coordinate(0, 0);
				isMitreWithinLimit = false;
			} else throw ex;
		} finally {}
		if (isMitreWithinLimit) {
			this._segList.addPt(intPt);
		} else {
			this.addLimitedMitreJoin(offset0, offset1, distance, this._bufParams.getMitreLimit());
		}
	},
	addOutsideTurn: function (orientation, addStartPoint) {
		if (this._offset0.p1.distance(this._offset1.p0) < this._distance * OffsetSegmentGenerator.OFFSET_SEGMENT_SEPARATION_FACTOR) {
			this._segList.addPt(this._offset0.p1);
			return null;
		}
		if (this._bufParams.getJoinStyle() === BufferParameters.JOIN_MITRE) {
			this.addMitreJoin(this._s1, this._offset0, this._offset1, this._distance);
		} else if (this._bufParams.getJoinStyle() === BufferParameters.JOIN_BEVEL) {
			this.addBevelJoin(this._offset0, this._offset1);
		} else {
			if (addStartPoint) this._segList.addPt(this._offset0.p1);
			this.addCornerFillet(this._s1, this._offset0.p1, this._offset1.p0, orientation, this._distance);
			this._segList.addPt(this._offset1.p0);
		}
	},
	createSquare: function (p) {
		this._segList.addPt(new Coordinate(p.x + this._distance, p.y + this._distance));
		this._segList.addPt(new Coordinate(p.x + this._distance, p.y - this._distance));
		this._segList.addPt(new Coordinate(p.x - this._distance, p.y - this._distance));
		this._segList.addPt(new Coordinate(p.x - this._distance, p.y + this._distance));
		this._segList.closeRing();
	},
	addSegments: function (pt, isForward) {
		this._segList.addPts(pt, isForward);
	},
	addFirstSegment: function () {
		this._segList.addPt(this._offset1.p0);
	},
	addCornerFillet: function (p, p0, p1, direction, radius) {
		var dx0 = p0.x - p.x;
		var dy0 = p0.y - p.y;
		var startAngle = Math.atan2(dy0, dx0);
		var dx1 = p1.x - p.x;
		var dy1 = p1.y - p.y;
		var endAngle = Math.atan2(dy1, dx1);
		if (direction === Orientation.CLOCKWISE) {
			if (startAngle <= endAngle) startAngle += 2.0 * Math.PI;
		} else {
			if (startAngle >= endAngle) startAngle -= 2.0 * Math.PI;
		}
		this._segList.addPt(p0);
		this.addDirectedFillet(p, startAngle, endAngle, direction, radius);
		this._segList.addPt(p1);
	},
	addLastSegment: function () {
		this._segList.addPt(this._offset1.p1);
	},
	initSideSegments: function (s1, s2, side) {
		this._s1 = s1;
		this._s2 = s2;
		this._side = side;
		this._seg1.setCoordinates(s1, s2);
		this.computeOffsetSegment(this._seg1, side, this._distance, this._offset1);
	},
	addLimitedMitreJoin: function (offset0, offset1, distance, mitreLimit) {
		var basePt = this._seg0.p1;
		var ang0 = Angle.angle(basePt, this._seg0.p0);
		var ang1 = Angle.angle(basePt, this._seg1.p1);
		var angDiff = Angle.angleBetweenOriented(this._seg0.p0, basePt, this._seg1.p1);
		var angDiffHalf = angDiff / 2;
		var midAng = Angle.normalize(ang0 + angDiffHalf);
		var mitreMidAng = Angle.normalize(midAng + Math.PI);
		var mitreDist = mitreLimit * distance;
		var bevelDelta = mitreDist * Math.abs(Math.sin(angDiffHalf));
		var bevelHalfLen = distance - bevelDelta;
		var bevelMidX = basePt.x + mitreDist * Math.cos(mitreMidAng);
		var bevelMidY = basePt.y + mitreDist * Math.sin(mitreMidAng);
		var bevelMidPt = new Coordinate(bevelMidX, bevelMidY);
		var mitreMidLine = new LineSegment(basePt, bevelMidPt);
		var bevelEndLeft = mitreMidLine.pointAlongOffset(1.0, bevelHalfLen);
		var bevelEndRight = mitreMidLine.pointAlongOffset(1.0, -bevelHalfLen);
		if (this._side === Position.LEFT) {
			this._segList.addPt(bevelEndLeft);
			this._segList.addPt(bevelEndRight);
		} else {
			this._segList.addPt(bevelEndRight);
			this._segList.addPt(bevelEndLeft);
		}
	},
	addDirectedFillet: function (p, startAngle, endAngle, direction, radius) {
		var directionFactor = direction === Orientation.CLOCKWISE ? -1 : 1;
		var totalAngle = Math.abs(startAngle - endAngle);
		var nSegs = Math.trunc(totalAngle / this._filletAngleQuantum + 0.5);
		if (nSegs < 1) return null;
		var initAngle = null, currAngleInc = null;
		initAngle = 0.0;
		currAngleInc = totalAngle / nSegs;
		var currAngle = initAngle;
		var pt = new Coordinate();
		while (currAngle < totalAngle) {
			var angle = startAngle + directionFactor * currAngle;
			pt.x = p.x + radius * Math.cos(angle);
			pt.y = p.y + radius * Math.sin(angle);
			this._segList.addPt(pt);
			currAngle += currAngleInc;
		}
	},
	computeOffsetSegment: function (seg, side, distance, offset) {
		var sideSign = side === Position.LEFT ? 1 : -1;
		var dx = seg.p1.x - seg.p0.x;
		var dy = seg.p1.y - seg.p0.y;
		var len = Math.sqrt(dx * dx + dy * dy);
		var ux = sideSign * distance * dx / len;
		var uy = sideSign * distance * dy / len;
		offset.p0.x = seg.p0.x - uy;
		offset.p0.y = seg.p0.y + ux;
		offset.p1.x = seg.p1.x - uy;
		offset.p1.y = seg.p1.y + ux;
	},
	addInsideTurn: function (orientation, addStartPoint) {
		this._li.computeIntersection(this._offset0.p0, this._offset0.p1, this._offset1.p0, this._offset1.p1);
		if (this._li.hasIntersection()) {
			this._segList.addPt(this._li.getIntersection(0));
		} else {
			this._hasNarrowConcaveAngle = true;
			if (this._offset0.p1.distance(this._offset1.p0) < this._distance * OffsetSegmentGenerator.INSIDE_TURN_VERTEX_SNAP_DISTANCE_FACTOR) {
				this._segList.addPt(this._offset0.p1);
			} else {
				this._segList.addPt(this._offset0.p1);
				if (this._closingSegLengthFactor > 0) {
					var mid0 = new Coordinate((this._closingSegLengthFactor * this._offset0.p1.x + this._s1.x) / (this._closingSegLengthFactor + 1), (this._closingSegLengthFactor * this._offset0.p1.y + this._s1.y) / (this._closingSegLengthFactor + 1));
					this._segList.addPt(mid0);
					var mid1 = new Coordinate((this._closingSegLengthFactor * this._offset1.p0.x + this._s1.x) / (this._closingSegLengthFactor + 1), (this._closingSegLengthFactor * this._offset1.p0.y + this._s1.y) / (this._closingSegLengthFactor + 1));
					this._segList.addPt(mid1);
				} else {
					this._segList.addPt(this._s1);
				}
				this._segList.addPt(this._offset1.p0);
			}
		}
	},
	createCircle: function (p) {
		var pt = new Coordinate(p.x + this._distance, p.y);
		this._segList.addPt(pt);
		this.addDirectedFillet(p, 0.0, 2.0 * Math.PI, -1, this._distance);
		this._segList.closeRing();
	},
	addBevelJoin: function (offset0, offset1) {
		this._segList.addPt(offset0.p1);
		this._segList.addPt(offset1.p0);
	},
	init: function (distance) {
		this._distance = distance;
		this._maxCurveSegmentError = distance * (1 - Math.cos(this._filletAngleQuantum / 2.0));
		this._segList = new OffsetSegmentString();
		this._segList.setPrecisionModel(this._precisionModel);
		this._segList.setMinimumVertexDistance(distance * OffsetSegmentGenerator.CURVE_VERTEX_SNAP_DISTANCE_FACTOR);
	},
	addCollinear: function (addStartPoint) {
		this._li.computeIntersection(this._s0, this._s1, this._s1, this._s2);
		var numInt = this._li.getIntersectionNum();
		if (numInt >= 2) {
			if (this._bufParams.getJoinStyle() === BufferParameters.JOIN_BEVEL || this._bufParams.getJoinStyle() === BufferParameters.JOIN_MITRE) {
				if (addStartPoint) this._segList.addPt(this._offset0.p1);
				this._segList.addPt(this._offset1.p0);
			} else {
				this.addCornerFillet(this._s1, this._offset0.p1, this._offset1.p0, Orientation.CLOCKWISE, this._distance);
			}
		}
	},
	closeRing: function () {
		this._segList.closeRing();
	},
	hasNarrowConcaveAngle: function () {
		return this._hasNarrowConcaveAngle;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return OffsetSegmentGenerator;
	}
});
OffsetSegmentGenerator.OFFSET_SEGMENT_SEPARATION_FACTOR = 1.0E-3;
OffsetSegmentGenerator.INSIDE_TURN_VERTEX_SNAP_DISTANCE_FACTOR = 1.0E-3;
OffsetSegmentGenerator.CURVE_VERTEX_SNAP_DISTANCE_FACTOR = 1.0E-6;
OffsetSegmentGenerator.MAX_CLOSING_SEG_LEN_FACTOR = 80;
