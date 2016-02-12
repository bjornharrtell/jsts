import SegmentNodeList from './SegmentNodeList';
import WKTWriter from '../io/WKTWriter';
import CoordinateArraySequence from '../geom/impl/CoordinateArraySequence';
import Coordinate from '../geom/Coordinate';
import Octant from './Octant';
import ArrayList from '../../../../java/util/ArrayList';
import NodableSegmentString from './NodableSegmentString';
export default class NodedSegmentString {
	constructor(...args) {
		this.nodeList = new SegmentNodeList(this);
		this.pts = null;
		this.data = null;
		switch (args.length) {
			case 2:
				return ((...args) => {
					let [pts, data] = args;
					this.pts = pts;
					this.data = data;
				})(...args);
		}
	}
	get interfaces_() {
		return [NodableSegmentString];
	}
	static getNodedSubstrings(...args) {
		switch (args.length) {
			case 1:
				return ((...args) => {
					let [segStrings] = args;
					var resultEdgelist = new ArrayList();
					NodedSegmentString.getNodedSubstrings(segStrings, resultEdgelist);
					return resultEdgelist;
				})(...args);
			case 2:
				return ((...args) => {
					let [segStrings, resultEdgelist] = args;
					for (var i = segStrings.iterator(); i.hasNext(); ) {
						var ss = i.next();
						ss.getNodeList().addSplitEdges(resultEdgelist);
					}
				})(...args);
		}
	}
	getCoordinates() {
		return this.pts;
	}
	size() {
		return this.pts.length;
	}
	getCoordinate(i) {
		return this.pts[i];
	}
	isClosed() {
		return this.pts[0].equals(this.pts[this.pts.length - 1]);
	}
	getSegmentOctant(index) {
		if (index === this.pts.length - 1) return -1;
		return this.safeOctant(this.getCoordinate(index), this.getCoordinate(index + 1));
	}
	setData(data) {
		this.data = data;
	}
	safeOctant(p0, p1) {
		if (p0.equals2D(p1)) return 0;
		return Octant.octant(p0, p1);
	}
	getData() {
		return this.data;
	}
	addIntersection(...args) {
		switch (args.length) {
			case 2:
				return ((...args) => {
					let [intPt, segmentIndex] = args;
					this.addIntersectionNode(intPt, segmentIndex);
				})(...args);
			case 4:
				return ((...args) => {
					let [li, segmentIndex, geomIndex, intIndex] = args;
					var intPt = new Coordinate(li.getIntersection(intIndex));
					this.addIntersection(intPt, segmentIndex);
				})(...args);
		}
	}
	toString() {
		return WKTWriter.toLineString(new CoordinateArraySequence(this.pts));
	}
	getNodeList() {
		return this.nodeList;
	}
	addIntersectionNode(intPt, segmentIndex) {
		var normalizedSegmentIndex = segmentIndex;
		var nextSegIndex = normalizedSegmentIndex + 1;
		if (nextSegIndex < this.pts.length) {
			var nextPt = this.pts[nextSegIndex];
			if (intPt.equals2D(nextPt)) {
				normalizedSegmentIndex = nextSegIndex;
			}
		}
		var ei = this.nodeList.add(intPt, normalizedSegmentIndex);
		return ei;
	}
	addIntersections(li, segmentIndex, geomIndex) {
		for (var i = 0; i < li.getIntersectionNum(); i++) {
			this.addIntersection(li, segmentIndex, geomIndex, i);
		}
	}
	getClass() {
		return NodedSegmentString;
	}
}

