import CGAlgorithms from '../../algorithm/CGAlgorithms';
import Position from '../../geomgraph/Position';
import Coordinate from '../../geom/Coordinate';
import Collections from '../../../../../java/util/Collections';
import DirectedEdge from '../../geomgraph/DirectedEdge';
import LineSegment from '../../geom/LineSegment';
import Comparable from '../../../../../java/lang/Comparable';
import ArrayList from '../../../../../java/util/ArrayList';
import List from '../../../../../java/util/List';
export default class SubgraphDepthLocater {
	constructor(...args) {
		this.subgraphs = null;
		this.seg = new LineSegment();
		this.cga = new CGAlgorithms();
		if (args.length === 1) {
			let [subgraphs] = args;
			this.subgraphs = subgraphs;
		}
	}
	get interfaces_() {
		return [];
	}
	static get DepthSegment() {
		return DepthSegment;
	}
	findStabbedSegments(...args) {
		if (args.length === 1) {
			let [stabbingRayLeftPt] = args;
			var stabbedSegments = new ArrayList();
			for (var i = this.subgraphs.iterator(); i.hasNext(); ) {
				var bsg = i.next();
				var env = bsg.getEnvelope();
				if (stabbingRayLeftPt.y < env.getMinY() || stabbingRayLeftPt.y > env.getMaxY()) continue;
				this.findStabbedSegments(stabbingRayLeftPt, bsg.getDirectedEdges(), stabbedSegments);
			}
			return stabbedSegments;
		} else if (args.length === 3) {
			if (args[2].interfaces_ && args[2].interfaces_.indexOf(List) > -1 && (args[0] instanceof Coordinate && args[1] instanceof DirectedEdge)) {
				let [stabbingRayLeftPt, dirEdge, stabbedSegments] = args;
				var pts = dirEdge.getEdge().getCoordinates();
				for (var i = 0; i < pts.length - 1; i++) {
					this.seg.p0 = pts[i];
					this.seg.p1 = pts[i + 1];
					if (this.seg.p0.y > this.seg.p1.y) this.seg.reverse();
					var maxx = Math.max(this.seg.p0.x, this.seg.p1.x);
					if (maxx < stabbingRayLeftPt.x) continue;
					if (this.seg.isHorizontal()) continue;
					if (stabbingRayLeftPt.y < this.seg.p0.y || stabbingRayLeftPt.y > this.seg.p1.y) continue;
					if (CGAlgorithms.computeOrientation(this.seg.p0, this.seg.p1, stabbingRayLeftPt) === CGAlgorithms.RIGHT) continue;
					var depth = dirEdge.getDepth(Position.LEFT);
					if (!this.seg.p0.equals(pts[i])) depth = dirEdge.getDepth(Position.RIGHT);
					var ds = new DepthSegment(this.seg, depth);
					stabbedSegments.add(ds);
				}
			} else if (args[2].interfaces_ && args[2].interfaces_.indexOf(List) > -1 && (args[0] instanceof Coordinate && (args[1].interfaces_ && args[1].interfaces_.indexOf(List) > -1))) {
				let [stabbingRayLeftPt, dirEdges, stabbedSegments] = args;
				for (var i = dirEdges.iterator(); i.hasNext(); ) {
					var de = i.next();
					if (!de.isForward()) continue;
					this.findStabbedSegments(stabbingRayLeftPt, de, stabbedSegments);
				}
			}
		}
	}
	getDepth(p) {
		var stabbedSegments = this.findStabbedSegments(p);
		if (stabbedSegments.size() === 0) return 0;
		var ds = Collections.min(stabbedSegments);
		return ds.leftDepth;
	}
	getClass() {
		return SubgraphDepthLocater;
	}
}
class DepthSegment {
	constructor(...args) {
		this.upwardSeg = null;
		this.leftDepth = null;
		if (args.length === 2) {
			let [seg, depth] = args;
			this.upwardSeg = new LineSegment(seg);
			this.leftDepth = depth;
		}
	}
	get interfaces_() {
		return [Comparable];
	}
	compareTo(obj) {
		var other = obj;
		if (this.upwardSeg.minX() >= other.upwardSeg.maxX()) return 1;
		if (this.upwardSeg.maxX() <= other.upwardSeg.minX()) return -1;
		var orientIndex = this.upwardSeg.orientationIndex(other.upwardSeg);
		if (orientIndex !== 0) return orientIndex;
		orientIndex = -1 * other.upwardSeg.orientationIndex(this.upwardSeg);
		if (orientIndex !== 0) return orientIndex;
		return this.upwardSeg.compareTo(other.upwardSeg);
	}
	compareX(seg0, seg1) {
		var compare0 = seg0.p0.compareTo(seg1.p0);
		if (compare0 !== 0) return compare0;
		return seg0.p1.compareTo(seg1.p1);
	}
	toString() {
		return this.upwardSeg.toString();
	}
	getClass() {
		return DepthSegment;
	}
}

