import SegmentNodeList from './SegmentNodeList';
import WKTWriter from '../io/WKTWriter';
import CoordinateArraySequence from '../geom/impl/CoordinateArraySequence';
import Coordinate from '../geom/Coordinate';
import Octant from './Octant';
import extend from '../../../../extend';
import ArrayList from '../../../../java/util/ArrayList';
import NodableSegmentString from './NodableSegmentString';
export default function NodedSegmentString() {
	this.nodeList = new SegmentNodeList(this);
	this.pts = null;
	this.data = null;
	let pts = arguments[0], data = arguments[1];
	this.pts = pts;
	this.data = data;
}
extend(NodedSegmentString.prototype, {
	getCoordinates: function () {
		return this.pts;
	},
	size: function () {
		return this.pts.length;
	},
	getCoordinate: function (i) {
		return this.pts[i];
	},
	isClosed: function () {
		return this.pts[0].equals(this.pts[this.pts.length - 1]);
	},
	getSegmentOctant: function (index) {
		if (index === this.pts.length - 1) return -1;
		return this.safeOctant(this.getCoordinate(index), this.getCoordinate(index + 1));
	},
	setData: function (data) {
		this.data = data;
	},
	safeOctant: function (p0, p1) {
		if (p0.equals2D(p1)) return 0;
		return Octant.octant(p0, p1);
	},
	getData: function () {
		return this.data;
	},
	addIntersection: function () {
		if (arguments.length === 2) {
			let intPt = arguments[0], segmentIndex = arguments[1];
			this.addIntersectionNode(intPt, segmentIndex);
		} else if (arguments.length === 4) {
			let li = arguments[0], segmentIndex = arguments[1], geomIndex = arguments[2], intIndex = arguments[3];
			var intPt = new Coordinate(li.getIntersection(intIndex));
			this.addIntersection(intPt, segmentIndex);
		}
	},
	toString: function () {
		return WKTWriter.toLineString(new CoordinateArraySequence(this.pts));
	},
	getNodeList: function () {
		return this.nodeList;
	},
	addIntersectionNode: function (intPt, segmentIndex) {
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
	},
	addIntersections: function (li, segmentIndex, geomIndex) {
		for (var i = 0; i < li.getIntersectionNum(); i++) {
			this.addIntersection(li, segmentIndex, geomIndex, i);
		}
	},
	interfaces_: function () {
		return [NodableSegmentString];
	},
	getClass: function () {
		return NodedSegmentString;
	}
});
NodedSegmentString.getNodedSubstrings = function () {
	if (arguments.length === 1) {
		let segStrings = arguments[0];
		var resultEdgelist = new ArrayList();
		NodedSegmentString.getNodedSubstrings(segStrings, resultEdgelist);
		return resultEdgelist;
	} else if (arguments.length === 2) {
		let segStrings = arguments[0], resultEdgelist = arguments[1];
		for (var i = segStrings.iterator(); i.hasNext(); ) {
			var ss = i.next();
			ss.getNodeList().addSplitEdges(resultEdgelist);
		}
	}
};

