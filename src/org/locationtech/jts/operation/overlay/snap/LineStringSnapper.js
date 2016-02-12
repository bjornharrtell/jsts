import LineString from '../../../geom/LineString';
import CoordinateList from '../../../geom/CoordinateList';
import Coordinate from '../../../geom/Coordinate';
import Double from '../../../../../../java/lang/Double';
import LineSegment from '../../../geom/LineSegment';
export default class LineStringSnapper {
	constructor(...args) {
		this.snapTolerance = 0.0;
		this.srcPts = null;
		this.seg = new LineSegment();
		this.allowSnappingToSourceVertices = false;
		this._isClosed = false;
		const overloaded = (...args) => {
			if (args.length === 2) {
				if (args[0] instanceof LineString && typeof args[1] === "number") {
					return ((...args) => {
						let [srcLine, snapTolerance] = args;
						overloaded.call(this, srcLine.getCoordinates(), snapTolerance);
					})(...args);
				} else if (args[0] instanceof Array && typeof args[1] === "number") {
					return ((...args) => {
						let [srcPts, snapTolerance] = args;
						this.srcPts = srcPts;
						this._isClosed = LineStringSnapper.isClosed(srcPts);
						this.snapTolerance = snapTolerance;
					})(...args);
				}
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static isClosed(pts) {
		if (pts.length <= 1) return false;
		return pts[0].equals2D(pts[pts.length - 1]);
	}
	snapVertices(srcCoords, snapPts) {
		var end = this._isClosed ? srcCoords.size() - 1 : srcCoords.size();
		for (var i = 0; i < end; i++) {
			var srcPt = srcCoords.get(i);
			var snapVert = this.findSnapForVertex(srcPt, snapPts);
			if (snapVert !== null) {
				srcCoords.set(i, new Coordinate(snapVert));
				if (i === 0 && this._isClosed) srcCoords.set(srcCoords.size() - 1, new Coordinate(snapVert));
			}
		}
	}
	findSnapForVertex(pt, snapPts) {
		for (var i = 0; i < snapPts.length; i++) {
			if (pt.equals2D(snapPts[i])) return null;
			if (pt.distance(snapPts[i]) < this.snapTolerance) return snapPts[i];
		}
		return null;
	}
	snapTo(snapPts) {
		var coordList = new CoordinateList(this.srcPts);
		this.snapVertices(coordList, snapPts);
		this.snapSegments(coordList, snapPts);
		var newPts = coordList.toCoordinateArray();
		return newPts;
	}
	snapSegments(srcCoords, snapPts) {
		if (snapPts.length === 0) return null;
		var distinctPtCount = snapPts.length;
		if (snapPts[0].equals2D(snapPts[snapPts.length - 1])) distinctPtCount = snapPts.length - 1;
		for (var i = 0; i < distinctPtCount; i++) {
			var snapPt = snapPts[i];
			var index = this.findSegmentIndexToSnap(snapPt, srcCoords);
			if (index >= 0) {
				srcCoords.add(index + 1, new Coordinate(snapPt), false);
			}
		}
	}
	findSegmentIndexToSnap(snapPt, srcCoords) {
		var minDist = Double.MAX_VALUE;
		var snapIndex = -1;
		for (var i = 0; i < srcCoords.size() - 1; i++) {
			this.seg.p0 = srcCoords.get(i);
			this.seg.p1 = srcCoords.get(i + 1);
			if (this.seg.p0.equals2D(snapPt) || this.seg.p1.equals2D(snapPt)) {
				if (this.allowSnappingToSourceVertices) continue; else return -1;
			}
			var dist = this.seg.distance(snapPt);
			if (dist < this.snapTolerance && dist < minDist) {
				minDist = dist;
				snapIndex = i;
			}
		}
		return snapIndex;
	}
	setAllowSnappingToSourceVertices(allowSnappingToSourceVertices) {
		this.allowSnappingToSourceVertices = allowSnappingToSourceVertices;
	}
	getClass() {
		return LineStringSnapper;
	}
}

