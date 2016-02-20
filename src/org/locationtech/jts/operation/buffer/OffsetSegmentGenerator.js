import BufferParameters from './BufferParameters';
import NotRepresentableException from '../../algorithm/NotRepresentableException';
import CGAlgorithms from '../../algorithm/CGAlgorithms';
import Position from '../../geomgraph/Position';
import Coordinate from '../../geom/Coordinate';
import extend from '../../../../../extend';
import OffsetSegmentString from './OffsetSegmentString';
import LineSegment from '../../geom/LineSegment';
import Angle from '../../algorithm/Angle';
import RobustLineIntersector from '../../algorithm/RobustLineIntersector';
import HCoordinate from '../../algorithm/HCoordinate';
export default function OffsetSegmentGenerator() {
	this.maxCurveSegmentError = 0.0;
	this.filletAngleQuantum = null;
	this.closingSegLengthFactor = 1;
	this.segList = null;
	this.distance = 0.0;
	this.precisionModel = null;
	this.bufParams = null;
	this.li = null;
	this.s0 = null;
	this.s1 = null;
	this.s2 = null;
	this.seg0 = new LineSegment();
	this.seg1 = new LineSegment();
	this.offset0 = new LineSegment();
	this.offset1 = new LineSegment();
	this.side = 0;
	this._hasNarrowConcaveAngle = false;
	let precisionModel = arguments[0], bufParams = arguments[1], distance = arguments[2];
	this.precisionModel = precisionModel;
	this.bufParams = bufParams;
	this.li = new RobustLineIntersector();
	this.filletAngleQuantum = Math.PI / 2.0 / bufParams.getQuadrantSegments();
	if (bufParams.getQuadrantSegments() >= 8 && bufParams.getJoinStyle() === BufferParameters.JOIN_ROUND) this.closingSegLengthFactor = OffsetSegmentGenerator.MAX_CLOSING_SEG_LEN_FACTOR;
	this.init(distance);
}
extend(OffsetSegmentGenerator.prototype, {
	addNextSegment: function (p, addStartPoint) {
		this.s0 = this.s1;
		this.s1 = this.s2;
		this.s2 = p;
		this.seg0.setCoordinates(this.s0, this.s1);
		this.computeOffsetSegment(this.seg0, this.side, this.distance, this.offset0);
		this.seg1.setCoordinates(this.s1, this.s2);
		this.computeOffsetSegment(this.seg1, this.side, this.distance, this.offset1);
		if (this.s1.equals(this.s2)) return null;
		var orientation = CGAlgorithms.computeOrientation(this.s0, this.s1, this.s2);
		var outsideTurn = orientation === CGAlgorithms.CLOCKWISE && this.side === Position.LEFT || orientation === CGAlgorithms.COUNTERCLOCKWISE && this.side === Position.RIGHT;
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
		this.computeOffsetSegment(seg, Position.LEFT, this.distance, offsetL);
		var offsetR = new LineSegment();
		this.computeOffsetSegment(seg, Position.RIGHT, this.distance, offsetR);
		var dx = p1.x - p0.x;
		var dy = p1.y - p0.y;
		var angle = Math.atan2(dy, dx);
		switch (this.bufParams.getEndCapStyle()) {
			case BufferParameters.CAP_ROUND:
				this.segList.addPt(offsetL.p1);
				this.addFilletArc(p1, angle + Math.PI / 2, angle - Math.PI / 2, CGAlgorithms.CLOCKWISE, this.distance);
				this.segList.addPt(offsetR.p1);
				break;
			case BufferParameters.CAP_FLAT:
				this.segList.addPt(offsetL.p1);
				this.segList.addPt(offsetR.p1);
				break;
			case BufferParameters.CAP_SQUARE:
				var squareCapSideOffset = new Coordinate();
				squareCapSideOffset.x = Math.abs(this.distance) * Math.cos(angle);
				squareCapSideOffset.y = Math.abs(this.distance) * Math.sin(angle);
				var squareCapLOffset = new Coordinate(offsetL.p1.x + squareCapSideOffset.x, offsetL.p1.y + squareCapSideOffset.y);
				var squareCapROffset = new Coordinate(offsetR.p1.x + squareCapSideOffset.x, offsetR.p1.y + squareCapSideOffset.y);
				this.segList.addPt(squareCapLOffset);
				this.segList.addPt(squareCapROffset);
				break;
		}
	},
	getCoordinates: function () {
		var pts = this.segList.getCoordinates();
		return pts;
	},
	addMitreJoin: function (p, offset0, offset1, distance) {
		var isMitreWithinLimit = true;
		var intPt = null;
		try {
			intPt = HCoordinate.intersection(offset0.p0, offset0.p1, offset1.p0, offset1.p1);
			var mitreRatio = distance <= 0.0 ? 1.0 : intPt.distance(p) / Math.abs(distance);
			if (mitreRatio > this.bufParams.getMitreLimit()) isMitreWithinLimit = false;
		} catch (ex) {
			if (ex instanceof NotRepresentableException) {
				intPt = new Coordinate(0, 0);
				isMitreWithinLimit = false;
			} else throw ex;
		} finally {}
		if (isMitreWithinLimit) {
			this.segList.addPt(intPt);
		} else {
			this.addLimitedMitreJoin(offset0, offset1, distance, this.bufParams.getMitreLimit());
		}
	},
	addFilletCorner: function (p, p0, p1, direction, radius) {
		var dx0 = p0.x - p.x;
		var dy0 = p0.y - p.y;
		var startAngle = Math.atan2(dy0, dx0);
		var dx1 = p1.x - p.x;
		var dy1 = p1.y - p.y;
		var endAngle = Math.atan2(dy1, dx1);
		if (direction === CGAlgorithms.CLOCKWISE) {
			if (startAngle <= endAngle) startAngle += 2.0 * Math.PI;
		} else {
			if (startAngle >= endAngle) startAngle -= 2.0 * Math.PI;
		}
		this.segList.addPt(p0);
		this.addFilletArc(p, startAngle, endAngle, direction, radius);
		this.segList.addPt(p1);
	},
	addOutsideTurn: function (orientation, addStartPoint) {
		if (this.offset0.p1.distance(this.offset1.p0) < this.distance * OffsetSegmentGenerator.OFFSET_SEGMENT_SEPARATION_FACTOR) {
			this.segList.addPt(this.offset0.p1);
			return null;
		}
		if (this.bufParams.getJoinStyle() === BufferParameters.JOIN_MITRE) {
			this.addMitreJoin(this.s1, this.offset0, this.offset1, this.distance);
		} else if (this.bufParams.getJoinStyle() === BufferParameters.JOIN_BEVEL) {
			this.addBevelJoin(this.offset0, this.offset1);
		} else {
			if (addStartPoint) this.segList.addPt(this.offset0.p1);
			this.addFilletCorner(this.s1, this.offset0.p1, this.offset1.p0, orientation, this.distance);
			this.segList.addPt(this.offset1.p0);
		}
	},
	createSquare: function (p) {
		this.segList.addPt(new Coordinate(p.x + this.distance, p.y + this.distance));
		this.segList.addPt(new Coordinate(p.x + this.distance, p.y - this.distance));
		this.segList.addPt(new Coordinate(p.x - this.distance, p.y - this.distance));
		this.segList.addPt(new Coordinate(p.x - this.distance, p.y + this.distance));
		this.segList.closeRing();
	},
	addSegments: function (pt, isForward) {
		this.segList.addPts(pt, isForward);
	},
	addFirstSegment: function () {
		this.segList.addPt(this.offset1.p0);
	},
	addLastSegment: function () {
		this.segList.addPt(this.offset1.p1);
	},
	initSideSegments: function (s1, s2, side) {
		this.s1 = s1;
		this.s2 = s2;
		this.side = side;
		this.seg1.setCoordinates(s1, s2);
		this.computeOffsetSegment(this.seg1, side, this.distance, this.offset1);
	},
	addLimitedMitreJoin: function (offset0, offset1, distance, mitreLimit) {
		var basePt = this.seg0.p1;
		var ang0 = Angle.angle(basePt, this.seg0.p0);
		var ang1 = Angle.angle(basePt, this.seg1.p1);
		var angDiff = Angle.angleBetweenOriented(this.seg0.p0, basePt, this.seg1.p1);
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
		if (this.side === Position.LEFT) {
			this.segList.addPt(bevelEndLeft);
			this.segList.addPt(bevelEndRight);
		} else {
			this.segList.addPt(bevelEndRight);
			this.segList.addPt(bevelEndLeft);
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
	addFilletArc: function (p, startAngle, endAngle, direction, radius) {
		var directionFactor = direction === CGAlgorithms.CLOCKWISE ? -1 : 1;
		var totalAngle = Math.abs(startAngle - endAngle);
		var nSegs = Math.trunc(totalAngle / this.filletAngleQuantum + 0.5);
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
			this.segList.addPt(pt);
			currAngle += currAngleInc;
		}
	},
	addInsideTurn: function (orientation, addStartPoint) {
		this.li.computeIntersection(this.offset0.p0, this.offset0.p1, this.offset1.p0, this.offset1.p1);
		if (this.li.hasIntersection()) {
			this.segList.addPt(this.li.getIntersection(0));
		} else {
			this._hasNarrowConcaveAngle = true;
			if (this.offset0.p1.distance(this.offset1.p0) < this.distance * OffsetSegmentGenerator.INSIDE_TURN_VERTEX_SNAP_DISTANCE_FACTOR) {
				this.segList.addPt(this.offset0.p1);
			} else {
				this.segList.addPt(this.offset0.p1);
				if (this.closingSegLengthFactor > 0) {
					var mid0 = new Coordinate((this.closingSegLengthFactor * this.offset0.p1.x + this.s1.x) / (this.closingSegLengthFactor + 1), (this.closingSegLengthFactor * this.offset0.p1.y + this.s1.y) / (this.closingSegLengthFactor + 1));
					this.segList.addPt(mid0);
					var mid1 = new Coordinate((this.closingSegLengthFactor * this.offset1.p0.x + this.s1.x) / (this.closingSegLengthFactor + 1), (this.closingSegLengthFactor * this.offset1.p0.y + this.s1.y) / (this.closingSegLengthFactor + 1));
					this.segList.addPt(mid1);
				} else {
					this.segList.addPt(this.s1);
				}
				this.segList.addPt(this.offset1.p0);
			}
		}
	},
	createCircle: function (p) {
		var pt = new Coordinate(p.x + this.distance, p.y);
		this.segList.addPt(pt);
		this.addFilletArc(p, 0.0, 2.0 * Math.PI, -1, this.distance);
		this.segList.closeRing();
	},
	addBevelJoin: function (offset0, offset1) {
		this.segList.addPt(offset0.p1);
		this.segList.addPt(offset1.p0);
	},
	init: function (distance) {
		this.distance = distance;
		this.maxCurveSegmentError = distance * (1 - Math.cos(this.filletAngleQuantum / 2.0));
		this.segList = new OffsetSegmentString();
		this.segList.setPrecisionModel(this.precisionModel);
		this.segList.setMinimumVertexDistance(distance * OffsetSegmentGenerator.CURVE_VERTEX_SNAP_DISTANCE_FACTOR);
	},
	addCollinear: function (addStartPoint) {
		this.li.computeIntersection(this.s0, this.s1, this.s1, this.s2);
		var numInt = this.li.getIntersectionNum();
		if (numInt >= 2) {
			if (this.bufParams.getJoinStyle() === BufferParameters.JOIN_BEVEL || this.bufParams.getJoinStyle() === BufferParameters.JOIN_MITRE) {
				if (addStartPoint) this.segList.addPt(this.offset0.p1);
				this.segList.addPt(this.offset1.p0);
			} else {
				this.addFilletCorner(this.s1, this.offset0.p1, this.offset1.p0, CGAlgorithms.CLOCKWISE, this.distance);
			}
		}
	},
	closeRing: function () {
		this.segList.closeRing();
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

