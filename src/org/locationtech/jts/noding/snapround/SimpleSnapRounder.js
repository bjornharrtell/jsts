import NodingValidator from '../NodingValidator';
import hasInterface from '../../../../../hasInterface';
import Collection from '../../../../../java/util/Collection';
import Noder from '../Noder';
import MCIndexNoder from '../MCIndexNoder';
import NodedSegmentString from '../NodedSegmentString';
import HotPixel from './HotPixel';
import extend from '../../../../../extend';
import Exception from '../../../../../java/lang/Exception';
import RobustLineIntersector from '../../algorithm/RobustLineIntersector';
import InteriorIntersectionFinderAdder from '../InteriorIntersectionFinderAdder';
export default function SimpleSnapRounder() {
	this.pm = null;
	this.li = null;
	this.scaleFactor = null;
	this.nodedSegStrings = null;
	let pm = arguments[0];
	this.pm = pm;
	this.li = new RobustLineIntersector();
	this.li.setPrecisionModel(pm);
	this.scaleFactor = pm.getScale();
}
extend(SimpleSnapRounder.prototype, {
	checkCorrectness: function (inputSegmentStrings) {
		var resultSegStrings = NodedSegmentString.getNodedSubstrings(inputSegmentStrings);
		var nv = new NodingValidator(resultSegStrings);
		try {
			nv.checkValid();
		} catch (ex) {
			if (ex instanceof Exception) {
				ex.printStackTrace();
			} else throw ex;
		} finally {}
	},
	getNodedSubstrings: function () {
		return NodedSegmentString.getNodedSubstrings(this.nodedSegStrings);
	},
	snapRound: function (segStrings, li) {
		var intersections = this.findInteriorIntersections(segStrings, li);
		this.computeSnaps(segStrings, intersections);
		this.computeVertexSnaps(segStrings);
	},
	findInteriorIntersections: function (segStrings, li) {
		var intFinderAdder = new InteriorIntersectionFinderAdder(li);
		var noder = new MCIndexNoder();
		noder.setSegmentIntersector(intFinderAdder);
		noder.computeNodes(segStrings);
		return intFinderAdder.getInteriorIntersections();
	},
	computeVertexSnaps: function () {
		if (arguments.length === 1) {
			let edges = arguments[0];
			for (var i0 = edges.iterator(); i0.hasNext(); ) {
				var edge0 = i0.next();
				for (var i1 = edges.iterator(); i1.hasNext(); ) {
					var edge1 = i1.next();
					this.computeVertexSnaps(edge0, edge1);
				}
			}
		} else if (arguments.length === 2) {
			let e0 = arguments[0], e1 = arguments[1];
			var pts0 = e0.getCoordinates();
			var pts1 = e1.getCoordinates();
			for (var i0 = 0; i0 < pts0.length - 1; i0++) {
				var hotPixel = new HotPixel(pts0[i0], this.scaleFactor, this.li);
				for (var i1 = 0; i1 < pts1.length - 1; i1++) {
					if (e0 === e1) {
						if (i0 === i1) continue;
					}
					var isNodeAdded = hotPixel.addSnappedNode(e1, i1);
					if (isNodeAdded) {
						e0.addIntersection(pts0[i0], i0);
					}
				}
			}
		}
	},
	computeNodes: function (inputSegmentStrings) {
		this.nodedSegStrings = inputSegmentStrings;
		this.snapRound(inputSegmentStrings, this.li);
	},
	computeSnaps: function () {
		if (hasInterface(arguments[0], Collection) && hasInterface(arguments[1], Collection)) {
			let segStrings = arguments[0], snapPts = arguments[1];
			for (var i0 = segStrings.iterator(); i0.hasNext(); ) {
				var ss = i0.next();
				this.computeSnaps(ss, snapPts);
			}
		} else if (arguments[0] instanceof NodedSegmentString && hasInterface(arguments[1], Collection)) {
			let ss = arguments[0], snapPts = arguments[1];
			for (var it = snapPts.iterator(); it.hasNext(); ) {
				var snapPt = it.next();
				var hotPixel = new HotPixel(snapPt, this.scaleFactor, this.li);
				for (var i = 0; i < ss.size() - 1; i++) {
					hotPixel.addSnappedNode(ss, i);
				}
			}
		}
	},
	interfaces_: function () {
		return [Noder];
	},
	getClass: function () {
		return SimpleSnapRounder;
	}
});

