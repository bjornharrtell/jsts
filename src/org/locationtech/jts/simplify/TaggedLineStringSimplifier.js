import extend from '../../../../extend';
import LineSegment from '../geom/LineSegment';
import LineSegmentIndex from './LineSegmentIndex';
import RobustLineIntersector from '../algorithm/RobustLineIntersector';
export default function TaggedLineStringSimplifier() {
	this._li = new RobustLineIntersector();
	this._inputIndex = new LineSegmentIndex();
	this._outputIndex = new LineSegmentIndex();
	this._line = null;
	this._linePts = null;
	this._distanceTolerance = 0.0;
	let inputIndex = arguments[0], outputIndex = arguments[1];
	this._inputIndex = inputIndex;
	this._outputIndex = outputIndex;
}
extend(TaggedLineStringSimplifier.prototype, {
	flatten: function (start, end) {
		var p0 = this._linePts[start];
		var p1 = this._linePts[end];
		var newSeg = new LineSegment(p0, p1);
		this.remove(this._line, start, end);
		this._outputIndex.add(newSeg);
		return newSeg;
	},
	hasBadIntersection: function (parentLine, sectionIndex, candidateSeg) {
		if (this.hasBadOutputIntersection(candidateSeg)) return true;
		if (this.hasBadInputIntersection(parentLine, sectionIndex, candidateSeg)) return true;
		return false;
	},
	setDistanceTolerance: function (distanceTolerance) {
		this._distanceTolerance = distanceTolerance;
	},
	simplifySection: function (i, j, depth) {
		depth += 1;
		var sectionIndex = new Array(2).fill(null);
		if (i + 1 === j) {
			var newSeg = this._line.getSegment(i);
			this._line.addToResult(newSeg);
			return null;
		}
		var isValidToSimplify = true;
		if (this._line.getResultSize() < this._line.getMinimumSize()) {
			var worstCaseSize = depth + 1;
			if (worstCaseSize < this._line.getMinimumSize()) isValidToSimplify = false;
		}
		var distance = new Array(1).fill(null);
		var furthestPtIndex = this.findFurthestPoint(this._linePts, i, j, distance);
		if (distance[0] > this._distanceTolerance) isValidToSimplify = false;
		var candidateSeg = new LineSegment();
		candidateSeg.p0 = this._linePts[i];
		candidateSeg.p1 = this._linePts[j];
		sectionIndex[0] = i;
		sectionIndex[1] = j;
		if (this.hasBadIntersection(this._line, sectionIndex, candidateSeg)) isValidToSimplify = false;
		if (isValidToSimplify) {
			var newSeg = this.flatten(i, j);
			this._line.addToResult(newSeg);
			return null;
		}
		this.simplifySection(i, furthestPtIndex, depth);
		this.simplifySection(furthestPtIndex, j, depth);
	},
	hasBadOutputIntersection: function (candidateSeg) {
		var querySegs = this._outputIndex.query(candidateSeg);
		for (var i = querySegs.iterator(); i.hasNext(); ) {
			var querySeg = i.next();
			if (this.hasInteriorIntersection(querySeg, candidateSeg)) {
				return true;
			}
		}
		return false;
	},
	findFurthestPoint: function (pts, i, j, maxDistance) {
		var seg = new LineSegment();
		seg.p0 = pts[i];
		seg.p1 = pts[j];
		var maxDist = -1.0;
		var maxIndex = i;
		for (var k = i + 1; k < j; k++) {
			var midPt = pts[k];
			var distance = seg.distance(midPt);
			if (distance > maxDist) {
				maxDist = distance;
				maxIndex = k;
			}
		}
		maxDistance[0] = maxDist;
		return maxIndex;
	},
	simplify: function (line) {
		this._line = line;
		this._linePts = line.getParentCoordinates();
		this.simplifySection(0, this._linePts.length - 1, 0);
	},
	remove: function (line, start, end) {
		for (var i = start; i < end; i++) {
			var seg = line.getSegment(i);
			this._inputIndex.remove(seg);
		}
	},
	hasInteriorIntersection: function (seg0, seg1) {
		this._li.computeIntersection(seg0.p0, seg0.p1, seg1.p0, seg1.p1);
		return this._li.isInteriorIntersection();
	},
	hasBadInputIntersection: function (parentLine, sectionIndex, candidateSeg) {
		var querySegs = this._inputIndex.query(candidateSeg);
		for (var i = querySegs.iterator(); i.hasNext(); ) {
			var querySeg = i.next();
			if (this.hasInteriorIntersection(querySeg, candidateSeg)) {
				if (TaggedLineStringSimplifier.isInLineSection(parentLine, sectionIndex, querySeg)) continue;
				return true;
			}
		}
		return false;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return TaggedLineStringSimplifier;
	}
});
TaggedLineStringSimplifier.isInLineSection = function (line, sectionIndex, seg) {
	if (seg.getParent() !== line.getParent()) return false;
	var segIndex = seg.getIndex();
	if (segIndex >= sectionIndex[0] && segIndex < sectionIndex[1]) return true;
	return false;
};
